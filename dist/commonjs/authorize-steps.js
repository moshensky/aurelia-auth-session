'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _session = require('./session');

var _logger = require('./logger');

var _locale = require('./locale');

var _config = require('./config');

var _aureliaRouter = require('aurelia-router');

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