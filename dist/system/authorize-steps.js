System.register(['aurelia-dependency-injection', './session', './logger', './locale', './config', 'aurelia-router'], function (_export) {
  'use strict';

  var inject, Session, Logger, Locale, Config, Redirect, RolesAuthorizeStep, AccessRightsAuthorizeStep;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

        _createClass(RolesAuthorizeStep, [{
          key: 'run',
          value: function run(routingContext, next) {
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
          }
        }]);

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

        _createClass(AccessRightsAuthorizeStep, [{
          key: 'run',
          value: function run(routingContext, next) {
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
          }
        }]);

        var _AccessRightsAuthorizeStep = AccessRightsAuthorizeStep;
        AccessRightsAuthorizeStep = inject(Session, Logger)(AccessRightsAuthorizeStep) || AccessRightsAuthorizeStep;
        return AccessRightsAuthorizeStep;
      })();

      _export('AccessRightsAuthorizeStep', AccessRightsAuthorizeStep);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QUMsTUFBTSxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2FBQ25EOztBQUVELGdCQUFJLGtCQUFrQixHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFLO0FBQzFFLGtCQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFO0FBQ3hCLG1CQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7ZUFDaEM7O0FBRUQscUJBQU8sR0FBRyxDQUFDO2FBQ1osRUFBRSxFQUFFLENBQUMsQ0FBQzs7QUFFUCxnQkFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOztBQUV4RSxnQkFBSSxTQUFTLEtBQUssS0FBSyxFQUFFO0FBQ3ZCLGtCQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0FBQzFELHFCQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUN0Qjs7QUFFRCxtQkFBTyxJQUFJLEVBQUUsQ0FBQztXQUNmOzs7eUNBOUJVLHlCQUF5QjtBQUF6QixpQ0FBeUIsR0FEckMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FDWCx5QkFBeUIsS0FBekIseUJBQXlCO2VBQXpCLHlCQUF5QiIsImZpbGUiOiJhdXRob3JpemUtc3RlcHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbW9zaGVuc2t5IG9uIDYvMTcvMTUuXG4gKi9cbmltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWRlcGVuZGVuY3ktaW5qZWN0aW9uJztcbmltcG9ydCB7U2Vzc2lvbn0gZnJvbSAnLi9zZXNzaW9uJztcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQge0xvY2FsZX0gZnJvbSAnLi9sb2NhbGUnO1xuaW1wb3J0IHtDb25maWd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7UmVkaXJlY3R9IGZyb20gJ2F1cmVsaWEtcm91dGVyJztcblxuQGluamVjdChTZXNzaW9uLCBMb2dnZXIpXG5leHBvcnQgY2xhc3MgUm9sZXNBdXRob3JpemVTdGVwIHtcbiAgY29uc3RydWN0b3Ioc2Vzc2lvbiwgbG9nZ2VyKSB7XG4gICAgdGhpcy5zZXNzaW9uID0gc2Vzc2lvbjtcbiAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgICB0aGlzLmxvY2FsZSA9IExvY2FsZS5SZXBvc2l0b3J5LmRlZmF1bHQ7XG4gICAgdGhpcy5sb2dpblJvdXRlID0gQ29uZmlnLnJvdXRlckF1dGhTdGVwT3B0cy5sb2dpblJvdXRlO1xuICB9XG5cbiAgcnVuKHJvdXRpbmdDb250ZXh0LCBuZXh0KSB7XG4gICAgaWYgKCF0aGlzLnNlc3Npb24uaXNVc2VyTG9nZ2VkSW4oKSAmJiByb3V0aW5nQ29udGV4dC5uZXh0SW5zdHJ1Y3Rpb24uY29uZmlnLnJvdXRlICE9PSB0aGlzLmxvZ2luUm91dGUpIHtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4odGhpcy5sb2NhbGUudHJhbnNsYXRlKCdwbGVhc2VMb2dpbicpKTtcbiAgICAgIHJldHVybiBuZXh0LmNhbmNlbChuZXcgUmVkaXJlY3QodGhpcy5sb2dpblJvdXRlKSk7XG4gICAgfVxuXG4gICAgbGV0IGNhbkFjY2VzcyA9IHJvdXRpbmdDb250ZXh0Lm5leHRJbnN0cnVjdGlvbnMuZXZlcnkoaSA9PiB7XG4gICAgICBpZiAoaS5jb25maWcucm9sZXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vzc2lvbi51c2VySGFzQXRMZWFzdE9uZVJvbGUoaS5jb25maWcucm9sZXMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcblxuICAgIGlmIChjYW5BY2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcih0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ25vdEF1dGhvcml6ZWQnKSk7XG4gICAgICByZXR1cm4gbmV4dC5jYW5jZWwoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dCgpO1xuICB9XG59XG5cbkBpbmplY3QoU2Vzc2lvbiwgTG9nZ2VyKVxuZXhwb3J0IGNsYXNzIEFjY2Vzc1JpZ2h0c0F1dGhvcml6ZVN0ZXAge1xuICBjb25zdHJ1Y3RvcihzZXNzaW9uLCBsb2dnZXIpIHtcbiAgICB0aGlzLnNlc3Npb24gPSBzZXNzaW9uO1xuICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgIHRoaXMubG9jYWxlID0gTG9jYWxlLlJlcG9zaXRvcnkuZGVmYXVsdDtcbiAgICB0aGlzLmxvZ2luUm91dGUgPSBDb25maWcucm91dGVyQXV0aFN0ZXBPcHRzLmxvZ2luUm91dGU7XG4gIH1cblxuICBydW4ocm91dGluZ0NvbnRleHQsIG5leHQpIHtcbiAgICBpZiAoIXRoaXMuc2Vzc2lvbi5pc1VzZXJMb2dnZWRJbigpICYmIHJvdXRpbmdDb250ZXh0Lm5leHRJbnN0cnVjdGlvbi5jb25maWcucm91dGUgIT09IHRoaXMubG9naW5Sb3V0ZSkge1xuICAgICAgdGhpcy5sb2dnZXIud2Fybih0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ3BsZWFzZUxvZ2luJykpO1xuICAgICAgcmV0dXJuIG5leHQuY2FuY2VsKG5ldyBSZWRpcmVjdCh0aGlzLmxvZ2luUm91dGUpKTtcbiAgICB9XG5cbiAgICBsZXQgbmVlZGVkQWNjZXNzUmlnaHRzID0gcm91dGluZ0NvbnRleHQubmV4dEluc3RydWN0aW9ucy5yZWR1Y2UoKGFjYywgaSkgPT4ge1xuICAgICAgaWYgKGkuY29uZmlnLmFjY2Vzc1JpZ2h0KSB7XG4gICAgICAgIGFjYy5wdXNoKGkuY29uZmlnLmFjY2Vzc1JpZ2h0KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBbXSk7XG5cbiAgICBsZXQgY2FuQWNjZXNzID0gdGhpcy5zZXNzaW9uLnVzZXJIYXNBbGxBY2Nlc3NSaWdodHMobmVlZGVkQWNjZXNzUmlnaHRzKTtcblxuICAgIGlmIChjYW5BY2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcih0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ25vdEF1dGhvcml6ZWQnKSk7XG4gICAgICByZXR1cm4gbmV4dC5jYW5jZWwoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dCgpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=