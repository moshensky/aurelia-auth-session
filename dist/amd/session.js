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
//# sourceMappingURL=data:application/json;base64,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ZW5za3kgb24gNi8xNi8xNS5cbiAqL1xuaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZGVwZW5kZW5jeS1pbmplY3Rpb24nO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJ2F1cmVsaWEtcm91dGVyJztcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICcuL2xvZ2dlcic7XG5cbmNvbnN0IGNvbnN0YW50ID0ge1xuICBhcHBEYXRhOiAnYXBwRGF0YSdcbn07XG5cbkBpbmplY3QoUm91dGVyLCBMb2dnZXIpXG5leHBvcnQgY2xhc3MgU2Vzc2lvbiB7XG5cbiAgY29uc3RydWN0b3Iocm91dGVyLCBsb2dnZXIpIHtcbiAgICB0aGlzLnJvdXRlciA9IHJvdXRlcjtcbiAgICB0aGlzLmxvZyA9IGxvZ2dlcjtcblxuICAgIHRoaXMuaW5pdFVzZXJEYXRhKCk7XG5cbiAgICBpZiAodGhpcy51c2VyUmVtZW1iZXJlZCgpKSB7XG4gICAgICB0aGlzLnJlc3RvcmVEYXRhKCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdFVzZXJEYXRhKCkge1xuICAgIHRoaXMudXNlck5hbWUgPSBudWxsO1xuICAgIHRoaXMudXNlckNsYWltcyA9IFtdO1xuICAgIHRoaXMudXNlclJvbGVzID0gW107XG4gICAgdGhpcy51c2VyQWNjZXNzUmlnaHRzID0gW107XG5cbiAgICB0aGlzLmlzTG9nZ2VkSW4gPSBmYWxzZTtcbiAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICB9XG5cbiAgc2V0VXNlcihkYXRhKSB7XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIGxvY2FsU3RvcmFnZVtjb25zdGFudC5hcHBEYXRhXSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgICAgdGhpcy5yZXN0b3JlRGF0YSgpO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyVXNlcigpIHtcbiAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICB0aGlzLmluaXRVc2VyRGF0YSgpO1xuICB9XG5cbiAgdXNlckhhc0FjY2Vzc1JpZ2h0KHJlcXVpcmVkQWNjZXNzUmlnaHQpIHtcbiAgICByZXR1cm4gdGhpcy51c2VyQWNjZXNzUmlnaHRzW3JlcXVpcmVkQWNjZXNzUmlnaHRdID09PSB0cnVlO1xuICB9XG5cbiAgdXNlckhhc0FsbEFjY2Vzc1JpZ2h0cyhyZXF1aXJlZEFjY2Vzc1JpZ2h0cykge1xuICAgIHJldHVybiByZXF1aXJlZEFjY2Vzc1JpZ2h0cy5ldmVyeShhY2Nlc3NSaWdodCA9PiB7XG4gICAgICByZXR1cm4gdGhpcy51c2VySGFzQWNjZXNzUmlnaHQoYWNjZXNzUmlnaHQpO1xuICAgIH0pXG4gIH1cblxuICB1c2VySGFzUm9sZShyZXF1cmVkUm9sZSkge1xuICAgIHJldHVybiB0aGlzLnVzZXJSb2xlc1tyZXF1cmVkUm9sZV0gPT09IHRydWU7XG4gIH1cblxuICB1c2VySGFzQXRMZWFzdE9uZVJvbGUocmVxdWlyZWRSb2xlcykge1xuICAgIHJldHVybiByZXF1aXJlZFJvbGVzLnNvbWUocmVxdWlyZWRSb2xlID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnVzZXJIYXNSb2xlKHJlcXVpcmVkUm9sZSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRVc2VyQ2xhaW0oY2xhaW1UeXBlKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlckNsYWltc1tjbGFpbVR5cGVdO1xuICB9XG5cbiAgaXNVc2VyTG9nZ2VkSW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNMb2dnZWRJbiA9PT0gdHJ1ZTtcbiAgfVxuXG4gIHVzZXJSZW1lbWJlcmVkKCkge1xuICAgIGxldCBpc0luTG9jYWxTdG9yYWdlID0gbG9jYWxTdG9yYWdlW2NvbnN0YW50LmFwcERhdGFdICE9PSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIGlzSW5Mb2NhbFN0b3JhZ2U7XG4gIH1cblxuICByZXN0b3JlRGF0YSgpIHtcbiAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbY29uc3RhbnQuYXBwRGF0YV0pO1xuXG4gICAgdGhpcy51c2VyTmFtZSA9IGRhdGEudXNlck5hbWU7XG4gICAgdGhpcy51c2VyQ2xhaW1zID0gZGF0YS51c2VyQ2xhaW1zLnJlZHVjZShmdW5jdGlvbiAoaGFzaCwgdXNlckNsYWltKSB7XG4gICAgICBoYXNoW3VzZXJDbGFpbS50eXBlXSA9IHVzZXJDbGFpbS52YWx1ZTtcbiAgICAgIHJldHVybiBoYXNoO1xuICAgIH0sIHt9KTtcbiAgICB0aGlzLnVzZXJSb2xlcyA9IGRhdGEudXNlclJvbGVzLnJlZHVjZSgoaGFzaCwgdXNlclJvbGUpID0+IHtcbiAgICAgIGhhc2hbdXNlclJvbGVdID0gdHJ1ZTtcbiAgICAgIHJldHVybiBoYXNoO1xuICAgIH0sIHt9KTtcbiAgICB0aGlzLnVzZXJBY2Nlc3NSaWdodHMgPSBkYXRhLnVzZXJBY2Nlc3NSaWdodHMucmVkdWNlKChoYXNoLCBhY2Nlc3NSaWdodCkgPT4ge1xuICAgICAgaGFzaFthY2Nlc3NSaWdodF0gPSB0cnVlO1xuICAgICAgcmV0dXJuIGhhc2g7XG4gICAgfSwge30pO1xuXG4gICAgLy8gdG9kbzogZGVsZXRlXG4gICAgdGhpcy51c2VyQWNjZXNzUmlnaHRzWydhY2Nlc3MnXSA9IHRydWU7XG5cbiAgICB0aGlzLmlzTG9nZ2VkSW4gPSB0cnVlO1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKCcnKTtcbiAgfVxuXG4gIHJlbWVtYmVyZWRUb2tlbigpIHtcbiAgICBjb25zdCB0b2tlbiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlW2NvbnN0YW50LmFwcERhdGFdKS50b2tlbjtcbiAgICByZXR1cm4gdG9rZW47XG4gIH1cbiAgXG4gIGdldFVzZXJOYW1lKCkge1xuICAgICAgcmV0dXJuIHRoaXMudXNlck5hbWU7XG4gIH1cbn1cblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9