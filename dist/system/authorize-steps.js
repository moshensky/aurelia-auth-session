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

        var _RolesAuthorizeStep = RolesAuthorizeStep;

        _createClass(_RolesAuthorizeStep, [{
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

        _createClass(_AccessRightsAuthorizeStep, [{
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

        AccessRightsAuthorizeStep = inject(Session, Logger)(AccessRightsAuthorizeStep) || AccessRightsAuthorizeStep;
        return AccessRightsAuthorizeStep;
      })();

      _export('AccessRightsAuthorizeStep', AccessRightsAuthorizeStep);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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LENBQUMsTUFBTSxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2FBQ25EOztBQUVELGdCQUFJLGtCQUFrQixHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFLO0FBQzFFLGtCQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFO0FBQ3hCLG1CQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7ZUFDaEM7O0FBRUQscUJBQU8sR0FBRyxDQUFDO2FBQ1osRUFBRSxFQUFFLENBQUMsQ0FBQzs7QUFFUCxnQkFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOztBQUV4RSxnQkFBSSxTQUFTLEtBQUssS0FBSyxFQUFFO0FBQ3ZCLGtCQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0FBQzFELHFCQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUN0Qjs7QUFFRCxtQkFBTyxJQUFJLEVBQUUsQ0FBQztXQUNmOzs7QUE5QlUsaUNBQXlCLEdBRHJDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQ1gseUJBQXlCLEtBQXpCLHlCQUF5QjtlQUF6Qix5QkFBeUI7OzsyQ0FBekIseUJBQXlCIiwiZmlsZSI6ImF1dGhvcml6ZS1zdGVwcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtb3NoZW5za3kgb24gNi8xNy8xNS5cbiAqL1xuaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZGVwZW5kZW5jeS1pbmplY3Rpb24nO1xuaW1wb3J0IHtTZXNzaW9ufSBmcm9tICcuL3Nlc3Npb24nO1xuaW1wb3J0IHtMb2dnZXJ9IGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7TG9jYWxlfSBmcm9tICcuL2xvY2FsZSc7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHtSZWRpcmVjdH0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInO1xuXG5AaW5qZWN0KFNlc3Npb24sIExvZ2dlcilcbmV4cG9ydCBjbGFzcyBSb2xlc0F1dGhvcml6ZVN0ZXAge1xuICBjb25zdHJ1Y3RvcihzZXNzaW9uLCBsb2dnZXIpIHtcbiAgICB0aGlzLnNlc3Npb24gPSBzZXNzaW9uO1xuICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgIHRoaXMubG9jYWxlID0gTG9jYWxlLlJlcG9zaXRvcnkuZGVmYXVsdDtcbiAgICB0aGlzLmxvZ2luUm91dGUgPSBDb25maWcucm91dGVyQXV0aFN0ZXBPcHRzLmxvZ2luUm91dGU7XG4gIH1cblxuICBydW4ocm91dGluZ0NvbnRleHQsIG5leHQpIHtcbiAgICBpZiAoIXRoaXMuc2Vzc2lvbi5pc1VzZXJMb2dnZWRJbigpICYmIHJvdXRpbmdDb250ZXh0Lm5leHRJbnN0cnVjdGlvbi5jb25maWcucm91dGUgIT09IHRoaXMubG9naW5Sb3V0ZSkge1xuICAgICAgdGhpcy5sb2dnZXIud2Fybih0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ3BsZWFzZUxvZ2luJykpO1xuICAgICAgcmV0dXJuIG5leHQuY2FuY2VsKG5ldyBSZWRpcmVjdCh0aGlzLmxvZ2luUm91dGUpKTtcbiAgICB9XG5cbiAgICBsZXQgY2FuQWNjZXNzID0gcm91dGluZ0NvbnRleHQubmV4dEluc3RydWN0aW9ucy5ldmVyeShpID0+IHtcbiAgICAgIGlmIChpLmNvbmZpZy5yb2xlcykge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXNzaW9uLnVzZXJIYXNBdExlYXN0T25lUm9sZShpLmNvbmZpZy5yb2xlcyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuXG4gICAgaWYgKGNhbkFjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKHRoaXMubG9jYWxlLnRyYW5zbGF0ZSgnbm90QXV0aG9yaXplZCcpKTtcbiAgICAgIHJldHVybiBuZXh0LmNhbmNlbCgpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXh0KCk7XG4gIH1cbn1cblxuQGluamVjdChTZXNzaW9uLCBMb2dnZXIpXG5leHBvcnQgY2xhc3MgQWNjZXNzUmlnaHRzQXV0aG9yaXplU3RlcCB7XG4gIGNvbnN0cnVjdG9yKHNlc3Npb24sIGxvZ2dlcikge1xuICAgIHRoaXMuc2Vzc2lvbiA9IHNlc3Npb247XG4gICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gICAgdGhpcy5sb2NhbGUgPSBMb2NhbGUuUmVwb3NpdG9yeS5kZWZhdWx0O1xuICAgIHRoaXMubG9naW5Sb3V0ZSA9IENvbmZpZy5yb3V0ZXJBdXRoU3RlcE9wdHMubG9naW5Sb3V0ZTtcbiAgfVxuXG4gIHJ1bihyb3V0aW5nQ29udGV4dCwgbmV4dCkge1xuICAgIGlmICghdGhpcy5zZXNzaW9uLmlzVXNlckxvZ2dlZEluKCkgJiYgcm91dGluZ0NvbnRleHQubmV4dEluc3RydWN0aW9uLmNvbmZpZy5yb3V0ZSAhPT0gdGhpcy5sb2dpblJvdXRlKSB7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKHRoaXMubG9jYWxlLnRyYW5zbGF0ZSgncGxlYXNlTG9naW4nKSk7XG4gICAgICByZXR1cm4gbmV4dC5jYW5jZWwobmV3IFJlZGlyZWN0KHRoaXMubG9naW5Sb3V0ZSkpO1xuICAgIH1cblxuICAgIGxldCBuZWVkZWRBY2Nlc3NSaWdodHMgPSByb3V0aW5nQ29udGV4dC5uZXh0SW5zdHJ1Y3Rpb25zLnJlZHVjZSgoYWNjLCBpKSA9PiB7XG4gICAgICBpZiAoaS5jb25maWcuYWNjZXNzUmlnaHQpIHtcbiAgICAgICAgYWNjLnB1c2goaS5jb25maWcuYWNjZXNzUmlnaHQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIFtdKTtcblxuICAgIGxldCBjYW5BY2Nlc3MgPSB0aGlzLnNlc3Npb24udXNlckhhc0FsbEFjY2Vzc1JpZ2h0cyhuZWVkZWRBY2Nlc3NSaWdodHMpO1xuXG4gICAgaWYgKGNhbkFjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKHRoaXMubG9jYWxlLnRyYW5zbGF0ZSgnbm90QXV0aG9yaXplZCcpKTtcbiAgICAgIHJldHVybiBuZXh0LmNhbmNlbCgpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXh0KCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==