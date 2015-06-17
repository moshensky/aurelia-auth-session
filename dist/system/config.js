System.register(['./locale'], function (_export) {
  'use strict';

  var Locale, ConfigDefaults, Config;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_locale) {
      Locale = _locale.Locale;
    }],
    execute: function () {
      ConfigDefaults = function ConfigDefaults() {
        _classCallCheck(this, ConfigDefaults);
      };

      _export('ConfigDefaults', ConfigDefaults);

      ConfigDefaults._defaults = {
        locale: 'en-US',
        localeResources: 'aurelia-auth-session/resources/'
      };

      ConfigDefaults.defaults = function () {
        var defaults = {};
        Object.assign(defaults, ConfigDefaults._defaults);
        return defaults;
      };

      Config = (function () {
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
          return Locale.Repository.load(this.getValue('locale'), this.getValue('localeResources'));
        };

        return Config;
      })();

      _export('Config', Config);

      Config.uniqueListenerId = 0;
    }
  };
});