'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

var _loadingMaskLoadingMask = require('./loading-mask/loading-mask');

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
    this.loadingMaskDelay = _config.Config.httpOpts.loadingMaskDelay || 1000;
    this.requestTimeout = _config.Config.httpOpts.requestTimeout;

    if (this.session.userRemembered()) {
      this.initAuthHttp(this.session.rememberedToken());
    }
  }

  _createClass(Http, [{
    key: '_showLoadingMask',
    value: function _showLoadingMask() {
      var _this = this;

      this.requestsCount += 1;
      if (this.requestsCount === 1) {
        if (this.loadingMaskDelay > 0) {
          this._queryTimeout = window.setTimeout(function () {
            _this.loadingMask.show();
          }, this.loadingMaskDelay);
        } else {
          this.loadingMask.show();
        }
      }
    }
  }, {
    key: '_hideLoadingMask',
    value: function _hideLoadingMask() {
      this.requestsCount -= 1;
      if (this.requestsCount <= 0) {
        if (this._queryTimeout) {
          window.clearTimeout(this._queryTimeout);
        }

        this.loadingMask.hide();
        this.requestsCount = 0;
      }
    }
  }, {
    key: 'get',
    value: function get(url, data) {
      var _this2 = this;

      this._showLoadingMask();
      var urlWithProps = url;
      if (data !== undefined) {
        var props = Object.keys(data).map(function (key) {
          return '' + key + '=' + data[key];
        }).join('&');

        urlWithProps += '?' + props;
      }
      var promise = this.authHttp.get(urlWithProps).then(function (response) {
        _this2._hideLoadingMask();
        return JSON.parse(response.response);
      });
      promise['catch'](this.errorHandler.bind(this));
      return promise;
    }
  }, {
    key: 'post',
    value: function post(url) {
      var _this3 = this;

      var content = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      this._showLoadingMask();
      var promise = this.authHttp.post(url, content).then(function (response) {
        _this3._hideLoadingMask();
        if (response.response !== "") {
          return JSON.parse(response.response);
        }
      });
      promise['catch'](this.errorHandler.bind(this));

      return promise;
    }
  }, {
    key: 'put',
    value: function put(url) {
      var _this4 = this;

      var content = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      this._showLoadingMask();
      var promise = this.authHttp.put(url, content).then(function (response) {
        return _this4._hideLoadingMask();
      });
      promise['catch'](this.errorHandler.bind(this));
      return promise;
    }
  }, {
    key: 'delete',
    value: function _delete(url) {
      var _this5 = this;

      var promise = this.authHttp['delete'](url).then(function (response) {
        return _this5._hideLoadingMask();
      });
      promise['catch'](this.errorHandler.bind(this));
      return promise;
    }
  }, {
    key: 'multipartFormPost',
    value: function multipartFormPost(url, data) {
      var requestUrl = this.origin + url;
      return this.multipartForm(requestUrl, data, 'POST');
    }
  }, {
    key: 'multipartFormPut',
    value: function multipartFormPut(url, data) {
      var requestUrl = this.origin + url;
      return this.multipartForm(requestUrl, data, 'PUT');
    }
  }, {
    key: 'multipartForm',
    value: function multipartForm(url, data, method) {
      this._showLoadingMask();
      var self = this;
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
        self._hideLoadingMask();
      })['catch'](this.errorHandler.bind(this));
    }
  }, {
    key: 'postDownloadFile',
    value: function postDownloadFile(url, data) {
      return this.downloadFile(url, 'POST', data);
    }
  }, {
    key: 'getDownloadFile',
    value: function getDownloadFile(url) {
      return this.downloadFile(url, 'GET');
    }
  }, {
    key: 'downloadFile',
    value: function downloadFile(url, method, data) {
      var _this6 = this;

      this._showLoadingMask();
      var urlAddress = this.origin + url;
      var authHeaderValue = 'Bearer ' + this.token;
      var promise = new Promise(function (resolve, reject) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open(method, urlAddress, true);
        xmlhttp.timeout = _this6.requestTimeout;
        xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xmlhttp.setRequestHeader('Authorization', authHeaderValue);
        xmlhttp.responseType = "blob";

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

        xmlhttp.addEventListener("error", function () {
          reject();
        });
        xmlhttp.addEventListener("load", function () {
          resolve();
          _this6._hideLoadingMask();
        });
        if (method === 'GET') {
          xmlhttp.send();
        } else if (method === 'POST') {
          xmlhttp.send(JSON.stringify(data));
        } else {
          throw new Error("Unsuported method call!");
        }
      });

      promise['catch'](this.errorHandler.bind(this));
      return promise;
    }
  }, {
    key: 'loginBasicAuth',
    value: function loginBasicAuth(email, pass) {
      var client = new _aureliaHttpClient.HttpClient();
      var encodedData = window.btoa(email + ':' + pass);
      var promise = client.createRequest('token').asGet().withBaseUrl(this.authOrigin).withHeader('Authorization', 'Basic ' + encodedData).send();
      promise.then(this.loginHandle.bind(this));
      promise['catch'](this.errorHandler.bind(this));

      return promise;
    }
  }, {
    key: 'loginResourceOwner',
    value: function loginResourceOwner(email, pass, clientId) {
      var _this7 = this;

      this._showLoadingMask();
      var data = {
        grant_type: 'password',
        client_id: clientId,
        username: email,
        password: pass
      };

      var client = new _aureliaHttpClient.HttpClient().configure(function (x) {
        x.withBaseUrl(_this7.authOrigin);
        x.withHeader("Content-Type", "application/x-www-form-urlencoded");
      });

      var promise = client.post('token', _jquery2['default'].param(data));
      promise.then(this.loginHandle.bind(this));
      promise['catch'](this.errorHandler.bind(this));

      return promise;
    }
  }, {
    key: 'initAuthHttp',
    value: function initAuthHttp(token) {
      var _this8 = this;

      this.token = token;
      this.authHttp = new _aureliaHttpClient.HttpClient().configure(function (x) {
        x.withBaseUrl(_this8.origin);
        x.withHeader('Authorization', 'Bearer ' + _this8.token);
        x.withHeader("Content-Type", "application/json");
      });
    }
  }, {
    key: 'getAuthHttpFor',
    value: function getAuthHttpFor(hostName) {
      var _this9 = this;

      var authHttp = new _aureliaHttpClient.HttpClient().configure(function (x) {
        x.withBaseUrl(_this9.hosts[hostName]);
        x.withHeader('Authorization', 'Bearer ' + _this9.token);
        x.withHeader("Content-Type", "application/json");
      });

      return authHttp;
    }
  }, {
    key: '_convertToArray',
    value: function _convertToArray(value) {
      var result = value || [];
      if (typeof result === 'string') {
        return result.split(',');
      }

      return result;
    }
  }, {
    key: 'loginHandle',
    value: function loginHandle(response) {
      this._hideLoadingMask();
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
    }
  }, {
    key: 'errorHandler',
    value: function errorHandler(response) {
      this._hideLoadingMask();
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
  }]);

  var _Http = Http;
  Http = (0, _aureliaDependencyInjection.inject)(_session.Session, _logger.Logger, _loadingMaskLoadingMask.LoadingMask)(Http) || Http;
  return Http;
})();

exports.Http = Http;