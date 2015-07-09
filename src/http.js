/**
 * Created by moshensky on 6/16/15.
 */
import {HttpClient} from 'aurelia-http-client';
import $ from 'jquery';
import {inject} from 'aurelia-dependency-injection';
import {Session} from './session';
import {Logger} from './logger';
import {Locale} from './locale';
import {Config} from './config';

@inject(Session, Logger)
export class Http {
  constructor(session, logger) {
    this.session = session;
    this.logger = logger;
    this.authHttp = undefined;
    this.locale = Locale.Repository.default;

    this.host = Config.httpOpts.serviceHost;
    this.origin = this.host + Config.httpOpts.serviceApiPrefix;
    this.authOrigin = Config.httpOpts.authHost;
    this.hosts = Config.httpOpts.hosts || {};
    this.requestTimeout = Config.httpOpts.requestTimeout;

    if (this.session.userRemembered()) {
      this.initAuthHttp(this.session.rememberedToken());
    }
  }

  get(url) {
    const promise = this.authHttp.get(url).then(response => {
      return JSON.parse(response.response)
    });
    promise.catch(this.errorHandler.bind(this));
    return promise;
  }

  post(url, content = {}) {
    const promise = this.authHttp.post(url, content).then(response => {
      if (response.response !== "") {
        return JSON.parse(response.response);
      }
    });
    promise.catch(this.errorHandler.bind(this));

    return promise;
  }


  put(url, content = {}) {
    const promise = this.authHttp.put(url, content);
    promise.catch(this.errorHandler.bind(this));
    return promise;
  }

  delete(url) {
    const promise = this.authHttp.delete(url);
    promise.catch(this.errorHandler.bind(this));
    return promise;
  }

  multipartFormPost(url, data) {
    var requestUrl = this.origin + url;
    return this.multipartForm(requestUrl, data, 'POST');
  }

  multipartFormPut(url, data) {
    var requestUrl = this.origin + url;
    return this.multipartForm(requestUrl, data, 'PUT');
  }

  multipartForm(url, data, method) {
    var req = $.ajax({
      url: url,
      data: data,
      processData: false,
      contentType: false,
      type: method,
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    });

    return new Promise(function (resolve, reject) {
      req.done(resolve);
      req.fail(reject);
    }).catch(this.errorHandler.bind(this));
  }

  postDownloadFile(url, data) {
    return this.downloadFile(url, 'POST', data);
  }

  getDownloadFile(url) {
    return this.downloadFile(url, 'GET');
  }

  downloadFile(url, method, data) {
    const urlAddress = this.origin + url;
    const authHeaderValue = `Bearer ${this.token}`;
    const promise = new Promise((resolve, reject) => {
      const xmlhttp = new XMLHttpRequest();
      xmlhttp.open(method, urlAddress, true);
      xmlhttp.timeout = this.requestTimeout;
      xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      xmlhttp.setRequestHeader('Authorization', authHeaderValue);
      xmlhttp.responseType = "blob";

      xmlhttp.onload = function(oEvent) {
        if (this.status !== 200) {
          reject({ statusCode: this.status });
          return;
        }

        const blob = xmlhttp.response;
        const windowUrl = window.URL || window.webkitURL;
        const url = windowUrl.createObjectURL(blob);
        const filename = this.getResponseHeader('Content-Disposition').match(/^attachment; filename=(.+)/)[1];

        const anchor = $('<a></a>');
        anchor.prop('href', url);
        anchor.prop('download', filename);
        $('body').append(anchor);
        anchor.get(0).click();
        windowUrl.revokeObjectURL(url);
        anchor.remove();
      };

      xmlhttp.ontimeout = function () {
          reject({timeout: true})
      };

      xmlhttp.addEventListener("error", () => {
        reject();
      });
      xmlhttp.addEventListener("load", () => { resolve(); });
      if (method === 'GET') {
        xmlhttp.send();
      } else if (method === 'POST') {
        xmlhttp.send(JSON.stringify(data));
      } else {
        throw new Error("Unsuported method call!");
      }
    });

    promise.catch(this.errorHandler.bind(this));
    return promise;
  }

  loginBasicAuth(email, pass) {
    let client = new HttpClient();
    let encodedData = window.btoa(email + ':' + pass);
    let promise = client.createRequest('token')
      .asGet()
      .withBaseUrl(this.authOrigin)
      .withHeader('Authorization', 'Basic ' + encodedData)
      .send();
    promise.then(this.loginHandle.bind(this))
    promise.catch(this.errorHandler.bind(this));

    return promise;
  }

  loginResourceOwner(email, pass) {
    let data = {
      grant_type: 'password',
      username: email,
      password: pass
    };

    let client = new HttpClient()
      .configure(x => {
        x.withBaseUrl(this.authOrigin);
        x.withHeader("Content-Type", "application/x-www-form-urlencoded");
      });

    const promise = client.post('token', $.param(data));
    promise.then(this.loginHandle.bind(this))
    promise.catch(this.errorHandler.bind(this));

    return  promise;
  }

  initAuthHttp(token) {
    this.token = token;
    this.authHttp = new HttpClient().configure(x => {
      x.withBaseUrl(this.origin);
      x.withHeader('Authorization', `Bearer ${this.token}`);
      x.withHeader("Content-Type", "application/json");
    });
  }

  getAuthHttpFor(hostName) {
    let authHttp = new HttpClient().configure(x => {
      x.withBaseUrl(this.hosts.hostName);
      x.withHeader('Authorization', `Bearer ${this.token}`);
      x.withHeader("Content-Type", "application/json");
    });

    return authHttp;
  }

  _convertToArray(value) {
    let result = value || [];
    if (typeof result === 'string') {
      return result.split(',');
    }

    return result;
  }

  loginHandle(response) {
    const data = JSON.parse(response.response);
    let token = data.access_token;
    this.initAuthHttp(token);

    this.session.setUser({
      token: token,
      userName: data.userName || 'please give me a name!',
      userClaims: data.userClaims || [],
      userRoles: this._convertToArray(data.userRoles),
      userAccessRights: this._convertToArray(data.userAccessRights)
    });
  }

  // TODO: use as in aurelia-validation
  errorHandler(response) {
    if (response.statusCode === 401) {
      this.logger.warn(this.locale.translate('sessionTimedOut'));
    } else if (response.statusCode === 403) {
      this.logger.warn(this.locale.translate('accessDenied'));
    } else if (response.statusCode === 500) {
      this.logger.error(this.locale.translate('internalServerError'));
    } else if (response.timeout === true) {
      this.logger.error(this.locale.translate('requestTimeout'));
    } else {
      this.logger.error(this.locale.translate('errorHappend'));
    }
  }
}
