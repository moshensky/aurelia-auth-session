define(['exports', 'aurelia-http-client', 'jquery', 'aurelia-dependency-injection', './session', './logger', './locale', './config', './loading-mask/loading-mask'], function (exports, _aureliaHttpClient, _jquery, _aureliaDependencyInjection, _session, _logger, _locale, _config, _loadingMaskLoadingMask) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

        var self = this;
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
          this._showLoadingMask();
          req.always(self._hideLoadingMask);
          req.done(resolve);
          req.fail(reject);
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

            var anchor = (0, _$['default'])('<a></a>');
            anchor.prop('href', url);
            anchor.prop('download', filename);
            (0, _$['default'])('body').append(anchor);
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

        var promise = client.post('token', _$['default'].param(data));
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
});
//# sourceMappingURL=data:application/json;base64,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Q0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztTQUN6RCxNQUFNLElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxHQUFHLEVBQUU7QUFDdEMsY0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1NBQ2pFLE1BQU0sSUFBSSxRQUFRLENBQUMsT0FBTyxLQUFLLElBQUksRUFBRTtBQUNwQyxjQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7U0FDNUQsTUFBTTtBQUNMLGNBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7U0FDMUQ7T0FDRjs7O2dCQTdSVSxJQUFJO0FBQUosUUFBSSxHQURoQixnQ0FQTyxNQUFNLFdBQ04sT0FBTyxVQUNQLE1BQU0sMEJBR04sV0FBVyxDQUVrQixDQUN4QixJQUFJLEtBQUosSUFBSTtXQUFKLElBQUkiLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IG1vc2hlbnNreSBvbiA2LzE2LzE1LlxyXG4gKi9cclxuaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tICdhdXJlbGlhLWh0dHAtY2xpZW50JztcclxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZGVwZW5kZW5jeS1pbmplY3Rpb24nO1xyXG5pbXBvcnQge1Nlc3Npb259IGZyb20gJy4vc2Vzc2lvbic7XHJcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICcuL2xvZ2dlcic7XHJcbmltcG9ydCB7TG9jYWxlfSBmcm9tICcuL2xvY2FsZSc7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XHJcbmltcG9ydCB7TG9hZGluZ01hc2t9IGZyb20gJy4vbG9hZGluZy1tYXNrL2xvYWRpbmctbWFzayc7XHJcblxyXG5AaW5qZWN0KFNlc3Npb24sIExvZ2dlciwgTG9hZGluZ01hc2spXHJcbmV4cG9ydCBjbGFzcyBIdHRwIHtcclxuICBjb25zdHJ1Y3RvcihzZXNzaW9uLCBsb2dnZXIsIGxvYWRpbmdNYXNrKSB7XHJcbiAgICB0aGlzLnNlc3Npb24gPSBzZXNzaW9uO1xyXG4gICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XHJcbiAgICB0aGlzLmxvYWRpbmdNYXNrID0gbG9hZGluZ01hc2s7XHJcbiAgICB0aGlzLmF1dGhIdHRwID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5sb2NhbGUgPSBMb2NhbGUuUmVwb3NpdG9yeS5kZWZhdWx0O1xyXG5cclxuICAgIHRoaXMucmVxdWVzdHNDb3VudCA9IDA7XHJcbiAgICB0aGlzLmhvc3QgPSBDb25maWcuaHR0cE9wdHMuc2VydmljZUhvc3Q7XHJcbiAgICB0aGlzLm9yaWdpbiA9IHRoaXMuaG9zdCArIENvbmZpZy5odHRwT3B0cy5zZXJ2aWNlQXBpUHJlZml4O1xyXG4gICAgdGhpcy5hdXRoT3JpZ2luID0gQ29uZmlnLmh0dHBPcHRzLmF1dGhIb3N0O1xyXG4gICAgdGhpcy5ob3N0cyA9IENvbmZpZy5odHRwT3B0cy5ob3N0cyB8fCB7fTtcclxuICAgIHRoaXMubG9hZGluZ01hc2tEZWxheSA9IENvbmZpZy5odHRwT3B0cy5sb2FkaW5nTWFza0RlbGF5IHx8IDEwMDA7XHJcbiAgICB0aGlzLnJlcXVlc3RUaW1lb3V0ID0gQ29uZmlnLmh0dHBPcHRzLnJlcXVlc3RUaW1lb3V0O1xyXG5cclxuICAgIGlmICh0aGlzLnNlc3Npb24udXNlclJlbWVtYmVyZWQoKSkge1xyXG4gICAgICB0aGlzLmluaXRBdXRoSHR0cCh0aGlzLnNlc3Npb24ucmVtZW1iZXJlZFRva2VuKCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX3Nob3dMb2FkaW5nTWFzaygpIHtcclxuICAgIHRoaXMucmVxdWVzdHNDb3VudCArPSAxO1xyXG4gICAgaWYgKHRoaXMucmVxdWVzdHNDb3VudCA9PT0gMSkge1xyXG4gICAgICBpZiAodGhpcy5sb2FkaW5nTWFza0RlbGF5ID4gMCkge1xyXG4gICAgICAgIHRoaXMuX3F1ZXJ5VGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMubG9hZGluZ01hc2suc2hvdygpXHJcbiAgICAgICAgfSwgdGhpcy5sb2FkaW5nTWFza0RlbGF5KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmxvYWRpbmdNYXNrLnNob3coKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX2hpZGVMb2FkaW5nTWFzaygpIHtcclxuICAgIHRoaXMucmVxdWVzdHNDb3VudCAtPSAxO1xyXG4gICAgaWYgKHRoaXMucmVxdWVzdHNDb3VudCA8PSAwKSB7XHJcbiAgICAgIGlmICh0aGlzLl9xdWVyeVRpbWVvdXQpIHtcclxuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuX3F1ZXJ5VGltZW91dCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMubG9hZGluZ01hc2suaGlkZSgpO1xyXG4gICAgICB0aGlzLnJlcXVlc3RzQ291bnQgPSAwO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0KHVybCwgZGF0YSkge1xyXG4gICAgdGhpcy5fc2hvd0xvYWRpbmdNYXNrKCk7XHJcbiAgICBsZXQgdXJsV2l0aFByb3BzID0gdXJsO1xyXG4gICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBsZXQgcHJvcHMgPSBPYmplY3Qua2V5cyhkYXRhKS5tYXAoZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIHJldHVybiAnJyArIGtleSArICc9JyArIGRhdGFba2V5XTtcclxuICAgICAgfSkuam9pbignJicpO1xyXG5cclxuICAgICAgdXJsV2l0aFByb3BzICs9ICc/JyArIHByb3BzO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuYXV0aEh0dHAuZ2V0KHVybFdpdGhQcm9wcykudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgIHRoaXMuX2hpZGVMb2FkaW5nTWFzaygpO1xyXG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXNwb25zZS5yZXNwb25zZSlcclxuICAgIH0pO1xyXG4gICAgcHJvbWlzZS5jYXRjaCh0aGlzLmVycm9ySGFuZGxlci5iaW5kKHRoaXMpKTtcclxuICAgIHJldHVybiBwcm9taXNlO1xyXG4gIH1cclxuXHJcbiAgcG9zdCh1cmwsIGNvbnRlbnQgPSB7fSkge1xyXG4gICAgdGhpcy5fc2hvd0xvYWRpbmdNYXNrKCk7XHJcbiAgICBjb25zdCBwcm9taXNlID0gdGhpcy5hdXRoSHR0cC5wb3N0KHVybCwgY29udGVudCkudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgIHRoaXMuX2hpZGVMb2FkaW5nTWFzaygpO1xyXG4gICAgICBpZiAocmVzcG9uc2UucmVzcG9uc2UgIT09IFwiXCIpIHtcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXNwb25zZS5yZXNwb25zZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcHJvbWlzZS5jYXRjaCh0aGlzLmVycm9ySGFuZGxlci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICByZXR1cm4gcHJvbWlzZTtcclxuICB9XHJcblxyXG5cclxuICBwdXQodXJsLCBjb250ZW50ID0ge30pIHtcclxuICAgIHRoaXMuX3Nob3dMb2FkaW5nTWFzaygpO1xyXG4gICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuYXV0aEh0dHAucHV0KHVybCwgY29udGVudCkudGhlbihyZXNwb25zZSA9PiB0aGlzLl9oaWRlTG9hZGluZ01hc2soKSk7XHJcbiAgICBwcm9taXNlLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfVxyXG5cclxuICBkZWxldGUodXJsKSB7XHJcbiAgICBjb25zdCBwcm9taXNlID0gdGhpcy5hdXRoSHR0cC5kZWxldGUodXJsKS50aGVuKHJlc3BvbnNlID0+IHRoaXMuX2hpZGVMb2FkaW5nTWFzaygpKTtcclxuICAgIHByb21pc2UuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIuYmluZCh0aGlzKSk7XHJcbiAgICByZXR1cm4gcHJvbWlzZTtcclxuICB9XHJcblxyXG4gIG11bHRpcGFydEZvcm1Qb3N0KHVybCwgZGF0YSkge1xyXG4gICAgdmFyIHJlcXVlc3RVcmwgPSB0aGlzLm9yaWdpbiArIHVybDtcclxuICAgIHJldHVybiB0aGlzLm11bHRpcGFydEZvcm0ocmVxdWVzdFVybCwgZGF0YSwgJ1BPU1QnKTtcclxuICB9XHJcblxyXG4gIG11bHRpcGFydEZvcm1QdXQodXJsLCBkYXRhKSB7XHJcbiAgICB2YXIgcmVxdWVzdFVybCA9IHRoaXMub3JpZ2luICsgdXJsO1xyXG4gICAgcmV0dXJuIHRoaXMubXVsdGlwYXJ0Rm9ybShyZXF1ZXN0VXJsLCBkYXRhLCAnUFVUJyk7XHJcbiAgfVxyXG5cclxuICBtdWx0aXBhcnRGb3JtKHVybCwgZGF0YSwgbWV0aG9kKSB7XHJcbiAgICBcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHZhciByZXEgPSAkLmFqYXgoe1xyXG4gICAgICB1cmw6IHVybCxcclxuICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxyXG4gICAgICBjb250ZW50VHlwZTogZmFsc2UsXHJcbiAgICAgIHR5cGU6IG1ldGhvZCxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdGhpcy50b2tlblxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdCAgdGhpcy5fc2hvd0xvYWRpbmdNYXNrKCk7XHJcblx0ICByZXEuYWx3YXlzKHNlbGYuX2hpZGVMb2FkaW5nTWFzayk7XHJcbiAgICAgIHJlcS5kb25lKHJlc29sdmUpO1xyXG4gICAgICByZXEuZmFpbChyZWplY3QpO1xyXG4gICAgfSkuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIuYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBwb3N0RG93bmxvYWRGaWxlKHVybCwgZGF0YSkge1xyXG4gICAgcmV0dXJuIHRoaXMuZG93bmxvYWRGaWxlKHVybCwgJ1BPU1QnLCBkYXRhKTtcclxuICB9XHJcblxyXG4gIGdldERvd25sb2FkRmlsZSh1cmwpIHtcclxuICAgIHJldHVybiB0aGlzLmRvd25sb2FkRmlsZSh1cmwsICdHRVQnKTtcclxuICB9XHJcblxyXG4gIGRvd25sb2FkRmlsZSh1cmwsIG1ldGhvZCwgZGF0YSkge1xyXG4gICAgdGhpcy5fc2hvd0xvYWRpbmdNYXNrKCk7XHJcbiAgICBjb25zdCB1cmxBZGRyZXNzID0gdGhpcy5vcmlnaW4gKyB1cmw7XHJcbiAgICBjb25zdCBhdXRoSGVhZGVyVmFsdWUgPSBgQmVhcmVyICR7dGhpcy50b2tlbn1gO1xyXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3QgeG1saHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICB4bWxodHRwLm9wZW4obWV0aG9kLCB1cmxBZGRyZXNzLCB0cnVlKTtcclxuICAgICAgeG1saHR0cC50aW1lb3V0ID0gdGhpcy5yZXF1ZXN0VGltZW91dDtcclxuICAgICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04Jyk7XHJcbiAgICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcignQXV0aG9yaXphdGlvbicsIGF1dGhIZWFkZXJWYWx1ZSk7XHJcbiAgICAgIHhtbGh0dHAucmVzcG9uc2VUeXBlID0gXCJibG9iXCI7XHJcblxyXG4gICAgICB4bWxodHRwLm9ubG9hZCA9IGZ1bmN0aW9uIChvRXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICAgICAgcmVqZWN0KHtzdGF0dXNDb2RlOiB0aGlzLnN0YXR1c30pO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgYmxvYiA9IHhtbGh0dHAucmVzcG9uc2U7XHJcbiAgICAgICAgY29uc3Qgd2luZG93VXJsID0gd2luZG93LlVSTCB8fCB3aW5kb3cud2Via2l0VVJMO1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHdpbmRvd1VybC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcbiAgICAgICAgY29uc3QgZmlsZW5hbWUgPSB0aGlzLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LURpc3Bvc2l0aW9uJykubWF0Y2goL15hdHRhY2htZW50OyBmaWxlbmFtZT0oLispLylbMV07XHJcblxyXG4gICAgICAgIGNvbnN0IGFuY2hvciA9ICQoJzxhPjwvYT4nKTtcclxuICAgICAgICBhbmNob3IucHJvcCgnaHJlZicsIHVybCk7XHJcbiAgICAgICAgYW5jaG9yLnByb3AoJ2Rvd25sb2FkJywgZmlsZW5hbWUpO1xyXG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoYW5jaG9yKTtcclxuICAgICAgICBhbmNob3IuZ2V0KDApLmNsaWNrKCk7XHJcbiAgICAgICAgd2luZG93VXJsLnJldm9rZU9iamVjdFVSTCh1cmwpO1xyXG4gICAgICAgIGFuY2hvci5yZW1vdmUoKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHhtbGh0dHAub250aW1lb3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJlamVjdCh7dGltZW91dDogdHJ1ZX0pXHJcbiAgICAgIH07XHJcblxyXG4gICAgICB4bWxodHRwLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCAoKSA9PiB7XHJcbiAgICAgICAgcmVqZWN0KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB4bWxodHRwLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgdGhpcy5faGlkZUxvYWRpbmdNYXNrKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAobWV0aG9kID09PSAnR0VUJykge1xyXG4gICAgICAgIHhtbGh0dHAuc2VuZCgpO1xyXG4gICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gJ1BPU1QnKSB7XHJcbiAgICAgICAgeG1saHR0cC5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnN1cG9ydGVkIG1ldGhvZCBjYWxsIVwiKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcHJvbWlzZS5jYXRjaCh0aGlzLmVycm9ySGFuZGxlci5iaW5kKHRoaXMpKTtcclxuICAgIHJldHVybiBwcm9taXNlO1xyXG4gIH1cclxuXHJcbiAgbG9naW5CYXNpY0F1dGgoZW1haWwsIHBhc3MpIHtcclxuICAgIGxldCBjbGllbnQgPSBuZXcgSHR0cENsaWVudCgpO1xyXG4gICAgbGV0IGVuY29kZWREYXRhID0gd2luZG93LmJ0b2EoZW1haWwgKyAnOicgKyBwYXNzKTtcclxuICAgIGxldCBwcm9taXNlID0gY2xpZW50LmNyZWF0ZVJlcXVlc3QoJ3Rva2VuJylcclxuICAgICAgLmFzR2V0KClcclxuICAgICAgLndpdGhCYXNlVXJsKHRoaXMuYXV0aE9yaWdpbilcclxuICAgICAgLndpdGhIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArIGVuY29kZWREYXRhKVxyXG4gICAgICAuc2VuZCgpO1xyXG4gICAgcHJvbWlzZS50aGVuKHRoaXMubG9naW5IYW5kbGUuYmluZCh0aGlzKSlcclxuICAgIHByb21pc2UuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfVxyXG5cclxuICBsb2dpblJlc291cmNlT3duZXIoZW1haWwsIHBhc3MsIGNsaWVudElkKSB7XHJcbiAgICB0aGlzLl9zaG93TG9hZGluZ01hc2soKTtcclxuICAgIGxldCBkYXRhID0ge1xyXG4gICAgICBncmFudF90eXBlOiAncGFzc3dvcmQnLFxyXG4gICAgICBjbGllbnRfaWQ6IGNsaWVudElkLFxyXG4gICAgICB1c2VybmFtZTogZW1haWwsXHJcbiAgICAgIHBhc3N3b3JkOiBwYXNzXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBjbGllbnQgPSBuZXcgSHR0cENsaWVudCgpXHJcbiAgICAgIC5jb25maWd1cmUoeCA9PiB7XHJcbiAgICAgICAgeC53aXRoQmFzZVVybCh0aGlzLmF1dGhPcmlnaW4pO1xyXG4gICAgICAgIHgud2l0aEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgY29uc3QgcHJvbWlzZSA9IGNsaWVudC5wb3N0KCd0b2tlbicsICQucGFyYW0oZGF0YSkpO1xyXG4gICAgcHJvbWlzZS50aGVuKHRoaXMubG9naW5IYW5kbGUuYmluZCh0aGlzKSlcclxuICAgIHByb21pc2UuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfVxyXG5cclxuICBpbml0QXV0aEh0dHAodG9rZW4pIHtcclxuICAgIHRoaXMudG9rZW4gPSB0b2tlbjtcclxuICAgIHRoaXMuYXV0aEh0dHAgPSBuZXcgSHR0cENsaWVudCgpLmNvbmZpZ3VyZSh4ID0+IHtcclxuICAgICAgeC53aXRoQmFzZVVybCh0aGlzLm9yaWdpbik7XHJcbiAgICAgIHgud2l0aEhlYWRlcignQXV0aG9yaXphdGlvbicsIGBCZWFyZXIgJHt0aGlzLnRva2VufWApO1xyXG4gICAgICB4LndpdGhIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRBdXRoSHR0cEZvcihob3N0TmFtZSkge1xyXG4gICAgbGV0IGF1dGhIdHRwID0gbmV3IEh0dHBDbGllbnQoKS5jb25maWd1cmUoeCA9PiB7XHJcbiAgICAgIHgud2l0aEJhc2VVcmwodGhpcy5ob3N0c1tob3N0TmFtZV0pO1xyXG4gICAgICB4LndpdGhIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCBgQmVhcmVyICR7dGhpcy50b2tlbn1gKTtcclxuICAgICAgeC53aXRoSGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBhdXRoSHR0cDtcclxuICB9XHJcblxyXG4gIF9jb252ZXJ0VG9BcnJheSh2YWx1ZSkge1xyXG4gICAgbGV0IHJlc3VsdCA9IHZhbHVlIHx8IFtdO1xyXG4gICAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiByZXN1bHQuc3BsaXQoJywnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgbG9naW5IYW5kbGUocmVzcG9uc2UpIHtcclxuICAgIHRoaXMuX2hpZGVMb2FkaW5nTWFzaygpO1xyXG4gICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UocmVzcG9uc2UucmVzcG9uc2UpO1xyXG4gICAgbGV0IHRva2VuID0gZGF0YS5hY2Nlc3NfdG9rZW47XHJcbiAgICB0aGlzLmluaXRBdXRoSHR0cCh0b2tlbik7XHJcblxyXG4gICAgbGV0IGNsYWltcyA9IGRhdGEudXNlckNsYWltcyB8fCBbXTtcclxuICAgIGlmICh0eXBlb2YgY2xhaW1zID09PSAnc3RyaW5nJykge1xyXG4gICAgICBjbGFpbXMgPSBKU09OLnBhcnNlKGNsYWltcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZXNzaW9uLnNldFVzZXIoe1xyXG4gICAgICB0b2tlbjogdG9rZW4sXHJcbiAgICAgIHVzZXJOYW1lOiBkYXRhLnVzZXJOYW1lIHx8ICdwbGVhc2UgZ2l2ZSBtZSBhIG5hbWUhJyxcclxuICAgICAgdXNlckNsYWltczogY2xhaW1zLFxyXG4gICAgICB1c2VyUm9sZXM6IHRoaXMuX2NvbnZlcnRUb0FycmF5KGRhdGEudXNlclJvbGVzKSxcclxuICAgICAgdXNlckFjY2Vzc1JpZ2h0czogdGhpcy5fY29udmVydFRvQXJyYXkoZGF0YS51c2VyQWNjZXNzUmlnaHRzKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBUT0RPOiB1c2UgYXMgaW4gYXVyZWxpYS12YWxpZGF0aW9uXHJcbiAgZXJyb3JIYW5kbGVyKHJlc3BvbnNlKSB7XHJcbiAgICB0aGlzLl9oaWRlTG9hZGluZ01hc2soKTtcclxuICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09PSA0MDEpIHtcclxuICAgICAgdGhpcy5sb2dnZXIud2Fybih0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ3Nlc3Npb25UaW1lZE91dCcpKTtcclxuICAgIH0gZWxzZSBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gNDAzKSB7XHJcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4odGhpcy5sb2NhbGUudHJhbnNsYXRlKCdhY2Nlc3NEZW5pZWQnKSk7XHJcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IDUwMCkge1xyXG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcih0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ2ludGVybmFsU2VydmVyRXJyb3InKSk7XHJcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnRpbWVvdXQgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IodGhpcy5sb2NhbGUudHJhbnNsYXRlKCdyZXF1ZXN0VGltZW91dCcpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKHRoaXMubG9jYWxlLnRyYW5zbGF0ZSgnZXJyb3JIYXBwZW5kJykpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
