'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.configure = configure;

var _config = require('./config');

var _logger = require('./logger');

Object.defineProperty(exports, 'Logger', {
  enumerable: true,
  get: function get() {
    return _logger.Logger;
  }
});

var _session = require('./session');

Object.defineProperty(exports, 'Session', {
  enumerable: true,
  get: function get() {
    return _session.Session;
  }
});

var _http = require('./http');

Object.defineProperty(exports, 'Http', {
  enumerable: true,
  get: function get() {
    return _http.Http;
  }
});

var _authorizeSteps = require('./authorize-steps');

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