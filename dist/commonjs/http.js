'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _aureliaHttpClient = require('aurelia-http-client');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _session = require('./session');

var _logger = require('./logger');

var _locale = require('./locale');

var _config = require('./config');

var Http = (function () {
  function Http(session, logger) {
    _classCallCheck(this, _Http);

    this.session = session;
    this.logger = logger;
    this.authHttp = undefined;
    this.locale = _locale.Locale.Repository['default'];

    this.host = _config.Config.httpOpts.serviceHost;
    this.origin = this.host + _config.Config.httpOpts.serviceApiPrefix;
    this.authOrigin = _config.Config.httpOpts.authHost;
    this.requestTimeout = _config.Config.httpOpts.requestTimeout;

    if (this.session.userRemembered()) {
      this.initAuthHttp(this.session.rememberedToken());
    }
  }

  var _Http = Http;

  _Http.prototype.get = function get(url) {
    var promise = this.authHttp.get(url).then(function (response) {
      return JSON.parse(response.response);
    });
    promise['catch'](this.errorHandler.bind(this));
    return promise;
  };

  _Http.prototype.post = function post(url) {
    var content = arguments[1] === undefined ? {} : arguments[1];

    var promise = this.authHttp.post(url, content).then(function (response) {
      if (response.response !== '') {
        return JSON.parse(response.response);
      }
    });
    promise['catch'](this.errorHandler.bind(this));

    return promise;
  };

  _Http.prototype.put = function put(url) {
    var content = arguments[1] === undefined ? {} : arguments[1];

    var promise = this.authHttp.put(url, content);
    promise['catch'](this.errorHandler.bind(this));
    return promise;
  };

  _Http.prototype['delete'] = function _delete(url) {
    var promise = this.authHttp['delete'](url);
    promise['catch'](this.errorHandler.bind(this));
    return promise;
  };

  _Http.prototype.multipartFormPost = function multipartFormPost(url, data) {
    var requestUrl = this.origin + url;
    return this.multipartForm(requestUrl, data, 'POST');
  };

  _Http.prototype.multipartFormPut = function multipartFormPut(url, data) {
    var requestUrl = this.origin + url;
    return this.multipartForm(requestUrl, data, 'PUT');
  };

  _Http.prototype.multipartForm = function multipartForm(url, data, method) {
    var req = _jquery2['default'].ajax({
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
    })['catch'](this.errorHandler.bind(this));
  };

  _Http.prototype.postDownloadFile = function postDownloadFile(url, data) {
    return this.downloadFile(url, 'POST', data);
  };

  _Http.prototype.getDownloadFile = function getDownloadFile(url) {
    return this.downloadFile(url, 'GET');
  };

  _Http.prototype.downloadFile = function downloadFile(url, method, data) {
    var _this = this;

    var urlAddress = this.origin + url;
    var authHeaderValue = 'Bearer ' + this.token;
    var promise = new Promise(function (resolve, reject) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open(method, urlAddress, true);
      xmlhttp.timeout = _this.requestTimeout;
      xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      xmlhttp.setRequestHeader('Authorization', authHeaderValue);
      xmlhttp.responseType = 'blob';

      xmlhttp.onload = function (oEvent) {
        if (this.status !== 200) {
          reject({ statusCode: this.status });
          return;
        }

        var blob = xmlhttp.response;
        var windowUrl = window.URL || window.webkitURL;
        var url = windowUrl.createObjectURL(blob);
        var filename = this.getResponseHeader('Content-Disposition').match(/^attachment; filename=(.+)/)[1];

        var anchor = (0, _jquery2['default'])('<a></a>');
        anchor.prop('href', url);
        anchor.prop('download', filename);
        (0, _jquery2['default'])('body').append(anchor);
        anchor.get(0).click();
        windowUrl.revokeObjectURL(url);
        anchor.remove();
      };

      xmlhttp.ontimeout = function () {
        reject({ timeout: true });
      };

      xmlhttp.addEventListener('error', function () {
        reject();
      });
      xmlhttp.addEventListener('load', function () {
        resolve();
      });
      if (method === 'GET') {
        xmlhttp.send();
      } else if (method === 'POST') {
        xmlhttp.send(JSON.stringify(data));
      } else {
        throw new Error('Unsuported method call!');
      }
    });

    promise['catch'](this.errorHandler.bind(this));
    return promise;
  };

  _Http.prototype.loginBasicAuth = function loginBasicAuth(email, pass) {
    var client = new _aureliaHttpClient.HttpClient();
    var encodedData = window.btoa(email + ':' + pass);
    var promise = client.createRequest('token').asGet().withBaseUrl(this.authOrigin).withHeader('Authorization', 'Basic ' + encodedData).send();
    promise.then(this.loginHandle.bind(this));
    promise['catch'](this.errorHandler.bind(this));

    return promise;
  };

  _Http.prototype.loginResourceOwner = function loginResourceOwner(email, pass) {
    var _this2 = this;

    var data = {
      grant_type: 'password',
      username: email,
      password: pass
    };

    var client = new _aureliaHttpClient.HttpClient().configure(function (x) {
      x.withBaseUrl(_this2.authOrigin);
      x.withHeader('Content-Type', 'application/x-www-form-urlencoded');
    });

    var promise = client.post('token', _jquery2['default'].param(data));
    promise.then(this.loginHandle.bind(this));
    promise['catch'](this.errorHandler.bind(this));

    return promise;
  };

  _Http.prototype.initAuthHttp = function initAuthHttp(token) {
    this.token = token;
    this.authHttp = this.getAuthHttpFor(this.origin);
  };

  _Http.prototype.getAuthHttpFor = function getAuthHttpFor(host) {
    var _this3 = this;

    var authHttp = new _aureliaHttpClient.HttpClient().configure(function (x) {
      x.withBaseUrl(host);
      x.withHeader('Authorization', 'Bearer ' + _this3.token);
      x.withHeader('Content-Type', 'application/json');
    });

    return authHttp;
  };

  _Http.prototype._convertToArray = function _convertToArray(value) {
    var result = value || [];
    if (typeof result === 'string') {
      return result.split(',');
    }

    return result;
  };

  _Http.prototype.loginHandle = function loginHandle(response) {
    var data = JSON.parse(response.response);
    var token = data.access_token;
    this.initAuthHttp(token);

    this.session.setUser({
      token: token,
      userName: data.userName || 'please give me a name!',
      userClaims: data.userClaims || [],
      userRoles: this._convertToArray(data.userRoles),
      userAccessRights: this._convertToArray(data.userAccessRights)
    });
  };

  _Http.prototype.errorHandler = function errorHandler(response) {
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
  };

  Http = (0, _aureliaDependencyInjection.inject)(_session.Session, _logger.Logger)(Http) || Http;
  return Http;
})();

exports.Http = Http;