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

    var _RolesAuthorizeStep = RolesAuthorizeStep;

    _createClass(_RolesAuthorizeStep, [{
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

    _createClass(_AccessRightsAuthorizeStep, [{
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

    AccessRightsAuthorizeStep = (0, _aureliaDependencyInjection.inject)(_session.Session, _logger.Logger)(AccessRightsAuthorizeStep) || AccessRightsAuthorizeStep;
    return AccessRightsAuthorizeStep;
  })();

  exports.AccessRightsAuthorizeStep = AccessRightsAuthorizeStep;
});
//# sourceMappingURL=data:application/json;base64,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bkQ7O0FBRUQsWUFBSSxrQkFBa0IsR0FBRyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBRyxFQUFFLENBQUMsRUFBSztBQUMxRSxjQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFO0FBQ3hCLGVBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztXQUNoQzs7QUFFRCxpQkFBTyxHQUFHLENBQUM7U0FDWixFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUVQLFlBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs7QUFFeEUsWUFBSSxTQUFTLEtBQUssS0FBSyxFQUFFO0FBQ3ZCLGNBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7QUFDMUQsaUJBQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3RCOztBQUVELGVBQU8sSUFBSSxFQUFFLENBQUM7T0FDZjs7O0FBOUJVLDZCQUF5QixHQURyQyxnQ0F2Q08sTUFBTSxXQUNOLE9BQU8sVUFDUCxNQUFNLENBcUNVLENBQ1gseUJBQXlCLEtBQXpCLHlCQUF5QjtXQUF6Qix5QkFBeUI7OztVQUF6Qix5QkFBeUIsR0FBekIseUJBQXlCIiwiZmlsZSI6ImF1dGhvcml6ZS1zdGVwcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtb3NoZW5za3kgb24gNi8xNy8xNS5cbiAqL1xuaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZGVwZW5kZW5jeS1pbmplY3Rpb24nO1xuaW1wb3J0IHtTZXNzaW9ufSBmcm9tICcuL3Nlc3Npb24nO1xuaW1wb3J0IHtMb2dnZXJ9IGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7TG9jYWxlfSBmcm9tICcuL2xvY2FsZSc7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHtSZWRpcmVjdH0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInO1xuXG5AaW5qZWN0KFNlc3Npb24sIExvZ2dlcilcbmV4cG9ydCBjbGFzcyBSb2xlc0F1dGhvcml6ZVN0ZXAge1xuICBjb25zdHJ1Y3RvcihzZXNzaW9uLCBsb2dnZXIpIHtcbiAgICB0aGlzLnNlc3Npb24gPSBzZXNzaW9uO1xuICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgIHRoaXMubG9jYWxlID0gTG9jYWxlLlJlcG9zaXRvcnkuZGVmYXVsdDtcbiAgICB0aGlzLmxvZ2luUm91dGUgPSBDb25maWcucm91dGVyQXV0aFN0ZXBPcHRzLmxvZ2luUm91dGU7XG4gIH1cblxuICBydW4ocm91dGluZ0NvbnRleHQsIG5leHQpIHtcbiAgICBpZiAoIXRoaXMuc2Vzc2lvbi5pc1VzZXJMb2dnZWRJbigpICYmIHJvdXRpbmdDb250ZXh0Lm5leHRJbnN0cnVjdGlvbi5jb25maWcucm91dGUgIT09IHRoaXMubG9naW5Sb3V0ZSkge1xuICAgICAgdGhpcy5sb2dnZXIud2Fybih0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ3BsZWFzZUxvZ2luJykpO1xuICAgICAgcmV0dXJuIG5leHQuY2FuY2VsKG5ldyBSZWRpcmVjdCh0aGlzLmxvZ2luUm91dGUpKTtcbiAgICB9XG5cbiAgICBsZXQgY2FuQWNjZXNzID0gcm91dGluZ0NvbnRleHQubmV4dEluc3RydWN0aW9ucy5ldmVyeShpID0+IHtcbiAgICAgIGlmIChpLmNvbmZpZy5yb2xlcykge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXNzaW9uLnVzZXJIYXNBdExlYXN0T25lUm9sZShpLmNvbmZpZy5yb2xlcyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuXG4gICAgaWYgKGNhbkFjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKHRoaXMubG9jYWxlLnRyYW5zbGF0ZSgnbm90QXV0aG9yaXplZCcpKTtcbiAgICAgIHJldHVybiBuZXh0LmNhbmNlbCgpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXh0KCk7XG4gIH1cbn1cblxuQGluamVjdChTZXNzaW9uLCBMb2dnZXIpXG5leHBvcnQgY2xhc3MgQWNjZXNzUmlnaHRzQXV0aG9yaXplU3RlcCB7XG4gIGNvbnN0cnVjdG9yKHNlc3Npb24sIGxvZ2dlcikge1xuICAgIHRoaXMuc2Vzc2lvbiA9IHNlc3Npb247XG4gICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gICAgdGhpcy5sb2NhbGUgPSBMb2NhbGUuUmVwb3NpdG9yeS5kZWZhdWx0O1xuICAgIHRoaXMubG9naW5Sb3V0ZSA9IENvbmZpZy5yb3V0ZXJBdXRoU3RlcE9wdHMubG9naW5Sb3V0ZTtcbiAgfVxuXG4gIHJ1bihyb3V0aW5nQ29udGV4dCwgbmV4dCkge1xuICAgIGlmICghdGhpcy5zZXNzaW9uLmlzVXNlckxvZ2dlZEluKCkgJiYgcm91dGluZ0NvbnRleHQubmV4dEluc3RydWN0aW9uLmNvbmZpZy5yb3V0ZSAhPT0gdGhpcy5sb2dpblJvdXRlKSB7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKHRoaXMubG9jYWxlLnRyYW5zbGF0ZSgncGxlYXNlTG9naW4nKSk7XG4gICAgICByZXR1cm4gbmV4dC5jYW5jZWwobmV3IFJlZGlyZWN0KHRoaXMubG9naW5Sb3V0ZSkpO1xuICAgIH1cblxuICAgIGxldCBuZWVkZWRBY2Nlc3NSaWdodHMgPSByb3V0aW5nQ29udGV4dC5uZXh0SW5zdHJ1Y3Rpb25zLnJlZHVjZSgoYWNjLCBpKSA9PiB7XG4gICAgICBpZiAoaS5jb25maWcuYWNjZXNzUmlnaHQpIHtcbiAgICAgICAgYWNjLnB1c2goaS5jb25maWcuYWNjZXNzUmlnaHQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIFtdKTtcblxuICAgIGxldCBjYW5BY2Nlc3MgPSB0aGlzLnNlc3Npb24udXNlckhhc0FsbEFjY2Vzc1JpZ2h0cyhuZWVkZWRBY2Nlc3NSaWdodHMpO1xuXG4gICAgaWYgKGNhbkFjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKHRoaXMubG9jYWxlLnRyYW5zbGF0ZSgnbm90QXV0aG9yaXplZCcpKTtcbiAgICAgIHJldHVybiBuZXh0LmNhbmNlbCgpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXh0KCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==