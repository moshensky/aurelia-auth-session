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

        Session.prototype.initUserData = function initUserData() {
          this.userName = null;
          this.userClaims = [];
          this.userRoles = [];
          this.userAccessRights = [];

          this.isLoggedIn = false;
          this.isBusy = false;
        };

        Session.prototype.setUser = function setUser(data) {
          if (data) {
            localStorage[constant.appData] = JSON.stringify(data);
            this.restoreData();
          }
        };

        Session.prototype.clearUser = function clearUser() {
          localStorage.clear();
          this.initUserData();
        };

        Session.prototype.userHasAccessRight = function userHasAccessRight(requiredAccessRight) {
          return this.userAccessRights[requiredAccessRight] === true;
        };

        Session.prototype.userHasAllAccessRights = function userHasAllAccessRights(requiredAccessRights) {
          var _this = this;

          return requiredAccessRights.every(function (accessRight) {
            return _this.userHasAccessRight(accessRight);
          });
        };

        Session.prototype.userHasRole = function userHasRole(requredRole) {
          return this.userRoles[requredRole] === true;
        };

        Session.prototype.userHasAtLeastOneRole = function userHasAtLeastOneRole(requiredRoles) {
          var _this2 = this;

          return requiredRoles.some(function (requiredRole) {
            return _this2.userHasRole(requiredRole);
          });
        };

        Session.prototype.getUserClaim = function getUserClaim(claimType) {
          return this.userClaims[claimType];
        };

        Session.prototype.isUserLoggedIn = function isUserLoggedIn() {
          return this.isLoggedIn === true;
        };

        Session.prototype.userRemembered = function userRemembered() {
          var isInLocalStorage = localStorage[constant.appData] !== undefined;
          return isInLocalStorage;
        };

        Session.prototype.restoreData = function restoreData() {
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

        Session.prototype.rememberedToken = function rememberedToken() {
          var token = JSON.parse(localStorage[constant.appData]).token;
          return token;
        };

        Session.prototype.getUserName = function getUserName() {
          return this.userName;
        };

        var _Session = Session;
        Session = inject(Router, Logger)(Session) || Session;
        return Session;
      })();

      _export('Session', Session);
    }
  };
});