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
//# sourceMappingURL=data:application/json;base64,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QU8sS0FBUCxPQUFPO2VBQVAsT0FBTyIsImZpbGUiOiJzZXNzaW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1vc2hlbnNreSBvbiA2LzE2LzE1LlxuICovXG5pbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1kZXBlbmRlbmN5LWluamVjdGlvbic7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInO1xuaW1wb3J0IHtMb2dnZXJ9IGZyb20gJy4vbG9nZ2VyJztcblxuY29uc3QgY29uc3RhbnQgPSB7XG4gIGFwcERhdGE6ICdhcHBEYXRhJ1xufTtcblxuQGluamVjdChSb3V0ZXIsIExvZ2dlcilcbmV4cG9ydCBjbGFzcyBTZXNzaW9uIHtcblxuICBjb25zdHJ1Y3Rvcihyb3V0ZXIsIGxvZ2dlcikge1xuICAgIHRoaXMucm91dGVyID0gcm91dGVyO1xuICAgIHRoaXMubG9nID0gbG9nZ2VyO1xuXG4gICAgdGhpcy5pbml0VXNlckRhdGEoKTtcblxuICAgIGlmICh0aGlzLnVzZXJSZW1lbWJlcmVkKCkpIHtcbiAgICAgIHRoaXMucmVzdG9yZURhdGEoKTtcbiAgICB9XG4gIH1cblxuICBpbml0VXNlckRhdGEoKSB7XG4gICAgdGhpcy51c2VyTmFtZSA9IG51bGw7XG4gICAgdGhpcy51c2VyQ2xhaW1zID0gW107XG4gICAgdGhpcy51c2VyUm9sZXMgPSBbXTtcbiAgICB0aGlzLnVzZXJBY2Nlc3NSaWdodHMgPSBbXTtcblxuICAgIHRoaXMuaXNMb2dnZWRJbiA9IGZhbHNlO1xuICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gIH1cblxuICBzZXRVc2VyKGRhdGEpIHtcbiAgICBpZiAoZGF0YSkge1xuICAgICAgbG9jYWxTdG9yYWdlW2NvbnN0YW50LmFwcERhdGFdID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgICB0aGlzLnJlc3RvcmVEYXRhKCk7XG4gICAgfVxuICB9XG5cbiAgY2xlYXJVc2VyKCkge1xuICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgIHRoaXMuaW5pdFVzZXJEYXRhKCk7XG4gIH1cblxuICB1c2VySGFzQWNjZXNzUmlnaHQocmVxdWlyZWRBY2Nlc3NSaWdodCkge1xuICAgIHJldHVybiB0aGlzLnVzZXJBY2Nlc3NSaWdodHNbcmVxdWlyZWRBY2Nlc3NSaWdodF0gPT09IHRydWU7XG4gIH1cblxuICB1c2VySGFzQWxsQWNjZXNzUmlnaHRzKHJlcXVpcmVkQWNjZXNzUmlnaHRzKSB7XG4gICAgcmV0dXJuIHJlcXVpcmVkQWNjZXNzUmlnaHRzLmV2ZXJ5KGFjY2Vzc1JpZ2h0ID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnVzZXJIYXNBY2Nlc3NSaWdodChhY2Nlc3NSaWdodCk7XG4gICAgfSlcbiAgfVxuXG4gIHVzZXJIYXNSb2xlKHJlcXVyZWRSb2xlKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlclJvbGVzW3JlcXVyZWRSb2xlXSA9PT0gdHJ1ZTtcbiAgfVxuXG4gIHVzZXJIYXNBdExlYXN0T25lUm9sZShyZXF1aXJlZFJvbGVzKSB7XG4gICAgcmV0dXJuIHJlcXVpcmVkUm9sZXMuc29tZShyZXF1aXJlZFJvbGUgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMudXNlckhhc1JvbGUocmVxdWlyZWRSb2xlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFVzZXJDbGFpbShjbGFpbVR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy51c2VyQ2xhaW1zW2NsYWltVHlwZV07XG4gIH1cblxuICBpc1VzZXJMb2dnZWRJbigpIHtcbiAgICByZXR1cm4gdGhpcy5pc0xvZ2dlZEluID09PSB0cnVlO1xuICB9XG5cbiAgdXNlclJlbWVtYmVyZWQoKSB7XG4gICAgbGV0IGlzSW5Mb2NhbFN0b3JhZ2UgPSBsb2NhbFN0b3JhZ2VbY29uc3RhbnQuYXBwRGF0YV0gIT09IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gaXNJbkxvY2FsU3RvcmFnZTtcbiAgfVxuXG4gIHJlc3RvcmVEYXRhKCkge1xuICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZVtjb25zdGFudC5hcHBEYXRhXSk7XG5cbiAgICB0aGlzLnVzZXJOYW1lID0gZGF0YS51c2VyTmFtZTtcbiAgICB0aGlzLnVzZXJDbGFpbXMgPSBkYXRhLnVzZXJDbGFpbXMucmVkdWNlKGZ1bmN0aW9uIChoYXNoLCB1c2VyQ2xhaW0pIHtcbiAgICAgIGhhc2hbdXNlckNsYWltLnR5cGVdID0gdXNlckNsYWltLnZhbHVlO1xuICAgICAgcmV0dXJuIGhhc2g7XG4gICAgfSwge30pO1xuICAgIHRoaXMudXNlclJvbGVzID0gZGF0YS51c2VyUm9sZXMucmVkdWNlKChoYXNoLCB1c2VyUm9sZSkgPT4ge1xuICAgICAgaGFzaFt1c2VyUm9sZV0gPSB0cnVlO1xuICAgICAgcmV0dXJuIGhhc2g7XG4gICAgfSwge30pO1xuICAgIHRoaXMudXNlckFjY2Vzc1JpZ2h0cyA9IGRhdGEudXNlckFjY2Vzc1JpZ2h0cy5yZWR1Y2UoKGhhc2gsIGFjY2Vzc1JpZ2h0KSA9PiB7XG4gICAgICBoYXNoW2FjY2Vzc1JpZ2h0XSA9IHRydWU7XG4gICAgICByZXR1cm4gaGFzaDtcbiAgICB9LCB7fSk7XG5cbiAgICAvLyB0b2RvOiBkZWxldGVcbiAgICB0aGlzLnVzZXJBY2Nlc3NSaWdodHNbJ2FjY2VzcyddID0gdHJ1ZTtcblxuICAgIHRoaXMuaXNMb2dnZWRJbiA9IHRydWU7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoJycpO1xuICB9XG5cbiAgcmVtZW1iZXJlZFRva2VuKCkge1xuICAgIGNvbnN0IHRva2VuID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbY29uc3RhbnQuYXBwRGF0YV0pLnRva2VuO1xuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuICBcbiAgZ2V0VXNlck5hbWUoKSB7XG4gICAgICByZXR1cm4gdGhpcy51c2VyTmFtZTtcbiAgfVxufVxuXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=