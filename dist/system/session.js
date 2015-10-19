System.register(['aurelia-dependency-injection', 'aurelia-router', './logger'], function (_export) {
  'use strict';

  var inject, Router, Logger, constant, Session;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
    }, function (_logger) {
      Logger = _logger.Logger;
    }],
    execute: function () {
      constant = {
        appData: 'appData'
      };

      Session = (function () {
        function Session(router, logger) {
          _classCallCheck(this, _Session);

          this.router = router;
          this.log = logger;

          this.initUserData();

          if (this.userRemembered()) {
            this.restoreData();
          }
        }

        var _Session = Session;

        _createClass(_Session, [{
          key: 'initUserData',
          value: function initUserData() {
            this.userName = null;
            this.userClaims = [];
            this.userRoles = [];
            this.userAccessRights = [];

            this.isLoggedIn = false;
            this.isBusy = false;
          }
        }, {
          key: 'setUser',
          value: function setUser(data) {
            if (data) {
              localStorage[constant.appData] = JSON.stringify(data);
              this.restoreData();
            }
          }
        }, {
          key: 'clearUser',
          value: function clearUser() {
            localStorage.clear();
            this.initUserData();
          }
        }, {
          key: 'userHasAccessRight',
          value: function userHasAccessRight(requiredAccessRight) {
            return this.userAccessRights[requiredAccessRight] === true;
          }
        }, {
          key: 'userHasAllAccessRights',
          value: function userHasAllAccessRights(requiredAccessRights) {
            var _this = this;

            return requiredAccessRights.every(function (accessRight) {
              return _this.userHasAccessRight(accessRight);
            });
          }
        }, {
          key: 'userHasRole',
          value: function userHasRole(requredRole) {
            return this.userRoles[requredRole] === true;
          }
        }, {
          key: 'userHasAtLeastOneRole',
          value: function userHasAtLeastOneRole(requiredRoles) {
            var _this2 = this;

            return requiredRoles.some(function (requiredRole) {
              return _this2.userHasRole(requiredRole);
            });
          }
        }, {
          key: 'getUserClaim',
          value: function getUserClaim(claimType) {
            return this.userClaims[claimType];
          }
        }, {
          key: 'isUserLoggedIn',
          value: function isUserLoggedIn() {
            return this.isLoggedIn === true;
          }
        }, {
          key: 'userRemembered',
          value: function userRemembered() {
            var isInLocalStorage = localStorage[constant.appData] !== undefined;
            return isInLocalStorage;
          }
        }, {
          key: 'restoreData',
          value: function restoreData() {
            var data = JSON.parse(localStorage[constant.appData]);

            this.userName = data.userName;
            this.userClaims = data.userClaims.reduce(function (hash, userClaim) {
              hash[userClaim.type] = userClaim.value;
              return hash;
            }, {});
            this.userRoles = data.userRoles.reduce(function (hash, userRole) {
              hash[userRole] = true;
              return hash;
            }, {});
            this.userAccessRights = data.userAccessRights.reduce(function (hash, accessRight) {
              hash[accessRight] = true;
              return hash;
            }, {});

            this.userAccessRights['access'] = true;

            this.isLoggedIn = true;
            this.router.navigate('');
          }
        }, {
          key: 'rememberedToken',
          value: function rememberedToken() {
            var token = JSON.parse(localStorage[constant.appData]).token;
            return token;
          }
        }, {
          key: 'getUserName',
          value: function getUserName() {
            return this.userName;
          }
        }]);

        Session = inject(Router, Logger)(Session) || Session;
        return Session;
      })();

      _export('Session', Session);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QUFPO2VBQVAsT0FBTzs7O3lCQUFQLE9BQU8iLCJmaWxlIjoic2Vzc2lvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtb3NoZW5za3kgb24gNi8xNi8xNS5cbiAqL1xuaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZGVwZW5kZW5jeS1pbmplY3Rpb24nO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJ2F1cmVsaWEtcm91dGVyJztcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICcuL2xvZ2dlcic7XG5cbmNvbnN0IGNvbnN0YW50ID0ge1xuICBhcHBEYXRhOiAnYXBwRGF0YSdcbn07XG5cbkBpbmplY3QoUm91dGVyLCBMb2dnZXIpXG5leHBvcnQgY2xhc3MgU2Vzc2lvbiB7XG5cbiAgY29uc3RydWN0b3Iocm91dGVyLCBsb2dnZXIpIHtcbiAgICB0aGlzLnJvdXRlciA9IHJvdXRlcjtcbiAgICB0aGlzLmxvZyA9IGxvZ2dlcjtcblxuICAgIHRoaXMuaW5pdFVzZXJEYXRhKCk7XG5cbiAgICBpZiAodGhpcy51c2VyUmVtZW1iZXJlZCgpKSB7XG4gICAgICB0aGlzLnJlc3RvcmVEYXRhKCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdFVzZXJEYXRhKCkge1xuICAgIHRoaXMudXNlck5hbWUgPSBudWxsO1xuICAgIHRoaXMudXNlckNsYWltcyA9IFtdO1xuICAgIHRoaXMudXNlclJvbGVzID0gW107XG4gICAgdGhpcy51c2VyQWNjZXNzUmlnaHRzID0gW107XG5cbiAgICB0aGlzLmlzTG9nZ2VkSW4gPSBmYWxzZTtcbiAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICB9XG5cbiAgc2V0VXNlcihkYXRhKSB7XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIGxvY2FsU3RvcmFnZVtjb25zdGFudC5hcHBEYXRhXSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgICAgdGhpcy5yZXN0b3JlRGF0YSgpO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyVXNlcigpIHtcbiAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICB0aGlzLmluaXRVc2VyRGF0YSgpO1xuICB9XG5cbiAgdXNlckhhc0FjY2Vzc1JpZ2h0KHJlcXVpcmVkQWNjZXNzUmlnaHQpIHtcbiAgICByZXR1cm4gdGhpcy51c2VyQWNjZXNzUmlnaHRzW3JlcXVpcmVkQWNjZXNzUmlnaHRdID09PSB0cnVlO1xuICB9XG5cbiAgdXNlckhhc0FsbEFjY2Vzc1JpZ2h0cyhyZXF1aXJlZEFjY2Vzc1JpZ2h0cykge1xuICAgIHJldHVybiByZXF1aXJlZEFjY2Vzc1JpZ2h0cy5ldmVyeShhY2Nlc3NSaWdodCA9PiB7XG4gICAgICByZXR1cm4gdGhpcy51c2VySGFzQWNjZXNzUmlnaHQoYWNjZXNzUmlnaHQpO1xuICAgIH0pXG4gIH1cblxuICB1c2VySGFzUm9sZShyZXF1cmVkUm9sZSkge1xuICAgIHJldHVybiB0aGlzLnVzZXJSb2xlc1tyZXF1cmVkUm9sZV0gPT09IHRydWU7XG4gIH1cblxuICB1c2VySGFzQXRMZWFzdE9uZVJvbGUocmVxdWlyZWRSb2xlcykge1xuICAgIHJldHVybiByZXF1aXJlZFJvbGVzLnNvbWUocmVxdWlyZWRSb2xlID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnVzZXJIYXNSb2xlKHJlcXVpcmVkUm9sZSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRVc2VyQ2xhaW0oY2xhaW1UeXBlKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlckNsYWltc1tjbGFpbVR5cGVdO1xuICB9XG5cbiAgaXNVc2VyTG9nZ2VkSW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNMb2dnZWRJbiA9PT0gdHJ1ZTtcbiAgfVxuXG4gIHVzZXJSZW1lbWJlcmVkKCkge1xuICAgIGxldCBpc0luTG9jYWxTdG9yYWdlID0gbG9jYWxTdG9yYWdlW2NvbnN0YW50LmFwcERhdGFdICE9PSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIGlzSW5Mb2NhbFN0b3JhZ2U7XG4gIH1cblxuICByZXN0b3JlRGF0YSgpIHtcbiAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbY29uc3RhbnQuYXBwRGF0YV0pO1xuXG4gICAgdGhpcy51c2VyTmFtZSA9IGRhdGEudXNlck5hbWU7XG4gICAgdGhpcy51c2VyQ2xhaW1zID0gZGF0YS51c2VyQ2xhaW1zLnJlZHVjZShmdW5jdGlvbiAoaGFzaCwgdXNlckNsYWltKSB7XG4gICAgICBoYXNoW3VzZXJDbGFpbS50eXBlXSA9IHVzZXJDbGFpbS52YWx1ZTtcbiAgICAgIHJldHVybiBoYXNoO1xuICAgIH0sIHt9KTtcbiAgICB0aGlzLnVzZXJSb2xlcyA9IGRhdGEudXNlclJvbGVzLnJlZHVjZSgoaGFzaCwgdXNlclJvbGUpID0+IHtcbiAgICAgIGhhc2hbdXNlclJvbGVdID0gdHJ1ZTtcbiAgICAgIHJldHVybiBoYXNoO1xuICAgIH0sIHt9KTtcbiAgICB0aGlzLnVzZXJBY2Nlc3NSaWdodHMgPSBkYXRhLnVzZXJBY2Nlc3NSaWdodHMucmVkdWNlKChoYXNoLCBhY2Nlc3NSaWdodCkgPT4ge1xuICAgICAgaGFzaFthY2Nlc3NSaWdodF0gPSB0cnVlO1xuICAgICAgcmV0dXJuIGhhc2g7XG4gICAgfSwge30pO1xuXG4gICAgLy8gdG9kbzogZGVsZXRlXG4gICAgdGhpcy51c2VyQWNjZXNzUmlnaHRzWydhY2Nlc3MnXSA9IHRydWU7XG5cbiAgICB0aGlzLmlzTG9nZ2VkSW4gPSB0cnVlO1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKCcnKTtcbiAgfVxuXG4gIHJlbWVtYmVyZWRUb2tlbigpIHtcbiAgICBjb25zdCB0b2tlbiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlW2NvbnN0YW50LmFwcERhdGFdKS50b2tlbjtcbiAgICByZXR1cm4gdG9rZW47XG4gIH1cbiAgXG4gIGdldFVzZXJOYW1lKCkge1xuICAgICAgcmV0dXJuIHRoaXMudXNlck5hbWU7XG4gIH1cbn1cblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9