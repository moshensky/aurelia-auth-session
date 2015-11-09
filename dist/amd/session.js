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
    Session = (0, _aureliaDependencyInjection.inject)(_aureliaRouter.Router, _logger.Logger)(Session) || Session;
    return Session;
  })();

  exports.Session = Session;
});
//# sourceMappingURL=data:application/json;base64,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c2hlbnNreSBvbiA2LzE2LzE1LlxyXG4gKi9cclxuaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZGVwZW5kZW5jeS1pbmplY3Rpb24nO1xyXG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInO1xyXG5pbXBvcnQge0xvZ2dlcn0gZnJvbSAnLi9sb2dnZXInO1xyXG5cclxuY29uc3QgY29uc3RhbnQgPSB7XHJcbiAgYXBwRGF0YTogJ2FwcERhdGEnXHJcbn07XHJcblxyXG5AaW5qZWN0KFJvdXRlciwgTG9nZ2VyKVxyXG5leHBvcnQgY2xhc3MgU2Vzc2lvbiB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHJvdXRlciwgbG9nZ2VyKSB7XHJcbiAgICB0aGlzLnJvdXRlciA9IHJvdXRlcjtcclxuICAgIHRoaXMubG9nID0gbG9nZ2VyO1xyXG5cclxuICAgIHRoaXMuaW5pdFVzZXJEYXRhKCk7XHJcblxyXG4gICAgaWYgKHRoaXMudXNlclJlbWVtYmVyZWQoKSkge1xyXG4gICAgICB0aGlzLnJlc3RvcmVEYXRhKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbml0VXNlckRhdGEoKSB7XHJcbiAgICB0aGlzLnVzZXJOYW1lID0gbnVsbDtcclxuICAgIHRoaXMudXNlckNsYWltcyA9IFtdO1xyXG4gICAgdGhpcy51c2VyUm9sZXMgPSBbXTtcclxuICAgIHRoaXMudXNlckFjY2Vzc1JpZ2h0cyA9IFtdO1xyXG5cclxuICAgIHRoaXMuaXNMb2dnZWRJbiA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHNldFVzZXIoZGF0YSkge1xyXG4gICAgaWYgKGRhdGEpIHtcclxuICAgICAgbG9jYWxTdG9yYWdlW2NvbnN0YW50LmFwcERhdGFdID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XHJcbiAgICAgIHRoaXMucmVzdG9yZURhdGEoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNsZWFyVXNlcigpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgdGhpcy5pbml0VXNlckRhdGEoKTtcclxuICB9XHJcblxyXG4gIHVzZXJIYXNBY2Nlc3NSaWdodChyZXF1aXJlZEFjY2Vzc1JpZ2h0KSB7XHJcbiAgICByZXR1cm4gdGhpcy51c2VyQWNjZXNzUmlnaHRzW3JlcXVpcmVkQWNjZXNzUmlnaHRdID09PSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgdXNlckhhc0FsbEFjY2Vzc1JpZ2h0cyhyZXF1aXJlZEFjY2Vzc1JpZ2h0cykge1xyXG4gICAgcmV0dXJuIHJlcXVpcmVkQWNjZXNzUmlnaHRzLmV2ZXJ5KGFjY2Vzc1JpZ2h0ID0+IHtcclxuICAgICAgcmV0dXJuIHRoaXMudXNlckhhc0FjY2Vzc1JpZ2h0KGFjY2Vzc1JpZ2h0KTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICB1c2VySGFzUm9sZShyZXF1cmVkUm9sZSkge1xyXG4gICAgcmV0dXJuIHRoaXMudXNlclJvbGVzW3JlcXVyZWRSb2xlXSA9PT0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHVzZXJIYXNBdExlYXN0T25lUm9sZShyZXF1aXJlZFJvbGVzKSB7XHJcbiAgICByZXR1cm4gcmVxdWlyZWRSb2xlcy5zb21lKHJlcXVpcmVkUm9sZSA9PiB7XHJcbiAgICAgIHJldHVybiB0aGlzLnVzZXJIYXNSb2xlKHJlcXVpcmVkUm9sZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldFVzZXJDbGFpbShjbGFpbVR5cGUpIHtcclxuICAgIHJldHVybiB0aGlzLnVzZXJDbGFpbXNbY2xhaW1UeXBlXTtcclxuICB9XHJcblxyXG4gIGlzVXNlckxvZ2dlZEluKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaXNMb2dnZWRJbiA9PT0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHVzZXJSZW1lbWJlcmVkKCkge1xyXG4gICAgbGV0IGlzSW5Mb2NhbFN0b3JhZ2UgPSBsb2NhbFN0b3JhZ2VbY29uc3RhbnQuYXBwRGF0YV0gIT09IHVuZGVmaW5lZDtcclxuICAgIHJldHVybiBpc0luTG9jYWxTdG9yYWdlO1xyXG4gIH1cclxuXHJcbiAgcmVzdG9yZURhdGEoKSB7XHJcbiAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbY29uc3RhbnQuYXBwRGF0YV0pO1xyXG5cclxuICAgIHRoaXMudXNlck5hbWUgPSBkYXRhLnVzZXJOYW1lO1xyXG4gICAgdGhpcy51c2VyQ2xhaW1zID0gZGF0YS51c2VyQ2xhaW1zLnJlZHVjZShmdW5jdGlvbiAoaGFzaCwgdXNlckNsYWltKSB7XHJcbiAgICAgIGhhc2hbdXNlckNsYWltLnR5cGVdID0gdXNlckNsYWltLnZhbHVlO1xyXG4gICAgICByZXR1cm4gaGFzaDtcclxuICAgIH0sIHt9KTtcclxuICAgIHRoaXMudXNlclJvbGVzID0gZGF0YS51c2VyUm9sZXMucmVkdWNlKChoYXNoLCB1c2VyUm9sZSkgPT4ge1xyXG4gICAgICBoYXNoW3VzZXJSb2xlXSA9IHRydWU7XHJcbiAgICAgIHJldHVybiBoYXNoO1xyXG4gICAgfSwge30pO1xyXG4gICAgdGhpcy51c2VyQWNjZXNzUmlnaHRzID0gZGF0YS51c2VyQWNjZXNzUmlnaHRzLnJlZHVjZSgoaGFzaCwgYWNjZXNzUmlnaHQpID0+IHtcclxuICAgICAgaGFzaFthY2Nlc3NSaWdodF0gPSB0cnVlO1xyXG4gICAgICByZXR1cm4gaGFzaDtcclxuICAgIH0sIHt9KTtcclxuXHJcbiAgICAvLyB0b2RvOiBkZWxldGVcclxuICAgIHRoaXMudXNlckFjY2Vzc1JpZ2h0c1snYWNjZXNzJ10gPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuaXNMb2dnZWRJbiA9IHRydWU7XHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZSgnJyk7XHJcbiAgfVxyXG5cclxuICByZW1lbWJlcmVkVG9rZW4oKSB7XHJcbiAgICBjb25zdCB0b2tlbiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlW2NvbnN0YW50LmFwcERhdGFdKS50b2tlbjtcclxuICAgIHJldHVybiB0b2tlbjtcclxuICB9XHJcbiAgXHJcbiAgZ2V0VXNlck5hbWUoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnVzZXJOYW1lO1xyXG4gIH1cclxufVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
