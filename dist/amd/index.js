define(['exports', './config', './logger', './session', './http', './authorize-steps'], function (exports, _config, _logger, _session, _http, _authorizeSteps) {
  'use strict';

  exports.__esModule = true;
  exports.configure = configure;
  exports.Logger = _logger.Logger;
  exports.Session = _session.Session;
  exports.Http = _http.Http;
  exports.AccessRightsAuthorizeStep = _authorizeSteps.AccessRightsAuthorizeStep;
  exports.RolesAuthorizeStep = _authorizeSteps.RolesAuthorizeStep;

  function configure(aurelia, configCallback) {
    var config = new _config.Config();

    if (configCallback !== undefined && typeof configCallback === 'function') {
      configCallback(config);
    }

    return config.locale();
  }
});