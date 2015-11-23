define(['exports', 'aurelia-dependency-injection', './session', './logger', './locale', './config', 'aurelia-router'], function (exports, _aureliaDependencyInjection, _session, _logger, _locale, _config, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var BaseAuthorizeStep = (function () {
    function BaseAuthorizeStep(session, logger) {
      _classCallCheck(this, BaseAuthorizeStep);

      this.session = session;
      this.logger = logger;
      this.locale = _locale.Locale.Repository['default'];
      this.loginRoute = _config.Config.routerAuthStepOpts.loginRoute;
    }

    _createClass(BaseAuthorizeStep, [{
      key: 'run',
      value: function run(navigationInstruction, next) {
        if (!this.session.isUserLoggedIn() && navigationInstruction.config.route !== this.loginRoute) {
          this.logger.warn(this.locale.translate('pleaseLogin'));
          return next.cancel(new _aureliaRouter.Redirect(this.loginRoute));
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

  var RolesAuthorizeStep = (function (_BaseAuthorizeStep) {
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
    RolesAuthorizeStep = (0, _aureliaDependencyInjection.inject)(_session.Session, _logger.Logger)(RolesAuthorizeStep) || RolesAuthorizeStep;
    return RolesAuthorizeStep;
  })(BaseAuthorizeStep);

  exports.RolesAuthorizeStep = RolesAuthorizeStep;

  var AccessRightsAuthorizeStep = (function (_BaseAuthorizeStep2) {
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
    AccessRightsAuthorizeStep = (0, _aureliaDependencyInjection.inject)(_session.Session, _logger.Logger)(AccessRightsAuthorizeStep) || AccessRightsAuthorizeStep;
    return AccessRightsAuthorizeStep;
  })(BaseAuthorizeStep);

  exports.AccessRightsAuthorizeStep = AccessRightsAuthorizeStep;
});
//# sourceMappingURL=data:application/json;base64,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QUFNLEVBQUU7S0FDeEI7O2lCQUhVLHlCQUF5Qjs7YUFLM0IsbUJBQUMscUJBQXFCLEVBQUU7QUFDL0IsWUFBSSxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFO0FBQzVDLGlCQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2xGOztBQUVELGVBQU8sSUFBSSxDQUFDO09BQ2I7OztxQ0FYVSx5QkFBeUI7QUFBekIsNkJBQXlCLEdBRHJDLGdDQWxFTyxNQUFNLFdBQ04sT0FBTyxVQUNQLE1BQU0sQ0FnRVUsQ0FDWCx5QkFBeUIsS0FBekIseUJBQXlCO1dBQXpCLHlCQUF5QjtLQUFTLGlCQUFpQiIsImZpbGUiOiJhdXRob3JpemUtc3RlcHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbW9zaGVuc2t5IG9uIDYvMTcvMTUuXG4gKi9cbmltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWRlcGVuZGVuY3ktaW5qZWN0aW9uJztcbmltcG9ydCB7U2Vzc2lvbn0gZnJvbSAnLi9zZXNzaW9uJztcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQge0xvY2FsZX0gZnJvbSAnLi9sb2NhbGUnO1xuaW1wb3J0IHtDb25maWd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7UmVkaXJlY3R9IGZyb20gJ2F1cmVsaWEtcm91dGVyJztcblxuXG5jbGFzcyBCYXNlQXV0aG9yaXplU3RlcCB7XG4gIGNvbnN0cnVjdG9yKHNlc3Npb24sIGxvZ2dlcikge1xuICAgIHRoaXMuc2Vzc2lvbiA9IHNlc3Npb247XG4gICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gICAgdGhpcy5sb2NhbGUgPSBMb2NhbGUuUmVwb3NpdG9yeS5kZWZhdWx0O1xuICAgIHRoaXMubG9naW5Sb3V0ZSA9IENvbmZpZy5yb3V0ZXJBdXRoU3RlcE9wdHMubG9naW5Sb3V0ZTtcbiAgfVxuXG4gIHJ1bihuYXZpZ2F0aW9uSW5zdHJ1Y3Rpb24sIG5leHQpIHtcbiAgICBpZiAoIXRoaXMuc2Vzc2lvbi5pc1VzZXJMb2dnZWRJbigpICYmIG5hdmlnYXRpb25JbnN0cnVjdGlvbi5jb25maWcucm91dGUgIT09IHRoaXMubG9naW5Sb3V0ZSkge1xuICAgICAgdGhpcy5sb2dnZXIud2Fybih0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ3BsZWFzZUxvZ2luJykpO1xuICAgICAgcmV0dXJuIG5leHQuY2FuY2VsKG5ldyBSZWRpcmVjdCh0aGlzLmxvZ2luUm91dGUpKTtcbiAgICB9XG5cbiAgICBsZXQgY2FuQWNjZXNzID0gdGhpcy5hdXRob3JpemUobmF2aWdhdGlvbkluc3RydWN0aW9uKTtcbiAgICBpZiAoY2FuQWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IodGhpcy5sb2NhbGUudHJhbnNsYXRlKCdub3RBdXRob3JpemVkJykpO1xuICAgICAgcmV0dXJuIG5leHQuY2FuY2VsKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHQoKTtcbiAgfVxuXG4gIGF1dGhvcml6ZShuYXZpZ2F0aW9uSW5zdHJ1Y3Rpb24pIHtcbiAgICBpZiAobmF2aWdhdGlvbkluc3RydWN0aW9uLnBhcmVudEluc3RydWN0aW9uID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYW5BY2Nlc3MobmF2aWdhdGlvbkluc3RydWN0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGNhbkFjY2VzcyA9IHRoaXMuY2FuQWNjZXNzKG5hdmlnYXRpb25JbnN0cnVjdGlvbik7XG4gICAgICBpZiAoaGFzUm9sZSl7XG4gICAgICAgIHJldHVybiB0aGlzLmF1dGhvcml6ZShuYXZpZ2F0aW9uSW5zdHJ1Y3Rpb24ucGFyZW50SW5zdHJ1Y3Rpb24pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2FuQWNjZXNzKCkge1xuXG4gIH1cbn1cblxuXG5AaW5qZWN0KFNlc3Npb24sIExvZ2dlcilcbmV4cG9ydCBjbGFzcyBSb2xlc0F1dGhvcml6ZVN0ZXAgZXh0ZW5kcyBCYXNlQXV0aG9yaXplU3RlcCB7XG4gIGNvbnN0cnVjdG9yKHNlc3Npb24sIGxvZ2dlcikge1xuICAgIHN1cGVyKHNlc3Npb24sIGxvZ2dlcik7XG4gIH1cblxuICBjYW5BY2Nlc3MobmF2aWdhdGlvbkluc3RydWN0aW9uKSB7XG4gICAgaWYgKG5hdmlnYXRpb25JbnN0cnVjdGlvbi5jb25maWcucm9sZXMpIHtcbiAgICAgIHJldHVybiB0aGlzLnNlc3Npb24udXNlckhhc0F0TGVhc3RPbmVSb2xlKG5hdmlnYXRpb25JbnN0cnVjdGlvbi5jb25maWcucm9sZXMpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cblxuQGluamVjdChTZXNzaW9uLCBMb2dnZXIpXG5leHBvcnQgY2xhc3MgQWNjZXNzUmlnaHRzQXV0aG9yaXplU3RlcCBleHRlbmRzIEJhc2VBdXRob3JpemVTdGVwIHtcbiAgY29uc3RydWN0b3Ioc2Vzc2lvbiwgbG9nZ2VyKSB7XG4gICAgc3VwZXIoc2Vzc2lvbiwgbG9nZ2VyKTtcbiAgfVxuXG4gIGNhbkFjY2VzcyhuYXZpZ2F0aW9uSW5zdHJ1Y3Rpb24pIHtcbiAgICBpZiAobmF2aWdhdGlvbkluc3RydWN0aW9uLmNvbmZpZy5hY2Nlc3NSaWdodCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2Vzc2lvbi51c2VySGFzQWNjZXNzUmlnaHQobmF2aWdhdGlvbkluc3RydWN0aW9uLmNvbmZpZy5hY2Nlc3NSaWdodCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9