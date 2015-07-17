define(['exports', 'aurelia-http-client', 'jquery', 'aurelia-dependency-injection', './session', './logger', './locale', './config', './loadingMask'], function (exports, _aureliaHttpClient, _jquery, _aureliaDependencyInjection, _session, _logger, _locale, _config, _loadingMask) {
  'use strict';

  exports.__esModule = true;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _$ = _interopRequireDefault(_jquery);

  var Http = (function () {
    function Http(session, logger, loadingMask) {
      _classCallCheck(this, _Http);

      this.session = session;
      this.logger = logger;
      this.loadingMask = loadingMask;
      this.authHttp = undefined;
      this.locale = _locale.Locale.Repository['default'];

      this.requestsCount = 0;
      this.host = _config.Config.httpOpts.serviceHost;
      this.origin = this.host + _config.Config.httpOpts.serviceApiPrefix;
      this.authOrigin = _config.Config.httpOpts.authHost;
      this.hosts = _config.Config.httpOpts.hosts || {};
      this.requestTimeout = _config.Config.httpOpts.requestTimeout;

      if (this.session.userRemembered()) {
        this.initAuthHttp(this.session.rememberedToken());
      }
    }

    Http.prototype._hideLoadingMask = function _hideLoadingMask() {
      if (this.requestsCount === 0) {
        this.loadingMask.hide();
      }
    };

    Http.prototype.get = function get(url) {
      var _this = this;

      this.loadingMask.show();
      var promise = this.authHttp.get(url).then(function (response) {
        _this._hideLoadingMask();
        return JSON.parse(response.response);
      });
      promise['catch'](function () {
        _this._hideLoadingMask();
        _this.errorHandler.bind(_this);
      });
      return promise;
    };

    Http.prototype.post = function post(url) {
      var content = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var promise = this.authHttp.post(url, content).then(function (response) {
        if (response.response !== '') {
          return JSON.parse(response.response);
        }
      });
      promise['catch'](this.errorHandler.bind(this));

      return promise;
    };

    Http.prototype.put = function put(url) {
      var content = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var promise = this.authHttp.put(url, content);
      promise['catch'](this.errorHandler.bind(this));
      return promise;
    };

    Http.prototype['delete'] = function _delete(url) {
      var promise = this.authHttp['delete'](url);
      promise['catch'](this.errorHandler.bind(this));
      return promise;
    };

    Http.prototype.multipartFormPost = function multipartFormPost(url, data) {
      var requestUrl = this.origin + url;
      return this.multipartForm(requestUrl, data, 'POST');
    };

    Http.prototype.multipartFormPut = function multipartFormPut(url, data) {
      var requestUrl = this.origin + url;
      return this.multipartForm(requestUrl, data, 'PUT');
    };

    Http.prototype.multipartForm = function multipartForm(url, data, method) {
      var req = _$['default'].ajax({
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

    Http.prototype.postDownloadFile = function postDownloadFile(url, data) {
      return this.downloadFile(url, 'POST', data);
    };

    Http.prototype.getDownloadFile = function getDownloadFile(url) {
      return this.downloadFile(url, 'GET');
    };

    Http.prototype.downloadFile = function downloadFile(url, method, data) {
      var _this2 = this;

      var urlAddress = this.origin + url;
      var authHeaderValue = 'Bearer ' + this.token;
      var promise = new Promise(function (resolve, reject) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open(method, urlAddress, true);
        xmlhttp.timeout = _this2.requestTimeout;
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

          var anchor = _$['default']('<a></a>');
          anchor.prop('href', url);
          anchor.prop('download', filename);
          _$['default']('body').append(anchor);
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

    Http.prototype.loginBasicAuth = function loginBasicAuth(email, pass) {
      var client = new _aureliaHttpClient.HttpClient();
      var encodedData = window.btoa(email + ':' + pass);
      var promise = client.createRequest('token').asGet().withBaseUrl(this.authOrigin).withHeader('Authorization', 'Basic ' + encodedData).send();
      promise.then(this.loginHandle.bind(this));
      promise['catch'](this.errorHandler.bind(this));

      return promise;
    };

    Http.prototype.loginResourceOwner = function loginResourceOwner(email, pass) {
      var _this3 = this;

      var data = {
        grant_type: 'password',
        username: email,
        password: pass
      };

      var client = new _aureliaHttpClient.HttpClient().configure(function (x) {
        x.withBaseUrl(_this3.authOrigin);
        x.withHeader('Content-Type', 'application/x-www-form-urlencoded');
      });

      var promise = client.post('token', _$['default'].param(data));
      promise.then(this.loginHandle.bind(this));
      promise['catch'](this.errorHandler.bind(this));

      return promise;
    };

    Http.prototype.initAuthHttp = function initAuthHttp(token) {
      var _this4 = this;

      this.token = token;
      this.authHttp = new _aureliaHttpClient.HttpClient().configure(function (x) {
        x.withBaseUrl(_this4.origin);
        x.withHeader('Authorization', 'Bearer ' + _this4.token);
        x.withHeader('Content-Type', 'application/json');
      });
    };

    Http.prototype.getAuthHttpFor = function getAuthHttpFor(hostName) {
      var _this5 = this;

      var authHttp = new _aureliaHttpClient.HttpClient().configure(function (x) {
        x.withBaseUrl(_this5.hosts[hostName]);
        x.withHeader('Authorization', 'Bearer ' + _this5.token);
        x.withHeader('Content-Type', 'application/json');
      });

      return authHttp;
    };

    Http.prototype._convertToArray = function _convertToArray(value) {
      var result = value || [];
      if (typeof result === 'string') {
        return result.split(',');
      }

      return result;
    };

    Http.prototype.loginHandle = function loginHandle(response) {
      var data = JSON.parse(response.response);
      var token = data.access_token;
      this.initAuthHttp(token);

      var claims = data.userClaims || [];
      if (typeof claims === 'string') {
        claims = JSON.parse(claims);
      }

      this.session.setUser({
        token: token,
        userName: data.userName || 'please give me a name!',
        userClaims: claims,
        userRoles: this._convertToArray(data.userRoles),
        userAccessRights: this._convertToArray(data.userAccessRights)
      });
    };

    Http.prototype.errorHandler = function errorHandler(response) {
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

    var _Http = Http;
    Http = _aureliaDependencyInjection.inject(_session.Session, _logger.Logger, _loadingMask.LoadingMask)(Http) || Http;
    return Http;
  })();

  exports.Http = Http;
});