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
//# sourceMappingURL=data:application/json;base64,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QUMsTUFBTSxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2FBQ25EOztBQUVELGdCQUFJLGtCQUFrQixHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFLO0FBQzFFLGtCQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFO0FBQ3hCLG1CQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7ZUFDaEM7O0FBRUQscUJBQU8sR0FBRyxDQUFDO2FBQ1osRUFBRSxFQUFFLENBQUMsQ0FBQzs7QUFFUCxnQkFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOztBQUV4RSxnQkFBSSxTQUFTLEtBQUssS0FBSyxFQUFFO0FBQ3ZCLGtCQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0FBQzFELHFCQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUN0Qjs7QUFFRCxtQkFBTyxJQUFJLEVBQUUsQ0FBQztXQUNmOzs7eUNBOUJVLHlCQUF5QjtBQUF6QixpQ0FBeUIsR0FEckMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FDWCx5QkFBeUIsS0FBekIseUJBQXlCO2VBQXpCLHlCQUF5QiIsImZpbGUiOiJhdXRob3JpemUtc3RlcHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBtb3NoZW5za3kgb24gNi8xNy8xNS5cclxuICovXHJcbmltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWRlcGVuZGVuY3ktaW5qZWN0aW9uJztcclxuaW1wb3J0IHtTZXNzaW9ufSBmcm9tICcuL3Nlc3Npb24nO1xyXG5pbXBvcnQge0xvZ2dlcn0gZnJvbSAnLi9sb2dnZXInO1xyXG5pbXBvcnQge0xvY2FsZX0gZnJvbSAnLi9sb2NhbGUnO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi9jb25maWcnO1xyXG5pbXBvcnQge1JlZGlyZWN0fSBmcm9tICdhdXJlbGlhLXJvdXRlcic7XHJcblxyXG5AaW5qZWN0KFNlc3Npb24sIExvZ2dlcilcclxuZXhwb3J0IGNsYXNzIFJvbGVzQXV0aG9yaXplU3RlcCB7XHJcbiAgY29uc3RydWN0b3Ioc2Vzc2lvbiwgbG9nZ2VyKSB7XHJcbiAgICB0aGlzLnNlc3Npb24gPSBzZXNzaW9uO1xyXG4gICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XHJcbiAgICB0aGlzLmxvY2FsZSA9IExvY2FsZS5SZXBvc2l0b3J5LmRlZmF1bHQ7XHJcbiAgICB0aGlzLmxvZ2luUm91dGUgPSBDb25maWcucm91dGVyQXV0aFN0ZXBPcHRzLmxvZ2luUm91dGU7XHJcbiAgfVxyXG5cclxuICBydW4ocm91dGluZ0NvbnRleHQsIG5leHQpIHtcclxuICAgIGlmICghdGhpcy5zZXNzaW9uLmlzVXNlckxvZ2dlZEluKCkgJiYgcm91dGluZ0NvbnRleHQubmV4dEluc3RydWN0aW9uLmNvbmZpZy5yb3V0ZSAhPT0gdGhpcy5sb2dpblJvdXRlKSB7XHJcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4odGhpcy5sb2NhbGUudHJhbnNsYXRlKCdwbGVhc2VMb2dpbicpKTtcclxuICAgICAgcmV0dXJuIG5leHQuY2FuY2VsKG5ldyBSZWRpcmVjdCh0aGlzLmxvZ2luUm91dGUpKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY2FuQWNjZXNzID0gcm91dGluZ0NvbnRleHQubmV4dEluc3RydWN0aW9ucy5ldmVyeShpID0+IHtcclxuICAgICAgaWYgKGkuY29uZmlnLnJvbGVzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vzc2lvbi51c2VySGFzQXRMZWFzdE9uZVJvbGUoaS5jb25maWcucm9sZXMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChjYW5BY2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKHRoaXMubG9jYWxlLnRyYW5zbGF0ZSgnbm90QXV0aG9yaXplZCcpKTtcclxuICAgICAgcmV0dXJuIG5leHQuY2FuY2VsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5leHQoKTtcclxuICB9XHJcbn1cclxuXHJcbkBpbmplY3QoU2Vzc2lvbiwgTG9nZ2VyKVxyXG5leHBvcnQgY2xhc3MgQWNjZXNzUmlnaHRzQXV0aG9yaXplU3RlcCB7XHJcbiAgY29uc3RydWN0b3Ioc2Vzc2lvbiwgbG9nZ2VyKSB7XHJcbiAgICB0aGlzLnNlc3Npb24gPSBzZXNzaW9uO1xyXG4gICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XHJcbiAgICB0aGlzLmxvY2FsZSA9IExvY2FsZS5SZXBvc2l0b3J5LmRlZmF1bHQ7XHJcbiAgICB0aGlzLmxvZ2luUm91dGUgPSBDb25maWcucm91dGVyQXV0aFN0ZXBPcHRzLmxvZ2luUm91dGU7XHJcbiAgfVxyXG5cclxuICBydW4ocm91dGluZ0NvbnRleHQsIG5leHQpIHtcclxuICAgIGlmICghdGhpcy5zZXNzaW9uLmlzVXNlckxvZ2dlZEluKCkgJiYgcm91dGluZ0NvbnRleHQubmV4dEluc3RydWN0aW9uLmNvbmZpZy5yb3V0ZSAhPT0gdGhpcy5sb2dpblJvdXRlKSB7XHJcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4odGhpcy5sb2NhbGUudHJhbnNsYXRlKCdwbGVhc2VMb2dpbicpKTtcclxuICAgICAgcmV0dXJuIG5leHQuY2FuY2VsKG5ldyBSZWRpcmVjdCh0aGlzLmxvZ2luUm91dGUpKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbmVlZGVkQWNjZXNzUmlnaHRzID0gcm91dGluZ0NvbnRleHQubmV4dEluc3RydWN0aW9ucy5yZWR1Y2UoKGFjYywgaSkgPT4ge1xyXG4gICAgICBpZiAoaS5jb25maWcuYWNjZXNzUmlnaHQpIHtcclxuICAgICAgICBhY2MucHVzaChpLmNvbmZpZy5hY2Nlc3NSaWdodCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBhY2M7XHJcbiAgICB9LCBbXSk7XHJcblxyXG4gICAgbGV0IGNhbkFjY2VzcyA9IHRoaXMuc2Vzc2lvbi51c2VySGFzQWxsQWNjZXNzUmlnaHRzKG5lZWRlZEFjY2Vzc1JpZ2h0cyk7XHJcblxyXG4gICAgaWYgKGNhbkFjY2VzcyA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IodGhpcy5sb2NhbGUudHJhbnNsYXRlKCdub3RBdXRob3JpemVkJykpO1xyXG4gICAgICByZXR1cm4gbmV4dC5jYW5jZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV4dCgpO1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
