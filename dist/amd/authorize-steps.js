define(['exports', 'aurelia-dependency-injection', './session', './logger', './locale', './config', 'aurelia-router'], function (exports, _aureliaDependencyInjection, _session, _logger, _locale, _config, _aureliaRouter) {
  'use strict';

  exports.__esModule = true;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var RolesAuthorizeStep = (function () {
    function RolesAuthorizeStep(session, logger) {
      _classCallCheck(this, _RolesAuthorizeStep);

      this.session = session;
      this.logger = logger;
      this.locale = _locale.Locale.Repository['default'];
      this.loginRoute = _config.Config.routerAuthStepOpts.loginRoute;
    }

    var _RolesAuthorizeStep = RolesAuthorizeStep;

    _RolesAuthorizeStep.prototype.run = function run(routingContext, next) {
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
    };

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

    var _AccessRightsAuthorizeStep = AccessRightsAuthorizeStep;

    _AccessRightsAuthorizeStep.prototype.run = function run(routingContext, next) {
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
    };

    AccessRightsAuthorizeStep = (0, _aureliaDependencyInjection.inject)(_session.Session, _logger.Logger)(AccessRightsAuthorizeStep) || AccessRightsAuthorizeStep;
    return AccessRightsAuthorizeStep;
  })();

  exports.AccessRightsAuthorizeStep = AccessRightsAuthorizeStep;
});