'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _locale = require('./locale');

var ConfigDefaults = function ConfigDefaults() {
  _classCallCheck(this, ConfigDefaults);
};

exports.ConfigDefaults = ConfigDefaults;

ConfigDefaults._defaults = {
  locale: 'en-US',
  localeResources: 'service/resources/'
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

  _createClass(Config, [{
    key: 'getValue',
    value: function getValue(identifier) {
      if (this.values.hasOwnProperty(identifier) !== null && this.values[identifier] !== undefined) {
        return this.values[identifier];
      }
      if (this.innerConfig !== null) {
        return this.innerConfig.getValue(identifier);
      }
      throw Error('Config not found: ' + identifier);
    }
  }, {
    key: 'setValue',
    value: function setValue(identifier, value) {
      this.values[identifier] = value;
      return this;
    }
  }, {
    key: 'onLocaleChanged',
    value: function onLocaleChanged(callback) {
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
    }
  }, {
    key: 'getDependencies',
    value: function getDependencies() {
      return this.getValue('dependencies');
    }
  }, {
    key: 'setHttpService',
    value: function setHttpService(httpOpts) {
      Config.httpOpts = httpOpts;
    }
  }, {
    key: 'routerAuthStep',
    value: function routerAuthStep(opts) {
      Config.routerAuthStepOpts = opts;
    }
  }, {
    key: 'useLocale',
    value: function useLocale(localeIdentifier) {
      this.setValue('locale', localeIdentifier);
      var callbacks = Array.from(this.changedHandlers.values());
      for (var i = 0; i < callbacks.length; i++) {
        callbacks[i]();
      }
      return this;
    }
  }, {
    key: 'locale',
    value: function locale() {
      return _locale.Locale.Repository.load(this.getValue('locale'), this.getValue('localeResources'));
    }
  }]);

  return Config;
})();

exports.Config = Config;

Config.uniqueListenerId = 0;