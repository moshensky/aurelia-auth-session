System.register(['./config', './logger', './session', './http', './authorize-steps'], function (_export) {
  'use strict';

  var Config;

  _export('configure', configure);

  function configure(aurelia, configCallback) {
    var config = new Config();

    if (configCallback !== undefined && typeof configCallback === 'function') {
      configCallback(config);
    }

    return config.locale();
  }

  return {
    setters: [function (_config) {
      Config = _config.Config;
    }, function (_logger) {
      _export('Logger', _logger.Logger);
    }, function (_session) {
      _export('Session', _session.Session);
    }, function (_http) {
      _export('Http', _http.Http);
    }, function (_authorizeSteps) {
      _export('AccessRightsAuthorizeStep', _authorizeSteps.AccessRightsAuthorizeStep);

      _export('RolesAuthorizeStep', _authorizeSteps.RolesAuthorizeStep);
    }],
    execute: function () {}
  };
});