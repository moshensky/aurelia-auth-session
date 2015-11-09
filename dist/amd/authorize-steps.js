define(['exports', 'aurelia-dependency-injection', './session', './logger', './locale', './config', 'aurelia-router'], function (exports, _aureliaDependencyInjection, _session, _logger, _locale, _config, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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
});
//# sourceMappingURL=data:application/json;base64,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QkFBa0IsR0FBRyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBRyxFQUFFLENBQUMsRUFBSztBQUMxRSxjQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFO0FBQ3hCLGVBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztXQUNoQzs7QUFFRCxpQkFBTyxHQUFHLENBQUM7U0FDWixFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUVQLFlBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs7QUFFeEUsWUFBSSxTQUFTLEtBQUssS0FBSyxFQUFFO0FBQ3ZCLGNBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7QUFDMUQsaUJBQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3RCOztBQUVELGVBQU8sSUFBSSxFQUFFLENBQUM7T0FDZjs7O3FDQTlCVSx5QkFBeUI7QUFBekIsNkJBQXlCLEdBRHJDLGdDQXZDTyxNQUFNLFdBQ04sT0FBTyxVQUNQLE1BQU0sQ0FxQ1UsQ0FDWCx5QkFBeUIsS0FBekIseUJBQXlCO1dBQXpCLHlCQUF5QiIsImZpbGUiOiJhdXRob3JpemUtc3RlcHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBtb3NoZW5za3kgb24gNi8xNy8xNS5cclxuICovXHJcbmltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWRlcGVuZGVuY3ktaW5qZWN0aW9uJztcclxuaW1wb3J0IHtTZXNzaW9ufSBmcm9tICcuL3Nlc3Npb24nO1xyXG5pbXBvcnQge0xvZ2dlcn0gZnJvbSAnLi9sb2dnZXInO1xyXG5pbXBvcnQge0xvY2FsZX0gZnJvbSAnLi9sb2NhbGUnO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi9jb25maWcnO1xyXG5pbXBvcnQge1JlZGlyZWN0fSBmcm9tICdhdXJlbGlhLXJvdXRlcic7XHJcblxyXG5AaW5qZWN0KFNlc3Npb24sIExvZ2dlcilcclxuZXhwb3J0IGNsYXNzIFJvbGVzQXV0aG9yaXplU3RlcCB7XHJcbiAgY29uc3RydWN0b3Ioc2Vzc2lvbiwgbG9nZ2VyKSB7XHJcbiAgICB0aGlzLnNlc3Npb24gPSBzZXNzaW9uO1xyXG4gICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XHJcbiAgICB0aGlzLmxvY2FsZSA9IExvY2FsZS5SZXBvc2l0b3J5LmRlZmF1bHQ7XHJcbiAgICB0aGlzLmxvZ2luUm91dGUgPSBDb25maWcucm91dGVyQXV0aFN0ZXBPcHRzLmxvZ2luUm91dGU7XHJcbiAgfVxyXG5cclxuICBydW4ocm91dGluZ0NvbnRleHQsIG5leHQpIHtcclxuICAgIGlmICghdGhpcy5zZXNzaW9uLmlzVXNlckxvZ2dlZEluKCkgJiYgcm91dGluZ0NvbnRleHQubmV4dEluc3RydWN0aW9uLmNvbmZpZy5yb3V0ZSAhPT0gdGhpcy5sb2dpblJvdXRlKSB7XHJcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4odGhpcy5sb2NhbGUudHJhbnNsYXRlKCdwbGVhc2VMb2dpbicpKTtcclxuICAgICAgcmV0dXJuIG5leHQuY2FuY2VsKG5ldyBSZWRpcmVjdCh0aGlzLmxvZ2luUm91dGUpKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY2FuQWNjZXNzID0gcm91dGluZ0NvbnRleHQubmV4dEluc3RydWN0aW9ucy5ldmVyeShpID0+IHtcclxuICAgICAgaWYgKGkuY29uZmlnLnJvbGVzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vzc2lvbi51c2VySGFzQXRMZWFzdE9uZVJvbGUoaS5jb25maWcucm9sZXMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChjYW5BY2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKHRoaXMubG9jYWxlLnRyYW5zbGF0ZSgnbm90QXV0aG9yaXplZCcpKTtcclxuICAgICAgcmV0dXJuIG5leHQuY2FuY2VsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5leHQoKTtcclxuICB9XHJcbn1cclxuXHJcbkBpbmplY3QoU2Vzc2lvbiwgTG9nZ2VyKVxyXG5leHBvcnQgY2xhc3MgQWNjZXNzUmlnaHRzQXV0aG9yaXplU3RlcCB7XHJcbiAgY29uc3RydWN0b3Ioc2Vzc2lvbiwgbG9nZ2VyKSB7XHJcbiAgICB0aGlzLnNlc3Npb24gPSBzZXNzaW9uO1xyXG4gICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XHJcbiAgICB0aGlzLmxvY2FsZSA9IExvY2FsZS5SZXBvc2l0b3J5LmRlZmF1bHQ7XHJcbiAgICB0aGlzLmxvZ2luUm91dGUgPSBDb25maWcucm91dGVyQXV0aFN0ZXBPcHRzLmxvZ2luUm91dGU7XHJcbiAgfVxyXG5cclxuICBydW4ocm91dGluZ0NvbnRleHQsIG5leHQpIHtcclxuICAgIGlmICghdGhpcy5zZXNzaW9uLmlzVXNlckxvZ2dlZEluKCkgJiYgcm91dGluZ0NvbnRleHQubmV4dEluc3RydWN0aW9uLmNvbmZpZy5yb3V0ZSAhPT0gdGhpcy5sb2dpblJvdXRlKSB7XHJcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4odGhpcy5sb2NhbGUudHJhbnNsYXRlKCdwbGVhc2VMb2dpbicpKTtcclxuICAgICAgcmV0dXJuIG5leHQuY2FuY2VsKG5ldyBSZWRpcmVjdCh0aGlzLmxvZ2luUm91dGUpKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbmVlZGVkQWNjZXNzUmlnaHRzID0gcm91dGluZ0NvbnRleHQubmV4dEluc3RydWN0aW9ucy5yZWR1Y2UoKGFjYywgaSkgPT4ge1xyXG4gICAgICBpZiAoaS5jb25maWcuYWNjZXNzUmlnaHQpIHtcclxuICAgICAgICBhY2MucHVzaChpLmNvbmZpZy5hY2Nlc3NSaWdodCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBhY2M7XHJcbiAgICB9LCBbXSk7XHJcblxyXG4gICAgbGV0IGNhbkFjY2VzcyA9IHRoaXMuc2Vzc2lvbi51c2VySGFzQWxsQWNjZXNzUmlnaHRzKG5lZWRlZEFjY2Vzc1JpZ2h0cyk7XHJcblxyXG4gICAgaWYgKGNhbkFjY2VzcyA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IodGhpcy5sb2NhbGUudHJhbnNsYXRlKCdub3RBdXRob3JpemVkJykpO1xyXG4gICAgICByZXR1cm4gbmV4dC5jYW5jZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV4dCgpO1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
