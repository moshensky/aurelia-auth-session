define(['exports', './config', './logger', './session', './http', './authorize-steps'], function (exports, _config, _logger, _session, _http, _authorizeSteps) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.configure = configure;
  Object.defineProperty(exports, 'Logger', {
    enumerable: true,
    get: function get() {
      return _logger.Logger;
    }
  });
  Object.defineProperty(exports, 'Session', {
    enumerable: true,
    get: function get() {
      return _session.Session;
    }
  });
  Object.defineProperty(exports, 'Http', {
    enumerable: true,
    get: function get() {
      return _http.Http;
    }
  });
  Object.defineProperty(exports, 'AccessRightsAuthorizeStep', {
    enumerable: true,
    get: function get() {
      return _authorizeSteps.AccessRightsAuthorizeStep;
    }
  });
  Object.defineProperty(exports, 'RolesAuthorizeStep', {
    enumerable: true,
    get: function get() {
      return _authorizeSteps.RolesAuthorizeStep;
    }
  });

  function configure(aurelia, configCallback) {
    var config = new _config.Config();

    if (configCallback !== undefined && typeof configCallback === 'function') {
      configCallback(config);
    }

    return config.locale();
  }
});