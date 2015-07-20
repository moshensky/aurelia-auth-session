System.register(['aurelia-dependency-injection', 'aurelia-router', './logger'], function (_export) {
  'use strict';

  var inject, Router, Logger, constant, Session;

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

        _Session.prototype.initUserData = function initUserData() {
          this.userName = null;
          this.userClaims = [];
          this.userRoles = [];
          this.userAccessRights = [];

          this.isLoggedIn = false;
          this.isBusy = false;
        };

        _Session.prototype.setUser = function setUser(data) {
          if (data) {
            localStorage[constant.appData] = JSON.stringify(data);
            this.restoreData();
          }
        };

        _Session.prototype.clearUser = function clearUser() {
          localStorage.clear();
          this.initUserData();
        };

        _Session.prototype.userHasAccessRight = function userHasAccessRight(requiredAccessRight) {
          return this.userAccessRights[requiredAccessRight] === true;
        };

        _Session.prototype.userHasAllAccessRights = function userHasAllAccessRights(requiredAccessRights) {
          var _this = this;

          return requiredAccessRights.every(function (accessRight) {
            return _this.userHasAccessRight(accessRight);
          });
        };

        _Session.prototype.userHasRole = function userHasRole(requredRole) {
          return this.userRoles[requredRole] === true;
        };

        _Session.prototype.userHasAtLeastOneRole = function userHasAtLeastOneRole(requiredRoles) {
          var _this2 = this;

          return requiredRoles.some(function (requiredRole) {
            return _this2.userHasRole(requiredRole);
          });
        };

        _Session.prototype.getUserClaim = function getUserClaim(claimType) {
          return this.userClaims[claimType];
        };

        _Session.prototype.isUserLoggedIn = function isUserLoggedIn() {
          return this.isLoggedIn === true;
        };

        _Session.prototype.userRemembered = function userRemembered() {
          var isInLocalStorage = localStorage[constant.appData] !== undefined;
          return isInLocalStorage;
        };

        _Session.prototype.restoreData = function restoreData() {
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
        };

        _Session.prototype.rememberedToken = function rememberedToken() {
          var token = JSON.parse(localStorage[constant.appData]).token;
          return token;
        };

        _Session.prototype.getUserName = function getUserName() {
          return this.userName;
        };

        Session = inject(Router, Logger)(Session) || Session;
        return Session;
      })();

      _export('Session', Session);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlc3Npb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzhCQU9NLFFBQVEsRUFLRCxPQUFPOzs7Ozs7MkNBVFosTUFBTTs7OEJBQ04sTUFBTTs7dUJBQ04sTUFBTTs7O0FBRVIsY0FBUSxHQUFHO0FBQ2YsZUFBTyxFQUFFLFNBQVM7T0FDbkI7O0FBR1ksYUFBTztBQUVQLGlCQUZBLE9BQU8sQ0FFTixNQUFNLEVBQUUsTUFBTSxFQUFFOzs7QUFDMUIsY0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsY0FBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7O0FBRWxCLGNBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7QUFFcEIsY0FBSSxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUU7QUFDekIsZ0JBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztXQUNwQjtTQUNGOzt1QkFYVSxPQUFPOzsyQkFhbEIsWUFBWSxHQUFBLHdCQUFHO0FBQ2IsY0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDckIsY0FBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFDckIsY0FBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDcEIsY0FBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQzs7QUFFM0IsY0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFDeEIsY0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDckI7OzJCQUVELE9BQU8sR0FBQSxpQkFBQyxJQUFJLEVBQUU7QUFDWixjQUFJLElBQUksRUFBRTtBQUNSLHdCQUFZLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEQsZ0JBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztXQUNwQjtTQUNGOzsyQkFFRCxTQUFTLEdBQUEscUJBQUc7QUFDVixzQkFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ3JCLGNBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQjs7MkJBRUQsa0JBQWtCLEdBQUEsNEJBQUMsbUJBQW1CLEVBQUU7QUFDdEMsaUJBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLEtBQUssSUFBSSxDQUFDO1NBQzVEOzsyQkFFRCxzQkFBc0IsR0FBQSxnQ0FBQyxvQkFBb0IsRUFBRTs7O0FBQzNDLGlCQUFPLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxVQUFBLFdBQVcsRUFBSTtBQUMvQyxtQkFBTyxNQUFLLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1dBQzdDLENBQUMsQ0FBQTtTQUNIOzsyQkFFRCxXQUFXLEdBQUEscUJBQUMsV0FBVyxFQUFFO0FBQ3ZCLGlCQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssSUFBSSxDQUFDO1NBQzdDOzsyQkFFRCxxQkFBcUIsR0FBQSwrQkFBQyxhQUFhLEVBQUU7OztBQUNuQyxpQkFBTyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQUEsWUFBWSxFQUFJO0FBQ3hDLG1CQUFPLE9BQUssV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1dBQ3ZDLENBQUMsQ0FBQztTQUNKOzsyQkFFRCxZQUFZLEdBQUEsc0JBQUMsU0FBUyxFQUFFO0FBQ3RCLGlCQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDbkM7OzJCQUVELGNBQWMsR0FBQSwwQkFBRztBQUNmLGlCQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDO1NBQ2pDOzsyQkFFRCxjQUFjLEdBQUEsMEJBQUc7QUFDZixjQUFJLGdCQUFnQixHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssU0FBUyxDQUFDO0FBQ3BFLGlCQUFPLGdCQUFnQixDQUFDO1NBQ3pCOzsyQkFFRCxXQUFXLEdBQUEsdUJBQUc7QUFDWixjQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7QUFFeEQsY0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0FBQzlCLGNBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLEVBQUUsU0FBUyxFQUFFO0FBQ2xFLGdCQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7QUFDdkMsbUJBQU8sSUFBSSxDQUFDO1dBQ2IsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNQLGNBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFLO0FBQ3pELGdCQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLG1CQUFPLElBQUksQ0FBQztXQUNiLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDUCxjQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUksRUFBRSxXQUFXLEVBQUs7QUFDMUUsZ0JBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDekIsbUJBQU8sSUFBSSxDQUFDO1dBQ2IsRUFBRSxFQUFFLENBQUMsQ0FBQzs7QUFHUCxjQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDOztBQUV2QyxjQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztBQUN2QixjQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMxQjs7MkJBRUQsZUFBZSxHQUFBLDJCQUFHO0FBQ2hCLGNBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUMvRCxpQkFBTyxLQUFLLENBQUM7U0FDZDs7MkJBRUQsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsaUJBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUN4Qjs7QUFuR1UsZUFBTyxHQURuQixNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUNWLE9BQU8sS0FBUCxPQUFPO2VBQVAsT0FBTzs7O3lCQUFQLE9BQU8iLCJmaWxlIjoic2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtb3NoZW5za3kgb24gNi8xNi8xNS5cbiAqL1xuaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZGVwZW5kZW5jeS1pbmplY3Rpb24nO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJ2F1cmVsaWEtcm91dGVyJztcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICcuL2xvZ2dlcic7XG5cbmNvbnN0IGNvbnN0YW50ID0ge1xuICBhcHBEYXRhOiAnYXBwRGF0YSdcbn07XG5cbkBpbmplY3QoUm91dGVyLCBMb2dnZXIpXG5leHBvcnQgY2xhc3MgU2Vzc2lvbiB7XG5cbiAgY29uc3RydWN0b3Iocm91dGVyLCBsb2dnZXIpIHtcbiAgICB0aGlzLnJvdXRlciA9IHJvdXRlcjtcbiAgICB0aGlzLmxvZyA9IGxvZ2dlcjtcblxuICAgIHRoaXMuaW5pdFVzZXJEYXRhKCk7XG5cbiAgICBpZiAodGhpcy51c2VyUmVtZW1iZXJlZCgpKSB7XG4gICAgICB0aGlzLnJlc3RvcmVEYXRhKCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdFVzZXJEYXRhKCkge1xuICAgIHRoaXMudXNlck5hbWUgPSBudWxsO1xuICAgIHRoaXMudXNlckNsYWltcyA9IFtdO1xuICAgIHRoaXMudXNlclJvbGVzID0gW107XG4gICAgdGhpcy51c2VyQWNjZXNzUmlnaHRzID0gW107XG5cbiAgICB0aGlzLmlzTG9nZ2VkSW4gPSBmYWxzZTtcbiAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICB9XG5cbiAgc2V0VXNlcihkYXRhKSB7XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIGxvY2FsU3RvcmFnZVtjb25zdGFudC5hcHBEYXRhXSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgICAgdGhpcy5yZXN0b3JlRGF0YSgpO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyVXNlcigpIHtcbiAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICB0aGlzLmluaXRVc2VyRGF0YSgpO1xuICB9XG5cbiAgdXNlckhhc0FjY2Vzc1JpZ2h0KHJlcXVpcmVkQWNjZXNzUmlnaHQpIHtcbiAgICByZXR1cm4gdGhpcy51c2VyQWNjZXNzUmlnaHRzW3JlcXVpcmVkQWNjZXNzUmlnaHRdID09PSB0cnVlO1xuICB9XG5cbiAgdXNlckhhc0FsbEFjY2Vzc1JpZ2h0cyhyZXF1aXJlZEFjY2Vzc1JpZ2h0cykge1xuICAgIHJldHVybiByZXF1aXJlZEFjY2Vzc1JpZ2h0cy5ldmVyeShhY2Nlc3NSaWdodCA9PiB7XG4gICAgICByZXR1cm4gdGhpcy51c2VySGFzQWNjZXNzUmlnaHQoYWNjZXNzUmlnaHQpO1xuICAgIH0pXG4gIH1cblxuICB1c2VySGFzUm9sZShyZXF1cmVkUm9sZSkge1xuICAgIHJldHVybiB0aGlzLnVzZXJSb2xlc1tyZXF1cmVkUm9sZV0gPT09IHRydWU7XG4gIH1cblxuICB1c2VySGFzQXRMZWFzdE9uZVJvbGUocmVxdWlyZWRSb2xlcykge1xuICAgIHJldHVybiByZXF1aXJlZFJvbGVzLnNvbWUocmVxdWlyZWRSb2xlID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnVzZXJIYXNSb2xlKHJlcXVpcmVkUm9sZSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRVc2VyQ2xhaW0oY2xhaW1UeXBlKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlckNsYWltc1tjbGFpbVR5cGVdO1xuICB9XG5cbiAgaXNVc2VyTG9nZ2VkSW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNMb2dnZWRJbiA9PT0gdHJ1ZTtcbiAgfVxuXG4gIHVzZXJSZW1lbWJlcmVkKCkge1xuICAgIGxldCBpc0luTG9jYWxTdG9yYWdlID0gbG9jYWxTdG9yYWdlW2NvbnN0YW50LmFwcERhdGFdICE9PSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIGlzSW5Mb2NhbFN0b3JhZ2U7XG4gIH1cblxuICByZXN0b3JlRGF0YSgpIHtcbiAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbY29uc3RhbnQuYXBwRGF0YV0pO1xuXG4gICAgdGhpcy51c2VyTmFtZSA9IGRhdGEudXNlck5hbWU7XG4gICAgdGhpcy51c2VyQ2xhaW1zID0gZGF0YS51c2VyQ2xhaW1zLnJlZHVjZShmdW5jdGlvbiAoaGFzaCwgdXNlckNsYWltKSB7XG4gICAgICBoYXNoW3VzZXJDbGFpbS50eXBlXSA9IHVzZXJDbGFpbS52YWx1ZTtcbiAgICAgIHJldHVybiBoYXNoO1xuICAgIH0sIHt9KTtcbiAgICB0aGlzLnVzZXJSb2xlcyA9IGRhdGEudXNlclJvbGVzLnJlZHVjZSgoaGFzaCwgdXNlclJvbGUpID0+IHtcbiAgICAgIGhhc2hbdXNlclJvbGVdID0gdHJ1ZTtcbiAgICAgIHJldHVybiBoYXNoO1xuICAgIH0sIHt9KTtcbiAgICB0aGlzLnVzZXJBY2Nlc3NSaWdodHMgPSBkYXRhLnVzZXJBY2Nlc3NSaWdodHMucmVkdWNlKChoYXNoLCBhY2Nlc3NSaWdodCkgPT4ge1xuICAgICAgaGFzaFthY2Nlc3NSaWdodF0gPSB0cnVlO1xuICAgICAgcmV0dXJuIGhhc2g7XG4gICAgfSwge30pO1xuXG4gICAgLy8gdG9kbzogZGVsZXRlXG4gICAgdGhpcy51c2VyQWNjZXNzUmlnaHRzWydhY2Nlc3MnXSA9IHRydWU7XG5cbiAgICB0aGlzLmlzTG9nZ2VkSW4gPSB0cnVlO1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKCcnKTtcbiAgfVxuXG4gIHJlbWVtYmVyZWRUb2tlbigpIHtcbiAgICBjb25zdCB0b2tlbiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlW2NvbnN0YW50LmFwcERhdGFdKS50b2tlbjtcbiAgICByZXR1cm4gdG9rZW47XG4gIH1cbiAgXG4gIGdldFVzZXJOYW1lKCkge1xuICAgICAgcmV0dXJuIHRoaXMudXNlck5hbWU7XG4gIH1cbn1cblxuIl19