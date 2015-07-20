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

        var _RolesAuthorizeStep = RolesAuthorizeStep;

        _RolesAuthorizeStep.prototype.run = function run(routingContext, next) {
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

        var _AccessRightsAuthorizeStep = AccessRightsAuthorizeStep;

        _AccessRightsAuthorizeStep.prototype.run = function run(routingContext, next) {
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

        AccessRightsAuthorizeStep = inject(Session, Logger)(AccessRightsAuthorizeStep) || AccessRightsAuthorizeStep;
        return AccessRightsAuthorizeStep;
      })();

      _export('AccessRightsAuthorizeStep', AccessRightsAuthorizeStep);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QkFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1dBQ25EOztBQUVELGNBQUksa0JBQWtCLEdBQUcsY0FBYyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUs7QUFDMUUsZ0JBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUU7QUFDeEIsaUJBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUNoQzs7QUFFRCxtQkFBTyxHQUFHLENBQUM7V0FDWixFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUVQLGNBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs7QUFFeEUsY0FBSSxTQUFTLEtBQUssS0FBSyxFQUFFO0FBQ3ZCLGdCQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0FBQzFELG1CQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztXQUN0Qjs7QUFFRCxpQkFBTyxJQUFJLEVBQUUsQ0FBQztTQUNmOztBQTlCVSxpQ0FBeUIsR0FEckMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FDWCx5QkFBeUIsS0FBekIseUJBQXlCO2VBQXpCLHlCQUF5Qjs7OzJDQUF6Qix5QkFBeUIiLCJmaWxlIjoiYXV0aG9yaXplLXN0ZXBzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1vc2hlbnNreSBvbiA2LzE3LzE1LlxuICovXG5pbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1kZXBlbmRlbmN5LWluamVjdGlvbic7XG5pbXBvcnQge1Nlc3Npb259IGZyb20gJy4vc2Vzc2lvbic7XG5pbXBvcnQge0xvZ2dlcn0gZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHtMb2NhbGV9IGZyb20gJy4vbG9jYWxlJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQge1JlZGlyZWN0fSBmcm9tICdhdXJlbGlhLXJvdXRlcic7XG5cbkBpbmplY3QoU2Vzc2lvbiwgTG9nZ2VyKVxuZXhwb3J0IGNsYXNzIFJvbGVzQXV0aG9yaXplU3RlcCB7XG4gIGNvbnN0cnVjdG9yKHNlc3Npb24sIGxvZ2dlcikge1xuICAgIHRoaXMuc2Vzc2lvbiA9IHNlc3Npb247XG4gICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gICAgdGhpcy5sb2NhbGUgPSBMb2NhbGUuUmVwb3NpdG9yeS5kZWZhdWx0O1xuICAgIHRoaXMubG9naW5Sb3V0ZSA9IENvbmZpZy5yb3V0ZXJBdXRoU3RlcE9wdHMubG9naW5Sb3V0ZTtcbiAgfVxuXG4gIHJ1bihyb3V0aW5nQ29udGV4dCwgbmV4dCkge1xuICAgIGlmICghdGhpcy5zZXNzaW9uLmlzVXNlckxvZ2dlZEluKCkgJiYgcm91dGluZ0NvbnRleHQubmV4dEluc3RydWN0aW9uLmNvbmZpZy5yb3V0ZSAhPT0gdGhpcy5sb2dpblJvdXRlKSB7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKHRoaXMubG9jYWxlLnRyYW5zbGF0ZSgncGxlYXNlTG9naW4nKSk7XG4gICAgICByZXR1cm4gbmV4dC5jYW5jZWwobmV3IFJlZGlyZWN0KHRoaXMubG9naW5Sb3V0ZSkpO1xuICAgIH1cblxuICAgIGxldCBjYW5BY2Nlc3MgPSByb3V0aW5nQ29udGV4dC5uZXh0SW5zdHJ1Y3Rpb25zLmV2ZXJ5KGkgPT4ge1xuICAgICAgaWYgKGkuY29uZmlnLnJvbGVzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlc3Npb24udXNlckhhc0F0TGVhc3RPbmVSb2xlKGkuY29uZmlnLnJvbGVzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG5cbiAgICBpZiAoY2FuQWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IodGhpcy5sb2NhbGUudHJhbnNsYXRlKCdub3RBdXRob3JpemVkJykpO1xuICAgICAgcmV0dXJuIG5leHQuY2FuY2VsKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHQoKTtcbiAgfVxufVxuXG5AaW5qZWN0KFNlc3Npb24sIExvZ2dlcilcbmV4cG9ydCBjbGFzcyBBY2Nlc3NSaWdodHNBdXRob3JpemVTdGVwIHtcbiAgY29uc3RydWN0b3Ioc2Vzc2lvbiwgbG9nZ2VyKSB7XG4gICAgdGhpcy5zZXNzaW9uID0gc2Vzc2lvbjtcbiAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgICB0aGlzLmxvY2FsZSA9IExvY2FsZS5SZXBvc2l0b3J5LmRlZmF1bHQ7XG4gICAgdGhpcy5sb2dpblJvdXRlID0gQ29uZmlnLnJvdXRlckF1dGhTdGVwT3B0cy5sb2dpblJvdXRlO1xuICB9XG5cbiAgcnVuKHJvdXRpbmdDb250ZXh0LCBuZXh0KSB7XG4gICAgaWYgKCF0aGlzLnNlc3Npb24uaXNVc2VyTG9nZ2VkSW4oKSAmJiByb3V0aW5nQ29udGV4dC5uZXh0SW5zdHJ1Y3Rpb24uY29uZmlnLnJvdXRlICE9PSB0aGlzLmxvZ2luUm91dGUpIHtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4odGhpcy5sb2NhbGUudHJhbnNsYXRlKCdwbGVhc2VMb2dpbicpKTtcbiAgICAgIHJldHVybiBuZXh0LmNhbmNlbChuZXcgUmVkaXJlY3QodGhpcy5sb2dpblJvdXRlKSk7XG4gICAgfVxuXG4gICAgbGV0IG5lZWRlZEFjY2Vzc1JpZ2h0cyA9IHJvdXRpbmdDb250ZXh0Lm5leHRJbnN0cnVjdGlvbnMucmVkdWNlKChhY2MsIGkpID0+IHtcbiAgICAgIGlmIChpLmNvbmZpZy5hY2Nlc3NSaWdodCkge1xuICAgICAgICBhY2MucHVzaChpLmNvbmZpZy5hY2Nlc3NSaWdodCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgW10pO1xuXG4gICAgbGV0IGNhbkFjY2VzcyA9IHRoaXMuc2Vzc2lvbi51c2VySGFzQWxsQWNjZXNzUmlnaHRzKG5lZWRlZEFjY2Vzc1JpZ2h0cyk7XG5cbiAgICBpZiAoY2FuQWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IodGhpcy5sb2NhbGUudHJhbnNsYXRlKCdub3RBdXRob3JpemVkJykpO1xuICAgICAgcmV0dXJuIG5leHQuY2FuY2VsKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHQoKTtcbiAgfVxufVxuIl19