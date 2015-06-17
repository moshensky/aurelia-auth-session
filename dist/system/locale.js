System.register([], function (_export) {
  'use strict';

  var Locale, LocaleRepository;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [],
    execute: function () {
      Locale = (function () {
        function Locale(defaults, data) {
          _classCallCheck(this, Locale);

          this.defaults = defaults;
          this.currentLocale = data;
        }

        Locale.prototype.getValueFor = function getValueFor(identifier, category) {
          if (this.currentLocale && this.currentLocale[category]) {
            var currentLocaleSetting = this.currentLocale[category][identifier];
            if (currentLocaleSetting !== undefined && currentLocaleSetting !== null) return currentLocaleSetting;
          }
          if (this.defaults[category]) {
            var defaultSetting = this.defaults[category][identifier];
            if (defaultSetting !== undefined && defaultSetting !== null) return defaultSetting;
          }
          throw 'validation: I18N: Could not find: ' + identifier + ' in category: ' + category;
        };

        Locale.prototype.setting = function setting(settingIdentifier) {
          return this.getValueFor(settingIdentifier, 'settings');
        };

        Locale.prototype.translate = function translate(translationIdentifier, newValue, threshold) {
          var translation = this.getValueFor(translationIdentifier, 'messages');
          if (typeof translation === 'function') {
            return translation(newValue, threshold);
          }
          if (typeof translation === 'string') {
            return translation;
          }
          throw 'Validation message for ' + translationIdentifier + 'was in an unsupported format';
        };

        return Locale;
      })();

      _export('Locale', Locale);

      LocaleRepository = (function () {
        function LocaleRepository() {
          _classCallCheck(this, LocaleRepository);

          this['default'] = null;
          this.instances = new Map();
          this.defaults = {
            settings: {},
            messages: {}
          };
        }

        LocaleRepository.prototype.load = function load(localeIdentifier, basePath) {
          var _this = this;

          if (!basePath) basePath = 'aurelia-custom-app-common-files/resources/';

          return new Promise(function (resolve, reject) {
            if (_this.instances.has(localeIdentifier)) {
              var locale = _this.instances.get(localeIdentifier);
              resolve(locale);
            } else {
              System['import'](basePath + localeIdentifier).then(function (resource) {
                var locale = _this.addLocale(localeIdentifier, resource.data);
                resolve(locale);
              });
            }
          });
        };

        LocaleRepository.prototype.addLocale = function addLocale(localeIdentifier, data) {
          var instance = new Locale(this.defaults, data);
          this.instances.set(localeIdentifier, instance);
          if (this['default'] === null) this['default'] = instance;
          return instance;
        };

        return LocaleRepository;
      })();

      Locale.Repository = new LocaleRepository();
    }
  };
});