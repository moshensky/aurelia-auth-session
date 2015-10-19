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
              x.withHeader('Content-Type', 'application/x-www-form-urlencoded');
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
              x.withHeader('Content-Type', 'application/json');
            });
          }
        }, {
          key: 'getAuthHttpFor',
          value: function getAuthHttpFor(hostName) {
            var _this9 = this;

            var authHttp = new HttpClient().configure(function (x) {
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

        Http = inject(Session, Logger, LoadingMask)(Http) || Http;
        return Http;
      })();

      _export('Http', Http);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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TUFBTSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7YUFDNUQsTUFBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssR0FBRyxFQUFFO0FBQ3RDLGtCQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2FBQ3pELE1BQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxLQUFLLEdBQUcsRUFBRTtBQUN0QyxrQkFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO2FBQ2pFLE1BQU0sSUFBSSxRQUFRLENBQUMsT0FBTyxLQUFLLElBQUksRUFBRTtBQUNwQyxrQkFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2FBQzVELE1BQU07QUFDTCxrQkFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQzthQUMxRDtXQUNGOzs7QUE1UlUsWUFBSSxHQURoQixNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FDeEIsSUFBSSxLQUFKLElBQUk7ZUFBSixJQUFJOzs7c0JBQUosSUFBSSIsImZpbGUiOiJodHRwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1vc2hlbnNreSBvbiA2LzE2LzE1LlxuICovXG5pbXBvcnQge0h0dHBDbGllbnR9IGZyb20gJ2F1cmVsaWEtaHR0cC1jbGllbnQnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWRlcGVuZGVuY3ktaW5qZWN0aW9uJztcbmltcG9ydCB7U2Vzc2lvbn0gZnJvbSAnLi9zZXNzaW9uJztcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQge0xvY2FsZX0gZnJvbSAnLi9sb2NhbGUnO1xuaW1wb3J0IHtDb25maWd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7TG9hZGluZ01hc2t9IGZyb20gJy4vbG9hZGluZy1tYXNrL2xvYWRpbmctbWFzayc7XG5cbkBpbmplY3QoU2Vzc2lvbiwgTG9nZ2VyLCBMb2FkaW5nTWFzaylcbmV4cG9ydCBjbGFzcyBIdHRwIHtcbiAgY29uc3RydWN0b3Ioc2Vzc2lvbiwgbG9nZ2VyLCBsb2FkaW5nTWFzaykge1xuICAgIHRoaXMuc2Vzc2lvbiA9IHNlc3Npb247XG4gICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gICAgdGhpcy5sb2FkaW5nTWFzayA9IGxvYWRpbmdNYXNrO1xuICAgIHRoaXMuYXV0aEh0dHAgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5sb2NhbGUgPSBMb2NhbGUuUmVwb3NpdG9yeS5kZWZhdWx0O1xuXG4gICAgdGhpcy5yZXF1ZXN0c0NvdW50ID0gMDtcbiAgICB0aGlzLmhvc3QgPSBDb25maWcuaHR0cE9wdHMuc2VydmljZUhvc3Q7XG4gICAgdGhpcy5vcmlnaW4gPSB0aGlzLmhvc3QgKyBDb25maWcuaHR0cE9wdHMuc2VydmljZUFwaVByZWZpeDtcbiAgICB0aGlzLmF1dGhPcmlnaW4gPSBDb25maWcuaHR0cE9wdHMuYXV0aEhvc3Q7XG4gICAgdGhpcy5ob3N0cyA9IENvbmZpZy5odHRwT3B0cy5ob3N0cyB8fCB7fTtcbiAgICB0aGlzLmxvYWRpbmdNYXNrRGVsYXkgPSBDb25maWcuaHR0cE9wdHMubG9hZGluZ01hc2tEZWxheSB8fCAxMDAwO1xuICAgIHRoaXMucmVxdWVzdFRpbWVvdXQgPSBDb25maWcuaHR0cE9wdHMucmVxdWVzdFRpbWVvdXQ7XG5cbiAgICBpZiAodGhpcy5zZXNzaW9uLnVzZXJSZW1lbWJlcmVkKCkpIHtcbiAgICAgIHRoaXMuaW5pdEF1dGhIdHRwKHRoaXMuc2Vzc2lvbi5yZW1lbWJlcmVkVG9rZW4oKSk7XG4gICAgfVxuICB9XG5cbiAgX3Nob3dMb2FkaW5nTWFzaygpIHtcbiAgICB0aGlzLnJlcXVlc3RzQ291bnQgKz0gMTtcbiAgICBpZiAodGhpcy5yZXF1ZXN0c0NvdW50ID09PSAxKSB7XG4gICAgICBpZiAodGhpcy5sb2FkaW5nTWFza0RlbGF5ID4gMCkge1xuICAgICAgICB0aGlzLl9xdWVyeVRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2FkaW5nTWFzay5zaG93KClcbiAgICAgICAgfSwgdGhpcy5sb2FkaW5nTWFza0RlbGF5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9hZGluZ01hc2suc2hvdygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9oaWRlTG9hZGluZ01hc2soKSB7XG4gICAgdGhpcy5yZXF1ZXN0c0NvdW50IC09IDE7XG4gICAgaWYgKHRoaXMucmVxdWVzdHNDb3VudCA8PSAwKSB7XG4gICAgICBpZiAodGhpcy5fcXVlcnlUaW1lb3V0KSB7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5fcXVlcnlUaW1lb3V0KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sb2FkaW5nTWFzay5oaWRlKCk7XG4gICAgICB0aGlzLnJlcXVlc3RzQ291bnQgPSAwO1xuICAgIH1cbiAgfVxuXG4gIGdldCh1cmwsIGRhdGEpIHtcbiAgICB0aGlzLl9zaG93TG9hZGluZ01hc2soKTtcbiAgICBsZXQgdXJsV2l0aFByb3BzID0gdXJsO1xuICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxldCBwcm9wcyA9IE9iamVjdC5rZXlzKGRhdGEpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHJldHVybiAnJyArIGtleSArICc9JyArIGRhdGFba2V5XTtcbiAgICAgIH0pLmpvaW4oJyYnKTtcblxuICAgICAgdXJsV2l0aFByb3BzICs9ICc/JyArIHByb3BzO1xuICAgIH1cbiAgICBjb25zdCBwcm9taXNlID0gdGhpcy5hdXRoSHR0cC5nZXQodXJsV2l0aFByb3BzKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIHRoaXMuX2hpZGVMb2FkaW5nTWFzaygpO1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzcG9uc2UucmVzcG9uc2UpXG4gICAgfSk7XG4gICAgcHJvbWlzZS5jYXRjaCh0aGlzLmVycm9ySGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIHBvc3QodXJsLCBjb250ZW50ID0ge30pIHtcbiAgICB0aGlzLl9zaG93TG9hZGluZ01hc2soKTtcbiAgICBjb25zdCBwcm9taXNlID0gdGhpcy5hdXRoSHR0cC5wb3N0KHVybCwgY29udGVudCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICB0aGlzLl9oaWRlTG9hZGluZ01hc2soKTtcbiAgICAgIGlmIChyZXNwb25zZS5yZXNwb25zZSAhPT0gXCJcIikge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXNwb25zZS5yZXNwb25zZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcHJvbWlzZS5jYXRjaCh0aGlzLmVycm9ySGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cblxuICBwdXQodXJsLCBjb250ZW50ID0ge30pIHtcbiAgICB0aGlzLl9zaG93TG9hZGluZ01hc2soKTtcbiAgICBjb25zdCBwcm9taXNlID0gdGhpcy5hdXRoSHR0cC5wdXQodXJsLCBjb250ZW50KS50aGVuKHJlc3BvbnNlID0+IHRoaXMuX2hpZGVMb2FkaW5nTWFzaygpKTtcbiAgICBwcm9taXNlLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgZGVsZXRlKHVybCkge1xuICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmF1dGhIdHRwLmRlbGV0ZSh1cmwpLnRoZW4ocmVzcG9uc2UgPT4gdGhpcy5faGlkZUxvYWRpbmdNYXNrKCkpO1xuICAgIHByb21pc2UuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBtdWx0aXBhcnRGb3JtUG9zdCh1cmwsIGRhdGEpIHtcbiAgICB2YXIgcmVxdWVzdFVybCA9IHRoaXMub3JpZ2luICsgdXJsO1xuICAgIHJldHVybiB0aGlzLm11bHRpcGFydEZvcm0ocmVxdWVzdFVybCwgZGF0YSwgJ1BPU1QnKTtcbiAgfVxuXG4gIG11bHRpcGFydEZvcm1QdXQodXJsLCBkYXRhKSB7XG4gICAgdmFyIHJlcXVlc3RVcmwgPSB0aGlzLm9yaWdpbiArIHVybDtcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBhcnRGb3JtKHJlcXVlc3RVcmwsIGRhdGEsICdQVVQnKTtcbiAgfVxuXG4gIG11bHRpcGFydEZvcm0odXJsLCBkYXRhLCBtZXRob2QpIHtcbiAgICB0aGlzLl9zaG93TG9hZGluZ01hc2soKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHJlcSA9ICQuYWpheCh7XG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGEsXG4gICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgICB0eXBlOiBtZXRob2QsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdGhpcy50b2tlblxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlcS5kb25lKHJlc29sdmUpO1xuICAgICAgcmVxLmZhaWwocmVqZWN0KTtcbiAgICAgIHNlbGYuX2hpZGVMb2FkaW5nTWFzaygpO1xuICAgIH0pLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgcG9zdERvd25sb2FkRmlsZSh1cmwsIGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5kb3dubG9hZEZpbGUodXJsLCAnUE9TVCcsIGRhdGEpO1xuICB9XG5cbiAgZ2V0RG93bmxvYWRGaWxlKHVybCkge1xuICAgIHJldHVybiB0aGlzLmRvd25sb2FkRmlsZSh1cmwsICdHRVQnKTtcbiAgfVxuXG4gIGRvd25sb2FkRmlsZSh1cmwsIG1ldGhvZCwgZGF0YSkge1xuICAgIHRoaXMuX3Nob3dMb2FkaW5nTWFzaygpO1xuICAgIGNvbnN0IHVybEFkZHJlc3MgPSB0aGlzLm9yaWdpbiArIHVybDtcbiAgICBjb25zdCBhdXRoSGVhZGVyVmFsdWUgPSBgQmVhcmVyICR7dGhpcy50b2tlbn1gO1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCB4bWxodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICB4bWxodHRwLm9wZW4obWV0aG9kLCB1cmxBZGRyZXNzLCB0cnVlKTtcbiAgICAgIHhtbGh0dHAudGltZW91dCA9IHRoaXMucmVxdWVzdFRpbWVvdXQ7XG4gICAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLTgnKTtcbiAgICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcignQXV0aG9yaXphdGlvbicsIGF1dGhIZWFkZXJWYWx1ZSk7XG4gICAgICB4bWxodHRwLnJlc3BvbnNlVHlwZSA9IFwiYmxvYlwiO1xuXG4gICAgICB4bWxodHRwLm9ubG9hZCA9IGZ1bmN0aW9uIChvRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICByZWplY3Qoe3N0YXR1c0NvZGU6IHRoaXMuc3RhdHVzfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYmxvYiA9IHhtbGh0dHAucmVzcG9uc2U7XG4gICAgICAgIGNvbnN0IHdpbmRvd1VybCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTDtcbiAgICAgICAgY29uc3QgdXJsID0gd2luZG93VXJsLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgICAgY29uc3QgZmlsZW5hbWUgPSB0aGlzLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LURpc3Bvc2l0aW9uJykubWF0Y2goL15hdHRhY2htZW50OyBmaWxlbmFtZT0oLispLylbMV07XG5cbiAgICAgICAgY29uc3QgYW5jaG9yID0gJCgnPGE+PC9hPicpO1xuICAgICAgICBhbmNob3IucHJvcCgnaHJlZicsIHVybCk7XG4gICAgICAgIGFuY2hvci5wcm9wKCdkb3dubG9hZCcsIGZpbGVuYW1lKTtcbiAgICAgICAgJCgnYm9keScpLmFwcGVuZChhbmNob3IpO1xuICAgICAgICBhbmNob3IuZ2V0KDApLmNsaWNrKCk7XG4gICAgICAgIHdpbmRvd1VybC5yZXZva2VPYmplY3RVUkwodXJsKTtcbiAgICAgICAgYW5jaG9yLnJlbW92ZSgpO1xuICAgICAgfTtcblxuICAgICAgeG1saHR0cC5vbnRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlamVjdCh7dGltZW91dDogdHJ1ZX0pXG4gICAgICB9O1xuXG4gICAgICB4bWxodHRwLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCAoKSA9PiB7XG4gICAgICAgIHJlamVjdCgpO1xuICAgICAgfSk7XG4gICAgICB4bWxodHRwLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB0aGlzLl9oaWRlTG9hZGluZ01hc2soKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKG1ldGhvZCA9PT0gJ0dFVCcpIHtcbiAgICAgICAgeG1saHR0cC5zZW5kKCk7XG4gICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgICAgIHhtbGh0dHAuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnN1cG9ydGVkIG1ldGhvZCBjYWxsIVwiKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHByb21pc2UuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBsb2dpbkJhc2ljQXV0aChlbWFpbCwgcGFzcykge1xuICAgIGxldCBjbGllbnQgPSBuZXcgSHR0cENsaWVudCgpO1xuICAgIGxldCBlbmNvZGVkRGF0YSA9IHdpbmRvdy5idG9hKGVtYWlsICsgJzonICsgcGFzcyk7XG4gICAgbGV0IHByb21pc2UgPSBjbGllbnQuY3JlYXRlUmVxdWVzdCgndG9rZW4nKVxuICAgICAgLmFzR2V0KClcbiAgICAgIC53aXRoQmFzZVVybCh0aGlzLmF1dGhPcmlnaW4pXG4gICAgICAud2l0aEhlYWRlcignQXV0aG9yaXphdGlvbicsICdCYXNpYyAnICsgZW5jb2RlZERhdGEpXG4gICAgICAuc2VuZCgpO1xuICAgIHByb21pc2UudGhlbih0aGlzLmxvZ2luSGFuZGxlLmJpbmQodGhpcykpXG4gICAgcHJvbWlzZS5jYXRjaCh0aGlzLmVycm9ySGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgbG9naW5SZXNvdXJjZU93bmVyKGVtYWlsLCBwYXNzLCBjbGllbnRJZCkge1xuICAgIHRoaXMuX3Nob3dMb2FkaW5nTWFzaygpO1xuICAgIGxldCBkYXRhID0ge1xuICAgICAgZ3JhbnRfdHlwZTogJ3Bhc3N3b3JkJyxcbiAgICAgIGNsaWVudF9pZDogY2xpZW50SWQsXG4gICAgICB1c2VybmFtZTogZW1haWwsXG4gICAgICBwYXNzd29yZDogcGFzc1xuICAgIH07XG5cbiAgICBsZXQgY2xpZW50ID0gbmV3IEh0dHBDbGllbnQoKVxuICAgICAgLmNvbmZpZ3VyZSh4ID0+IHtcbiAgICAgICAgeC53aXRoQmFzZVVybCh0aGlzLmF1dGhPcmlnaW4pO1xuICAgICAgICB4LndpdGhIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XG4gICAgICB9KTtcblxuICAgIGNvbnN0IHByb21pc2UgPSBjbGllbnQucG9zdCgndG9rZW4nLCAkLnBhcmFtKGRhdGEpKTtcbiAgICBwcm9taXNlLnRoZW4odGhpcy5sb2dpbkhhbmRsZS5iaW5kKHRoaXMpKVxuICAgIHByb21pc2UuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGluaXRBdXRoSHR0cCh0b2tlbikge1xuICAgIHRoaXMudG9rZW4gPSB0b2tlbjtcbiAgICB0aGlzLmF1dGhIdHRwID0gbmV3IEh0dHBDbGllbnQoKS5jb25maWd1cmUoeCA9PiB7XG4gICAgICB4LndpdGhCYXNlVXJsKHRoaXMub3JpZ2luKTtcbiAgICAgIHgud2l0aEhlYWRlcignQXV0aG9yaXphdGlvbicsIGBCZWFyZXIgJHt0aGlzLnRva2VufWApO1xuICAgICAgeC53aXRoSGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEF1dGhIdHRwRm9yKGhvc3ROYW1lKSB7XG4gICAgbGV0IGF1dGhIdHRwID0gbmV3IEh0dHBDbGllbnQoKS5jb25maWd1cmUoeCA9PiB7XG4gICAgICB4LndpdGhCYXNlVXJsKHRoaXMuaG9zdHNbaG9zdE5hbWVdKTtcbiAgICAgIHgud2l0aEhlYWRlcignQXV0aG9yaXphdGlvbicsIGBCZWFyZXIgJHt0aGlzLnRva2VufWApO1xuICAgICAgeC53aXRoSGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBhdXRoSHR0cDtcbiAgfVxuXG4gIF9jb252ZXJ0VG9BcnJheSh2YWx1ZSkge1xuICAgIGxldCByZXN1bHQgPSB2YWx1ZSB8fCBbXTtcbiAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiByZXN1bHQuc3BsaXQoJywnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgbG9naW5IYW5kbGUocmVzcG9uc2UpIHtcbiAgICB0aGlzLl9oaWRlTG9hZGluZ01hc2soKTtcbiAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShyZXNwb25zZS5yZXNwb25zZSk7XG4gICAgbGV0IHRva2VuID0gZGF0YS5hY2Nlc3NfdG9rZW47XG4gICAgdGhpcy5pbml0QXV0aEh0dHAodG9rZW4pO1xuXG4gICAgbGV0IGNsYWltcyA9IGRhdGEudXNlckNsYWltcyB8fCBbXTtcbiAgICBpZiAodHlwZW9mIGNsYWltcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNsYWltcyA9IEpTT04ucGFyc2UoY2xhaW1zKTtcbiAgICB9XG5cbiAgICB0aGlzLnNlc3Npb24uc2V0VXNlcih7XG4gICAgICB0b2tlbjogdG9rZW4sXG4gICAgICB1c2VyTmFtZTogZGF0YS51c2VyTmFtZSB8fCAncGxlYXNlIGdpdmUgbWUgYSBuYW1lIScsXG4gICAgICB1c2VyQ2xhaW1zOiBjbGFpbXMsXG4gICAgICB1c2VyUm9sZXM6IHRoaXMuX2NvbnZlcnRUb0FycmF5KGRhdGEudXNlclJvbGVzKSxcbiAgICAgIHVzZXJBY2Nlc3NSaWdodHM6IHRoaXMuX2NvbnZlcnRUb0FycmF5KGRhdGEudXNlckFjY2Vzc1JpZ2h0cylcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFRPRE86IHVzZSBhcyBpbiBhdXJlbGlhLXZhbGlkYXRpb25cbiAgZXJyb3JIYW5kbGVyKHJlc3BvbnNlKSB7XG4gICAgdGhpcy5faGlkZUxvYWRpbmdNYXNrKCk7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IDQwMSkge1xuICAgICAgdGhpcy5sb2dnZXIud2Fybih0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ3Nlc3Npb25UaW1lZE91dCcpKTtcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IDQwMykge1xuICAgICAgdGhpcy5sb2dnZXIud2Fybih0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ2FjY2Vzc0RlbmllZCcpKTtcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IDUwMCkge1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IodGhpcy5sb2NhbGUudHJhbnNsYXRlKCdpbnRlcm5hbFNlcnZlckVycm9yJykpO1xuICAgIH0gZWxzZSBpZiAocmVzcG9uc2UudGltZW91dCA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IodGhpcy5sb2NhbGUudHJhbnNsYXRlKCdyZXF1ZXN0VGltZW91dCcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IodGhpcy5sb2NhbGUudHJhbnNsYXRlKCdlcnJvckhhcHBlbmQnKSk7XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=