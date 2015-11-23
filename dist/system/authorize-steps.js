System.register(['aurelia-dependency-injection', './session', './logger', './locale', './config', 'aurelia-router'], function (_export) {
  'use strict';

  var inject, Session, Logger, Locale, Config, Redirect, BaseAuthorizeStep, RolesAuthorizeStep, AccessRightsAuthorizeStep;

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      BaseAuthorizeStep = (function () {
        function BaseAuthorizeStep(session, logger) {
          _classCallCheck(this, BaseAuthorizeStep);

          this.session = session;
          this.logger = logger;
          this.locale = Locale.Repository['default'];
          this.loginRoute = Config.routerAuthStepOpts.loginRoute;
        }

        _createClass(BaseAuthorizeStep, [{
          key: 'run',
          value: function run(navigationInstruction, next) {
            if (!this.session.isUserLoggedIn() && navigationInstruction.config.route !== this.loginRoute) {
              this.logger.warn(this.locale.translate('pleaseLogin'));
              return next.cancel(new Redirect(this.loginRoute));
            }

            var canAccess = this.authorize(navigationInstruction);
            if (canAccess === false) {
              this.logger.error(this.locale.translate('notAuthorized'));
              return next.cancel();
            }

            return next();
          }
        }, {
          key: 'authorize',
          value: function authorize(navigationInstruction) {
            if (navigationInstruction.parentInstruction === null) {
              return this.canAccess(navigationInstruction);
            } else {
              var canAccess = this.canAccess(navigationInstruction);
              if (hasRole) {
                return this.authorize(navigationInstruction.parentInstruction);
              } else {
                return false;
              }
            }
          }
        }, {
          key: 'canAccess',
          value: function canAccess() {}
        }]);

        return BaseAuthorizeStep;
      })();

      RolesAuthorizeStep = (function (_BaseAuthorizeStep) {
        _inherits(RolesAuthorizeStep, _BaseAuthorizeStep);

        function RolesAuthorizeStep(session, logger) {
          _classCallCheck(this, _RolesAuthorizeStep);

          _get(Object.getPrototypeOf(_RolesAuthorizeStep.prototype), 'constructor', this).call(this, session, logger);
        }

        _createClass(RolesAuthorizeStep, [{
          key: 'canAccess',
          value: function canAccess(navigationInstruction) {
            if (navigationInstruction.config.roles) {
              return this.session.userHasAtLeastOneRole(navigationInstruction.config.roles);
            }

            return true;
          }
        }]);

        var _RolesAuthorizeStep = RolesAuthorizeStep;
        RolesAuthorizeStep = inject(Session, Logger)(RolesAuthorizeStep) || RolesAuthorizeStep;
        return RolesAuthorizeStep;
      })(BaseAuthorizeStep);

      _export('RolesAuthorizeStep', RolesAuthorizeStep);

      AccessRightsAuthorizeStep = (function (_BaseAuthorizeStep2) {
        _inherits(AccessRightsAuthorizeStep, _BaseAuthorizeStep2);

        function AccessRightsAuthorizeStep(session, logger) {
          _classCallCheck(this, _AccessRightsAuthorizeStep);

          _get(Object.getPrototypeOf(_AccessRightsAuthorizeStep.prototype), 'constructor', this).call(this, session, logger);
        }

        _createClass(AccessRightsAuthorizeStep, [{
          key: 'canAccess',
          value: function canAccess(navigationInstruction) {
            if (navigationInstruction.config.accessRight) {
              return this.session.userHasAccessRight(navigationInstruction.config.accessRight);
            }

            return true;
          }
        }]);

        var _AccessRightsAuthorizeStep = AccessRightsAuthorizeStep;
        AccessRightsAuthorizeStep = inject(Session, Logger)(AccessRightsAuthorizeStep) || AccessRightsAuthorizeStep;
        return AccessRightsAuthorizeStep;
      })(BaseAuthorizeStep);

      _export('AccessRightsAuthorizeStep', AccessRightsAuthorizeStep);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QUFTLGlCQUFpQjs7OztBQWdCNUMsK0JBQXlCO2tCQUF6Qix5QkFBeUI7O0FBQ3pCLGlCQURBLHlCQUF5QixDQUN4QixPQUFPLEVBQUUsTUFBTSxFQUFFOzs7QUFDM0IsNEdBQU0sT0FBTyxFQUFFLE1BQU0sRUFBRTtTQUN4Qjs7cUJBSFUseUJBQXlCOztpQkFLM0IsbUJBQUMscUJBQXFCLEVBQUU7QUFDL0IsZ0JBQUkscUJBQXFCLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRTtBQUM1QyxxQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUNsRjs7QUFFRCxtQkFBTyxJQUFJLENBQUM7V0FDYjs7O3lDQVhVLHlCQUF5QjtBQUF6QixpQ0FBeUIsR0FEckMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FDWCx5QkFBeUIsS0FBekIseUJBQXlCO2VBQXpCLHlCQUF5QjtTQUFTLGlCQUFpQiIsImZpbGUiOiJhdXRob3JpemUtc3RlcHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbW9zaGVuc2t5IG9uIDYvMTcvMTUuXG4gKi9cbmltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWRlcGVuZGVuY3ktaW5qZWN0aW9uJztcbmltcG9ydCB7U2Vzc2lvbn0gZnJvbSAnLi9zZXNzaW9uJztcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQge0xvY2FsZX0gZnJvbSAnLi9sb2NhbGUnO1xuaW1wb3J0IHtDb25maWd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7UmVkaXJlY3R9IGZyb20gJ2F1cmVsaWEtcm91dGVyJztcblxuXG5jbGFzcyBCYXNlQXV0aG9yaXplU3RlcCB7XG4gIGNvbnN0cnVjdG9yKHNlc3Npb24sIGxvZ2dlcikge1xuICAgIHRoaXMuc2Vzc2lvbiA9IHNlc3Npb247XG4gICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gICAgdGhpcy5sb2NhbGUgPSBMb2NhbGUuUmVwb3NpdG9yeS5kZWZhdWx0O1xuICAgIHRoaXMubG9naW5Sb3V0ZSA9IENvbmZpZy5yb3V0ZXJBdXRoU3RlcE9wdHMubG9naW5Sb3V0ZTtcbiAgfVxuXG4gIHJ1bihuYXZpZ2F0aW9uSW5zdHJ1Y3Rpb24sIG5leHQpIHtcbiAgICBpZiAoIXRoaXMuc2Vzc2lvbi5pc1VzZXJMb2dnZWRJbigpICYmIG5hdmlnYXRpb25JbnN0cnVjdGlvbi5jb25maWcucm91dGUgIT09IHRoaXMubG9naW5Sb3V0ZSkge1xuICAgICAgdGhpcy5sb2dnZXIud2Fybih0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ3BsZWFzZUxvZ2luJykpO1xuICAgICAgcmV0dXJuIG5leHQuY2FuY2VsKG5ldyBSZWRpcmVjdCh0aGlzLmxvZ2luUm91dGUpKTtcbiAgICB9XG5cbiAgICBsZXQgY2FuQWNjZXNzID0gdGhpcy5hdXRob3JpemUobmF2aWdhdGlvbkluc3RydWN0aW9uKTtcbiAgICBpZiAoY2FuQWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IodGhpcy5sb2NhbGUudHJhbnNsYXRlKCdub3RBdXRob3JpemVkJykpO1xuICAgICAgcmV0dXJuIG5leHQuY2FuY2VsKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHQoKTtcbiAgfVxuXG4gIGF1dGhvcml6ZShuYXZpZ2F0aW9uSW5zdHJ1Y3Rpb24pIHtcbiAgICBpZiAobmF2aWdhdGlvbkluc3RydWN0aW9uLnBhcmVudEluc3RydWN0aW9uID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYW5BY2Nlc3MobmF2aWdhdGlvbkluc3RydWN0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGNhbkFjY2VzcyA9IHRoaXMuY2FuQWNjZXNzKG5hdmlnYXRpb25JbnN0cnVjdGlvbik7XG4gICAgICBpZiAoaGFzUm9sZSl7XG4gICAgICAgIHJldHVybiB0aGlzLmF1dGhvcml6ZShuYXZpZ2F0aW9uSW5zdHJ1Y3Rpb24ucGFyZW50SW5zdHJ1Y3Rpb24pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2FuQWNjZXNzKCkge1xuXG4gIH1cbn1cblxuXG5AaW5qZWN0KFNlc3Npb24sIExvZ2dlcilcbmV4cG9ydCBjbGFzcyBSb2xlc0F1dGhvcml6ZVN0ZXAgZXh0ZW5kcyBCYXNlQXV0aG9yaXplU3RlcCB7XG4gIGNvbnN0cnVjdG9yKHNlc3Npb24sIGxvZ2dlcikge1xuICAgIHN1cGVyKHNlc3Npb24sIGxvZ2dlcik7XG4gIH1cblxuICBjYW5BY2Nlc3MobmF2aWdhdGlvbkluc3RydWN0aW9uKSB7XG4gICAgaWYgKG5hdmlnYXRpb25JbnN0cnVjdGlvbi5jb25maWcucm9sZXMpIHtcbiAgICAgIHJldHVybiB0aGlzLnNlc3Npb24udXNlckhhc0F0TGVhc3RPbmVSb2xlKG5hdmlnYXRpb25JbnN0cnVjdGlvbi5jb25maWcucm9sZXMpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cblxuQGluamVjdChTZXNzaW9uLCBMb2dnZXIpXG5leHBvcnQgY2xhc3MgQWNjZXNzUmlnaHRzQXV0aG9yaXplU3RlcCBleHRlbmRzIEJhc2VBdXRob3JpemVTdGVwIHtcbiAgY29uc3RydWN0b3Ioc2Vzc2lvbiwgbG9nZ2VyKSB7XG4gICAgc3VwZXIoc2Vzc2lvbiwgbG9nZ2VyKTtcbiAgfVxuXG4gIGNhbkFjY2VzcyhuYXZpZ2F0aW9uSW5zdHJ1Y3Rpb24pIHtcbiAgICBpZiAobmF2aWdhdGlvbkluc3RydWN0aW9uLmNvbmZpZy5hY2Nlc3NSaWdodCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2Vzc2lvbi51c2VySGFzQWNjZXNzUmlnaHQobmF2aWdhdGlvbkluc3RydWN0aW9uLmNvbmZpZy5hY2Nlc3NSaWdodCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9