System.register(['aurelia-http-client', 'jquery', 'aurelia-dependency-injection', './session', './logger', './locale', './config', './loading-mask/loading-mask'], function (_export) {
  'use strict';

  var HttpClient, $, inject, Session, Logger, Locale, Config, LoadingMask, Http;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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
            var client = new HttpClient();
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

            var client = new HttpClient().configure(function (x) {
              x.withBaseUrl(_this7.authOrigin);
              x.withHeader("Content-Type", "application/x-www-form-urlencoded");
            });

            var promise = client.post('token', $.param(data));
            promise.then(this.loginHandle.bind(this));
            promise['catch'](this.errorHandler.bind(this));

            return promise;
          }
        }, {
          key: 'initAuthHttp',
          value: function initAuthHttp(token) {
            var _this8 = this;

            this.token = token;
            this.authHttp = new HttpClient().configure(function (x) {
              x.withBaseUrl(_this8.origin);
              x.withHeader('Authorization', 'Bearer ' + _this8.token);
              x.withHeader("Content-Type", "application/json");
            });
          }
        }, {
          key: 'getAuthHttpFor',
          value: function getAuthHttpFor(hostName) {
            var _this9 = this;

            var authHttp = new HttpClient().configure(function (x) {
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
        Http = inject(Session, Logger, LoadingMask)(Http) || Http;
        return Http;
      })();

      _export('Http', Http);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2FBQzVELE1BQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxLQUFLLEdBQUcsRUFBRTtBQUN0QyxrQkFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQzthQUN6RCxNQUFNLElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxHQUFHLEVBQUU7QUFDdEMsa0JBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQzthQUNqRSxNQUFNLElBQUksUUFBUSxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7QUFDcEMsa0JBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQzthQUM1RCxNQUFNO0FBQ0wsa0JBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7YUFDMUQ7V0FDRjs7O29CQTdSVSxJQUFJO0FBQUosWUFBSSxHQURoQixNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FDeEIsSUFBSSxLQUFKLElBQUk7ZUFBSixJQUFJIiwiZmlsZSI6Imh0dHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBtb3NoZW5za3kgb24gNi8xNi8xNS5cclxuICovXHJcbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnYXVyZWxpYS1odHRwLWNsaWVudCc7XHJcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XHJcbmltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWRlcGVuZGVuY3ktaW5qZWN0aW9uJztcclxuaW1wb3J0IHtTZXNzaW9ufSBmcm9tICcuL3Nlc3Npb24nO1xyXG5pbXBvcnQge0xvZ2dlcn0gZnJvbSAnLi9sb2dnZXInO1xyXG5pbXBvcnQge0xvY2FsZX0gZnJvbSAnLi9sb2NhbGUnO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi9jb25maWcnO1xyXG5pbXBvcnQge0xvYWRpbmdNYXNrfSBmcm9tICcuL2xvYWRpbmctbWFzay9sb2FkaW5nLW1hc2snO1xyXG5cclxuQGluamVjdChTZXNzaW9uLCBMb2dnZXIsIExvYWRpbmdNYXNrKVxyXG5leHBvcnQgY2xhc3MgSHR0cCB7XHJcbiAgY29uc3RydWN0b3Ioc2Vzc2lvbiwgbG9nZ2VyLCBsb2FkaW5nTWFzaykge1xyXG4gICAgdGhpcy5zZXNzaW9uID0gc2Vzc2lvbjtcclxuICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xyXG4gICAgdGhpcy5sb2FkaW5nTWFzayA9IGxvYWRpbmdNYXNrO1xyXG4gICAgdGhpcy5hdXRoSHR0cCA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMubG9jYWxlID0gTG9jYWxlLlJlcG9zaXRvcnkuZGVmYXVsdDtcclxuXHJcbiAgICB0aGlzLnJlcXVlc3RzQ291bnQgPSAwO1xyXG4gICAgdGhpcy5ob3N0ID0gQ29uZmlnLmh0dHBPcHRzLnNlcnZpY2VIb3N0O1xyXG4gICAgdGhpcy5vcmlnaW4gPSB0aGlzLmhvc3QgKyBDb25maWcuaHR0cE9wdHMuc2VydmljZUFwaVByZWZpeDtcclxuICAgIHRoaXMuYXV0aE9yaWdpbiA9IENvbmZpZy5odHRwT3B0cy5hdXRoSG9zdDtcclxuICAgIHRoaXMuaG9zdHMgPSBDb25maWcuaHR0cE9wdHMuaG9zdHMgfHwge307XHJcbiAgICB0aGlzLmxvYWRpbmdNYXNrRGVsYXkgPSBDb25maWcuaHR0cE9wdHMubG9hZGluZ01hc2tEZWxheSB8fCAxMDAwO1xyXG4gICAgdGhpcy5yZXF1ZXN0VGltZW91dCA9IENvbmZpZy5odHRwT3B0cy5yZXF1ZXN0VGltZW91dDtcclxuXHJcbiAgICBpZiAodGhpcy5zZXNzaW9uLnVzZXJSZW1lbWJlcmVkKCkpIHtcclxuICAgICAgdGhpcy5pbml0QXV0aEh0dHAodGhpcy5zZXNzaW9uLnJlbWVtYmVyZWRUb2tlbigpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9zaG93TG9hZGluZ01hc2soKSB7XHJcbiAgICB0aGlzLnJlcXVlc3RzQ291bnQgKz0gMTtcclxuICAgIGlmICh0aGlzLnJlcXVlc3RzQ291bnQgPT09IDEpIHtcclxuICAgICAgaWYgKHRoaXMubG9hZGluZ01hc2tEZWxheSA+IDApIHtcclxuICAgICAgICB0aGlzLl9xdWVyeVRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmxvYWRpbmdNYXNrLnNob3coKVxyXG4gICAgICAgIH0sIHRoaXMubG9hZGluZ01hc2tEZWxheSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nTWFzay5zaG93KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9oaWRlTG9hZGluZ01hc2soKSB7XHJcbiAgICB0aGlzLnJlcXVlc3RzQ291bnQgLT0gMTtcclxuICAgIGlmICh0aGlzLnJlcXVlc3RzQ291bnQgPD0gMCkge1xyXG4gICAgICBpZiAodGhpcy5fcXVlcnlUaW1lb3V0KSB7XHJcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLl9xdWVyeVRpbWVvdXQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmxvYWRpbmdNYXNrLmhpZGUoKTtcclxuICAgICAgdGhpcy5yZXF1ZXN0c0NvdW50ID0gMDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCh1cmwsIGRhdGEpIHtcclxuICAgIHRoaXMuX3Nob3dMb2FkaW5nTWFzaygpO1xyXG4gICAgbGV0IHVybFdpdGhQcm9wcyA9IHVybDtcclxuICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgbGV0IHByb3BzID0gT2JqZWN0LmtleXMoZGF0YSkubWFwKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICByZXR1cm4gJycgKyBrZXkgKyAnPScgKyBkYXRhW2tleV07XHJcbiAgICAgIH0pLmpvaW4oJyYnKTtcclxuXHJcbiAgICAgIHVybFdpdGhQcm9wcyArPSAnPycgKyBwcm9wcztcclxuICAgIH1cclxuICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmF1dGhIdHRwLmdldCh1cmxXaXRoUHJvcHMpLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICB0aGlzLl9oaWRlTG9hZGluZ01hc2soKTtcclxuICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzcG9uc2UucmVzcG9uc2UpXHJcbiAgICB9KTtcclxuICAgIHByb21pc2UuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIuYmluZCh0aGlzKSk7XHJcbiAgICByZXR1cm4gcHJvbWlzZTtcclxuICB9XHJcblxyXG4gIHBvc3QodXJsLCBjb250ZW50ID0ge30pIHtcclxuICAgIHRoaXMuX3Nob3dMb2FkaW5nTWFzaygpO1xyXG4gICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuYXV0aEh0dHAucG9zdCh1cmwsIGNvbnRlbnQpLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICB0aGlzLl9oaWRlTG9hZGluZ01hc2soKTtcclxuICAgICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlICE9PSBcIlwiKSB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzcG9uc2UucmVzcG9uc2UpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHByb21pc2UuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfVxyXG5cclxuXHJcbiAgcHV0KHVybCwgY29udGVudCA9IHt9KSB7XHJcbiAgICB0aGlzLl9zaG93TG9hZGluZ01hc2soKTtcclxuICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmF1dGhIdHRwLnB1dCh1cmwsIGNvbnRlbnQpLnRoZW4ocmVzcG9uc2UgPT4gdGhpcy5faGlkZUxvYWRpbmdNYXNrKCkpO1xyXG4gICAgcHJvbWlzZS5jYXRjaCh0aGlzLmVycm9ySGFuZGxlci5iaW5kKHRoaXMpKTtcclxuICAgIHJldHVybiBwcm9taXNlO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlKHVybCkge1xyXG4gICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuYXV0aEh0dHAuZGVsZXRlKHVybCkudGhlbihyZXNwb25zZSA9PiB0aGlzLl9oaWRlTG9hZGluZ01hc2soKSk7XHJcbiAgICBwcm9taXNlLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfVxyXG5cclxuICBtdWx0aXBhcnRGb3JtUG9zdCh1cmwsIGRhdGEpIHtcclxuICAgIHZhciByZXF1ZXN0VXJsID0gdGhpcy5vcmlnaW4gKyB1cmw7XHJcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBhcnRGb3JtKHJlcXVlc3RVcmwsIGRhdGEsICdQT1NUJyk7XHJcbiAgfVxyXG5cclxuICBtdWx0aXBhcnRGb3JtUHV0KHVybCwgZGF0YSkge1xyXG4gICAgdmFyIHJlcXVlc3RVcmwgPSB0aGlzLm9yaWdpbiArIHVybDtcclxuICAgIHJldHVybiB0aGlzLm11bHRpcGFydEZvcm0ocmVxdWVzdFVybCwgZGF0YSwgJ1BVVCcpO1xyXG4gIH1cclxuXHJcbiAgbXVsdGlwYXJ0Rm9ybSh1cmwsIGRhdGEsIG1ldGhvZCkge1xyXG4gICAgXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICB2YXIgcmVxID0gJC5hamF4KHtcclxuICAgICAgdXJsOiB1cmwsXHJcbiAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcclxuICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBtZXRob2QsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRoaXMudG9rZW5cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuXHQgIHRoaXMuX3Nob3dMb2FkaW5nTWFzaygpO1xyXG5cdCAgcmVxLmFsd2F5cyhzZWxmLl9oaWRlTG9hZGluZ01hc2spO1xyXG4gICAgICByZXEuZG9uZShyZXNvbHZlKTtcclxuICAgICAgcmVxLmZhaWwocmVqZWN0KTtcclxuICAgIH0pLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgcG9zdERvd25sb2FkRmlsZSh1cmwsIGRhdGEpIHtcclxuICAgIHJldHVybiB0aGlzLmRvd25sb2FkRmlsZSh1cmwsICdQT1NUJywgZGF0YSk7XHJcbiAgfVxyXG5cclxuICBnZXREb3dubG9hZEZpbGUodXJsKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kb3dubG9hZEZpbGUodXJsLCAnR0VUJyk7XHJcbiAgfVxyXG5cclxuICBkb3dubG9hZEZpbGUodXJsLCBtZXRob2QsIGRhdGEpIHtcclxuICAgIHRoaXMuX3Nob3dMb2FkaW5nTWFzaygpO1xyXG4gICAgY29uc3QgdXJsQWRkcmVzcyA9IHRoaXMub3JpZ2luICsgdXJsO1xyXG4gICAgY29uc3QgYXV0aEhlYWRlclZhbHVlID0gYEJlYXJlciAke3RoaXMudG9rZW59YDtcclxuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IHhtbGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgeG1saHR0cC5vcGVuKG1ldGhvZCwgdXJsQWRkcmVzcywgdHJ1ZSk7XHJcbiAgICAgIHhtbGh0dHAudGltZW91dCA9IHRoaXMucmVxdWVzdFRpbWVvdXQ7XHJcbiAgICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOCcpO1xyXG4gICAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCBhdXRoSGVhZGVyVmFsdWUpO1xyXG4gICAgICB4bWxodHRwLnJlc3BvbnNlVHlwZSA9IFwiYmxvYlwiO1xyXG5cclxuICAgICAgeG1saHR0cC5vbmxvYWQgPSBmdW5jdGlvbiAob0V2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgICAgIHJlamVjdCh7c3RhdHVzQ29kZTogdGhpcy5zdGF0dXN9KTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGJsb2IgPSB4bWxodHRwLnJlc3BvbnNlO1xyXG4gICAgICAgIGNvbnN0IHdpbmRvd1VybCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTDtcclxuICAgICAgICBjb25zdCB1cmwgPSB3aW5kb3dVcmwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG4gICAgICAgIGNvbnN0IGZpbGVuYW1lID0gdGhpcy5nZXRSZXNwb25zZUhlYWRlcignQ29udGVudC1EaXNwb3NpdGlvbicpLm1hdGNoKC9eYXR0YWNobWVudDsgZmlsZW5hbWU9KC4rKS8pWzFdO1xyXG5cclxuICAgICAgICBjb25zdCBhbmNob3IgPSAkKCc8YT48L2E+Jyk7XHJcbiAgICAgICAgYW5jaG9yLnByb3AoJ2hyZWYnLCB1cmwpO1xyXG4gICAgICAgIGFuY2hvci5wcm9wKCdkb3dubG9hZCcsIGZpbGVuYW1lKTtcclxuICAgICAgICAkKCdib2R5JykuYXBwZW5kKGFuY2hvcik7XHJcbiAgICAgICAgYW5jaG9yLmdldCgwKS5jbGljaygpO1xyXG4gICAgICAgIHdpbmRvd1VybC5yZXZva2VPYmplY3RVUkwodXJsKTtcclxuICAgICAgICBhbmNob3IucmVtb3ZlKCk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB4bWxodHRwLm9udGltZW91dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZWplY3Qoe3RpbWVvdXQ6IHRydWV9KVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgeG1saHR0cC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgKCkgPT4ge1xyXG4gICAgICAgIHJlamVjdCgpO1xyXG4gICAgICB9KTtcclxuICAgICAgeG1saHR0cC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIHRoaXMuX2hpZGVMb2FkaW5nTWFzaygpO1xyXG4gICAgICB9KTtcclxuICAgICAgaWYgKG1ldGhvZCA9PT0gJ0dFVCcpIHtcclxuICAgICAgICB4bWxodHRwLnNlbmQoKTtcclxuICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09ICdQT1NUJykge1xyXG4gICAgICAgIHhtbGh0dHAuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5zdXBvcnRlZCBtZXRob2QgY2FsbCFcIik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHByb21pc2UuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIuYmluZCh0aGlzKSk7XHJcbiAgICByZXR1cm4gcHJvbWlzZTtcclxuICB9XHJcblxyXG4gIGxvZ2luQmFzaWNBdXRoKGVtYWlsLCBwYXNzKSB7XHJcbiAgICBsZXQgY2xpZW50ID0gbmV3IEh0dHBDbGllbnQoKTtcclxuICAgIGxldCBlbmNvZGVkRGF0YSA9IHdpbmRvdy5idG9hKGVtYWlsICsgJzonICsgcGFzcyk7XHJcbiAgICBsZXQgcHJvbWlzZSA9IGNsaWVudC5jcmVhdGVSZXF1ZXN0KCd0b2tlbicpXHJcbiAgICAgIC5hc0dldCgpXHJcbiAgICAgIC53aXRoQmFzZVVybCh0aGlzLmF1dGhPcmlnaW4pXHJcbiAgICAgIC53aXRoSGVhZGVyKCdBdXRob3JpemF0aW9uJywgJ0Jhc2ljICcgKyBlbmNvZGVkRGF0YSlcclxuICAgICAgLnNlbmQoKTtcclxuICAgIHByb21pc2UudGhlbih0aGlzLmxvZ2luSGFuZGxlLmJpbmQodGhpcykpXHJcbiAgICBwcm9taXNlLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgIHJldHVybiBwcm9taXNlO1xyXG4gIH1cclxuXHJcbiAgbG9naW5SZXNvdXJjZU93bmVyKGVtYWlsLCBwYXNzLCBjbGllbnRJZCkge1xyXG4gICAgdGhpcy5fc2hvd0xvYWRpbmdNYXNrKCk7XHJcbiAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgZ3JhbnRfdHlwZTogJ3Bhc3N3b3JkJyxcclxuICAgICAgY2xpZW50X2lkOiBjbGllbnRJZCxcclxuICAgICAgdXNlcm5hbWU6IGVtYWlsLFxyXG4gICAgICBwYXNzd29yZDogcGFzc1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgY2xpZW50ID0gbmV3IEh0dHBDbGllbnQoKVxyXG4gICAgICAuY29uZmlndXJlKHggPT4ge1xyXG4gICAgICAgIHgud2l0aEJhc2VVcmwodGhpcy5hdXRoT3JpZ2luKTtcclxuICAgICAgICB4LndpdGhIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHByb21pc2UgPSBjbGllbnQucG9zdCgndG9rZW4nLCAkLnBhcmFtKGRhdGEpKTtcclxuICAgIHByb21pc2UudGhlbih0aGlzLmxvZ2luSGFuZGxlLmJpbmQodGhpcykpXHJcbiAgICBwcm9taXNlLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgIHJldHVybiBwcm9taXNlO1xyXG4gIH1cclxuXHJcbiAgaW5pdEF1dGhIdHRwKHRva2VuKSB7XHJcbiAgICB0aGlzLnRva2VuID0gdG9rZW47XHJcbiAgICB0aGlzLmF1dGhIdHRwID0gbmV3IEh0dHBDbGllbnQoKS5jb25maWd1cmUoeCA9PiB7XHJcbiAgICAgIHgud2l0aEJhc2VVcmwodGhpcy5vcmlnaW4pO1xyXG4gICAgICB4LndpdGhIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCBgQmVhcmVyICR7dGhpcy50b2tlbn1gKTtcclxuICAgICAgeC53aXRoSGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0QXV0aEh0dHBGb3IoaG9zdE5hbWUpIHtcclxuICAgIGxldCBhdXRoSHR0cCA9IG5ldyBIdHRwQ2xpZW50KCkuY29uZmlndXJlKHggPT4ge1xyXG4gICAgICB4LndpdGhCYXNlVXJsKHRoaXMuaG9zdHNbaG9zdE5hbWVdKTtcclxuICAgICAgeC53aXRoSGVhZGVyKCdBdXRob3JpemF0aW9uJywgYEJlYXJlciAke3RoaXMudG9rZW59YCk7XHJcbiAgICAgIHgud2l0aEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gYXV0aEh0dHA7XHJcbiAgfVxyXG5cclxuICBfY29udmVydFRvQXJyYXkodmFsdWUpIHtcclxuICAgIGxldCByZXN1bHQgPSB2YWx1ZSB8fCBbXTtcclxuICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gcmVzdWx0LnNwbGl0KCcsJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIGxvZ2luSGFuZGxlKHJlc3BvbnNlKSB7XHJcbiAgICB0aGlzLl9oaWRlTG9hZGluZ01hc2soKTtcclxuICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlc3BvbnNlLnJlc3BvbnNlKTtcclxuICAgIGxldCB0b2tlbiA9IGRhdGEuYWNjZXNzX3Rva2VuO1xyXG4gICAgdGhpcy5pbml0QXV0aEh0dHAodG9rZW4pO1xyXG5cclxuICAgIGxldCBjbGFpbXMgPSBkYXRhLnVzZXJDbGFpbXMgfHwgW107XHJcbiAgICBpZiAodHlwZW9mIGNsYWltcyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgY2xhaW1zID0gSlNPTi5wYXJzZShjbGFpbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2Vzc2lvbi5zZXRVc2VyKHtcclxuICAgICAgdG9rZW46IHRva2VuLFxyXG4gICAgICB1c2VyTmFtZTogZGF0YS51c2VyTmFtZSB8fCAncGxlYXNlIGdpdmUgbWUgYSBuYW1lIScsXHJcbiAgICAgIHVzZXJDbGFpbXM6IGNsYWltcyxcclxuICAgICAgdXNlclJvbGVzOiB0aGlzLl9jb252ZXJ0VG9BcnJheShkYXRhLnVzZXJSb2xlcyksXHJcbiAgICAgIHVzZXJBY2Nlc3NSaWdodHM6IHRoaXMuX2NvbnZlcnRUb0FycmF5KGRhdGEudXNlckFjY2Vzc1JpZ2h0cylcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gVE9ETzogdXNlIGFzIGluIGF1cmVsaWEtdmFsaWRhdGlvblxyXG4gIGVycm9ySGFuZGxlcihyZXNwb25zZSkge1xyXG4gICAgdGhpcy5faGlkZUxvYWRpbmdNYXNrKCk7XHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gNDAxKSB7XHJcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4odGhpcy5sb2NhbGUudHJhbnNsYXRlKCdzZXNzaW9uVGltZWRPdXQnKSk7XHJcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IDQwMykge1xyXG4gICAgICB0aGlzLmxvZ2dlci53YXJuKHRoaXMubG9jYWxlLnRyYW5zbGF0ZSgnYWNjZXNzRGVuaWVkJykpO1xyXG4gICAgfSBlbHNlIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09PSA1MDApIHtcclxuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IodGhpcy5sb2NhbGUudHJhbnNsYXRlKCdpbnRlcm5hbFNlcnZlckVycm9yJykpO1xyXG4gICAgfSBlbHNlIGlmIChyZXNwb25zZS50aW1lb3V0ID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKHRoaXMubG9jYWxlLnRyYW5zbGF0ZSgncmVxdWVzdFRpbWVvdXQnKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcih0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ2Vycm9ySGFwcGVuZCcpKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
