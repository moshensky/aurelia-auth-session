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
//# sourceMappingURL=data:application/json;base64,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QkFBa0IsR0FBRyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBRyxFQUFFLENBQUMsRUFBSztBQUMxRSxjQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFO0FBQ3hCLGVBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztXQUNoQzs7QUFFRCxpQkFBTyxHQUFHLENBQUM7U0FDWixFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUVQLFlBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs7QUFFeEUsWUFBSSxTQUFTLEtBQUssS0FBSyxFQUFFO0FBQ3ZCLGNBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7QUFDMUQsaUJBQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3RCOztBQUVELGVBQU8sSUFBSSxFQUFFLENBQUM7T0FDZjs7O3FDQTlCVSx5QkFBeUI7QUFBekIsNkJBQXlCLEdBRHJDLGdDQXZDTyxNQUFNLFdBQ04sT0FBTyxVQUNQLE1BQU0sQ0FxQ1UsQ0FDWCx5QkFBeUIsS0FBekIseUJBQXlCO1dBQXpCLHlCQUF5QiIsImZpbGUiOiJhdXRob3JpemUtc3RlcHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbW9zaGVuc2t5IG9uIDYvMTcvMTUuXG4gKi9cbmltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWRlcGVuZGVuY3ktaW5qZWN0aW9uJztcbmltcG9ydCB7U2Vzc2lvbn0gZnJvbSAnLi9zZXNzaW9uJztcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQge0xvY2FsZX0gZnJvbSAnLi9sb2NhbGUnO1xuaW1wb3J0IHtDb25maWd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7UmVkaXJlY3R9IGZyb20gJ2F1cmVsaWEtcm91dGVyJztcblxuQGluamVjdChTZXNzaW9uLCBMb2dnZXIpXG5leHBvcnQgY2xhc3MgUm9sZXNBdXRob3JpemVTdGVwIHtcbiAgY29uc3RydWN0b3Ioc2Vzc2lvbiwgbG9nZ2VyKSB7XG4gICAgdGhpcy5zZXNzaW9uID0gc2Vzc2lvbjtcbiAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgICB0aGlzLmxvY2FsZSA9IExvY2FsZS5SZXBvc2l0b3J5LmRlZmF1bHQ7XG4gICAgdGhpcy5sb2dpblJvdXRlID0gQ29uZmlnLnJvdXRlckF1dGhTdGVwT3B0cy5sb2dpblJvdXRlO1xuICB9XG5cbiAgcnVuKHJvdXRpbmdDb250ZXh0LCBuZXh0KSB7XG4gICAgaWYgKCF0aGlzLnNlc3Npb24uaXNVc2VyTG9nZ2VkSW4oKSAmJiByb3V0aW5nQ29udGV4dC5uZXh0SW5zdHJ1Y3Rpb24uY29uZmlnLnJvdXRlICE9PSB0aGlzLmxvZ2luUm91dGUpIHtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4odGhpcy5sb2NhbGUudHJhbnNsYXRlKCdwbGVhc2VMb2dpbicpKTtcbiAgICAgIHJldHVybiBuZXh0LmNhbmNlbChuZXcgUmVkaXJlY3QodGhpcy5sb2dpblJvdXRlKSk7XG4gICAgfVxuXG4gICAgbGV0IGNhbkFjY2VzcyA9IHJvdXRpbmdDb250ZXh0Lm5leHRJbnN0cnVjdGlvbnMuZXZlcnkoaSA9PiB7XG4gICAgICBpZiAoaS5jb25maWcucm9sZXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vzc2lvbi51c2VySGFzQXRMZWFzdE9uZVJvbGUoaS5jb25maWcucm9sZXMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcblxuICAgIGlmIChjYW5BY2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcih0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ25vdEF1dGhvcml6ZWQnKSk7XG4gICAgICByZXR1cm4gbmV4dC5jYW5jZWwoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dCgpO1xuICB9XG59XG5cbkBpbmplY3QoU2Vzc2lvbiwgTG9nZ2VyKVxuZXhwb3J0IGNsYXNzIEFjY2Vzc1JpZ2h0c0F1dGhvcml6ZVN0ZXAge1xuICBjb25zdHJ1Y3RvcihzZXNzaW9uLCBsb2dnZXIpIHtcbiAgICB0aGlzLnNlc3Npb24gPSBzZXNzaW9uO1xuICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgIHRoaXMubG9jYWxlID0gTG9jYWxlLlJlcG9zaXRvcnkuZGVmYXVsdDtcbiAgICB0aGlzLmxvZ2luUm91dGUgPSBDb25maWcucm91dGVyQXV0aFN0ZXBPcHRzLmxvZ2luUm91dGU7XG4gIH1cblxuICBydW4ocm91dGluZ0NvbnRleHQsIG5leHQpIHtcbiAgICBpZiAoIXRoaXMuc2Vzc2lvbi5pc1VzZXJMb2dnZWRJbigpICYmIHJvdXRpbmdDb250ZXh0Lm5leHRJbnN0cnVjdGlvbi5jb25maWcucm91dGUgIT09IHRoaXMubG9naW5Sb3V0ZSkge1xuICAgICAgdGhpcy5sb2dnZXIud2Fybih0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ3BsZWFzZUxvZ2luJykpO1xuICAgICAgcmV0dXJuIG5leHQuY2FuY2VsKG5ldyBSZWRpcmVjdCh0aGlzLmxvZ2luUm91dGUpKTtcbiAgICB9XG5cbiAgICBsZXQgbmVlZGVkQWNjZXNzUmlnaHRzID0gcm91dGluZ0NvbnRleHQubmV4dEluc3RydWN0aW9ucy5yZWR1Y2UoKGFjYywgaSkgPT4ge1xuICAgICAgaWYgKGkuY29uZmlnLmFjY2Vzc1JpZ2h0KSB7XG4gICAgICAgIGFjYy5wdXNoKGkuY29uZmlnLmFjY2Vzc1JpZ2h0KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBbXSk7XG5cbiAgICBsZXQgY2FuQWNjZXNzID0gdGhpcy5zZXNzaW9uLnVzZXJIYXNBbGxBY2Nlc3NSaWdodHMobmVlZGVkQWNjZXNzUmlnaHRzKTtcblxuICAgIGlmIChjYW5BY2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcih0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ25vdEF1dGhvcml6ZWQnKSk7XG4gICAgICByZXR1cm4gbmV4dC5jYW5jZWwoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dCgpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=