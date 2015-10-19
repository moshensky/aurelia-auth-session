define(['exports', 'aurelia-dependency-injection', 'aurelia-router', './logger'], function (exports, _aureliaDependencyInjection, _aureliaRouter, _logger) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var constant = {
    appData: 'appData'
  };

  var Session = (function () {
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

    Session = (0, _aureliaDependencyInjection.inject)(_aureliaRouter.Router, _logger.Logger)(Session) || Session;
    return Session;
  })();

  exports.Session = Session;
});
//# sourceMappingURL=data:application/json;base64,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ZWF0ZWQgYnkgbW9zaGVuc2t5IG9uIDYvMTYvMTUuXG4gKi9cbmltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWRlcGVuZGVuY3ktaW5qZWN0aW9uJztcbmltcG9ydCB7Um91dGVyfSBmcm9tICdhdXJlbGlhLXJvdXRlcic7XG5pbXBvcnQge0xvZ2dlcn0gZnJvbSAnLi9sb2dnZXInO1xuXG5jb25zdCBjb25zdGFudCA9IHtcbiAgYXBwRGF0YTogJ2FwcERhdGEnXG59O1xuXG5AaW5qZWN0KFJvdXRlciwgTG9nZ2VyKVxuZXhwb3J0IGNsYXNzIFNlc3Npb24ge1xuXG4gIGNvbnN0cnVjdG9yKHJvdXRlciwgbG9nZ2VyKSB7XG4gICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG4gICAgdGhpcy5sb2cgPSBsb2dnZXI7XG5cbiAgICB0aGlzLmluaXRVc2VyRGF0YSgpO1xuXG4gICAgaWYgKHRoaXMudXNlclJlbWVtYmVyZWQoKSkge1xuICAgICAgdGhpcy5yZXN0b3JlRGF0YSgpO1xuICAgIH1cbiAgfVxuXG4gIGluaXRVc2VyRGF0YSgpIHtcbiAgICB0aGlzLnVzZXJOYW1lID0gbnVsbDtcbiAgICB0aGlzLnVzZXJDbGFpbXMgPSBbXTtcbiAgICB0aGlzLnVzZXJSb2xlcyA9IFtdO1xuICAgIHRoaXMudXNlckFjY2Vzc1JpZ2h0cyA9IFtdO1xuXG4gICAgdGhpcy5pc0xvZ2dlZEluID0gZmFsc2U7XG4gICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgfVxuXG4gIHNldFVzZXIoZGF0YSkge1xuICAgIGlmIChkYXRhKSB7XG4gICAgICBsb2NhbFN0b3JhZ2VbY29uc3RhbnQuYXBwRGF0YV0gPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICAgIHRoaXMucmVzdG9yZURhdGEoKTtcbiAgICB9XG4gIH1cblxuICBjbGVhclVzZXIoKSB7XG4gICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgdGhpcy5pbml0VXNlckRhdGEoKTtcbiAgfVxuXG4gIHVzZXJIYXNBY2Nlc3NSaWdodChyZXF1aXJlZEFjY2Vzc1JpZ2h0KSB7XG4gICAgcmV0dXJuIHRoaXMudXNlckFjY2Vzc1JpZ2h0c1tyZXF1aXJlZEFjY2Vzc1JpZ2h0XSA9PT0gdHJ1ZTtcbiAgfVxuXG4gIHVzZXJIYXNBbGxBY2Nlc3NSaWdodHMocmVxdWlyZWRBY2Nlc3NSaWdodHMpIHtcbiAgICByZXR1cm4gcmVxdWlyZWRBY2Nlc3NSaWdodHMuZXZlcnkoYWNjZXNzUmlnaHQgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMudXNlckhhc0FjY2Vzc1JpZ2h0KGFjY2Vzc1JpZ2h0KTtcbiAgICB9KVxuICB9XG5cbiAgdXNlckhhc1JvbGUocmVxdXJlZFJvbGUpIHtcbiAgICByZXR1cm4gdGhpcy51c2VyUm9sZXNbcmVxdXJlZFJvbGVdID09PSB0cnVlO1xuICB9XG5cbiAgdXNlckhhc0F0TGVhc3RPbmVSb2xlKHJlcXVpcmVkUm9sZXMpIHtcbiAgICByZXR1cm4gcmVxdWlyZWRSb2xlcy5zb21lKHJlcXVpcmVkUm9sZSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy51c2VySGFzUm9sZShyZXF1aXJlZFJvbGUpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0VXNlckNsYWltKGNsYWltVHlwZSkge1xuICAgIHJldHVybiB0aGlzLnVzZXJDbGFpbXNbY2xhaW1UeXBlXTtcbiAgfVxuXG4gIGlzVXNlckxvZ2dlZEluKCkge1xuICAgIHJldHVybiB0aGlzLmlzTG9nZ2VkSW4gPT09IHRydWU7XG4gIH1cblxuICB1c2VyUmVtZW1iZXJlZCgpIHtcbiAgICBsZXQgaXNJbkxvY2FsU3RvcmFnZSA9IGxvY2FsU3RvcmFnZVtjb25zdGFudC5hcHBEYXRhXSAhPT0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBpc0luTG9jYWxTdG9yYWdlO1xuICB9XG5cbiAgcmVzdG9yZURhdGEoKSB7XG4gICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlW2NvbnN0YW50LmFwcERhdGFdKTtcblxuICAgIHRoaXMudXNlck5hbWUgPSBkYXRhLnVzZXJOYW1lO1xuICAgIHRoaXMudXNlckNsYWltcyA9IGRhdGEudXNlckNsYWltcy5yZWR1Y2UoZnVuY3Rpb24gKGhhc2gsIHVzZXJDbGFpbSkge1xuICAgICAgaGFzaFt1c2VyQ2xhaW0udHlwZV0gPSB1c2VyQ2xhaW0udmFsdWU7XG4gICAgICByZXR1cm4gaGFzaDtcbiAgICB9LCB7fSk7XG4gICAgdGhpcy51c2VyUm9sZXMgPSBkYXRhLnVzZXJSb2xlcy5yZWR1Y2UoKGhhc2gsIHVzZXJSb2xlKSA9PiB7XG4gICAgICBoYXNoW3VzZXJSb2xlXSA9IHRydWU7XG4gICAgICByZXR1cm4gaGFzaDtcbiAgICB9LCB7fSk7XG4gICAgdGhpcy51c2VyQWNjZXNzUmlnaHRzID0gZGF0YS51c2VyQWNjZXNzUmlnaHRzLnJlZHVjZSgoaGFzaCwgYWNjZXNzUmlnaHQpID0+IHtcbiAgICAgIGhhc2hbYWNjZXNzUmlnaHRdID0gdHJ1ZTtcbiAgICAgIHJldHVybiBoYXNoO1xuICAgIH0sIHt9KTtcblxuICAgIC8vIHRvZG86IGRlbGV0ZVxuICAgIHRoaXMudXNlckFjY2Vzc1JpZ2h0c1snYWNjZXNzJ10gPSB0cnVlO1xuXG4gICAgdGhpcy5pc0xvZ2dlZEluID0gdHJ1ZTtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZSgnJyk7XG4gIH1cblxuICByZW1lbWJlcmVkVG9rZW4oKSB7XG4gICAgY29uc3QgdG9rZW4gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZVtjb25zdGFudC5hcHBEYXRhXSkudG9rZW47XG4gICAgcmV0dXJuIHRva2VuO1xuICB9XG4gIFxuICBnZXRVc2VyTmFtZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLnVzZXJOYW1lO1xuICB9XG59XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==