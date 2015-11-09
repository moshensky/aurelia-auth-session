'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaRouter = require('aurelia-router');

var _logger = require('./logger');

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