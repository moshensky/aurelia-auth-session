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
            var d = data[key];
            if (Array.isArray(d)) {
              return d.map(function (value) {
                return '' + key + '=' + value;
              }).join('&');
            } else {
              return '' + key + '=' + data[key];
            }
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
//# sourceMappingURL=data:application/json;base64,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O0FBQ3hCLFlBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxHQUFHLEVBQUU7QUFDL0IsY0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1NBQzVELE1BQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxLQUFLLEdBQUcsRUFBRTtBQUN0QyxjQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1NBQ3pELE1BQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxLQUFLLEdBQUcsRUFBRTtBQUN0QyxjQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7U0FDakUsTUFBTSxJQUFJLFFBQVEsQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFO0FBQ3BDLGNBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztTQUM1RCxNQUFNO0FBQ0wsY0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztTQUMxRDtPQUNGOzs7Z0JBblNVLElBQUk7QUFBSixRQUFJLEdBRGhCLGdDQVBPLE1BQU0sV0FDTixPQUFPLFVBQ1AsTUFBTSwwQkFHTixXQUFXLENBRWtCLENBQ3hCLElBQUksS0FBSixJQUFJO1dBQUosSUFBSSIsImZpbGUiOiJodHRwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1vc2hlbnNreSBvbiA2LzE2LzE1LlxuICovXG5pbXBvcnQge0h0dHBDbGllbnR9IGZyb20gJ2F1cmVsaWEtaHR0cC1jbGllbnQnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWRlcGVuZGVuY3ktaW5qZWN0aW9uJztcbmltcG9ydCB7U2Vzc2lvbn0gZnJvbSAnLi9zZXNzaW9uJztcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQge0xvY2FsZX0gZnJvbSAnLi9sb2NhbGUnO1xuaW1wb3J0IHtDb25maWd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7TG9hZGluZ01hc2t9IGZyb20gJy4vbG9hZGluZy1tYXNrL2xvYWRpbmctbWFzayc7XG5cbkBpbmplY3QoU2Vzc2lvbiwgTG9nZ2VyLCBMb2FkaW5nTWFzaylcbmV4cG9ydCBjbGFzcyBIdHRwIHtcbiAgY29uc3RydWN0b3Ioc2Vzc2lvbiwgbG9nZ2VyLCBsb2FkaW5nTWFzaykge1xuICAgIHRoaXMuc2Vzc2lvbiA9IHNlc3Npb247XG4gICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gICAgdGhpcy5sb2FkaW5nTWFzayA9IGxvYWRpbmdNYXNrO1xuICAgIHRoaXMuYXV0aEh0dHAgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5sb2NhbGUgPSBMb2NhbGUuUmVwb3NpdG9yeS5kZWZhdWx0O1xuXG4gICAgdGhpcy5yZXF1ZXN0c0NvdW50ID0gMDtcbiAgICB0aGlzLmhvc3QgPSBDb25maWcuaHR0cE9wdHMuc2VydmljZUhvc3Q7XG4gICAgdGhpcy5vcmlnaW4gPSB0aGlzLmhvc3QgKyBDb25maWcuaHR0cE9wdHMuc2VydmljZUFwaVByZWZpeDtcbiAgICB0aGlzLmF1dGhPcmlnaW4gPSBDb25maWcuaHR0cE9wdHMuYXV0aEhvc3Q7XG4gICAgdGhpcy5ob3N0cyA9IENvbmZpZy5odHRwT3B0cy5ob3N0cyB8fCB7fTtcbiAgICB0aGlzLmxvYWRpbmdNYXNrRGVsYXkgPSBDb25maWcuaHR0cE9wdHMubG9hZGluZ01hc2tEZWxheSB8fCAxMDAwO1xuICAgIHRoaXMucmVxdWVzdFRpbWVvdXQgPSBDb25maWcuaHR0cE9wdHMucmVxdWVzdFRpbWVvdXQ7XG5cbiAgICBpZiAodGhpcy5zZXNzaW9uLnVzZXJSZW1lbWJlcmVkKCkpIHtcbiAgICAgIHRoaXMuaW5pdEF1dGhIdHRwKHRoaXMuc2Vzc2lvbi5yZW1lbWJlcmVkVG9rZW4oKSk7XG4gICAgfVxuICB9XG5cbiAgX3Nob3dMb2FkaW5nTWFzaygpIHtcbiAgICB0aGlzLnJlcXVlc3RzQ291bnQgKz0gMTtcbiAgICBpZiAodGhpcy5yZXF1ZXN0c0NvdW50ID09PSAxKSB7XG4gICAgICBpZiAodGhpcy5sb2FkaW5nTWFza0RlbGF5ID4gMCkge1xuICAgICAgICB0aGlzLl9xdWVyeVRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2FkaW5nTWFzay5zaG93KClcbiAgICAgICAgfSwgdGhpcy5sb2FkaW5nTWFza0RlbGF5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9hZGluZ01hc2suc2hvdygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9oaWRlTG9hZGluZ01hc2soKSB7XG4gICAgdGhpcy5yZXF1ZXN0c0NvdW50IC09IDE7XG4gICAgaWYgKHRoaXMucmVxdWVzdHNDb3VudCA8PSAwKSB7XG4gICAgICBpZiAodGhpcy5fcXVlcnlUaW1lb3V0KSB7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5fcXVlcnlUaW1lb3V0KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sb2FkaW5nTWFzay5oaWRlKCk7XG4gICAgICB0aGlzLnJlcXVlc3RzQ291bnQgPSAwO1xuICAgIH1cbiAgfVxuXG4gIGdldCh1cmwsIGRhdGEpIHtcbiAgICB0aGlzLl9zaG93TG9hZGluZ01hc2soKTtcbiAgICBsZXQgdXJsV2l0aFByb3BzID0gdXJsO1xuICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxldCBwcm9wcyA9IE9iamVjdC5rZXlzKGRhdGEpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGxldCBkID0gZGF0YVtrZXldO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkKSkge1xuICAgICAgICAgIHJldHVybiBkLm1hcCh2YWx1ZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJycgKyBrZXkgKyAnPScgKyB2YWx1ZVxuICAgICAgICAgIH0pLmpvaW4oJyYnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gJycgKyBrZXkgKyAnPScgKyBkYXRhW2tleV07XG4gICAgICAgIH1cbiAgICAgIH0pLmpvaW4oJyYnKTtcblxuICAgICAgdXJsV2l0aFByb3BzICs9ICc/JyArIHByb3BzO1xuICAgIH1cbiAgICBjb25zdCBwcm9taXNlID0gdGhpcy5hdXRoSHR0cC5nZXQodXJsV2l0aFByb3BzKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIHRoaXMuX2hpZGVMb2FkaW5nTWFzaygpO1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzcG9uc2UucmVzcG9uc2UpXG4gICAgfSk7XG4gICAgcHJvbWlzZS5jYXRjaCh0aGlzLmVycm9ySGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIHBvc3QodXJsLCBjb250ZW50ID0ge30pIHtcbiAgICB0aGlzLl9zaG93TG9hZGluZ01hc2soKTtcbiAgICBjb25zdCBwcm9taXNlID0gdGhpcy5hdXRoSHR0cC5wb3N0KHVybCwgY29udGVudCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICB0aGlzLl9oaWRlTG9hZGluZ01hc2soKTtcbiAgICAgIGlmIChyZXNwb25zZS5yZXNwb25zZSAhPT0gXCJcIikge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXNwb25zZS5yZXNwb25zZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcHJvbWlzZS5jYXRjaCh0aGlzLmVycm9ySGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cblxuICBwdXQodXJsLCBjb250ZW50ID0ge30pIHtcbiAgICB0aGlzLl9zaG93TG9hZGluZ01hc2soKTtcbiAgICBjb25zdCBwcm9taXNlID0gdGhpcy5hdXRoSHR0cC5wdXQodXJsLCBjb250ZW50KS50aGVuKHJlc3BvbnNlID0+IHRoaXMuX2hpZGVMb2FkaW5nTWFzaygpKTtcbiAgICBwcm9taXNlLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgZGVsZXRlKHVybCkge1xuICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmF1dGhIdHRwLmRlbGV0ZSh1cmwpLnRoZW4ocmVzcG9uc2UgPT4gdGhpcy5faGlkZUxvYWRpbmdNYXNrKCkpO1xuICAgIHByb21pc2UuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBtdWx0aXBhcnRGb3JtUG9zdCh1cmwsIGRhdGEpIHtcbiAgICB2YXIgcmVxdWVzdFVybCA9IHRoaXMub3JpZ2luICsgdXJsO1xuICAgIHJldHVybiB0aGlzLm11bHRpcGFydEZvcm0ocmVxdWVzdFVybCwgZGF0YSwgJ1BPU1QnKTtcbiAgfVxuXG4gIG11bHRpcGFydEZvcm1QdXQodXJsLCBkYXRhKSB7XG4gICAgdmFyIHJlcXVlc3RVcmwgPSB0aGlzLm9yaWdpbiArIHVybDtcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBhcnRGb3JtKHJlcXVlc3RVcmwsIGRhdGEsICdQVVQnKTtcbiAgfVxuXG4gIG11bHRpcGFydEZvcm0odXJsLCBkYXRhLCBtZXRob2QpIHtcbiAgICB0aGlzLl9zaG93TG9hZGluZ01hc2soKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHJlcSA9ICQuYWpheCh7XG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGEsXG4gICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgICB0eXBlOiBtZXRob2QsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdGhpcy50b2tlblxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlcS5kb25lKHJlc29sdmUpO1xuICAgICAgcmVxLmZhaWwocmVqZWN0KTtcbiAgICAgIHNlbGYuX2hpZGVMb2FkaW5nTWFzaygpO1xuICAgIH0pLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgcG9zdERvd25sb2FkRmlsZSh1cmwsIGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5kb3dubG9hZEZpbGUodXJsLCAnUE9TVCcsIGRhdGEpO1xuICB9XG5cbiAgZ2V0RG93bmxvYWRGaWxlKHVybCkge1xuICAgIHJldHVybiB0aGlzLmRvd25sb2FkRmlsZSh1cmwsICdHRVQnKTtcbiAgfVxuXG4gIGRvd25sb2FkRmlsZSh1cmwsIG1ldGhvZCwgZGF0YSkge1xuICAgIHRoaXMuX3Nob3dMb2FkaW5nTWFzaygpO1xuICAgIGNvbnN0IHVybEFkZHJlc3MgPSB0aGlzLm9yaWdpbiArIHVybDtcbiAgICBjb25zdCBhdXRoSGVhZGVyVmFsdWUgPSBgQmVhcmVyICR7dGhpcy50b2tlbn1gO1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCB4bWxodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICB4bWxodHRwLm9wZW4obWV0aG9kLCB1cmxBZGRyZXNzLCB0cnVlKTtcbiAgICAgIHhtbGh0dHAudGltZW91dCA9IHRoaXMucmVxdWVzdFRpbWVvdXQ7XG4gICAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLTgnKTtcbiAgICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcignQXV0aG9yaXphdGlvbicsIGF1dGhIZWFkZXJWYWx1ZSk7XG4gICAgICB4bWxodHRwLnJlc3BvbnNlVHlwZSA9IFwiYmxvYlwiO1xuXG4gICAgICB4bWxodHRwLm9ubG9hZCA9IGZ1bmN0aW9uIChvRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICByZWplY3Qoe3N0YXR1c0NvZGU6IHRoaXMuc3RhdHVzfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYmxvYiA9IHhtbGh0dHAucmVzcG9uc2U7XG4gICAgICAgIGNvbnN0IHdpbmRvd1VybCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTDtcbiAgICAgICAgY29uc3QgdXJsID0gd2luZG93VXJsLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgICAgY29uc3QgZmlsZW5hbWUgPSB0aGlzLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LURpc3Bvc2l0aW9uJykubWF0Y2goL15hdHRhY2htZW50OyBmaWxlbmFtZT0oLispLylbMV07XG5cbiAgICAgICAgY29uc3QgYW5jaG9yID0gJCgnPGE+PC9hPicpO1xuICAgICAgICBhbmNob3IucHJvcCgnaHJlZicsIHVybCk7XG4gICAgICAgIGFuY2hvci5wcm9wKCdkb3dubG9hZCcsIGZpbGVuYW1lKTtcbiAgICAgICAgJCgnYm9keScpLmFwcGVuZChhbmNob3IpO1xuICAgICAgICBhbmNob3IuZ2V0KDApLmNsaWNrKCk7XG4gICAgICAgIHdpbmRvd1VybC5yZXZva2VPYmplY3RVUkwodXJsKTtcbiAgICAgICAgYW5jaG9yLnJlbW92ZSgpO1xuICAgICAgfTtcblxuICAgICAgeG1saHR0cC5vbnRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlamVjdCh7dGltZW91dDogdHJ1ZX0pXG4gICAgICB9O1xuXG4gICAgICB4bWxodHRwLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCAoKSA9PiB7XG4gICAgICAgIHJlamVjdCgpO1xuICAgICAgfSk7XG4gICAgICB4bWxodHRwLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB0aGlzLl9oaWRlTG9hZGluZ01hc2soKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKG1ldGhvZCA9PT0gJ0dFVCcpIHtcbiAgICAgICAgeG1saHR0cC5zZW5kKCk7XG4gICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgICAgIHhtbGh0dHAuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnN1cG9ydGVkIG1ldGhvZCBjYWxsIVwiKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHByb21pc2UuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBsb2dpbkJhc2ljQXV0aChlbWFpbCwgcGFzcykge1xuICAgIGxldCBjbGllbnQgPSBuZXcgSHR0cENsaWVudCgpO1xuICAgIGxldCBlbmNvZGVkRGF0YSA9IHdpbmRvdy5idG9hKGVtYWlsICsgJzonICsgcGFzcyk7XG4gICAgbGV0IHByb21pc2UgPSBjbGllbnQuY3JlYXRlUmVxdWVzdCgndG9rZW4nKVxuICAgICAgLmFzR2V0KClcbiAgICAgIC53aXRoQmFzZVVybCh0aGlzLmF1dGhPcmlnaW4pXG4gICAgICAud2l0aEhlYWRlcignQXV0aG9yaXphdGlvbicsICdCYXNpYyAnICsgZW5jb2RlZERhdGEpXG4gICAgICAuc2VuZCgpO1xuICAgIHByb21pc2UudGhlbih0aGlzLmxvZ2luSGFuZGxlLmJpbmQodGhpcykpXG4gICAgcHJvbWlzZS5jYXRjaCh0aGlzLmVycm9ySGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgbG9naW5SZXNvdXJjZU93bmVyKGVtYWlsLCBwYXNzLCBjbGllbnRJZCkge1xuICAgIHRoaXMuX3Nob3dMb2FkaW5nTWFzaygpO1xuICAgIGxldCBkYXRhID0ge1xuICAgICAgZ3JhbnRfdHlwZTogJ3Bhc3N3b3JkJyxcbiAgICAgIGNsaWVudF9pZDogY2xpZW50SWQsXG4gICAgICB1c2VybmFtZTogZW1haWwsXG4gICAgICBwYXNzd29yZDogcGFzc1xuICAgIH07XG5cbiAgICBsZXQgY2xpZW50ID0gbmV3IEh0dHBDbGllbnQoKVxuICAgICAgLmNvbmZpZ3VyZSh4ID0+IHtcbiAgICAgICAgeC53aXRoQmFzZVVybCh0aGlzLmF1dGhPcmlnaW4pO1xuICAgICAgICB4LndpdGhIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XG4gICAgICB9KTtcblxuICAgIGNvbnN0IHByb21pc2UgPSBjbGllbnQucG9zdCgndG9rZW4nLCAkLnBhcmFtKGRhdGEpKTtcbiAgICBwcm9taXNlLnRoZW4odGhpcy5sb2dpbkhhbmRsZS5iaW5kKHRoaXMpKVxuICAgIHByb21pc2UuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGluaXRBdXRoSHR0cCh0b2tlbikge1xuICAgIHRoaXMudG9rZW4gPSB0b2tlbjtcbiAgICB0aGlzLmF1dGhIdHRwID0gbmV3IEh0dHBDbGllbnQoKS5jb25maWd1cmUoeCA9PiB7XG4gICAgICB4LndpdGhCYXNlVXJsKHRoaXMub3JpZ2luKTtcbiAgICAgIHgud2l0aEhlYWRlcignQXV0aG9yaXphdGlvbicsIGBCZWFyZXIgJHt0aGlzLnRva2VufWApO1xuICAgICAgeC53aXRoSGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEF1dGhIdHRwRm9yKGhvc3ROYW1lKSB7XG4gICAgbGV0IGF1dGhIdHRwID0gbmV3IEh0dHBDbGllbnQoKS5jb25maWd1cmUoeCA9PiB7XG4gICAgICB4LndpdGhCYXNlVXJsKHRoaXMuaG9zdHNbaG9zdE5hbWVdKTtcbiAgICAgIHgud2l0aEhlYWRlcignQXV0aG9yaXphdGlvbicsIGBCZWFyZXIgJHt0aGlzLnRva2VufWApO1xuICAgICAgeC53aXRoSGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBhdXRoSHR0cDtcbiAgfVxuXG4gIF9jb252ZXJ0VG9BcnJheSh2YWx1ZSkge1xuICAgIGxldCByZXN1bHQgPSB2YWx1ZSB8fCBbXTtcbiAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiByZXN1bHQuc3BsaXQoJywnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgbG9naW5IYW5kbGUocmVzcG9uc2UpIHtcbiAgICB0aGlzLl9oaWRlTG9hZGluZ01hc2soKTtcbiAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShyZXNwb25zZS5yZXNwb25zZSk7XG4gICAgbGV0IHRva2VuID0gZGF0YS5hY2Nlc3NfdG9rZW47XG4gICAgdGhpcy5pbml0QXV0aEh0dHAodG9rZW4pO1xuXG4gICAgbGV0IGNsYWltcyA9IGRhdGEudXNlckNsYWltcyB8fCBbXTtcbiAgICBpZiAodHlwZW9mIGNsYWltcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNsYWltcyA9IEpTT04ucGFyc2UoY2xhaW1zKTtcbiAgICB9XG5cbiAgICB0aGlzLnNlc3Npb24uc2V0VXNlcih7XG4gICAgICB0b2tlbjogdG9rZW4sXG4gICAgICB1c2VyTmFtZTogZGF0YS51c2VyTmFtZSB8fCAncGxlYXNlIGdpdmUgbWUgYSBuYW1lIScsXG4gICAgICB1c2VyQ2xhaW1zOiBjbGFpbXMsXG4gICAgICB1c2VyUm9sZXM6IHRoaXMuX2NvbnZlcnRUb0FycmF5KGRhdGEudXNlclJvbGVzKSxcbiAgICAgIHVzZXJBY2Nlc3NSaWdodHM6IHRoaXMuX2NvbnZlcnRUb0FycmF5KGRhdGEudXNlckFjY2Vzc1JpZ2h0cylcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFRPRE86IHVzZSBhcyBpbiBhdXJlbGlhLXZhbGlkYXRpb25cbiAgZXJyb3JIYW5kbGVyKHJlc3BvbnNlKSB7XG4gICAgdGhpcy5faGlkZUxvYWRpbmdNYXNrKCk7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IDQwMSkge1xuICAgICAgdGhpcy5sb2dnZXIud2Fybih0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ3Nlc3Npb25UaW1lZE91dCcpKTtcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IDQwMykge1xuICAgICAgdGhpcy5sb2dnZXIud2Fybih0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ2FjY2Vzc0RlbmllZCcpKTtcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IDUwMCkge1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IodGhpcy5sb2NhbGUudHJhbnNsYXRlKCdpbnRlcm5hbFNlcnZlckVycm9yJykpO1xuICAgIH0gZWxzZSBpZiAocmVzcG9uc2UudGltZW91dCA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IodGhpcy5sb2NhbGUudHJhbnNsYXRlKCdyZXF1ZXN0VGltZW91dCcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IodGhpcy5sb2NhbGUudHJhbnNsYXRlKCdlcnJvckhhcHBlbmQnKSk7XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=