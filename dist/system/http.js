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
//# sourceMappingURL=data:application/json;base64,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QUkiLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtb3NoZW5za3kgb24gNi8xNi8xNS5cbiAqL1xuaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tICdhdXJlbGlhLWh0dHAtY2xpZW50JztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1kZXBlbmRlbmN5LWluamVjdGlvbic7XG5pbXBvcnQge1Nlc3Npb259IGZyb20gJy4vc2Vzc2lvbic7XG5pbXBvcnQge0xvZ2dlcn0gZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHtMb2NhbGV9IGZyb20gJy4vbG9jYWxlJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQge0xvYWRpbmdNYXNrfSBmcm9tICcuL2xvYWRpbmctbWFzay9sb2FkaW5nLW1hc2snO1xuXG5AaW5qZWN0KFNlc3Npb24sIExvZ2dlciwgTG9hZGluZ01hc2spXG5leHBvcnQgY2xhc3MgSHR0cCB7XG4gIGNvbnN0cnVjdG9yKHNlc3Npb24sIGxvZ2dlciwgbG9hZGluZ01hc2spIHtcbiAgICB0aGlzLnNlc3Npb24gPSBzZXNzaW9uO1xuICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgIHRoaXMubG9hZGluZ01hc2sgPSBsb2FkaW5nTWFzaztcbiAgICB0aGlzLmF1dGhIdHRwID0gdW5kZWZpbmVkO1xuICAgIHRoaXMubG9jYWxlID0gTG9jYWxlLlJlcG9zaXRvcnkuZGVmYXVsdDtcblxuICAgIHRoaXMucmVxdWVzdHNDb3VudCA9IDA7XG4gICAgdGhpcy5ob3N0ID0gQ29uZmlnLmh0dHBPcHRzLnNlcnZpY2VIb3N0O1xuICAgIHRoaXMub3JpZ2luID0gdGhpcy5ob3N0ICsgQ29uZmlnLmh0dHBPcHRzLnNlcnZpY2VBcGlQcmVmaXg7XG4gICAgdGhpcy5hdXRoT3JpZ2luID0gQ29uZmlnLmh0dHBPcHRzLmF1dGhIb3N0O1xuICAgIHRoaXMuaG9zdHMgPSBDb25maWcuaHR0cE9wdHMuaG9zdHMgfHwge307XG4gICAgdGhpcy5sb2FkaW5nTWFza0RlbGF5ID0gQ29uZmlnLmh0dHBPcHRzLmxvYWRpbmdNYXNrRGVsYXkgfHwgMTAwMDtcbiAgICB0aGlzLnJlcXVlc3RUaW1lb3V0ID0gQ29uZmlnLmh0dHBPcHRzLnJlcXVlc3RUaW1lb3V0O1xuXG4gICAgaWYgKHRoaXMuc2Vzc2lvbi51c2VyUmVtZW1iZXJlZCgpKSB7XG4gICAgICB0aGlzLmluaXRBdXRoSHR0cCh0aGlzLnNlc3Npb24ucmVtZW1iZXJlZFRva2VuKCkpO1xuICAgIH1cbiAgfVxuXG4gIF9zaG93TG9hZGluZ01hc2soKSB7XG4gICAgdGhpcy5yZXF1ZXN0c0NvdW50ICs9IDE7XG4gICAgaWYgKHRoaXMucmVxdWVzdHNDb3VudCA9PT0gMSkge1xuICAgICAgaWYgKHRoaXMubG9hZGluZ01hc2tEZWxheSA+IDApIHtcbiAgICAgICAgdGhpcy5fcXVlcnlUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMubG9hZGluZ01hc2suc2hvdygpXG4gICAgICAgIH0sIHRoaXMubG9hZGluZ01hc2tEZWxheSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvYWRpbmdNYXNrLnNob3coKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfaGlkZUxvYWRpbmdNYXNrKCkge1xuICAgIHRoaXMucmVxdWVzdHNDb3VudCAtPSAxO1xuICAgIGlmICh0aGlzLnJlcXVlc3RzQ291bnQgPD0gMCkge1xuICAgICAgaWYgKHRoaXMuX3F1ZXJ5VGltZW91dCkge1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuX3F1ZXJ5VGltZW91dCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubG9hZGluZ01hc2suaGlkZSgpO1xuICAgICAgdGhpcy5yZXF1ZXN0c0NvdW50ID0gMDtcbiAgICB9XG4gIH1cblxuICBnZXQodXJsLCBkYXRhKSB7XG4gICAgdGhpcy5fc2hvd0xvYWRpbmdNYXNrKCk7XG4gICAgbGV0IHVybFdpdGhQcm9wcyA9IHVybDtcbiAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsZXQgcHJvcHMgPSBPYmplY3Qua2V5cyhkYXRhKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBsZXQgZCA9IGRhdGFba2V5XTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZCkpIHtcbiAgICAgICAgICByZXR1cm4gZC5tYXAodmFsdWUgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICcnICsga2V5ICsgJz0nICsgdmFsdWVcbiAgICAgICAgICB9KS5qb2luKCcmJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuICcnICsga2V5ICsgJz0nICsgZGF0YVtrZXldO1xuICAgICAgICB9XG4gICAgICB9KS5qb2luKCcmJyk7XG5cbiAgICAgIHVybFdpdGhQcm9wcyArPSAnPycgKyBwcm9wcztcbiAgICB9XG4gICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuYXV0aEh0dHAuZ2V0KHVybFdpdGhQcm9wcykudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICB0aGlzLl9oaWRlTG9hZGluZ01hc2soKTtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlc3BvbnNlLnJlc3BvbnNlKVxuICAgIH0pO1xuICAgIHByb21pc2UuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBwb3N0KHVybCwgY29udGVudCA9IHt9KSB7XG4gICAgdGhpcy5fc2hvd0xvYWRpbmdNYXNrKCk7XG4gICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuYXV0aEh0dHAucG9zdCh1cmwsIGNvbnRlbnQpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgdGhpcy5faGlkZUxvYWRpbmdNYXNrKCk7XG4gICAgICBpZiAocmVzcG9uc2UucmVzcG9uc2UgIT09IFwiXCIpIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzcG9uc2UucmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHByb21pc2UuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG5cbiAgcHV0KHVybCwgY29udGVudCA9IHt9KSB7XG4gICAgdGhpcy5fc2hvd0xvYWRpbmdNYXNrKCk7XG4gICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuYXV0aEh0dHAucHV0KHVybCwgY29udGVudCkudGhlbihyZXNwb25zZSA9PiB0aGlzLl9oaWRlTG9hZGluZ01hc2soKSk7XG4gICAgcHJvbWlzZS5jYXRjaCh0aGlzLmVycm9ySGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGRlbGV0ZSh1cmwpIHtcbiAgICBjb25zdCBwcm9taXNlID0gdGhpcy5hdXRoSHR0cC5kZWxldGUodXJsKS50aGVuKHJlc3BvbnNlID0+IHRoaXMuX2hpZGVMb2FkaW5nTWFzaygpKTtcbiAgICBwcm9taXNlLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgbXVsdGlwYXJ0Rm9ybVBvc3QodXJsLCBkYXRhKSB7XG4gICAgdmFyIHJlcXVlc3RVcmwgPSB0aGlzLm9yaWdpbiArIHVybDtcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBhcnRGb3JtKHJlcXVlc3RVcmwsIGRhdGEsICdQT1NUJyk7XG4gIH1cblxuICBtdWx0aXBhcnRGb3JtUHV0KHVybCwgZGF0YSkge1xuICAgIHZhciByZXF1ZXN0VXJsID0gdGhpcy5vcmlnaW4gKyB1cmw7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwYXJ0Rm9ybShyZXF1ZXN0VXJsLCBkYXRhLCAnUFVUJyk7XG4gIH1cblxuICBtdWx0aXBhcnRGb3JtKHVybCwgZGF0YSwgbWV0aG9kKSB7XG4gICAgdGhpcy5fc2hvd0xvYWRpbmdNYXNrKCk7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciByZXEgPSAkLmFqYXgoe1xuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiBkYXRhLFxuICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgICAgdHlwZTogbWV0aG9kLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICByZXEuZG9uZShyZXNvbHZlKTtcbiAgICAgIHJlcS5mYWlsKHJlamVjdCk7XG4gICAgICBzZWxmLl9oaWRlTG9hZGluZ01hc2soKTtcbiAgICB9KS5jYXRjaCh0aGlzLmVycm9ySGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHBvc3REb3dubG9hZEZpbGUodXJsLCBkYXRhKSB7XG4gICAgcmV0dXJuIHRoaXMuZG93bmxvYWRGaWxlKHVybCwgJ1BPU1QnLCBkYXRhKTtcbiAgfVxuXG4gIGdldERvd25sb2FkRmlsZSh1cmwpIHtcbiAgICByZXR1cm4gdGhpcy5kb3dubG9hZEZpbGUodXJsLCAnR0VUJyk7XG4gIH1cblxuICBkb3dubG9hZEZpbGUodXJsLCBtZXRob2QsIGRhdGEpIHtcbiAgICB0aGlzLl9zaG93TG9hZGluZ01hc2soKTtcbiAgICBjb25zdCB1cmxBZGRyZXNzID0gdGhpcy5vcmlnaW4gKyB1cmw7XG4gICAgY29uc3QgYXV0aEhlYWRlclZhbHVlID0gYEJlYXJlciAke3RoaXMudG9rZW59YDtcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgeG1saHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgeG1saHR0cC5vcGVuKG1ldGhvZCwgdXJsQWRkcmVzcywgdHJ1ZSk7XG4gICAgICB4bWxodHRwLnRpbWVvdXQgPSB0aGlzLnJlcXVlc3RUaW1lb3V0O1xuICAgICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04Jyk7XG4gICAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCBhdXRoSGVhZGVyVmFsdWUpO1xuICAgICAgeG1saHR0cC5yZXNwb25zZVR5cGUgPSBcImJsb2JcIjtcblxuICAgICAgeG1saHR0cC5vbmxvYWQgPSBmdW5jdGlvbiAob0V2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgcmVqZWN0KHtzdGF0dXNDb2RlOiB0aGlzLnN0YXR1c30pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJsb2IgPSB4bWxodHRwLnJlc3BvbnNlO1xuICAgICAgICBjb25zdCB3aW5kb3dVcmwgPSB3aW5kb3cuVVJMIHx8IHdpbmRvdy53ZWJraXRVUkw7XG4gICAgICAgIGNvbnN0IHVybCA9IHdpbmRvd1VybC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICAgIGNvbnN0IGZpbGVuYW1lID0gdGhpcy5nZXRSZXNwb25zZUhlYWRlcignQ29udGVudC1EaXNwb3NpdGlvbicpLm1hdGNoKC9eYXR0YWNobWVudDsgZmlsZW5hbWU9KC4rKS8pWzFdO1xuXG4gICAgICAgIGNvbnN0IGFuY2hvciA9ICQoJzxhPjwvYT4nKTtcbiAgICAgICAgYW5jaG9yLnByb3AoJ2hyZWYnLCB1cmwpO1xuICAgICAgICBhbmNob3IucHJvcCgnZG93bmxvYWQnLCBmaWxlbmFtZSk7XG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoYW5jaG9yKTtcbiAgICAgICAgYW5jaG9yLmdldCgwKS5jbGljaygpO1xuICAgICAgICB3aW5kb3dVcmwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gICAgICAgIGFuY2hvci5yZW1vdmUoKTtcbiAgICAgIH07XG5cbiAgICAgIHhtbGh0dHAub250aW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZWplY3Qoe3RpbWVvdXQ6IHRydWV9KVxuICAgICAgfTtcblxuICAgICAgeG1saHR0cC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgKCkgPT4ge1xuICAgICAgICByZWplY3QoKTtcbiAgICAgIH0pO1xuICAgICAgeG1saHR0cC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgdGhpcy5faGlkZUxvYWRpbmdNYXNrKCk7XG4gICAgICB9KTtcbiAgICAgIGlmIChtZXRob2QgPT09ICdHRVQnKSB7XG4gICAgICAgIHhtbGh0dHAuc2VuZCgpO1xuICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09ICdQT1NUJykge1xuICAgICAgICB4bWxodHRwLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5zdXBvcnRlZCBtZXRob2QgY2FsbCFcIik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBwcm9taXNlLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgbG9naW5CYXNpY0F1dGgoZW1haWwsIHBhc3MpIHtcbiAgICBsZXQgY2xpZW50ID0gbmV3IEh0dHBDbGllbnQoKTtcbiAgICBsZXQgZW5jb2RlZERhdGEgPSB3aW5kb3cuYnRvYShlbWFpbCArICc6JyArIHBhc3MpO1xuICAgIGxldCBwcm9taXNlID0gY2xpZW50LmNyZWF0ZVJlcXVlc3QoJ3Rva2VuJylcbiAgICAgIC5hc0dldCgpXG4gICAgICAud2l0aEJhc2VVcmwodGhpcy5hdXRoT3JpZ2luKVxuICAgICAgLndpdGhIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArIGVuY29kZWREYXRhKVxuICAgICAgLnNlbmQoKTtcbiAgICBwcm9taXNlLnRoZW4odGhpcy5sb2dpbkhhbmRsZS5iaW5kKHRoaXMpKVxuICAgIHByb21pc2UuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGxvZ2luUmVzb3VyY2VPd25lcihlbWFpbCwgcGFzcywgY2xpZW50SWQpIHtcbiAgICB0aGlzLl9zaG93TG9hZGluZ01hc2soKTtcbiAgICBsZXQgZGF0YSA9IHtcbiAgICAgIGdyYW50X3R5cGU6ICdwYXNzd29yZCcsXG4gICAgICBjbGllbnRfaWQ6IGNsaWVudElkLFxuICAgICAgdXNlcm5hbWU6IGVtYWlsLFxuICAgICAgcGFzc3dvcmQ6IHBhc3NcbiAgICB9O1xuXG4gICAgbGV0IGNsaWVudCA9IG5ldyBIdHRwQ2xpZW50KClcbiAgICAgIC5jb25maWd1cmUoeCA9PiB7XG4gICAgICAgIHgud2l0aEJhc2VVcmwodGhpcy5hdXRoT3JpZ2luKTtcbiAgICAgICAgeC53aXRoSGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpO1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBwcm9taXNlID0gY2xpZW50LnBvc3QoJ3Rva2VuJywgJC5wYXJhbShkYXRhKSk7XG4gICAgcHJvbWlzZS50aGVuKHRoaXMubG9naW5IYW5kbGUuYmluZCh0aGlzKSlcbiAgICBwcm9taXNlLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBpbml0QXV0aEh0dHAodG9rZW4pIHtcbiAgICB0aGlzLnRva2VuID0gdG9rZW47XG4gICAgdGhpcy5hdXRoSHR0cCA9IG5ldyBIdHRwQ2xpZW50KCkuY29uZmlndXJlKHggPT4ge1xuICAgICAgeC53aXRoQmFzZVVybCh0aGlzLm9yaWdpbik7XG4gICAgICB4LndpdGhIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCBgQmVhcmVyICR7dGhpcy50b2tlbn1gKTtcbiAgICAgIHgud2l0aEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgfSk7XG4gIH1cblxuICBnZXRBdXRoSHR0cEZvcihob3N0TmFtZSkge1xuICAgIGxldCBhdXRoSHR0cCA9IG5ldyBIdHRwQ2xpZW50KCkuY29uZmlndXJlKHggPT4ge1xuICAgICAgeC53aXRoQmFzZVVybCh0aGlzLmhvc3RzW2hvc3ROYW1lXSk7XG4gICAgICB4LndpdGhIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCBgQmVhcmVyICR7dGhpcy50b2tlbn1gKTtcbiAgICAgIHgud2l0aEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYXV0aEh0dHA7XG4gIH1cblxuICBfY29udmVydFRvQXJyYXkodmFsdWUpIHtcbiAgICBsZXQgcmVzdWx0ID0gdmFsdWUgfHwgW107XG4gICAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gcmVzdWx0LnNwbGl0KCcsJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGxvZ2luSGFuZGxlKHJlc3BvbnNlKSB7XG4gICAgdGhpcy5faGlkZUxvYWRpbmdNYXNrKCk7XG4gICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UocmVzcG9uc2UucmVzcG9uc2UpO1xuICAgIGxldCB0b2tlbiA9IGRhdGEuYWNjZXNzX3Rva2VuO1xuICAgIHRoaXMuaW5pdEF1dGhIdHRwKHRva2VuKTtcblxuICAgIGxldCBjbGFpbXMgPSBkYXRhLnVzZXJDbGFpbXMgfHwgW107XG4gICAgaWYgKHR5cGVvZiBjbGFpbXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjbGFpbXMgPSBKU09OLnBhcnNlKGNsYWltcyk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXNzaW9uLnNldFVzZXIoe1xuICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgdXNlck5hbWU6IGRhdGEudXNlck5hbWUgfHwgJ3BsZWFzZSBnaXZlIG1lIGEgbmFtZSEnLFxuICAgICAgdXNlckNsYWltczogY2xhaW1zLFxuICAgICAgdXNlclJvbGVzOiB0aGlzLl9jb252ZXJ0VG9BcnJheShkYXRhLnVzZXJSb2xlcyksXG4gICAgICB1c2VyQWNjZXNzUmlnaHRzOiB0aGlzLl9jb252ZXJ0VG9BcnJheShkYXRhLnVzZXJBY2Nlc3NSaWdodHMpXG4gICAgfSk7XG4gIH1cblxuICAvLyBUT0RPOiB1c2UgYXMgaW4gYXVyZWxpYS12YWxpZGF0aW9uXG4gIGVycm9ySGFuZGxlcihyZXNwb25zZSkge1xuICAgIHRoaXMuX2hpZGVMb2FkaW5nTWFzaygpO1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09PSA0MDEpIHtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4odGhpcy5sb2NhbGUudHJhbnNsYXRlKCdzZXNzaW9uVGltZWRPdXQnKSk7XG4gICAgfSBlbHNlIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09PSA0MDMpIHtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4odGhpcy5sb2NhbGUudHJhbnNsYXRlKCdhY2Nlc3NEZW5pZWQnKSk7XG4gICAgfSBlbHNlIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09PSA1MDApIHtcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKHRoaXMubG9jYWxlLnRyYW5zbGF0ZSgnaW50ZXJuYWxTZXJ2ZXJFcnJvcicpKTtcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnRpbWVvdXQgPT09IHRydWUpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKHRoaXMubG9jYWxlLnRyYW5zbGF0ZSgncmVxdWVzdFRpbWVvdXQnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKHRoaXMubG9jYWxlLnRyYW5zbGF0ZSgnZXJyb3JIYXBwZW5kJykpO1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9