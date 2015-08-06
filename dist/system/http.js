System.register(['aurelia-http-client', 'jquery', 'aurelia-dependency-injection', './session', './logger', './locale', './config', './loading-mask/loading-mask'], function (_export) {
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
            }

            this.loadingMask.hide();
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

        _Http.prototype.loginResourceOwner = function loginResourceOwner(email, pass, clientId) {
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
//# sourceMappingURL=data:application/json;base64,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QixjQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztBQUN4QixjQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssR0FBRyxFQUFFO0FBQy9CLGdCQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7V0FDNUQsTUFBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssR0FBRyxFQUFFO0FBQ3RDLGdCQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1dBQ3pELE1BQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxLQUFLLEdBQUcsRUFBRTtBQUN0QyxnQkFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1dBQ2pFLE1BQU0sSUFBSSxRQUFRLENBQUMsT0FBTyxLQUFLLElBQUksRUFBRTtBQUNwQyxnQkFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1dBQzVELE1BQU07QUFDTCxnQkFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztXQUMxRDtTQUNGOztBQTVSVSxZQUFJLEdBRGhCLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUN4QixJQUFJLEtBQUosSUFBSTtlQUFKLElBQUk7OztzQkFBSixJQUFJIiwiZmlsZSI6Imh0dHAuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbW9zaGVuc2t5IG9uIDYvMTYvMTUuXG4gKi9cbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnYXVyZWxpYS1odHRwLWNsaWVudCc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZGVwZW5kZW5jeS1pbmplY3Rpb24nO1xuaW1wb3J0IHtTZXNzaW9ufSBmcm9tICcuL3Nlc3Npb24nO1xuaW1wb3J0IHtMb2dnZXJ9IGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7TG9jYWxlfSBmcm9tICcuL2xvY2FsZSc7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHtMb2FkaW5nTWFza30gZnJvbSAnLi9sb2FkaW5nLW1hc2svbG9hZGluZy1tYXNrJztcblxuQGluamVjdChTZXNzaW9uLCBMb2dnZXIsIExvYWRpbmdNYXNrKVxuZXhwb3J0IGNsYXNzIEh0dHAge1xuICBjb25zdHJ1Y3RvcihzZXNzaW9uLCBsb2dnZXIsIGxvYWRpbmdNYXNrKSB7XG4gICAgdGhpcy5zZXNzaW9uID0gc2Vzc2lvbjtcbiAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgICB0aGlzLmxvYWRpbmdNYXNrID0gbG9hZGluZ01hc2s7XG4gICAgdGhpcy5hdXRoSHR0cCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmxvY2FsZSA9IExvY2FsZS5SZXBvc2l0b3J5LmRlZmF1bHQ7XG5cbiAgICB0aGlzLnJlcXVlc3RzQ291bnQgPSAwO1xuICAgIHRoaXMuaG9zdCA9IENvbmZpZy5odHRwT3B0cy5zZXJ2aWNlSG9zdDtcbiAgICB0aGlzLm9yaWdpbiA9IHRoaXMuaG9zdCArIENvbmZpZy5odHRwT3B0cy5zZXJ2aWNlQXBpUHJlZml4O1xuICAgIHRoaXMuYXV0aE9yaWdpbiA9IENvbmZpZy5odHRwT3B0cy5hdXRoSG9zdDtcbiAgICB0aGlzLmhvc3RzID0gQ29uZmlnLmh0dHBPcHRzLmhvc3RzIHx8IHt9O1xuICAgIHRoaXMubG9hZGluZ01hc2tEZWxheSA9IENvbmZpZy5odHRwT3B0cy5sb2FkaW5nTWFza0RlbGF5IHx8IDEwMDA7XG4gICAgdGhpcy5yZXF1ZXN0VGltZW91dCA9IENvbmZpZy5odHRwT3B0cy5yZXF1ZXN0VGltZW91dDtcblxuICAgIGlmICh0aGlzLnNlc3Npb24udXNlclJlbWVtYmVyZWQoKSkge1xuICAgICAgdGhpcy5pbml0QXV0aEh0dHAodGhpcy5zZXNzaW9uLnJlbWVtYmVyZWRUb2tlbigpKTtcbiAgICB9XG4gIH1cblxuICBfc2hvd0xvYWRpbmdNYXNrKCkge1xuICAgIHRoaXMucmVxdWVzdHNDb3VudCArPSAxO1xuICAgIGlmICh0aGlzLnJlcXVlc3RzQ291bnQgPT09IDEpIHtcbiAgICAgIGlmICh0aGlzLmxvYWRpbmdNYXNrRGVsYXkgPiAwKSB7XG4gICAgICAgIHRoaXMuX3F1ZXJ5VGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmxvYWRpbmdNYXNrLnNob3coKVxuICAgICAgICB9LCB0aGlzLmxvYWRpbmdNYXNrRGVsYXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nTWFzay5zaG93KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2hpZGVMb2FkaW5nTWFzaygpIHtcbiAgICB0aGlzLnJlcXVlc3RzQ291bnQgLT0gMTtcbiAgICBpZiAodGhpcy5yZXF1ZXN0c0NvdW50IDw9IDApIHtcbiAgICAgIGlmICh0aGlzLl9xdWVyeVRpbWVvdXQpIHtcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLl9xdWVyeVRpbWVvdXQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmxvYWRpbmdNYXNrLmhpZGUoKTtcbiAgICAgIHRoaXMucmVxdWVzdHNDb3VudCA9IDA7XG4gICAgfVxuICB9XG5cbiAgZ2V0KHVybCwgZGF0YSkge1xuICAgIHRoaXMuX3Nob3dMb2FkaW5nTWFzaygpO1xuICAgIGxldCB1cmxXaXRoUHJvcHMgPSB1cmw7XG4gICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGV0IHByb3BzID0gT2JqZWN0LmtleXMoZGF0YSkubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgcmV0dXJuICcnICsga2V5ICsgJz0nICsgZGF0YVtrZXldO1xuICAgICAgfSkuam9pbignJicpO1xuXG4gICAgICB1cmxXaXRoUHJvcHMgKz0gJz8nICsgcHJvcHM7XG4gICAgfVxuICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmF1dGhIdHRwLmdldCh1cmxXaXRoUHJvcHMpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgdGhpcy5faGlkZUxvYWRpbmdNYXNrKCk7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXNwb25zZS5yZXNwb25zZSlcbiAgICB9KTtcbiAgICBwcm9taXNlLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgcG9zdCh1cmwsIGNvbnRlbnQgPSB7fSkge1xuICAgIHRoaXMuX3Nob3dMb2FkaW5nTWFzaygpO1xuICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmF1dGhIdHRwLnBvc3QodXJsLCBjb250ZW50KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIHRoaXMuX2hpZGVMb2FkaW5nTWFzaygpO1xuICAgICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlICE9PSBcIlwiKSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlc3BvbnNlLnJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBwcm9taXNlLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuXG4gIHB1dCh1cmwsIGNvbnRlbnQgPSB7fSkge1xuICAgIHRoaXMuX3Nob3dMb2FkaW5nTWFzaygpO1xuICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmF1dGhIdHRwLnB1dCh1cmwsIGNvbnRlbnQpLnRoZW4ocmVzcG9uc2UgPT4gdGhpcy5faGlkZUxvYWRpbmdNYXNrKCkpO1xuICAgIHByb21pc2UuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBkZWxldGUodXJsKSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuYXV0aEh0dHAuZGVsZXRlKHVybCkudGhlbihyZXNwb25zZSA9PiB0aGlzLl9oaWRlTG9hZGluZ01hc2soKSk7XG4gICAgcHJvbWlzZS5jYXRjaCh0aGlzLmVycm9ySGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIG11bHRpcGFydEZvcm1Qb3N0KHVybCwgZGF0YSkge1xuICAgIHZhciByZXF1ZXN0VXJsID0gdGhpcy5vcmlnaW4gKyB1cmw7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwYXJ0Rm9ybShyZXF1ZXN0VXJsLCBkYXRhLCAnUE9TVCcpO1xuICB9XG5cbiAgbXVsdGlwYXJ0Rm9ybVB1dCh1cmwsIGRhdGEpIHtcbiAgICB2YXIgcmVxdWVzdFVybCA9IHRoaXMub3JpZ2luICsgdXJsO1xuICAgIHJldHVybiB0aGlzLm11bHRpcGFydEZvcm0ocmVxdWVzdFVybCwgZGF0YSwgJ1BVVCcpO1xuICB9XG5cbiAgbXVsdGlwYXJ0Rm9ybSh1cmwsIGRhdGEsIG1ldGhvZCkge1xuICAgIHRoaXMuX3Nob3dMb2FkaW5nTWFzaygpO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgcmVxID0gJC5hamF4KHtcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YSxcbiAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICAgIHR5cGU6IG1ldGhvZCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgcmVxLmRvbmUocmVzb2x2ZSk7XG4gICAgICByZXEuZmFpbChyZWplY3QpO1xuICAgICAgc2VsZi5faGlkZUxvYWRpbmdNYXNrKCk7XG4gICAgfSkuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIuYmluZCh0aGlzKSk7XG4gIH1cblxuICBwb3N0RG93bmxvYWRGaWxlKHVybCwgZGF0YSkge1xuICAgIHJldHVybiB0aGlzLmRvd25sb2FkRmlsZSh1cmwsICdQT1NUJywgZGF0YSk7XG4gIH1cblxuICBnZXREb3dubG9hZEZpbGUodXJsKSB7XG4gICAgcmV0dXJuIHRoaXMuZG93bmxvYWRGaWxlKHVybCwgJ0dFVCcpO1xuICB9XG5cbiAgZG93bmxvYWRGaWxlKHVybCwgbWV0aG9kLCBkYXRhKSB7XG4gICAgdGhpcy5fc2hvd0xvYWRpbmdNYXNrKCk7XG4gICAgY29uc3QgdXJsQWRkcmVzcyA9IHRoaXMub3JpZ2luICsgdXJsO1xuICAgIGNvbnN0IGF1dGhIZWFkZXJWYWx1ZSA9IGBCZWFyZXIgJHt0aGlzLnRva2VufWA7XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHhtbGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIHhtbGh0dHAub3BlbihtZXRob2QsIHVybEFkZHJlc3MsIHRydWUpO1xuICAgICAgeG1saHR0cC50aW1lb3V0ID0gdGhpcy5yZXF1ZXN0VGltZW91dDtcbiAgICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOCcpO1xuICAgICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKCdBdXRob3JpemF0aW9uJywgYXV0aEhlYWRlclZhbHVlKTtcbiAgICAgIHhtbGh0dHAucmVzcG9uc2VUeXBlID0gXCJibG9iXCI7XG5cbiAgICAgIHhtbGh0dHAub25sb2FkID0gZnVuY3Rpb24gKG9FdmVudCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgIHJlamVjdCh7c3RhdHVzQ29kZTogdGhpcy5zdGF0dXN9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBibG9iID0geG1saHR0cC5yZXNwb25zZTtcbiAgICAgICAgY29uc3Qgd2luZG93VXJsID0gd2luZG93LlVSTCB8fCB3aW5kb3cud2Via2l0VVJMO1xuICAgICAgICBjb25zdCB1cmwgPSB3aW5kb3dVcmwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgICBjb25zdCBmaWxlbmFtZSA9IHRoaXMuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtRGlzcG9zaXRpb24nKS5tYXRjaCgvXmF0dGFjaG1lbnQ7IGZpbGVuYW1lPSguKykvKVsxXTtcblxuICAgICAgICBjb25zdCBhbmNob3IgPSAkKCc8YT48L2E+Jyk7XG4gICAgICAgIGFuY2hvci5wcm9wKCdocmVmJywgdXJsKTtcbiAgICAgICAgYW5jaG9yLnByb3AoJ2Rvd25sb2FkJywgZmlsZW5hbWUpO1xuICAgICAgICAkKCdib2R5JykuYXBwZW5kKGFuY2hvcik7XG4gICAgICAgIGFuY2hvci5nZXQoMCkuY2xpY2soKTtcbiAgICAgICAgd2luZG93VXJsLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgICAgICBhbmNob3IucmVtb3ZlKCk7XG4gICAgICB9O1xuXG4gICAgICB4bWxodHRwLm9udGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVqZWN0KHt0aW1lb3V0OiB0cnVlfSlcbiAgICAgIH07XG5cbiAgICAgIHhtbGh0dHAuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsICgpID0+IHtcbiAgICAgICAgcmVqZWN0KCk7XG4gICAgICB9KTtcbiAgICAgIHhtbGh0dHAuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIHRoaXMuX2hpZGVMb2FkaW5nTWFzaygpO1xuICAgICAgfSk7XG4gICAgICBpZiAobWV0aG9kID09PSAnR0VUJykge1xuICAgICAgICB4bWxodHRwLnNlbmQoKTtcbiAgICAgIH0gZWxzZSBpZiAobWV0aG9kID09PSAnUE9TVCcpIHtcbiAgICAgICAgeG1saHR0cC5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuc3Vwb3J0ZWQgbWV0aG9kIGNhbGwhXCIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcHJvbWlzZS5jYXRjaCh0aGlzLmVycm9ySGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGxvZ2luQmFzaWNBdXRoKGVtYWlsLCBwYXNzKSB7XG4gICAgbGV0IGNsaWVudCA9IG5ldyBIdHRwQ2xpZW50KCk7XG4gICAgbGV0IGVuY29kZWREYXRhID0gd2luZG93LmJ0b2EoZW1haWwgKyAnOicgKyBwYXNzKTtcbiAgICBsZXQgcHJvbWlzZSA9IGNsaWVudC5jcmVhdGVSZXF1ZXN0KCd0b2tlbicpXG4gICAgICAuYXNHZXQoKVxuICAgICAgLndpdGhCYXNlVXJsKHRoaXMuYXV0aE9yaWdpbilcbiAgICAgIC53aXRoSGVhZGVyKCdBdXRob3JpemF0aW9uJywgJ0Jhc2ljICcgKyBlbmNvZGVkRGF0YSlcbiAgICAgIC5zZW5kKCk7XG4gICAgcHJvbWlzZS50aGVuKHRoaXMubG9naW5IYW5kbGUuYmluZCh0aGlzKSlcbiAgICBwcm9taXNlLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBsb2dpblJlc291cmNlT3duZXIoZW1haWwsIHBhc3MsIGNsaWVudElkKSB7XG4gICAgdGhpcy5fc2hvd0xvYWRpbmdNYXNrKCk7XG4gICAgbGV0IGRhdGEgPSB7XG4gICAgICBncmFudF90eXBlOiAncGFzc3dvcmQnLFxuICAgICAgY2xpZW50X2lkOiBjbGllbnRJZCxcbiAgICAgIHVzZXJuYW1lOiBlbWFpbCxcbiAgICAgIHBhc3N3b3JkOiBwYXNzXG4gICAgfTtcblxuICAgIGxldCBjbGllbnQgPSBuZXcgSHR0cENsaWVudCgpXG4gICAgICAuY29uZmlndXJlKHggPT4ge1xuICAgICAgICB4LndpdGhCYXNlVXJsKHRoaXMuYXV0aE9yaWdpbik7XG4gICAgICAgIHgud2l0aEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiKTtcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgcHJvbWlzZSA9IGNsaWVudC5wb3N0KCd0b2tlbicsICQucGFyYW0oZGF0YSkpO1xuICAgIHByb21pc2UudGhlbih0aGlzLmxvZ2luSGFuZGxlLmJpbmQodGhpcykpXG4gICAgcHJvbWlzZS5jYXRjaCh0aGlzLmVycm9ySGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgaW5pdEF1dGhIdHRwKHRva2VuKSB7XG4gICAgdGhpcy50b2tlbiA9IHRva2VuO1xuICAgIHRoaXMuYXV0aEh0dHAgPSBuZXcgSHR0cENsaWVudCgpLmNvbmZpZ3VyZSh4ID0+IHtcbiAgICAgIHgud2l0aEJhc2VVcmwodGhpcy5vcmlnaW4pO1xuICAgICAgeC53aXRoSGVhZGVyKCdBdXRob3JpemF0aW9uJywgYEJlYXJlciAke3RoaXMudG9rZW59YCk7XG4gICAgICB4LndpdGhIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0QXV0aEh0dHBGb3IoaG9zdE5hbWUpIHtcbiAgICBsZXQgYXV0aEh0dHAgPSBuZXcgSHR0cENsaWVudCgpLmNvbmZpZ3VyZSh4ID0+IHtcbiAgICAgIHgud2l0aEJhc2VVcmwodGhpcy5ob3N0c1tob3N0TmFtZV0pO1xuICAgICAgeC53aXRoSGVhZGVyKCdBdXRob3JpemF0aW9uJywgYEJlYXJlciAke3RoaXMudG9rZW59YCk7XG4gICAgICB4LndpdGhIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGF1dGhIdHRwO1xuICB9XG5cbiAgX2NvbnZlcnRUb0FycmF5KHZhbHVlKSB7XG4gICAgbGV0IHJlc3VsdCA9IHZhbHVlIHx8IFtdO1xuICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHJlc3VsdC5zcGxpdCgnLCcpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBsb2dpbkhhbmRsZShyZXNwb25zZSkge1xuICAgIHRoaXMuX2hpZGVMb2FkaW5nTWFzaygpO1xuICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlc3BvbnNlLnJlc3BvbnNlKTtcbiAgICBsZXQgdG9rZW4gPSBkYXRhLmFjY2Vzc190b2tlbjtcbiAgICB0aGlzLmluaXRBdXRoSHR0cCh0b2tlbik7XG5cbiAgICBsZXQgY2xhaW1zID0gZGF0YS51c2VyQ2xhaW1zIHx8IFtdO1xuICAgIGlmICh0eXBlb2YgY2xhaW1zID09PSAnc3RyaW5nJykge1xuICAgICAgY2xhaW1zID0gSlNPTi5wYXJzZShjbGFpbXMpO1xuICAgIH1cblxuICAgIHRoaXMuc2Vzc2lvbi5zZXRVc2VyKHtcbiAgICAgIHRva2VuOiB0b2tlbixcbiAgICAgIHVzZXJOYW1lOiBkYXRhLnVzZXJOYW1lIHx8ICdwbGVhc2UgZ2l2ZSBtZSBhIG5hbWUhJyxcbiAgICAgIHVzZXJDbGFpbXM6IGNsYWltcyxcbiAgICAgIHVzZXJSb2xlczogdGhpcy5fY29udmVydFRvQXJyYXkoZGF0YS51c2VyUm9sZXMpLFxuICAgICAgdXNlckFjY2Vzc1JpZ2h0czogdGhpcy5fY29udmVydFRvQXJyYXkoZGF0YS51c2VyQWNjZXNzUmlnaHRzKVxuICAgIH0pO1xuICB9XG5cbiAgLy8gVE9ETzogdXNlIGFzIGluIGF1cmVsaWEtdmFsaWRhdGlvblxuICBlcnJvckhhbmRsZXIocmVzcG9uc2UpIHtcbiAgICB0aGlzLl9oaWRlTG9hZGluZ01hc2soKTtcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gNDAxKSB7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKHRoaXMubG9jYWxlLnRyYW5zbGF0ZSgnc2Vzc2lvblRpbWVkT3V0JykpO1xuICAgIH0gZWxzZSBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gNDAzKSB7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKHRoaXMubG9jYWxlLnRyYW5zbGF0ZSgnYWNjZXNzRGVuaWVkJykpO1xuICAgIH0gZWxzZSBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gNTAwKSB7XG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcih0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ2ludGVybmFsU2VydmVyRXJyb3InKSk7XG4gICAgfSBlbHNlIGlmIChyZXNwb25zZS50aW1lb3V0ID09PSB0cnVlKSB7XG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcih0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ3JlcXVlc3RUaW1lb3V0JykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcih0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ2Vycm9ySGFwcGVuZCcpKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==