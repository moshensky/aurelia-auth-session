'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _session = require('./session');

var _logger = require('./logger');

var _locale = require('./locale');

var _config = require('./config');

var _aureliaRouter = require('aurelia-router');

var RolesAuthorizeStep = (function () {
  function RolesAuthorizeStep(session, logger) {
    _classCallCheck(this, _RolesAuthorizeStep);

    this.session = session;
    this.logger = logger;
    this.locale = _locale.Locale.Repository['default'];
    this.loginRoute = _config.Config.routerAuthStepOpts.loginRoute;
  }

  _createClass(RolesAuthorizeStep, [{
    key: 'run',
    value: function run(routingContext, next) {
      var _this = this;

      if (!this.session.isUserLoggedIn() && routingContext.nextInstruction.config.route !== this.loginRoute) {
        this.logger.warn(this.locale.translate('pleaseLogin'));
        return next.cancel(new _aureliaRouter.Redirect(this.loginRoute));
      }

      var canAccess = routingContext.nextInstructions.every(function (i) {
        if (i.config.roles) {
          return _this.session.userHasAtLeastOneRole(i.config.roles);
        }

        return true;
      });

      if (canAccess === false) {
        this.logger.error(this.locale.translate('notAuthorized'));
        return next.cancel();
      }

      return next();
    }
  }]);

  var _RolesAuthorizeStep = RolesAuthorizeStep;
  RolesAuthorizeStep = (0, _aureliaDependencyInjection.inject)(_session.Session, _logger.Logger)(RolesAuthorizeStep) || RolesAuthorizeStep;
  return RolesAuthorizeStep;
})();

exports.RolesAuthorizeStep = RolesAuthorizeStep;

var AccessRightsAuthorizeStep = (function () {
  function AccessRightsAuthorizeStep(session, logger) {
    _classCallCheck(this, _AccessRightsAuthorizeStep);

    this.session = session;
    this.logger = logger;
    this.locale = _locale.Locale.Repository['default'];
    this.loginRoute = _config.Config.routerAuthStepOpts.loginRoute;
  }

  _createClass(AccessRightsAuthorizeStep, [{
    key: 'run',
    value: function run(routingContext, next) {
      if (!this.session.isUserLoggedIn() && routingContext.nextInstruction.config.route !== this.loginRoute) {
        this.logger.warn(this.locale.translate('pleaseLogin'));
        return next.cancel(new _aureliaRouter.Redirect(this.loginRoute));
      }

      var neededAccessRights = routingContext.nextInstructions.reduce(function (acc, i) {
        if (i.config.accessRight) {
          acc.push(i.config.accessRight);
        }

        return acc;
      }, []);

      var canAccess = this.session.userHasAllAccessRights(neededAccessRights);

      if (canAccess === false) {
        this.logger.error(this.locale.translate('notAuthorized'));
        return next.cancel();
      }

      return next();
    }
  }]);

  var _AccessRightsAuthorizeStep = AccessRightsAuthorizeStep;
  AccessRightsAuthorizeStep = (0, _aureliaDependencyInjection.inject)(_session.Session, _logger.Logger)(AccessRightsAuthorizeStep) || AccessRightsAuthorizeStep;
  return AccessRightsAuthorizeStep;
})();

exports.AccessRightsAuthorizeStep = AccessRightsAuthorizeStep;