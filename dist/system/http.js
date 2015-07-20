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
          if (this.requestsCount === 0) {
            if (this._queryTimeout) {
              window.clearTimeout(this._queryTimeout);
            } else {
              this.loadingMask.hide();
            }
          } else if (this.requestsCount < 0) {
            throw new Exception('Ups... This should never happend! Fix it Luke!');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzJFQWFhLElBQUk7Ozs7OztzQ0FWVCxVQUFVOzs7OzJDQUVWLE1BQU07O3lCQUNOLE9BQU87O3VCQUNQLE1BQU07O3VCQUNOLE1BQU07O3VCQUNOLE1BQU07OzRDQUNOLFdBQVc7OztBQUdOLFVBQUk7QUFDSixpQkFEQSxJQUFJLENBQ0gsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUU7OztBQUN4QyxjQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUN2QixjQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixjQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztBQUMvQixjQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztBQUMxQixjQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLFdBQVEsQ0FBQzs7QUFFeEMsY0FBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7QUFDdkIsY0FBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQztBQUN4QyxjQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQztBQUMzRCxjQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0FBQzNDLGNBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO0FBQ3pDLGNBQUksQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQztBQUNqRSxjQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDOztBQUVyRCxjQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUU7QUFDakMsZ0JBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO1dBQ25EO1NBQ0Y7O29CQW5CVSxJQUFJOzt3QkFxQmYsZ0JBQWdCLEdBQUEsNEJBQUc7OztBQUNqQixjQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQztBQUN4QixjQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssQ0FBQyxFQUFFO0FBQzVCLGdCQUFJLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLEVBQUU7QUFDN0Isa0JBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFNO0FBQzNDLHNCQUFLLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtlQUN4QixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQzNCLE1BQU07QUFDTCxrQkFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN6QjtXQUNGO1NBQ0Y7O3dCQUVELGdCQUFnQixHQUFBLDRCQUFHO0FBQ2pCLGNBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDO0FBQ3hCLGNBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxDQUFDLEVBQUU7QUFDNUIsZ0JBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtBQUN0QixvQkFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDekMsTUFBTTtBQUNMLGtCQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3pCO1dBQ0YsTUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxFQUFFO0FBQ2pDLGtCQUFNLElBQUksU0FBUyxDQUFDLGdEQUFnRCxDQUFDLENBQUM7V0FDdkU7U0FDRjs7d0JBRUQsR0FBRyxHQUFBLGFBQUMsR0FBRyxFQUFFLElBQUksRUFBRTs7O0FBQ2IsY0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7QUFDeEIsY0FBSSxZQUFZLEdBQUcsR0FBRyxDQUFDO0FBQ3ZCLGNBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtBQUN0QixnQkFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLEVBQUU7QUFDL0MscUJBQU8sRUFBRSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ25DLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRWIsd0JBQVksSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDO1dBQzdCO0FBQ0QsY0FBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUSxFQUFJO0FBQy9ELG1CQUFLLGdCQUFnQixFQUFFLENBQUM7QUFDeEIsbUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7V0FDckMsQ0FBQyxDQUFDO0FBQ0gsaUJBQU8sU0FBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDNUMsaUJBQU8sT0FBTyxDQUFDO1NBQ2hCOzt3QkFFRCxJQUFJLEdBQUEsY0FBQyxHQUFHLEVBQWdCOzs7Y0FBZCxPQUFPLGdDQUFHLEVBQUU7O0FBQ3BCLGNBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0FBQ3hCLGNBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRLEVBQUk7QUFDaEUsbUJBQUssZ0JBQWdCLEVBQUUsQ0FBQztBQUN4QixnQkFBSSxRQUFRLENBQUMsUUFBUSxLQUFLLEVBQUUsRUFBRTtBQUM1QixxQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN0QztXQUNGLENBQUMsQ0FBQztBQUNILGlCQUFPLFNBQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOztBQUU1QyxpQkFBTyxPQUFPLENBQUM7U0FDaEI7O3dCQUdELEdBQUcsR0FBQSxhQUFDLEdBQUcsRUFBZ0I7OztjQUFkLE9BQU8sZ0NBQUcsRUFBRTs7QUFDbkIsY0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7QUFDeEIsY0FBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVE7bUJBQUksT0FBSyxnQkFBZ0IsRUFBRTtXQUFBLENBQUMsQ0FBQztBQUMxRixpQkFBTyxTQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUM1QyxpQkFBTyxPQUFPLENBQUM7U0FDaEI7O29DQUVLLGlCQUFDLEdBQUcsRUFBRTs7O0FBQ1YsY0FBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsVUFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVE7bUJBQUksT0FBSyxnQkFBZ0IsRUFBRTtXQUFBLENBQUMsQ0FBQztBQUNwRixpQkFBTyxTQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUM1QyxpQkFBTyxPQUFPLENBQUM7U0FDaEI7O3dCQUVELGlCQUFpQixHQUFBLDJCQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDM0IsY0FBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDbkMsaUJBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3JEOzt3QkFFRCxnQkFBZ0IsR0FBQSwwQkFBQyxHQUFHLEVBQUUsSUFBSSxFQUFFO0FBQzFCLGNBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO0FBQ25DLGlCQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNwRDs7d0JBRUQsYUFBYSxHQUFBLHVCQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO0FBQy9CLGNBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0FBQ3hCLGNBQUksSUFBSSxHQUFHLElBQUksQ0FBQztBQUNoQixjQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ2YsZUFBRyxFQUFFLEdBQUc7QUFDUixnQkFBSSxFQUFFLElBQUk7QUFDVix1QkFBVyxFQUFFLEtBQUs7QUFDbEIsdUJBQVcsRUFBRSxLQUFLO0FBQ2xCLGdCQUFJLEVBQUUsTUFBTTtBQUNaLG1CQUFPLEVBQUU7QUFDUCw2QkFBZSxFQUFFLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSzthQUN4QztXQUNGLENBQUMsQ0FBQzs7QUFFSCxpQkFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDNUMsZUFBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNsQixlQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2pCLGdCQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztXQUN6QixDQUFDLFNBQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3hDOzt3QkFFRCxnQkFBZ0IsR0FBQSwwQkFBQyxHQUFHLEVBQUUsSUFBSSxFQUFFO0FBQzFCLGlCQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM3Qzs7d0JBRUQsZUFBZSxHQUFBLHlCQUFDLEdBQUcsRUFBRTtBQUNuQixpQkFBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN0Qzs7d0JBRUQsWUFBWSxHQUFBLHNCQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzs7QUFDOUIsY0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7QUFDeEIsY0FBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDckMsY0FBTSxlQUFlLGVBQWEsSUFBSSxDQUFDLEtBQUssQUFBRSxDQUFDO0FBQy9DLGNBQU0sT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBSztBQUMvQyxnQkFBTSxPQUFPLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztBQUNyQyxtQkFBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3ZDLG1CQUFPLENBQUMsT0FBTyxHQUFHLE9BQUssY0FBYyxDQUFDO0FBQ3RDLG1CQUFPLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLGdDQUFnQyxDQUFDLENBQUM7QUFDM0UsbUJBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFDM0QsbUJBQU8sQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDOztBQUU5QixtQkFBTyxDQUFDLE1BQU0sR0FBRyxVQUFVLE1BQU0sRUFBRTtBQUNqQyxrQkFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtBQUN2QixzQkFBTSxDQUFDLEVBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO0FBQ2xDLHVCQUFPO2VBQ1I7O0FBRUQsa0JBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7QUFDOUIsa0JBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUNqRCxrQkFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM1QyxrQkFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDLENBQUMsS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRXRHLGtCQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDNUIsb0JBQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3pCLG9CQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNsQyxlQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pCLG9CQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ3RCLHVCQUFTLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQy9CLG9CQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDakIsQ0FBQzs7QUFFRixtQkFBTyxDQUFDLFNBQVMsR0FBRyxZQUFZO0FBQzlCLG9CQUFNLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQTthQUN4QixDQUFDOztBQUVGLG1CQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07QUFDdEMsb0JBQU0sRUFBRSxDQUFDO2FBQ1YsQ0FBQyxDQUFDO0FBQ0gsbUJBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsWUFBTTtBQUNyQyxxQkFBTyxFQUFFLENBQUM7QUFDVixxQkFBSyxnQkFBZ0IsRUFBRSxDQUFDO2FBQ3pCLENBQUMsQ0FBQztBQUNILGdCQUFJLE1BQU0sS0FBSyxLQUFLLEVBQUU7QUFDcEIscUJBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNoQixNQUFNLElBQUksTUFBTSxLQUFLLE1BQU0sRUFBRTtBQUM1QixxQkFBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDcEMsTUFBTTtBQUNMLG9CQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7YUFDNUM7V0FDRixDQUFDLENBQUM7O0FBRUgsaUJBQU8sU0FBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDNUMsaUJBQU8sT0FBTyxDQUFDO1NBQ2hCOzt3QkFFRCxjQUFjLEdBQUEsd0JBQUMsS0FBSyxFQUFFLElBQUksRUFBRTtBQUMxQixjQUFJLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO0FBQzlCLGNBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUNsRCxjQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUN4QyxLQUFLLEVBQUUsQ0FDUCxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUM1QixVQUFVLENBQUMsZUFBZSxFQUFFLFFBQVEsR0FBRyxXQUFXLENBQUMsQ0FDbkQsSUFBSSxFQUFFLENBQUM7QUFDVixpQkFBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0FBQ3pDLGlCQUFPLFNBQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOztBQUU1QyxpQkFBTyxPQUFPLENBQUM7U0FDaEI7O3dCQUVELGtCQUFrQixHQUFBLDRCQUFDLEtBQUssRUFBRSxJQUFJLEVBQUU7OztBQUM5QixjQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztBQUN4QixjQUFJLElBQUksR0FBRztBQUNULHNCQUFVLEVBQUUsVUFBVTtBQUN0QixvQkFBUSxFQUFFLEtBQUs7QUFDZixvQkFBUSxFQUFFLElBQUk7V0FDZixDQUFDOztBQUVGLGNBQUksTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFLENBQzFCLFNBQVMsQ0FBQyxVQUFBLENBQUMsRUFBSTtBQUNkLGFBQUMsQ0FBQyxXQUFXLENBQUMsT0FBSyxVQUFVLENBQUMsQ0FBQztBQUMvQixhQUFDLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxtQ0FBbUMsQ0FBQyxDQUFDO1dBQ25FLENBQUMsQ0FBQzs7QUFFTCxjQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDcEQsaUJBQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUN6QyxpQkFBTyxTQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7QUFFNUMsaUJBQU8sT0FBTyxDQUFDO1NBQ2hCOzt3QkFFRCxZQUFZLEdBQUEsc0JBQUMsS0FBSyxFQUFFOzs7QUFDbEIsY0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsY0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLENBQUMsRUFBSTtBQUM5QyxhQUFDLENBQUMsV0FBVyxDQUFDLE9BQUssTUFBTSxDQUFDLENBQUM7QUFDM0IsYUFBQyxDQUFDLFVBQVUsQ0FBQyxlQUFlLGNBQVksT0FBSyxLQUFLLENBQUcsQ0FBQztBQUN0RCxhQUFDLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1dBQ2xELENBQUMsQ0FBQztTQUNKOzt3QkFFRCxjQUFjLEdBQUEsd0JBQUMsUUFBUSxFQUFFOzs7QUFDdkIsY0FBSSxRQUFRLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDLEVBQUk7QUFDN0MsYUFBQyxDQUFDLFdBQVcsQ0FBQyxPQUFLLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ3BDLGFBQUMsQ0FBQyxVQUFVLENBQUMsZUFBZSxjQUFZLE9BQUssS0FBSyxDQUFHLENBQUM7QUFDdEQsYUFBQyxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztXQUNsRCxDQUFDLENBQUM7O0FBRUgsaUJBQU8sUUFBUSxDQUFDO1NBQ2pCOzt3QkFFRCxlQUFlLEdBQUEseUJBQUMsS0FBSyxFQUFFO0FBQ3JCLGNBQUksTUFBTSxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7QUFDekIsY0FBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7QUFDOUIsbUJBQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztXQUMxQjs7QUFFRCxpQkFBTyxNQUFNLENBQUM7U0FDZjs7d0JBRUQsV0FBVyxHQUFBLHFCQUFDLFFBQVEsRUFBRTtBQUNwQixjQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztBQUN4QixjQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMzQyxjQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO0FBQzlCLGNBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRXpCLGNBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO0FBQ25DLGNBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO0FBQzlCLGtCQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztXQUM3Qjs7QUFFRCxjQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztBQUNuQixpQkFBSyxFQUFFLEtBQUs7QUFDWixvQkFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksd0JBQXdCO0FBQ25ELHNCQUFVLEVBQUUsTUFBTTtBQUNsQixxQkFBUyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztBQUMvQyw0QkFBZ0IsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztXQUM5RCxDQUFDLENBQUM7U0FDSjs7d0JBR0QsWUFBWSxHQUFBLHNCQUFDLFFBQVEsRUFBRTtBQUNyQixjQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztBQUN4QixjQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssR0FBRyxFQUFFO0FBQy9CLGdCQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7V0FDNUQsTUFBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssR0FBRyxFQUFFO0FBQ3RDLGdCQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1dBQ3pELE1BQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxLQUFLLEdBQUcsRUFBRTtBQUN0QyxnQkFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1dBQ2pFLE1BQU0sSUFBSSxRQUFRLENBQUMsT0FBTyxLQUFLLElBQUksRUFBRTtBQUNwQyxnQkFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1dBQzVELE1BQU07QUFDTCxnQkFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztXQUMxRDtTQUNGOztBQTVSVSxZQUFJLEdBRGhCLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUN4QixJQUFJLEtBQUosSUFBSTtlQUFKLElBQUk7OztzQkFBSixJQUFJIiwiZmlsZSI6Imh0dHAuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbW9zaGVuc2t5IG9uIDYvMTYvMTUuXG4gKi9cbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnYXVyZWxpYS1odHRwLWNsaWVudCc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZGVwZW5kZW5jeS1pbmplY3Rpb24nO1xuaW1wb3J0IHtTZXNzaW9ufSBmcm9tICcuL3Nlc3Npb24nO1xuaW1wb3J0IHtMb2dnZXJ9IGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7TG9jYWxlfSBmcm9tICcuL2xvY2FsZSc7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHtMb2FkaW5nTWFza30gZnJvbSAnLi9sb2FkaW5nTWFzay9sb2FkaW5nTWFzayc7XG5cbkBpbmplY3QoU2Vzc2lvbiwgTG9nZ2VyLCBMb2FkaW5nTWFzaylcbmV4cG9ydCBjbGFzcyBIdHRwIHtcbiAgY29uc3RydWN0b3Ioc2Vzc2lvbiwgbG9nZ2VyLCBsb2FkaW5nTWFzaykge1xuICAgIHRoaXMuc2Vzc2lvbiA9IHNlc3Npb247XG4gICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gICAgdGhpcy5sb2FkaW5nTWFzayA9IGxvYWRpbmdNYXNrO1xuICAgIHRoaXMuYXV0aEh0dHAgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5sb2NhbGUgPSBMb2NhbGUuUmVwb3NpdG9yeS5kZWZhdWx0O1xuXG4gICAgdGhpcy5yZXF1ZXN0c0NvdW50ID0gMDtcbiAgICB0aGlzLmhvc3QgPSBDb25maWcuaHR0cE9wdHMuc2VydmljZUhvc3Q7XG4gICAgdGhpcy5vcmlnaW4gPSB0aGlzLmhvc3QgKyBDb25maWcuaHR0cE9wdHMuc2VydmljZUFwaVByZWZpeDtcbiAgICB0aGlzLmF1dGhPcmlnaW4gPSBDb25maWcuaHR0cE9wdHMuYXV0aEhvc3Q7XG4gICAgdGhpcy5ob3N0cyA9IENvbmZpZy5odHRwT3B0cy5ob3N0cyB8fCB7fTtcbiAgICB0aGlzLmxvYWRpbmdNYXNrRGVsYXkgPSBDb25maWcuaHR0cE9wdHMubG9hZGluZ01hc2tEZWxheSB8fCAxMDAwO1xuICAgIHRoaXMucmVxdWVzdFRpbWVvdXQgPSBDb25maWcuaHR0cE9wdHMucmVxdWVzdFRpbWVvdXQ7XG5cbiAgICBpZiAodGhpcy5zZXNzaW9uLnVzZXJSZW1lbWJlcmVkKCkpIHtcbiAgICAgIHRoaXMuaW5pdEF1dGhIdHRwKHRoaXMuc2Vzc2lvbi5yZW1lbWJlcmVkVG9rZW4oKSk7XG4gICAgfVxuICB9XG5cbiAgX3Nob3dMb2FkaW5nTWFzaygpIHtcbiAgICB0aGlzLnJlcXVlc3RzQ291bnQgKz0gMTtcbiAgICBpZiAodGhpcy5yZXF1ZXN0c0NvdW50ID09PSAxKSB7XG4gICAgICBpZiAodGhpcy5sb2FkaW5nTWFza0RlbGF5ID4gMCkge1xuICAgICAgICB0aGlzLl9xdWVyeVRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2FkaW5nTWFzay5zaG93KClcbiAgICAgICAgfSwgdGhpcy5sb2FkaW5nTWFza0RlbGF5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9hZGluZ01hc2suc2hvdygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9oaWRlTG9hZGluZ01hc2soKSB7XG4gICAgdGhpcy5yZXF1ZXN0c0NvdW50IC09IDE7XG4gICAgaWYgKHRoaXMucmVxdWVzdHNDb3VudCA9PT0gMCkge1xuICAgICAgaWYgKHRoaXMuX3F1ZXJ5VGltZW91dCkge1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuX3F1ZXJ5VGltZW91dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvYWRpbmdNYXNrLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMucmVxdWVzdHNDb3VudCA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJVcHMuLi4gVGhpcyBzaG91bGQgbmV2ZXIgaGFwcGVuZCEgRml4IGl0IEx1a2UhXCIpO1xuICAgIH1cbiAgfVxuXG4gIGdldCh1cmwsIGRhdGEpIHtcbiAgICB0aGlzLl9zaG93TG9hZGluZ01hc2soKTtcbiAgICBsZXQgdXJsV2l0aFByb3BzID0gdXJsO1xuICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxldCBwcm9wcyA9IE9iamVjdC5rZXlzKGRhdGEpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHJldHVybiAnJyArIGtleSArICc9JyArIGRhdGFba2V5XTtcbiAgICAgIH0pLmpvaW4oJyYnKTtcblxuICAgICAgdXJsV2l0aFByb3BzICs9ICc/JyArIHByb3BzO1xuICAgIH1cbiAgICBjb25zdCBwcm9taXNlID0gdGhpcy5hdXRoSHR0cC5nZXQodXJsV2l0aFByb3BzKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIHRoaXMuX2hpZGVMb2FkaW5nTWFzaygpO1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzcG9uc2UucmVzcG9uc2UpXG4gICAgfSk7XG4gICAgcHJvbWlzZS5jYXRjaCh0aGlzLmVycm9ySGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIHBvc3QodXJsLCBjb250ZW50ID0ge30pIHtcbiAgICB0aGlzLl9zaG93TG9hZGluZ01hc2soKTtcbiAgICBjb25zdCBwcm9taXNlID0gdGhpcy5hdXRoSHR0cC5wb3N0KHVybCwgY29udGVudCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICB0aGlzLl9oaWRlTG9hZGluZ01hc2soKTtcbiAgICAgIGlmIChyZXNwb25zZS5yZXNwb25zZSAhPT0gXCJcIikge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXNwb25zZS5yZXNwb25zZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcHJvbWlzZS5jYXRjaCh0aGlzLmVycm9ySGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cblxuICBwdXQodXJsLCBjb250ZW50ID0ge30pIHtcbiAgICB0aGlzLl9zaG93TG9hZGluZ01hc2soKTtcbiAgICBjb25zdCBwcm9taXNlID0gdGhpcy5hdXRoSHR0cC5wdXQodXJsLCBjb250ZW50KS50aGVuKHJlc3BvbnNlID0+IHRoaXMuX2hpZGVMb2FkaW5nTWFzaygpKTtcbiAgICBwcm9taXNlLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgZGVsZXRlKHVybCkge1xuICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmF1dGhIdHRwLmRlbGV0ZSh1cmwpLnRoZW4ocmVzcG9uc2UgPT4gdGhpcy5faGlkZUxvYWRpbmdNYXNrKCkpO1xuICAgIHByb21pc2UuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBtdWx0aXBhcnRGb3JtUG9zdCh1cmwsIGRhdGEpIHtcbiAgICB2YXIgcmVxdWVzdFVybCA9IHRoaXMub3JpZ2luICsgdXJsO1xuICAgIHJldHVybiB0aGlzLm11bHRpcGFydEZvcm0ocmVxdWVzdFVybCwgZGF0YSwgJ1BPU1QnKTtcbiAgfVxuXG4gIG11bHRpcGFydEZvcm1QdXQodXJsLCBkYXRhKSB7XG4gICAgdmFyIHJlcXVlc3RVcmwgPSB0aGlzLm9yaWdpbiArIHVybDtcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBhcnRGb3JtKHJlcXVlc3RVcmwsIGRhdGEsICdQVVQnKTtcbiAgfVxuXG4gIG11bHRpcGFydEZvcm0odXJsLCBkYXRhLCBtZXRob2QpIHtcbiAgICB0aGlzLl9zaG93TG9hZGluZ01hc2soKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHJlcSA9ICQuYWpheCh7XG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGEsXG4gICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgICB0eXBlOiBtZXRob2QsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdGhpcy50b2tlblxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlcS5kb25lKHJlc29sdmUpO1xuICAgICAgcmVxLmZhaWwocmVqZWN0KTtcbiAgICAgIHNlbGYuX2hpZGVMb2FkaW5nTWFzaygpO1xuICAgIH0pLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgcG9zdERvd25sb2FkRmlsZSh1cmwsIGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5kb3dubG9hZEZpbGUodXJsLCAnUE9TVCcsIGRhdGEpO1xuICB9XG5cbiAgZ2V0RG93bmxvYWRGaWxlKHVybCkge1xuICAgIHJldHVybiB0aGlzLmRvd25sb2FkRmlsZSh1cmwsICdHRVQnKTtcbiAgfVxuXG4gIGRvd25sb2FkRmlsZSh1cmwsIG1ldGhvZCwgZGF0YSkge1xuICAgIHRoaXMuX3Nob3dMb2FkaW5nTWFzaygpO1xuICAgIGNvbnN0IHVybEFkZHJlc3MgPSB0aGlzLm9yaWdpbiArIHVybDtcbiAgICBjb25zdCBhdXRoSGVhZGVyVmFsdWUgPSBgQmVhcmVyICR7dGhpcy50b2tlbn1gO1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCB4bWxodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICB4bWxodHRwLm9wZW4obWV0aG9kLCB1cmxBZGRyZXNzLCB0cnVlKTtcbiAgICAgIHhtbGh0dHAudGltZW91dCA9IHRoaXMucmVxdWVzdFRpbWVvdXQ7XG4gICAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLTgnKTtcbiAgICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcignQXV0aG9yaXphdGlvbicsIGF1dGhIZWFkZXJWYWx1ZSk7XG4gICAgICB4bWxodHRwLnJlc3BvbnNlVHlwZSA9IFwiYmxvYlwiO1xuXG4gICAgICB4bWxodHRwLm9ubG9hZCA9IGZ1bmN0aW9uIChvRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICByZWplY3Qoe3N0YXR1c0NvZGU6IHRoaXMuc3RhdHVzfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYmxvYiA9IHhtbGh0dHAucmVzcG9uc2U7XG4gICAgICAgIGNvbnN0IHdpbmRvd1VybCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTDtcbiAgICAgICAgY29uc3QgdXJsID0gd2luZG93VXJsLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgICAgY29uc3QgZmlsZW5hbWUgPSB0aGlzLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LURpc3Bvc2l0aW9uJykubWF0Y2goL15hdHRhY2htZW50OyBmaWxlbmFtZT0oLispLylbMV07XG5cbiAgICAgICAgY29uc3QgYW5jaG9yID0gJCgnPGE+PC9hPicpO1xuICAgICAgICBhbmNob3IucHJvcCgnaHJlZicsIHVybCk7XG4gICAgICAgIGFuY2hvci5wcm9wKCdkb3dubG9hZCcsIGZpbGVuYW1lKTtcbiAgICAgICAgJCgnYm9keScpLmFwcGVuZChhbmNob3IpO1xuICAgICAgICBhbmNob3IuZ2V0KDApLmNsaWNrKCk7XG4gICAgICAgIHdpbmRvd1VybC5yZXZva2VPYmplY3RVUkwodXJsKTtcbiAgICAgICAgYW5jaG9yLnJlbW92ZSgpO1xuICAgICAgfTtcblxuICAgICAgeG1saHR0cC5vbnRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlamVjdCh7dGltZW91dDogdHJ1ZX0pXG4gICAgICB9O1xuXG4gICAgICB4bWxodHRwLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCAoKSA9PiB7XG4gICAgICAgIHJlamVjdCgpO1xuICAgICAgfSk7XG4gICAgICB4bWxodHRwLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB0aGlzLl9oaWRlTG9hZGluZ01hc2soKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKG1ldGhvZCA9PT0gJ0dFVCcpIHtcbiAgICAgICAgeG1saHR0cC5zZW5kKCk7XG4gICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgICAgIHhtbGh0dHAuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnN1cG9ydGVkIG1ldGhvZCBjYWxsIVwiKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHByb21pc2UuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBsb2dpbkJhc2ljQXV0aChlbWFpbCwgcGFzcykge1xuICAgIGxldCBjbGllbnQgPSBuZXcgSHR0cENsaWVudCgpO1xuICAgIGxldCBlbmNvZGVkRGF0YSA9IHdpbmRvdy5idG9hKGVtYWlsICsgJzonICsgcGFzcyk7XG4gICAgbGV0IHByb21pc2UgPSBjbGllbnQuY3JlYXRlUmVxdWVzdCgndG9rZW4nKVxuICAgICAgLmFzR2V0KClcbiAgICAgIC53aXRoQmFzZVVybCh0aGlzLmF1dGhPcmlnaW4pXG4gICAgICAud2l0aEhlYWRlcignQXV0aG9yaXphdGlvbicsICdCYXNpYyAnICsgZW5jb2RlZERhdGEpXG4gICAgICAuc2VuZCgpO1xuICAgIHByb21pc2UudGhlbih0aGlzLmxvZ2luSGFuZGxlLmJpbmQodGhpcykpXG4gICAgcHJvbWlzZS5jYXRjaCh0aGlzLmVycm9ySGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgbG9naW5SZXNvdXJjZU93bmVyKGVtYWlsLCBwYXNzKSB7XG4gICAgdGhpcy5fc2hvd0xvYWRpbmdNYXNrKCk7XG4gICAgbGV0IGRhdGEgPSB7XG4gICAgICBncmFudF90eXBlOiAncGFzc3dvcmQnLFxuICAgICAgdXNlcm5hbWU6IGVtYWlsLFxuICAgICAgcGFzc3dvcmQ6IHBhc3NcbiAgICB9O1xuXG4gICAgbGV0IGNsaWVudCA9IG5ldyBIdHRwQ2xpZW50KClcbiAgICAgIC5jb25maWd1cmUoeCA9PiB7XG4gICAgICAgIHgud2l0aEJhc2VVcmwodGhpcy5hdXRoT3JpZ2luKTtcbiAgICAgICAgeC53aXRoSGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpO1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBwcm9taXNlID0gY2xpZW50LnBvc3QoJ3Rva2VuJywgJC5wYXJhbShkYXRhKSk7XG4gICAgcHJvbWlzZS50aGVuKHRoaXMubG9naW5IYW5kbGUuYmluZCh0aGlzKSlcbiAgICBwcm9taXNlLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBpbml0QXV0aEh0dHAodG9rZW4pIHtcbiAgICB0aGlzLnRva2VuID0gdG9rZW47XG4gICAgdGhpcy5hdXRoSHR0cCA9IG5ldyBIdHRwQ2xpZW50KCkuY29uZmlndXJlKHggPT4ge1xuICAgICAgeC53aXRoQmFzZVVybCh0aGlzLm9yaWdpbik7XG4gICAgICB4LndpdGhIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCBgQmVhcmVyICR7dGhpcy50b2tlbn1gKTtcbiAgICAgIHgud2l0aEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgfSk7XG4gIH1cblxuICBnZXRBdXRoSHR0cEZvcihob3N0TmFtZSkge1xuICAgIGxldCBhdXRoSHR0cCA9IG5ldyBIdHRwQ2xpZW50KCkuY29uZmlndXJlKHggPT4ge1xuICAgICAgeC53aXRoQmFzZVVybCh0aGlzLmhvc3RzW2hvc3ROYW1lXSk7XG4gICAgICB4LndpdGhIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCBgQmVhcmVyICR7dGhpcy50b2tlbn1gKTtcbiAgICAgIHgud2l0aEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYXV0aEh0dHA7XG4gIH1cblxuICBfY29udmVydFRvQXJyYXkodmFsdWUpIHtcbiAgICBsZXQgcmVzdWx0ID0gdmFsdWUgfHwgW107XG4gICAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gcmVzdWx0LnNwbGl0KCcsJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGxvZ2luSGFuZGxlKHJlc3BvbnNlKSB7XG4gICAgdGhpcy5faGlkZUxvYWRpbmdNYXNrKCk7XG4gICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UocmVzcG9uc2UucmVzcG9uc2UpO1xuICAgIGxldCB0b2tlbiA9IGRhdGEuYWNjZXNzX3Rva2VuO1xuICAgIHRoaXMuaW5pdEF1dGhIdHRwKHRva2VuKTtcblxuICAgIGxldCBjbGFpbXMgPSBkYXRhLnVzZXJDbGFpbXMgfHwgW107XG4gICAgaWYgKHR5cGVvZiBjbGFpbXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjbGFpbXMgPSBKU09OLnBhcnNlKGNsYWltcyk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXNzaW9uLnNldFVzZXIoe1xuICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgdXNlck5hbWU6IGRhdGEudXNlck5hbWUgfHwgJ3BsZWFzZSBnaXZlIG1lIGEgbmFtZSEnLFxuICAgICAgdXNlckNsYWltczogY2xhaW1zLFxuICAgICAgdXNlclJvbGVzOiB0aGlzLl9jb252ZXJ0VG9BcnJheShkYXRhLnVzZXJSb2xlcyksXG4gICAgICB1c2VyQWNjZXNzUmlnaHRzOiB0aGlzLl9jb252ZXJ0VG9BcnJheShkYXRhLnVzZXJBY2Nlc3NSaWdodHMpXG4gICAgfSk7XG4gIH1cblxuICAvLyBUT0RPOiB1c2UgYXMgaW4gYXVyZWxpYS12YWxpZGF0aW9uXG4gIGVycm9ySGFuZGxlcihyZXNwb25zZSkge1xuICAgIHRoaXMuX2hpZGVMb2FkaW5nTWFzaygpO1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09PSA0MDEpIHtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4odGhpcy5sb2NhbGUudHJhbnNsYXRlKCdzZXNzaW9uVGltZWRPdXQnKSk7XG4gICAgfSBlbHNlIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09PSA0MDMpIHtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4odGhpcy5sb2NhbGUudHJhbnNsYXRlKCdhY2Nlc3NEZW5pZWQnKSk7XG4gICAgfSBlbHNlIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09PSA1MDApIHtcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKHRoaXMubG9jYWxlLnRyYW5zbGF0ZSgnaW50ZXJuYWxTZXJ2ZXJFcnJvcicpKTtcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnRpbWVvdXQgPT09IHRydWUpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKHRoaXMubG9jYWxlLnRyYW5zbGF0ZSgncmVxdWVzdFRpbWVvdXQnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKHRoaXMubG9jYWxlLnRyYW5zbGF0ZSgnZXJyb3JIYXBwZW5kJykpO1xuICAgIH1cbiAgfVxufVxuIl19