'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _locale = require('./locale');

var ConfigDefaults = function ConfigDefaults() {
  _classCallCheck(this, ConfigDefaults);
};

exports.ConfigDefaults = ConfigDefaults;

ConfigDefaults._defaults = {
  locale: 'en-US',
  localeResources: 'aurelia-auth-session/resources/'
};

ConfigDefaults.defaults = function () {
  var defaults = {};
  Object.assign(defaults, ConfigDefaults._defaults);
  return defaults;
};

var Config = (function () {
  function Config(innerConfig) {
    _classCallCheck(this, Config);

    this.innerConfig = innerConfig;
    this.values = this.innerConfig ? {} : ConfigDefaults.defaults();
    this.changedHandlers = new Map();
  }

  Config.prototype.getValue = function getValue(identifier) {
    if (this.values.hasOwnProperty(identifier) !== null && this.values[identifier] !== undefined) {
      return this.values[identifier];
    }
    if (this.innerConfig !== null) {
      return this.innerConfig.getValue(identifier);
    }
    throw Error('Config not found: ' + identifier);
  };

  Config.prototype.setValue = function setValue(identifier, value) {
    this.values[identifier] = value;
    return this;
  };

  Config.prototype.onLocaleChanged = function onLocaleChanged(callback) {
    var _this = this;

    if (this.innerConfig !== undefined) {
      return this.innerConfig.onLocaleChanged(callback);
    } else {
      var _ret = (function () {
        var id = ++ValidationConfig.uniqueListenerId;
        _this.changedHandlers.set(id, callback);
        return {
          v: function () {
            _this.changedHandlers['delete'](id);
          }
        };
      })();

      if (typeof _ret === 'object') return _ret.v;
    }
  };

  Config.prototype.getDependencies = function getDependencies() {
    return this.getValue('dependencies');
  };

  Config.prototype.setHttpService = function setHttpService(httpOpts) {
    Config.httpOpts = httpOpts;
  };

  Config.prototype.routerAuthStep = function routerAuthStep(opts) {
    Config.routerAuthStepOpts = opts;
  };

  Config.prototype.useLocale = function useLocale(localeIdentifier) {
    this.setValue('locale', localeIdentifier);
    var callbacks = Array.from(this.changedHandlers.values());
    for (var i = 0; i < callbacks.length; i++) {
      callbacks[i]();
    }
    return this;
  };

  Config.prototype.locale = function locale() {
    return _locale.Locale.Repository.load(this.getValue('locale'), this.getValue('localeResources'));
  };

  return Config;
})();

exports.Config = Config;

Config.uniqueListenerId = 0;