'use strict';

exports.__esModule = true;

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

  var _Session = Session;

  _Session.prototype.initUserData = function initUserData() {
    this.userId = null;
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

  _Session.prototype.userHasClaim = function userHasClaim() {
    throw new Error('Unimplemented method!');
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

    this.userId = data.userId;
    this.userName = data.userName;
    this.userClaims = data.userClaims;
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

  Session = (0, _aureliaDependencyInjection.inject)(_aureliaRouter.Router, _logger.Logger)(Session) || Session;
  return Session;
})();

exports.Session = Session;