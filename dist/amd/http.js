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

    var _Http = Http;

    _createClass(_Http, [{
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

        var content = arguments[1] === undefined ? {} : arguments[1];

        this._showLoadingMask();
        var promise = this.authHttp.post(url, content).then(function (response) {
          _this3._hideLoadingMask();
          if (response.response !== '') {
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

        var content = arguments[1] === undefined ? {} : arguments[1];

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

          xmlhttp.addEventListener('error', function () {
            reject();
          });
          xmlhttp.addEventListener('load', function () {
            resolve();
            _this6._hideLoadingMask();
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
          x.withHeader('Content-Type', 'application/x-www-form-urlencoded');
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
          x.withHeader('Content-Type', 'application/json');
        });
      }
    }, {
      key: 'getAuthHttpFor',
      value: function getAuthHttpFor(hostName) {
        var _this9 = this;

        var authHttp = new _aureliaHttpClient.HttpClient().configure(function (x) {
          x.withBaseUrl(_this9.hosts[hostName]);
          x.withHeader('Authorization', 'Bearer ' + _this9.token);
          x.withHeader('Content-Type', 'application/json');
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

    Http = (0, _aureliaDependencyInjection.inject)(_session.Session, _logger.Logger, _loadingMaskLoadingMask.LoadingMask)(Http) || Http;
    return Http;
  })();

  exports.Http = Http;
});
//# sourceMappingURL=data:application/json;base64,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LENBQUMsQ0FBQyxDQUFDO1NBQ3pELE1BQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxLQUFLLEdBQUcsRUFBRTtBQUN0QyxjQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7U0FDakUsTUFBTSxJQUFJLFFBQVEsQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFO0FBQ3BDLGNBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztTQUM1RCxNQUFNO0FBQ0wsY0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztTQUMxRDtPQUNGOzs7QUE1UlUsUUFBSSxHQURoQixnQ0FQTyxNQUFNLFdBQ04sT0FBTyxVQUNQLE1BQU0sMEJBR04sV0FBVyxDQUVrQixDQUN4QixJQUFJLEtBQUosSUFBSTtXQUFKLElBQUk7OztVQUFKLElBQUksR0FBSixJQUFJIiwiZmlsZSI6Imh0dHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbW9zaGVuc2t5IG9uIDYvMTYvMTUuXG4gKi9cbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnYXVyZWxpYS1odHRwLWNsaWVudCc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZGVwZW5kZW5jeS1pbmplY3Rpb24nO1xuaW1wb3J0IHtTZXNzaW9ufSBmcm9tICcuL3Nlc3Npb24nO1xuaW1wb3J0IHtMb2dnZXJ9IGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7TG9jYWxlfSBmcm9tICcuL2xvY2FsZSc7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHtMb2FkaW5nTWFza30gZnJvbSAnLi9sb2FkaW5nLW1hc2svbG9hZGluZy1tYXNrJztcblxuQGluamVjdChTZXNzaW9uLCBMb2dnZXIsIExvYWRpbmdNYXNrKVxuZXhwb3J0IGNsYXNzIEh0dHAge1xuICBjb25zdHJ1Y3RvcihzZXNzaW9uLCBsb2dnZXIsIGxvYWRpbmdNYXNrKSB7XG4gICAgdGhpcy5zZXNzaW9uID0gc2Vzc2lvbjtcbiAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgICB0aGlzLmxvYWRpbmdNYXNrID0gbG9hZGluZ01hc2s7XG4gICAgdGhpcy5hdXRoSHR0cCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmxvY2FsZSA9IExvY2FsZS5SZXBvc2l0b3J5LmRlZmF1bHQ7XG5cbiAgICB0aGlzLnJlcXVlc3RzQ291bnQgPSAwO1xuICAgIHRoaXMuaG9zdCA9IENvbmZpZy5odHRwT3B0cy5zZXJ2aWNlSG9zdDtcbiAgICB0aGlzLm9yaWdpbiA9IHRoaXMuaG9zdCArIENvbmZpZy5odHRwT3B0cy5zZXJ2aWNlQXBpUHJlZml4O1xuICAgIHRoaXMuYXV0aE9yaWdpbiA9IENvbmZpZy5odHRwT3B0cy5hdXRoSG9zdDtcbiAgICB0aGlzLmhvc3RzID0gQ29uZmlnLmh0dHBPcHRzLmhvc3RzIHx8IHt9O1xuICAgIHRoaXMubG9hZGluZ01hc2tEZWxheSA9IENvbmZpZy5odHRwT3B0cy5sb2FkaW5nTWFza0RlbGF5IHx8IDEwMDA7XG4gICAgdGhpcy5yZXF1ZXN0VGltZW91dCA9IENvbmZpZy5odHRwT3B0cy5yZXF1ZXN0VGltZW91dDtcblxuICAgIGlmICh0aGlzLnNlc3Npb24udXNlclJlbWVtYmVyZWQoKSkge1xuICAgICAgdGhpcy5pbml0QXV0aEh0dHAodGhpcy5zZXNzaW9uLnJlbWVtYmVyZWRUb2tlbigpKTtcbiAgICB9XG4gIH1cblxuICBfc2hvd0xvYWRpbmdNYXNrKCkge1xuICAgIHRoaXMucmVxdWVzdHNDb3VudCArPSAxO1xuICAgIGlmICh0aGlzLnJlcXVlc3RzQ291bnQgPT09IDEpIHtcbiAgICAgIGlmICh0aGlzLmxvYWRpbmdNYXNrRGVsYXkgPiAwKSB7XG4gICAgICAgIHRoaXMuX3F1ZXJ5VGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmxvYWRpbmdNYXNrLnNob3coKVxuICAgICAgICB9LCB0aGlzLmxvYWRpbmdNYXNrRGVsYXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nTWFzay5zaG93KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2hpZGVMb2FkaW5nTWFzaygpIHtcbiAgICB0aGlzLnJlcXVlc3RzQ291bnQgLT0gMTtcbiAgICBpZiAodGhpcy5yZXF1ZXN0c0NvdW50IDw9IDApIHtcbiAgICAgIGlmICh0aGlzLl9xdWVyeVRpbWVvdXQpIHtcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLl9xdWVyeVRpbWVvdXQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmxvYWRpbmdNYXNrLmhpZGUoKTtcbiAgICAgIHRoaXMucmVxdWVzdHNDb3VudCA9IDA7XG4gICAgfVxuICB9XG5cbiAgZ2V0KHVybCwgZGF0YSkge1xuICAgIHRoaXMuX3Nob3dMb2FkaW5nTWFzaygpO1xuICAgIGxldCB1cmxXaXRoUHJvcHMgPSB1cmw7XG4gICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGV0IHByb3BzID0gT2JqZWN0LmtleXMoZGF0YSkubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgcmV0dXJuICcnICsga2V5ICsgJz0nICsgZGF0YVtrZXldO1xuICAgICAgfSkuam9pbignJicpO1xuXG4gICAgICB1cmxXaXRoUHJvcHMgKz0gJz8nICsgcHJvcHM7XG4gICAgfVxuICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmF1dGhIdHRwLmdldCh1cmxXaXRoUHJvcHMpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgdGhpcy5faGlkZUxvYWRpbmdNYXNrKCk7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXNwb25zZS5yZXNwb25zZSlcbiAgICB9KTtcbiAgICBwcm9taXNlLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgcG9zdCh1cmwsIGNvbnRlbnQgPSB7fSkge1xuICAgIHRoaXMuX3Nob3dMb2FkaW5nTWFzaygpO1xuICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmF1dGhIdHRwLnBvc3QodXJsLCBjb250ZW50KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIHRoaXMuX2hpZGVMb2FkaW5nTWFzaygpO1xuICAgICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlICE9PSBcIlwiKSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlc3BvbnNlLnJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBwcm9taXNlLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuXG4gIHB1dCh1cmwsIGNvbnRlbnQgPSB7fSkge1xuICAgIHRoaXMuX3Nob3dMb2FkaW5nTWFzaygpO1xuICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmF1dGhIdHRwLnB1dCh1cmwsIGNvbnRlbnQpLnRoZW4ocmVzcG9uc2UgPT4gdGhpcy5faGlkZUxvYWRpbmdNYXNrKCkpO1xuICAgIHByb21pc2UuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBkZWxldGUodXJsKSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuYXV0aEh0dHAuZGVsZXRlKHVybCkudGhlbihyZXNwb25zZSA9PiB0aGlzLl9oaWRlTG9hZGluZ01hc2soKSk7XG4gICAgcHJvbWlzZS5jYXRjaCh0aGlzLmVycm9ySGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIG11bHRpcGFydEZvcm1Qb3N0KHVybCwgZGF0YSkge1xuICAgIHZhciByZXF1ZXN0VXJsID0gdGhpcy5vcmlnaW4gKyB1cmw7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwYXJ0Rm9ybShyZXF1ZXN0VXJsLCBkYXRhLCAnUE9TVCcpO1xuICB9XG5cbiAgbXVsdGlwYXJ0Rm9ybVB1dCh1cmwsIGRhdGEpIHtcbiAgICB2YXIgcmVxdWVzdFVybCA9IHRoaXMub3JpZ2luICsgdXJsO1xuICAgIHJldHVybiB0aGlzLm11bHRpcGFydEZvcm0ocmVxdWVzdFVybCwgZGF0YSwgJ1BVVCcpO1xuICB9XG5cbiAgbXVsdGlwYXJ0Rm9ybSh1cmwsIGRhdGEsIG1ldGhvZCkge1xuICAgIHRoaXMuX3Nob3dMb2FkaW5nTWFzaygpO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgcmVxID0gJC5hamF4KHtcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YSxcbiAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICAgIHR5cGU6IG1ldGhvZCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgcmVxLmRvbmUocmVzb2x2ZSk7XG4gICAgICByZXEuZmFpbChyZWplY3QpO1xuICAgICAgc2VsZi5faGlkZUxvYWRpbmdNYXNrKCk7XG4gICAgfSkuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIuYmluZCh0aGlzKSk7XG4gIH1cblxuICBwb3N0RG93bmxvYWRGaWxlKHVybCwgZGF0YSkge1xuICAgIHJldHVybiB0aGlzLmRvd25sb2FkRmlsZSh1cmwsICdQT1NUJywgZGF0YSk7XG4gIH1cblxuICBnZXREb3dubG9hZEZpbGUodXJsKSB7XG4gICAgcmV0dXJuIHRoaXMuZG93bmxvYWRGaWxlKHVybCwgJ0dFVCcpO1xuICB9XG5cbiAgZG93bmxvYWRGaWxlKHVybCwgbWV0aG9kLCBkYXRhKSB7XG4gICAgdGhpcy5fc2hvd0xvYWRpbmdNYXNrKCk7XG4gICAgY29uc3QgdXJsQWRkcmVzcyA9IHRoaXMub3JpZ2luICsgdXJsO1xuICAgIGNvbnN0IGF1dGhIZWFkZXJWYWx1ZSA9IGBCZWFyZXIgJHt0aGlzLnRva2VufWA7XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHhtbGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIHhtbGh0dHAub3BlbihtZXRob2QsIHVybEFkZHJlc3MsIHRydWUpO1xuICAgICAgeG1saHR0cC50aW1lb3V0ID0gdGhpcy5yZXF1ZXN0VGltZW91dDtcbiAgICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOCcpO1xuICAgICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKCdBdXRob3JpemF0aW9uJywgYXV0aEhlYWRlclZhbHVlKTtcbiAgICAgIHhtbGh0dHAucmVzcG9uc2VUeXBlID0gXCJibG9iXCI7XG5cbiAgICAgIHhtbGh0dHAub25sb2FkID0gZnVuY3Rpb24gKG9FdmVudCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgIHJlamVjdCh7c3RhdHVzQ29kZTogdGhpcy5zdGF0dXN9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBibG9iID0geG1saHR0cC5yZXNwb25zZTtcbiAgICAgICAgY29uc3Qgd2luZG93VXJsID0gd2luZG93LlVSTCB8fCB3aW5kb3cud2Via2l0VVJMO1xuICAgICAgICBjb25zdCB1cmwgPSB3aW5kb3dVcmwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgICBjb25zdCBmaWxlbmFtZSA9IHRoaXMuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtRGlzcG9zaXRpb24nKS5tYXRjaCgvXmF0dGFjaG1lbnQ7IGZpbGVuYW1lPSguKykvKVsxXTtcblxuICAgICAgICBjb25zdCBhbmNob3IgPSAkKCc8YT48L2E+Jyk7XG4gICAgICAgIGFuY2hvci5wcm9wKCdocmVmJywgdXJsKTtcbiAgICAgICAgYW5jaG9yLnByb3AoJ2Rvd25sb2FkJywgZmlsZW5hbWUpO1xuICAgICAgICAkKCdib2R5JykuYXBwZW5kKGFuY2hvcik7XG4gICAgICAgIGFuY2hvci5nZXQoMCkuY2xpY2soKTtcbiAgICAgICAgd2luZG93VXJsLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgICAgICBhbmNob3IucmVtb3ZlKCk7XG4gICAgICB9O1xuXG4gICAgICB4bWxodHRwLm9udGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVqZWN0KHt0aW1lb3V0OiB0cnVlfSlcbiAgICAgIH07XG5cbiAgICAgIHhtbGh0dHAuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsICgpID0+IHtcbiAgICAgICAgcmVqZWN0KCk7XG4gICAgICB9KTtcbiAgICAgIHhtbGh0dHAuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIHRoaXMuX2hpZGVMb2FkaW5nTWFzaygpO1xuICAgICAgfSk7XG4gICAgICBpZiAobWV0aG9kID09PSAnR0VUJykge1xuICAgICAgICB4bWxodHRwLnNlbmQoKTtcbiAgICAgIH0gZWxzZSBpZiAobWV0aG9kID09PSAnUE9TVCcpIHtcbiAgICAgICAgeG1saHR0cC5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuc3Vwb3J0ZWQgbWV0aG9kIGNhbGwhXCIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcHJvbWlzZS5jYXRjaCh0aGlzLmVycm9ySGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGxvZ2luQmFzaWNBdXRoKGVtYWlsLCBwYXNzKSB7XG4gICAgbGV0IGNsaWVudCA9IG5ldyBIdHRwQ2xpZW50KCk7XG4gICAgbGV0IGVuY29kZWREYXRhID0gd2luZG93LmJ0b2EoZW1haWwgKyAnOicgKyBwYXNzKTtcbiAgICBsZXQgcHJvbWlzZSA9IGNsaWVudC5jcmVhdGVSZXF1ZXN0KCd0b2tlbicpXG4gICAgICAuYXNHZXQoKVxuICAgICAgLndpdGhCYXNlVXJsKHRoaXMuYXV0aE9yaWdpbilcbiAgICAgIC53aXRoSGVhZGVyKCdBdXRob3JpemF0aW9uJywgJ0Jhc2ljICcgKyBlbmNvZGVkRGF0YSlcbiAgICAgIC5zZW5kKCk7XG4gICAgcHJvbWlzZS50aGVuKHRoaXMubG9naW5IYW5kbGUuYmluZCh0aGlzKSlcbiAgICBwcm9taXNlLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBsb2dpblJlc291cmNlT3duZXIoZW1haWwsIHBhc3MsIGNsaWVudElkKSB7XG4gICAgdGhpcy5fc2hvd0xvYWRpbmdNYXNrKCk7XG4gICAgbGV0IGRhdGEgPSB7XG4gICAgICBncmFudF90eXBlOiAncGFzc3dvcmQnLFxuICAgICAgY2xpZW50X2lkOiBjbGllbnRJZCxcbiAgICAgIHVzZXJuYW1lOiBlbWFpbCxcbiAgICAgIHBhc3N3b3JkOiBwYXNzXG4gICAgfTtcblxuICAgIGxldCBjbGllbnQgPSBuZXcgSHR0cENsaWVudCgpXG4gICAgICAuY29uZmlndXJlKHggPT4ge1xuICAgICAgICB4LndpdGhCYXNlVXJsKHRoaXMuYXV0aE9yaWdpbik7XG4gICAgICAgIHgud2l0aEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiKTtcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgcHJvbWlzZSA9IGNsaWVudC5wb3N0KCd0b2tlbicsICQucGFyYW0oZGF0YSkpO1xuICAgIHByb21pc2UudGhlbih0aGlzLmxvZ2luSGFuZGxlLmJpbmQodGhpcykpXG4gICAgcHJvbWlzZS5jYXRjaCh0aGlzLmVycm9ySGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgaW5pdEF1dGhIdHRwKHRva2VuKSB7XG4gICAgdGhpcy50b2tlbiA9IHRva2VuO1xuICAgIHRoaXMuYXV0aEh0dHAgPSBuZXcgSHR0cENsaWVudCgpLmNvbmZpZ3VyZSh4ID0+IHtcbiAgICAgIHgud2l0aEJhc2VVcmwodGhpcy5vcmlnaW4pO1xuICAgICAgeC53aXRoSGVhZGVyKCdBdXRob3JpemF0aW9uJywgYEJlYXJlciAke3RoaXMudG9rZW59YCk7XG4gICAgICB4LndpdGhIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0QXV0aEh0dHBGb3IoaG9zdE5hbWUpIHtcbiAgICBsZXQgYXV0aEh0dHAgPSBuZXcgSHR0cENsaWVudCgpLmNvbmZpZ3VyZSh4ID0+IHtcbiAgICAgIHgud2l0aEJhc2VVcmwodGhpcy5ob3N0c1tob3N0TmFtZV0pO1xuICAgICAgeC53aXRoSGVhZGVyKCdBdXRob3JpemF0aW9uJywgYEJlYXJlciAke3RoaXMudG9rZW59YCk7XG4gICAgICB4LndpdGhIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGF1dGhIdHRwO1xuICB9XG5cbiAgX2NvbnZlcnRUb0FycmF5KHZhbHVlKSB7XG4gICAgbGV0IHJlc3VsdCA9IHZhbHVlIHx8IFtdO1xuICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHJlc3VsdC5zcGxpdCgnLCcpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBsb2dpbkhhbmRsZShyZXNwb25zZSkge1xuICAgIHRoaXMuX2hpZGVMb2FkaW5nTWFzaygpO1xuICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlc3BvbnNlLnJlc3BvbnNlKTtcbiAgICBsZXQgdG9rZW4gPSBkYXRhLmFjY2Vzc190b2tlbjtcbiAgICB0aGlzLmluaXRBdXRoSHR0cCh0b2tlbik7XG5cbiAgICBsZXQgY2xhaW1zID0gZGF0YS51c2VyQ2xhaW1zIHx8IFtdO1xuICAgIGlmICh0eXBlb2YgY2xhaW1zID09PSAnc3RyaW5nJykge1xuICAgICAgY2xhaW1zID0gSlNPTi5wYXJzZShjbGFpbXMpO1xuICAgIH1cblxuICAgIHRoaXMuc2Vzc2lvbi5zZXRVc2VyKHtcbiAgICAgIHRva2VuOiB0b2tlbixcbiAgICAgIHVzZXJOYW1lOiBkYXRhLnVzZXJOYW1lIHx8ICdwbGVhc2UgZ2l2ZSBtZSBhIG5hbWUhJyxcbiAgICAgIHVzZXJDbGFpbXM6IGNsYWltcyxcbiAgICAgIHVzZXJSb2xlczogdGhpcy5fY29udmVydFRvQXJyYXkoZGF0YS51c2VyUm9sZXMpLFxuICAgICAgdXNlckFjY2Vzc1JpZ2h0czogdGhpcy5fY29udmVydFRvQXJyYXkoZGF0YS51c2VyQWNjZXNzUmlnaHRzKVxuICAgIH0pO1xuICB9XG5cbiAgLy8gVE9ETzogdXNlIGFzIGluIGF1cmVsaWEtdmFsaWRhdGlvblxuICBlcnJvckhhbmRsZXIocmVzcG9uc2UpIHtcbiAgICB0aGlzLl9oaWRlTG9hZGluZ01hc2soKTtcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gNDAxKSB7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKHRoaXMubG9jYWxlLnRyYW5zbGF0ZSgnc2Vzc2lvblRpbWVkT3V0JykpO1xuICAgIH0gZWxzZSBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gNDAzKSB7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKHRoaXMubG9jYWxlLnRyYW5zbGF0ZSgnYWNjZXNzRGVuaWVkJykpO1xuICAgIH0gZWxzZSBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gNTAwKSB7XG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcih0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ2ludGVybmFsU2VydmVyRXJyb3InKSk7XG4gICAgfSBlbHNlIGlmIChyZXNwb25zZS50aW1lb3V0ID09PSB0cnVlKSB7XG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcih0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ3JlcXVlc3RUaW1lb3V0JykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcih0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ2Vycm9ySGFwcGVuZCcpKTtcbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==