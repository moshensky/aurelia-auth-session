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

        _createClass(Session, [{
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

        var _Session = Session;
        Session = inject(Router, Logger)(Session) || Session;
        return Session;
      })();

      _export('Session', Session);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QU8sS0FBUCxPQUFPO2VBQVAsT0FBTyIsImZpbGUiOiJzZXNzaW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbW9zaGVuc2t5IG9uIDYvMTYvMTUuXHJcbiAqL1xyXG5pbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1kZXBlbmRlbmN5LWluamVjdGlvbic7XHJcbmltcG9ydCB7Um91dGVyfSBmcm9tICdhdXJlbGlhLXJvdXRlcic7XHJcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICcuL2xvZ2dlcic7XHJcblxyXG5jb25zdCBjb25zdGFudCA9IHtcclxuICBhcHBEYXRhOiAnYXBwRGF0YSdcclxufTtcclxuXHJcbkBpbmplY3QoUm91dGVyLCBMb2dnZXIpXHJcbmV4cG9ydCBjbGFzcyBTZXNzaW9uIHtcclxuXHJcbiAgY29uc3RydWN0b3Iocm91dGVyLCBsb2dnZXIpIHtcclxuICAgIHRoaXMucm91dGVyID0gcm91dGVyO1xyXG4gICAgdGhpcy5sb2cgPSBsb2dnZXI7XHJcblxyXG4gICAgdGhpcy5pbml0VXNlckRhdGEoKTtcclxuXHJcbiAgICBpZiAodGhpcy51c2VyUmVtZW1iZXJlZCgpKSB7XHJcbiAgICAgIHRoaXMucmVzdG9yZURhdGEoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGluaXRVc2VyRGF0YSgpIHtcclxuICAgIHRoaXMudXNlck5hbWUgPSBudWxsO1xyXG4gICAgdGhpcy51c2VyQ2xhaW1zID0gW107XHJcbiAgICB0aGlzLnVzZXJSb2xlcyA9IFtdO1xyXG4gICAgdGhpcy51c2VyQWNjZXNzUmlnaHRzID0gW107XHJcblxyXG4gICAgdGhpcy5pc0xvZ2dlZEluID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgc2V0VXNlcihkYXRhKSB7XHJcbiAgICBpZiAoZGF0YSkge1xyXG4gICAgICBsb2NhbFN0b3JhZ2VbY29uc3RhbnQuYXBwRGF0YV0gPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcclxuICAgICAgdGhpcy5yZXN0b3JlRGF0YSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2xlYXJVc2VyKCkge1xyXG4gICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcbiAgICB0aGlzLmluaXRVc2VyRGF0YSgpO1xyXG4gIH1cclxuXHJcbiAgdXNlckhhc0FjY2Vzc1JpZ2h0KHJlcXVpcmVkQWNjZXNzUmlnaHQpIHtcclxuICAgIHJldHVybiB0aGlzLnVzZXJBY2Nlc3NSaWdodHNbcmVxdWlyZWRBY2Nlc3NSaWdodF0gPT09IHRydWU7XHJcbiAgfVxyXG5cclxuICB1c2VySGFzQWxsQWNjZXNzUmlnaHRzKHJlcXVpcmVkQWNjZXNzUmlnaHRzKSB7XHJcbiAgICByZXR1cm4gcmVxdWlyZWRBY2Nlc3NSaWdodHMuZXZlcnkoYWNjZXNzUmlnaHQgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy51c2VySGFzQWNjZXNzUmlnaHQoYWNjZXNzUmlnaHQpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHVzZXJIYXNSb2xlKHJlcXVyZWRSb2xlKSB7XHJcbiAgICByZXR1cm4gdGhpcy51c2VyUm9sZXNbcmVxdXJlZFJvbGVdID09PSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgdXNlckhhc0F0TGVhc3RPbmVSb2xlKHJlcXVpcmVkUm9sZXMpIHtcclxuICAgIHJldHVybiByZXF1aXJlZFJvbGVzLnNvbWUocmVxdWlyZWRSb2xlID0+IHtcclxuICAgICAgcmV0dXJuIHRoaXMudXNlckhhc1JvbGUocmVxdWlyZWRSb2xlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0VXNlckNsYWltKGNsYWltVHlwZSkge1xyXG4gICAgcmV0dXJuIHRoaXMudXNlckNsYWltc1tjbGFpbVR5cGVdO1xyXG4gIH1cclxuXHJcbiAgaXNVc2VyTG9nZ2VkSW4oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pc0xvZ2dlZEluID09PSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgdXNlclJlbWVtYmVyZWQoKSB7XHJcbiAgICBsZXQgaXNJbkxvY2FsU3RvcmFnZSA9IGxvY2FsU3RvcmFnZVtjb25zdGFudC5hcHBEYXRhXSAhPT0gdW5kZWZpbmVkO1xyXG4gICAgcmV0dXJuIGlzSW5Mb2NhbFN0b3JhZ2U7XHJcbiAgfVxyXG5cclxuICByZXN0b3JlRGF0YSgpIHtcclxuICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZVtjb25zdGFudC5hcHBEYXRhXSk7XHJcblxyXG4gICAgdGhpcy51c2VyTmFtZSA9IGRhdGEudXNlck5hbWU7XHJcbiAgICB0aGlzLnVzZXJDbGFpbXMgPSBkYXRhLnVzZXJDbGFpbXMucmVkdWNlKGZ1bmN0aW9uIChoYXNoLCB1c2VyQ2xhaW0pIHtcclxuICAgICAgaGFzaFt1c2VyQ2xhaW0udHlwZV0gPSB1c2VyQ2xhaW0udmFsdWU7XHJcbiAgICAgIHJldHVybiBoYXNoO1xyXG4gICAgfSwge30pO1xyXG4gICAgdGhpcy51c2VyUm9sZXMgPSBkYXRhLnVzZXJSb2xlcy5yZWR1Y2UoKGhhc2gsIHVzZXJSb2xlKSA9PiB7XHJcbiAgICAgIGhhc2hbdXNlclJvbGVdID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuIGhhc2g7XHJcbiAgICB9LCB7fSk7XHJcbiAgICB0aGlzLnVzZXJBY2Nlc3NSaWdodHMgPSBkYXRhLnVzZXJBY2Nlc3NSaWdodHMucmVkdWNlKChoYXNoLCBhY2Nlc3NSaWdodCkgPT4ge1xyXG4gICAgICBoYXNoW2FjY2Vzc1JpZ2h0XSA9IHRydWU7XHJcbiAgICAgIHJldHVybiBoYXNoO1xyXG4gICAgfSwge30pO1xyXG5cclxuICAgIC8vIHRvZG86IGRlbGV0ZVxyXG4gICAgdGhpcy51c2VyQWNjZXNzUmlnaHRzWydhY2Nlc3MnXSA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5pc0xvZ2dlZEluID0gdHJ1ZTtcclxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKCcnKTtcclxuICB9XHJcblxyXG4gIHJlbWVtYmVyZWRUb2tlbigpIHtcclxuICAgIGNvbnN0IHRva2VuID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbY29uc3RhbnQuYXBwRGF0YV0pLnRva2VuO1xyXG4gICAgcmV0dXJuIHRva2VuO1xyXG4gIH1cclxuICBcclxuICBnZXRVc2VyTmFtZSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudXNlck5hbWU7XHJcbiAgfVxyXG59XHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
