System.register(['aurelia-http-client', 'jquery', 'aurelia-dependency-injection', './session', './logger', './locale', './config', './loadingMask/loadingMask'], function (_export) {
  'use strict';

  var HttpClient, $, inject, Session, Logger, Locale, Config, LoadingMask, Http;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaHttpClient) {
      HttpClient = _aureliaHttpClient.HttpClient;
    }, function (_jquery) {
      $ = _jquery['default'];
    }, function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_session) {
      Session = _session.Session;
    }, function (_logger) {
      Logger = _logger.Logger;
    }, function (_locale) {
      Locale = _locale.Locale;
    }, function (_config) {
      Config = _config.Config;
    }, function (_loadingMaskLoadingMask) {
      LoadingMask = _loadingMaskLoadingMask.LoadingMask;
    }],
    execute: function () {
      Http = (function () {
        function Http(session, logger, loadingMask) {
          _classCallCheck(this, _Http);

          this.session = session;
          this.logger = logger;
          this.loadingMask = loadingMask;
          this.authHttp = undefined;
          this.locale = Locale.Repository['default'];

          this.requestsCount = 0;
          this.host = Config.httpOpts.serviceHost;
          this.origin = this.host + Config.httpOpts.serviceApiPrefix;
          this.authOrigin = Config.httpOpts.authHost;
          this.hosts = Config.httpOpts.hosts || {};
          this.loadingMaskDelay = Config.httpOpts.loadingMaskDelay || 1000;
          this.requestTimeout = Config.httpOpts.requestTimeout;

          if (this.session.userRemembered()) {
            this.initAuthHttp(this.session.rememberedToken());
          }
        }

        var _Http = Http;

        _Http.prototype._showLoadingMask = function _showLoadingMask() {
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
        };

        _Http.prototype._hideLoadingMask = function _hideLoadingMask() {
          this.requestsCount -= 1;
          if (this.requestsCount <= 0) {
            if (this._queryTimeout) {
              window.clearTimeout(this._queryTimeout);
            } else {
              this.loadingMask.hide();
            }

            this.requestsCount = 0;
          }
        };

        _Http.prototype.get = function get(url, data) {
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
        };

        _Http.prototype.post = function post(url) {
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
        };

        _Http.prototype.put = function put(url) {
          var _this4 = this;

          var content = arguments[1] === undefined ? {} : arguments[1];

          this._showLoadingMask();
          var promise = this.authHttp.put(url, content).then(function (response) {
            return _this4._hideLoadingMask();
          });
          promise['catch'](this.errorHandler.bind(this));
          return promise;
        };

        _Http.prototype['delete'] = function _delete(url) {
          var _this5 = this;

          var promise = this.authHttp['delete'](url).then(function (response) {
            return _this5._hideLoadingMask();
          });
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
          this._showLoadingMask();
          var self = this;
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
            self._hideLoadingMask();
          })['catch'](this.errorHandler.bind(this));
        };

        _Http.prototype.postDownloadFile = function postDownloadFile(url, data) {
          return this.downloadFile(url, 'POST', data);
        };

        _Http.prototype.getDownloadFile = function getDownloadFile(url) {
          return this.downloadFile(url, 'GET');
        };

        _Http.prototype.downloadFile = function downloadFile(url, method, data) {
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

              var anchor = $('<a></a>');
              anchor.prop('href', url);
              anchor.prop('download', filename);
              $('body').append(anchor);
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
        };

        _Http.prototype.loginBasicAuth = function loginBasicAuth(email, pass) {
          var client = new HttpClient();
          var encodedData = window.btoa(email + ':' + pass);
          var promise = client.createRequest('token').asGet().withBaseUrl(this.authOrigin).withHeader('Authorization', 'Basic ' + encodedData).send();
          promise.then(this.loginHandle.bind(this));
          promise['catch'](this.errorHandler.bind(this));

          return promise;
        };

        _Http.prototype.loginResourceOwner = function loginResourceOwner(email, pass) {
          var _this7 = this;

          this._showLoadingMask();
          var data = {
            grant_type: 'password',
            username: email,
            password: pass
          };

          var client = new HttpClient().configure(function (x) {
            x.withBaseUrl(_this7.authOrigin);
            x.withHeader('Content-Type', 'application/x-www-form-urlencoded');
          });

          var promise = client.post('token', $.param(data));
          promise.then(this.loginHandle.bind(this));
          promise['catch'](this.errorHandler.bind(this));

          return promise;
        };

        _Http.prototype.initAuthHttp = function initAuthHttp(token) {
          var _this8 = this;

          this.token = token;
          this.authHttp = new HttpClient().configure(function (x) {
            x.withBaseUrl(_this8.origin);
            x.withHeader('Authorization', 'Bearer ' + _this8.token);
            x.withHeader('Content-Type', 'application/json');
          });
        };

        _Http.prototype.getAuthHttpFor = function getAuthHttpFor(hostName) {
          var _this9 = this;

          var authHttp = new HttpClient().configure(function (x) {
            x.withBaseUrl(_this9.hosts[hostName]);
            x.withHeader('Authorization', 'Bearer ' + _this9.token);
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
        };

        _Http.prototype.errorHandler = function errorHandler(response) {
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
        };

        Http = inject(Session, Logger, LoadingMask)(Http) || Http;
        return Http;
      })();

      _export('Http', Http);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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RSxDQUFDO0FBQ3hCLGNBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxHQUFHLEVBQUU7QUFDL0IsZ0JBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztXQUM1RCxNQUFNLElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxHQUFHLEVBQUU7QUFDdEMsZ0JBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7V0FDekQsTUFBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssR0FBRyxFQUFFO0FBQ3RDLGdCQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7V0FDakUsTUFBTSxJQUFJLFFBQVEsQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFO0FBQ3BDLGdCQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7V0FDNUQsTUFBTTtBQUNMLGdCQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1dBQzFEO1NBQ0Y7O0FBNVJVLFlBQUksR0FEaEIsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQ3hCLElBQUksS0FBSixJQUFJO2VBQUosSUFBSTs7O3NCQUFKLElBQUkiLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtb3NoZW5za3kgb24gNi8xNi8xNS5cbiAqL1xuaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tICdhdXJlbGlhLWh0dHAtY2xpZW50JztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1kZXBlbmRlbmN5LWluamVjdGlvbic7XG5pbXBvcnQge1Nlc3Npb259IGZyb20gJy4vc2Vzc2lvbic7XG5pbXBvcnQge0xvZ2dlcn0gZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHtMb2NhbGV9IGZyb20gJy4vbG9jYWxlJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQge0xvYWRpbmdNYXNrfSBmcm9tICcuL2xvYWRpbmdNYXNrL2xvYWRpbmdNYXNrJztcblxuQGluamVjdChTZXNzaW9uLCBMb2dnZXIsIExvYWRpbmdNYXNrKVxuZXhwb3J0IGNsYXNzIEh0dHAge1xuICBjb25zdHJ1Y3RvcihzZXNzaW9uLCBsb2dnZXIsIGxvYWRpbmdNYXNrKSB7XG4gICAgdGhpcy5zZXNzaW9uID0gc2Vzc2lvbjtcbiAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgICB0aGlzLmxvYWRpbmdNYXNrID0gbG9hZGluZ01hc2s7XG4gICAgdGhpcy5hdXRoSHR0cCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmxvY2FsZSA9IExvY2FsZS5SZXBvc2l0b3J5LmRlZmF1bHQ7XG5cbiAgICB0aGlzLnJlcXVlc3RzQ291bnQgPSAwO1xuICAgIHRoaXMuaG9zdCA9IENvbmZpZy5odHRwT3B0cy5zZXJ2aWNlSG9zdDtcbiAgICB0aGlzLm9yaWdpbiA9IHRoaXMuaG9zdCArIENvbmZpZy5odHRwT3B0cy5zZXJ2aWNlQXBpUHJlZml4O1xuICAgIHRoaXMuYXV0aE9yaWdpbiA9IENvbmZpZy5odHRwT3B0cy5hdXRoSG9zdDtcbiAgICB0aGlzLmhvc3RzID0gQ29uZmlnLmh0dHBPcHRzLmhvc3RzIHx8IHt9O1xuICAgIHRoaXMubG9hZGluZ01hc2tEZWxheSA9IENvbmZpZy5odHRwT3B0cy5sb2FkaW5nTWFza0RlbGF5IHx8IDEwMDA7XG4gICAgdGhpcy5yZXF1ZXN0VGltZW91dCA9IENvbmZpZy5odHRwT3B0cy5yZXF1ZXN0VGltZW91dDtcblxuICAgIGlmICh0aGlzLnNlc3Npb24udXNlclJlbWVtYmVyZWQoKSkge1xuICAgICAgdGhpcy5pbml0QXV0aEh0dHAodGhpcy5zZXNzaW9uLnJlbWVtYmVyZWRUb2tlbigpKTtcbiAgICB9XG4gIH1cblxuICBfc2hvd0xvYWRpbmdNYXNrKCkge1xuICAgIHRoaXMucmVxdWVzdHNDb3VudCArPSAxO1xuICAgIGlmICh0aGlzLnJlcXVlc3RzQ291bnQgPT09IDEpIHtcbiAgICAgIGlmICh0aGlzLmxvYWRpbmdNYXNrRGVsYXkgPiAwKSB7XG4gICAgICAgIHRoaXMuX3F1ZXJ5VGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmxvYWRpbmdNYXNrLnNob3coKVxuICAgICAgICB9LCB0aGlzLmxvYWRpbmdNYXNrRGVsYXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nTWFzay5zaG93KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2hpZGVMb2FkaW5nTWFzaygpIHtcbiAgICB0aGlzLnJlcXVlc3RzQ291bnQgLT0gMTtcbiAgICBpZiAodGhpcy5yZXF1ZXN0c0NvdW50IDw9IDApIHtcbiAgICAgIGlmICh0aGlzLl9xdWVyeVRpbWVvdXQpIHtcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLl9xdWVyeVRpbWVvdXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nTWFzay5oaWRlKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVxdWVzdHNDb3VudCA9IDA7XG4gICAgfVxuICB9XG5cbiAgZ2V0KHVybCwgZGF0YSkge1xuICAgIHRoaXMuX3Nob3dMb2FkaW5nTWFzaygpO1xuICAgIGxldCB1cmxXaXRoUHJvcHMgPSB1cmw7XG4gICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGV0IHByb3BzID0gT2JqZWN0LmtleXMoZGF0YSkubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgcmV0dXJuICcnICsga2V5ICsgJz0nICsgZGF0YVtrZXldO1xuICAgICAgfSkuam9pbignJicpO1xuXG4gICAgICB1cmxXaXRoUHJvcHMgKz0gJz8nICsgcHJvcHM7XG4gICAgfVxuICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmF1dGhIdHRwLmdldCh1cmxXaXRoUHJvcHMpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgdGhpcy5faGlkZUxvYWRpbmdNYXNrKCk7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXNwb25zZS5yZXNwb25zZSlcbiAgICB9KTtcbiAgICBwcm9taXNlLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgcG9zdCh1cmwsIGNvbnRlbnQgPSB7fSkge1xuICAgIHRoaXMuX3Nob3dMb2FkaW5nTWFzaygpO1xuICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmF1dGhIdHRwLnBvc3QodXJsLCBjb250ZW50KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIHRoaXMuX2hpZGVMb2FkaW5nTWFzaygpO1xuICAgICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlICE9PSBcIlwiKSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlc3BvbnNlLnJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBwcm9taXNlLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuXG4gIHB1dCh1cmwsIGNvbnRlbnQgPSB7fSkge1xuICAgIHRoaXMuX3Nob3dMb2FkaW5nTWFzaygpO1xuICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmF1dGhIdHRwLnB1dCh1cmwsIGNvbnRlbnQpLnRoZW4ocmVzcG9uc2UgPT4gdGhpcy5faGlkZUxvYWRpbmdNYXNrKCkpO1xuICAgIHByb21pc2UuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBkZWxldGUodXJsKSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuYXV0aEh0dHAuZGVsZXRlKHVybCkudGhlbihyZXNwb25zZSA9PiB0aGlzLl9oaWRlTG9hZGluZ01hc2soKSk7XG4gICAgcHJvbWlzZS5jYXRjaCh0aGlzLmVycm9ySGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIG11bHRpcGFydEZvcm1Qb3N0KHVybCwgZGF0YSkge1xuICAgIHZhciByZXF1ZXN0VXJsID0gdGhpcy5vcmlnaW4gKyB1cmw7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwYXJ0Rm9ybShyZXF1ZXN0VXJsLCBkYXRhLCAnUE9TVCcpO1xuICB9XG5cbiAgbXVsdGlwYXJ0Rm9ybVB1dCh1cmwsIGRhdGEpIHtcbiAgICB2YXIgcmVxdWVzdFVybCA9IHRoaXMub3JpZ2luICsgdXJsO1xuICAgIHJldHVybiB0aGlzLm11bHRpcGFydEZvcm0ocmVxdWVzdFVybCwgZGF0YSwgJ1BVVCcpO1xuICB9XG5cbiAgbXVsdGlwYXJ0Rm9ybSh1cmwsIGRhdGEsIG1ldGhvZCkge1xuICAgIHRoaXMuX3Nob3dMb2FkaW5nTWFzaygpO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgcmVxID0gJC5hamF4KHtcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YSxcbiAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICAgIHR5cGU6IG1ldGhvZCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgcmVxLmRvbmUocmVzb2x2ZSk7XG4gICAgICByZXEuZmFpbChyZWplY3QpO1xuICAgICAgc2VsZi5faGlkZUxvYWRpbmdNYXNrKCk7XG4gICAgfSkuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIuYmluZCh0aGlzKSk7XG4gIH1cblxuICBwb3N0RG93bmxvYWRGaWxlKHVybCwgZGF0YSkge1xuICAgIHJldHVybiB0aGlzLmRvd25sb2FkRmlsZSh1cmwsICdQT1NUJywgZGF0YSk7XG4gIH1cblxuICBnZXREb3dubG9hZEZpbGUodXJsKSB7XG4gICAgcmV0dXJuIHRoaXMuZG93bmxvYWRGaWxlKHVybCwgJ0dFVCcpO1xuICB9XG5cbiAgZG93bmxvYWRGaWxlKHVybCwgbWV0aG9kLCBkYXRhKSB7XG4gICAgdGhpcy5fc2hvd0xvYWRpbmdNYXNrKCk7XG4gICAgY29uc3QgdXJsQWRkcmVzcyA9IHRoaXMub3JpZ2luICsgdXJsO1xuICAgIGNvbnN0IGF1dGhIZWFkZXJWYWx1ZSA9IGBCZWFyZXIgJHt0aGlzLnRva2VufWA7XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHhtbGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIHhtbGh0dHAub3BlbihtZXRob2QsIHVybEFkZHJlc3MsIHRydWUpO1xuICAgICAgeG1saHR0cC50aW1lb3V0ID0gdGhpcy5yZXF1ZXN0VGltZW91dDtcbiAgICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOCcpO1xuICAgICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKCdBdXRob3JpemF0aW9uJywgYXV0aEhlYWRlclZhbHVlKTtcbiAgICAgIHhtbGh0dHAucmVzcG9uc2VUeXBlID0gXCJibG9iXCI7XG5cbiAgICAgIHhtbGh0dHAub25sb2FkID0gZnVuY3Rpb24gKG9FdmVudCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgIHJlamVjdCh7c3RhdHVzQ29kZTogdGhpcy5zdGF0dXN9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBibG9iID0geG1saHR0cC5yZXNwb25zZTtcbiAgICAgICAgY29uc3Qgd2luZG93VXJsID0gd2luZG93LlVSTCB8fCB3aW5kb3cud2Via2l0VVJMO1xuICAgICAgICBjb25zdCB1cmwgPSB3aW5kb3dVcmwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgICBjb25zdCBmaWxlbmFtZSA9IHRoaXMuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtRGlzcG9zaXRpb24nKS5tYXRjaCgvXmF0dGFjaG1lbnQ7IGZpbGVuYW1lPSguKykvKVsxXTtcblxuICAgICAgICBjb25zdCBhbmNob3IgPSAkKCc8YT48L2E+Jyk7XG4gICAgICAgIGFuY2hvci5wcm9wKCdocmVmJywgdXJsKTtcbiAgICAgICAgYW5jaG9yLnByb3AoJ2Rvd25sb2FkJywgZmlsZW5hbWUpO1xuICAgICAgICAkKCdib2R5JykuYXBwZW5kKGFuY2hvcik7XG4gICAgICAgIGFuY2hvci5nZXQoMCkuY2xpY2soKTtcbiAgICAgICAgd2luZG93VXJsLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgICAgICBhbmNob3IucmVtb3ZlKCk7XG4gICAgICB9O1xuXG4gICAgICB4bWxodHRwLm9udGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVqZWN0KHt0aW1lb3V0OiB0cnVlfSlcbiAgICAgIH07XG5cbiAgICAgIHhtbGh0dHAuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsICgpID0+IHtcbiAgICAgICAgcmVqZWN0KCk7XG4gICAgICB9KTtcbiAgICAgIHhtbGh0dHAuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIHRoaXMuX2hpZGVMb2FkaW5nTWFzaygpO1xuICAgICAgfSk7XG4gICAgICBpZiAobWV0aG9kID09PSAnR0VUJykge1xuICAgICAgICB4bWxodHRwLnNlbmQoKTtcbiAgICAgIH0gZWxzZSBpZiAobWV0aG9kID09PSAnUE9TVCcpIHtcbiAgICAgICAgeG1saHR0cC5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuc3Vwb3J0ZWQgbWV0aG9kIGNhbGwhXCIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcHJvbWlzZS5jYXRjaCh0aGlzLmVycm9ySGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGxvZ2luQmFzaWNBdXRoKGVtYWlsLCBwYXNzKSB7XG4gICAgbGV0IGNsaWVudCA9IG5ldyBIdHRwQ2xpZW50KCk7XG4gICAgbGV0IGVuY29kZWREYXRhID0gd2luZG93LmJ0b2EoZW1haWwgKyAnOicgKyBwYXNzKTtcbiAgICBsZXQgcHJvbWlzZSA9IGNsaWVudC5jcmVhdGVSZXF1ZXN0KCd0b2tlbicpXG4gICAgICAuYXNHZXQoKVxuICAgICAgLndpdGhCYXNlVXJsKHRoaXMuYXV0aE9yaWdpbilcbiAgICAgIC53aXRoSGVhZGVyKCdBdXRob3JpemF0aW9uJywgJ0Jhc2ljICcgKyBlbmNvZGVkRGF0YSlcbiAgICAgIC5zZW5kKCk7XG4gICAgcHJvbWlzZS50aGVuKHRoaXMubG9naW5IYW5kbGUuYmluZCh0aGlzKSlcbiAgICBwcm9taXNlLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBsb2dpblJlc291cmNlT3duZXIoZW1haWwsIHBhc3MpIHtcbiAgICB0aGlzLl9zaG93TG9hZGluZ01hc2soKTtcbiAgICBsZXQgZGF0YSA9IHtcbiAgICAgIGdyYW50X3R5cGU6ICdwYXNzd29yZCcsXG4gICAgICB1c2VybmFtZTogZW1haWwsXG4gICAgICBwYXNzd29yZDogcGFzc1xuICAgIH07XG5cbiAgICBsZXQgY2xpZW50ID0gbmV3IEh0dHBDbGllbnQoKVxuICAgICAgLmNvbmZpZ3VyZSh4ID0+IHtcbiAgICAgICAgeC53aXRoQmFzZVVybCh0aGlzLmF1dGhPcmlnaW4pO1xuICAgICAgICB4LndpdGhIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XG4gICAgICB9KTtcblxuICAgIGNvbnN0IHByb21pc2UgPSBjbGllbnQucG9zdCgndG9rZW4nLCAkLnBhcmFtKGRhdGEpKTtcbiAgICBwcm9taXNlLnRoZW4odGhpcy5sb2dpbkhhbmRsZS5iaW5kKHRoaXMpKVxuICAgIHByb21pc2UuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGluaXRBdXRoSHR0cCh0b2tlbikge1xuICAgIHRoaXMudG9rZW4gPSB0b2tlbjtcbiAgICB0aGlzLmF1dGhIdHRwID0gbmV3IEh0dHBDbGllbnQoKS5jb25maWd1cmUoeCA9PiB7XG4gICAgICB4LndpdGhCYXNlVXJsKHRoaXMub3JpZ2luKTtcbiAgICAgIHgud2l0aEhlYWRlcignQXV0aG9yaXphdGlvbicsIGBCZWFyZXIgJHt0aGlzLnRva2VufWApO1xuICAgICAgeC53aXRoSGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEF1dGhIdHRwRm9yKGhvc3ROYW1lKSB7XG4gICAgbGV0IGF1dGhIdHRwID0gbmV3IEh0dHBDbGllbnQoKS5jb25maWd1cmUoeCA9PiB7XG4gICAgICB4LndpdGhCYXNlVXJsKHRoaXMuaG9zdHNbaG9zdE5hbWVdKTtcbiAgICAgIHgud2l0aEhlYWRlcignQXV0aG9yaXphdGlvbicsIGBCZWFyZXIgJHt0aGlzLnRva2VufWApO1xuICAgICAgeC53aXRoSGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBhdXRoSHR0cDtcbiAgfVxuXG4gIF9jb252ZXJ0VG9BcnJheSh2YWx1ZSkge1xuICAgIGxldCByZXN1bHQgPSB2YWx1ZSB8fCBbXTtcbiAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiByZXN1bHQuc3BsaXQoJywnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgbG9naW5IYW5kbGUocmVzcG9uc2UpIHtcbiAgICB0aGlzLl9oaWRlTG9hZGluZ01hc2soKTtcbiAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShyZXNwb25zZS5yZXNwb25zZSk7XG4gICAgbGV0IHRva2VuID0gZGF0YS5hY2Nlc3NfdG9rZW47XG4gICAgdGhpcy5pbml0QXV0aEh0dHAodG9rZW4pO1xuXG4gICAgbGV0IGNsYWltcyA9IGRhdGEudXNlckNsYWltcyB8fCBbXTtcbiAgICBpZiAodHlwZW9mIGNsYWltcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNsYWltcyA9IEpTT04ucGFyc2UoY2xhaW1zKTtcbiAgICB9XG5cbiAgICB0aGlzLnNlc3Npb24uc2V0VXNlcih7XG4gICAgICB0b2tlbjogdG9rZW4sXG4gICAgICB1c2VyTmFtZTogZGF0YS51c2VyTmFtZSB8fCAncGxlYXNlIGdpdmUgbWUgYSBuYW1lIScsXG4gICAgICB1c2VyQ2xhaW1zOiBjbGFpbXMsXG4gICAgICB1c2VyUm9sZXM6IHRoaXMuX2NvbnZlcnRUb0FycmF5KGRhdGEudXNlclJvbGVzKSxcbiAgICAgIHVzZXJBY2Nlc3NSaWdodHM6IHRoaXMuX2NvbnZlcnRUb0FycmF5KGRhdGEudXNlckFjY2Vzc1JpZ2h0cylcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFRPRE86IHVzZSBhcyBpbiBhdXJlbGlhLXZhbGlkYXRpb25cbiAgZXJyb3JIYW5kbGVyKHJlc3BvbnNlKSB7XG4gICAgdGhpcy5faGlkZUxvYWRpbmdNYXNrKCk7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IDQwMSkge1xuICAgICAgdGhpcy5sb2dnZXIud2Fybih0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ3Nlc3Npb25UaW1lZE91dCcpKTtcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IDQwMykge1xuICAgICAgdGhpcy5sb2dnZXIud2Fybih0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ2FjY2Vzc0RlbmllZCcpKTtcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IDUwMCkge1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IodGhpcy5sb2NhbGUudHJhbnNsYXRlKCdpbnRlcm5hbFNlcnZlckVycm9yJykpO1xuICAgIH0gZWxzZSBpZiAocmVzcG9uc2UudGltZW91dCA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IodGhpcy5sb2NhbGUudHJhbnNsYXRlKCdyZXF1ZXN0VGltZW91dCcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IodGhpcy5sb2NhbGUudHJhbnNsYXRlKCdlcnJvckhhcHBlbmQnKSk7XG4gICAgfVxuICB9XG59XG4iXX0=