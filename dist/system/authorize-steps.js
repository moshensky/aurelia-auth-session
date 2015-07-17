System.register(['aurelia-dependency-injection', './session', './logger', './locale', './config', 'aurelia-router'], function (_export) {
  'use strict';

  var inject, Session, Logger, Locale, Config, Redirect, RolesAuthorizeStep, AccessRightsAuthorizeStep;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_session) {
      Session = _session.Session;
    }, function (_logger) {
      Logger = _logger.Logger;
    }, function (_locale) {
      Locale = _locale.Locale;
    }, function (_config) {
      Config = _config.Config;
    }, function (_aureliaRouter) {
      Redirect = _aureliaRouter.Redirect;
    }],
    execute: function () {
      RolesAuthorizeStep = (function () {
        function RolesAuthorizeStep(session, logger) {
          _classCallCheck(this, _RolesAuthorizeStep);

          this.session = session;
          this.logger = logger;
          this.locale = Locale.Repository['default'];
          this.loginRoute = Config.routerAuthStepOpts.loginRoute;
        }

        RolesAuthorizeStep.prototype.run = function run(routingContext, next) {
          var _this = this;

          if (!this.session.isUserLoggedIn() && routingContext.nextInstruction.config.route !== this.loginRoute) {
            this.logger.warn(this.locale.translate('pleaseLogin'));
            return next.cancel(new Redirect(this.loginRoute));
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

        var _RolesAuthorizeStep = RolesAuthorizeStep;
        RolesAuthorizeStep = inject(Session, Logger)(RolesAuthorizeStep) || RolesAuthorizeStep;
        return RolesAuthorizeStep;
      })();

      _export('RolesAuthorizeStep', RolesAuthorizeStep);

      AccessRightsAuthorizeStep = (function () {
        function AccessRightsAuthorizeStep(session, logger) {
          _classCallCheck(this, _AccessRightsAuthorizeStep);

          this.session = session;
          this.logger = logger;
          this.locale = Locale.Repository['default'];
          this.loginRoute = Config.routerAuthStepOpts.loginRoute;
        }

        AccessRightsAuthorizeStep.prototype.run = function run(routingContext, next) {
          if (!this.session.isUserLoggedIn() && routingContext.nextInstruction.config.route !== this.loginRoute) {
            this.logger.warn(this.locale.translate('pleaseLogin'));
            return next.cancel(new Redirect(this.loginRoute));
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

        var _AccessRightsAuthorizeStep = AccessRightsAuthorizeStep;
        AccessRightsAuthorizeStep = inject(Session, Logger)(AccessRightsAuthorizeStep) || AccessRightsAuthorizeStep;
        return AccessRightsAuthorizeStep;
      })();

      _export('AccessRightsAuthorizeStep', AccessRightsAuthorizeStep);
    }
  };
});