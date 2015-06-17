'use strict';

exports.__esModule = true;
exports.configure = configure;

var _config = require('./config');

var _logger = require('./logger');

exports.Logger = _logger.Logger;

var _session = require('./session');

exports.Session = _session.Session;

var _http = require('./http');

exports.Http = _http.Http;

var _authorizeSteps = require('./authorize-steps');

exports.AccessRightsAuthorizeStep = _authorizeSteps.AccessRightsAuthorizeStep;
exports.RolesAuthorizeStep = _authorizeSteps.RolesAuthorizeStep;

function configure(aurelia, configCallback) {
  var config = new _config.Config();

  if (configCallback !== undefined && typeof configCallback === 'function') {
    configCallback(config);
  }

  return config.locale();
}