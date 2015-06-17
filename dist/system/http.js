System.register(['aurelia-http-client', 'jquery', 'aurelia-dependency-injection', './session', './logger', './locale', './config'], function (_export) {
  'use strict';

  var HttpClient, $, inject, Session, Logger, Locale, Config, Http;

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
    }],
    execute: function () {
      Http = (function () {
        function Http(session, logger) {
          _classCallCheck(this, _Http);

          this.session = session;
          this.logger = logger;
          this.authHttp = undefined;
          this.locale = Locale.Repository['default'];

          this.host = Config.httpOpts.serviceHost;
          this.origin = this.host + 'api/';
          this.authOrigin = Config.httpOpts.authHost;
          this.requestTimeout = Config.httpOpts.requestTimeout;

          if (this.session.userRemembered()) {
            this.initAuthHttp(this.session.rememberedToken());
          }
        }

        var _Http = Http;

        _Http.prototype.get = function get(url) {
          var promise = this.authHttp.get(url).then(function (response) {
            return JSON.parse(response.response);
          });
          promise['catch'](this.errorHandler.bind(this));
          return promise;
        };

        _Http.prototype.post = function post(url) {
          var content = arguments[1] === undefined ? {} : arguments[1];

          var promise = this.authHttp.post(url, content).then(function (response) {
            if (response.response !== '') {
              return JSON.parse(response.response);
            }
          });
          promise['catch'](this.errorHandler.bind(this));

          return promise;
        };

        _Http.prototype.put = function put(url) {
          var content = arguments[1] === undefined ? {} : arguments[1];

          var promise = this.authHttp.put(url, content);
          promise['catch'](this.errorHandler.bind(this));
          return promise;
        };

        _Http.prototype['delete'] = function _delete(url) {
          var promise = this.authHttp['delete'](url);
          promise['catch'](this.errorHandler.bind(this));
          return promise;
        };

        _Http.prototype.multipartFormPost = function multipartFormPost(url, data) {
          var requestUrl = thos.origin + url;
          return this.multipartForm(requestUrl, data, 'POST');
        };

        _Http.prototype.multipartFormPut = function multipartFormPut(url, data) {
          var requestUrl = thos.origin + url;
          return this.multipartForm(requestUrl, data, 'PUT');
        };

        _Http.prototype.multipartForm = function multipartForm(url, data, method) {
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
          })['catch'](this.errorHandler.bind(this));
        };

        _Http.prototype.postDownloadFile = function postDownloadFile(url, data) {
          var _this = this;

          var urlAddress = '' + this.host + 'api/' + url;
          var authHeaderValue = 'Bearer ' + this.token;
          var promise = new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', urlAddress, true);
            xmlhttp.timeout = _this.requestTimeout;
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
            });
            xmlhttp.send(JSON.stringify(data));
          });

          promise['catch'](this.errorHandler.bind(this));
          return promise;
        };

        _Http.prototype.loginBasicAuth = function loginBasicAuth(email, pass) {
          var client = new HttpClient();
          var encodedData = window.btoa(email + ':' + pass);
          return client.createRequest('token').asGet().withBaseUrl(this.authOrigin).withHeader('Authorization', 'Basic ' + encodedData).send().then(this.loginHandle.bind(this))['catch'](this.errorHandler.bind(this));
        };

        _Http.prototype.loginResourceOwner = function loginResourceOwner(email, pass) {
          var _this2 = this;

          var data = {
            grant_type: 'password',
            username: email,
            password: pass
          };

          var client = new HttpClient().configure(function (x) {
            x.withBaseUrl(_this2.authOrigin);
            x.withHeader('Content-Type', 'application/x-www-form-urlencoded');
          });

          var promise = client.post('token', $.param(data));
          promise.then(this.loginHandle.bind(this));
          promise['catch'](this.errorHandler.bind(this));

          return promise;
        };

        _Http.prototype.initAuthHttp = function initAuthHttp(token) {
          var _this3 = this;

          this.token = token;
          this.authHttp = new HttpClient().configure(function (x) {
            x.withBaseUrl(_this3.origin);
            x.withHeader('Authorization', 'Bearer ' + token);
            x.withHeader('Content-Type', 'application/json');
          });
        };

        _Http.prototype._convertToArray = function _convertToArray(value) {
          var result = value || [];
          if (typeof result === 'string') {
            return result.split(',');
          }

          return result;
        };

        _Http.prototype.loginHandle = function loginHandle(response) {
          var data = JSON.parse(response.response);
          var token = data.access_token;
          this.initAuthHttp(token);

          this.session.setUser({
            token: token,
            userName: data.userName || 'please give me a name!',
            userClaims: data.userClaims || [],
            userRoles: this._convertToArray(data.userRoles),
            userAccessRights: this._convertToArray(data.userAccessRights)
          });
        };

        _Http.prototype.errorHandler = function errorHandler(response) {
          if (response.statusCode === 401) {
            this.logger.warn(this.locale.translate('sessionTimedOut'));
          } else if (response.statusCode === 403) {
            this.logger.warn(this.locale.translate('accessDenied'));
          } else if (response.statusCode === 500) {
            this.logger.error(this.locale.translate('internalServerError'));
          } else if (response.timeout === true) {
            this.logger.error(this.locale.translate('requestTimeout'));
          } else {
            this.logger.error('TODO: Implement ajax fails!');
          }
        };

        Http = inject(Session, Logger)(Http) || Http;
        return Http;
      })();

      _export('Http', Http);
    }
  };
});