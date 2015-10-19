System.register([], function (_export) {
  'use strict';

  var Locale, LocaleRepository;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

        _createClass(Locale, [{
          key: 'getValueFor',
          value: function getValueFor(identifier, category) {
            if (this.currentLocale && this.currentLocale[category]) {
              var currentLocaleSetting = this.currentLocale[category][identifier];
              if (currentLocaleSetting !== undefined && currentLocaleSetting !== null) return currentLocaleSetting;
            }
            if (this.defaults[category]) {
              var defaultSetting = this.defaults[category][identifier];
              if (defaultSetting !== undefined && defaultSetting !== null) return defaultSetting;
            }
            throw 'validation: I18N: Could not find: ' + identifier + ' in category: ' + category;
          }
        }, {
          key: 'setting',
          value: function setting(settingIdentifier) {
            return this.getValueFor(settingIdentifier, 'settings');
          }
        }, {
          key: 'translate',
          value: function translate(translationIdentifier, newValue, threshold) {
            var translation = this.getValueFor(translationIdentifier, 'messages');
            if (typeof translation === 'function') {
              return translation(newValue, threshold);
            }
            if (typeof translation === 'string') {
              return translation;
            }
            throw 'Validation message for ' + translationIdentifier + 'was in an unsupported format';
          }
        }]);

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

        _createClass(LocaleRepository, [{
          key: 'load',
          value: function load(localeIdentifier, basePath) {
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
          }
        }, {
          key: 'addLocale',
          value: function addLocale(localeIdentifier, data) {
            var instance = new Locale(this.defaults, data);
            this.instances.set(localeIdentifier, instance);
            if (this['default'] === null) this['default'] = instance;
            return instance;
          }
        }]);

        return LocaleRepository;
      })();

      Locale.Repository = new LocaleRepository();
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QUFJLE1BQU0sR0FBRyxNQUFLLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0QseUJBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDakIsQ0FBQyxDQUFDO2VBQ0o7YUFDRixDQUFDLENBQUM7V0FDSjs7O2lCQUVRLG1CQUFDLGdCQUFnQixFQUFFLElBQUksRUFDaEM7QUFDRSxnQkFBSSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMvQyxnQkFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDL0MsZ0JBQUcsSUFBSSxXQUFRLEtBQUssSUFBSSxFQUN0QixJQUFJLFdBQVEsR0FBRyxRQUFRLENBQUM7QUFDMUIsbUJBQU8sUUFBUSxDQUFDO1dBQ2pCOzs7ZUFqQ0csZ0JBQWdCOzs7QUFvQ3RCLFlBQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDIiwiZmlsZSI6ImxvY2FsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtb3NoZW5za3kgb24gNi8xNy8xNS5cbiAqL1xuZXhwb3J0IGNsYXNzIExvY2FsZXtcbiAgY29uc3RydWN0b3IoZGVmYXVsdHMsIGRhdGEpXG4gIHtcbiAgICB0aGlzLmRlZmF1bHRzID0gZGVmYXVsdHM7XG4gICAgdGhpcy5jdXJyZW50TG9jYWxlID0gZGF0YTtcbiAgfVxuXG4gIGdldFZhbHVlRm9yKGlkZW50aWZpZXIsIGNhdGVnb3J5KSB7XG4gICAgaWYgKHRoaXMuY3VycmVudExvY2FsZSAmJiB0aGlzLmN1cnJlbnRMb2NhbGVbY2F0ZWdvcnldKSB7XG4gICAgICB2YXIgY3VycmVudExvY2FsZVNldHRpbmcgPSB0aGlzLmN1cnJlbnRMb2NhbGVbY2F0ZWdvcnldW2lkZW50aWZpZXJdO1xuICAgICAgaWYgKGN1cnJlbnRMb2NhbGVTZXR0aW5nICE9PSB1bmRlZmluZWQgJiYgY3VycmVudExvY2FsZVNldHRpbmcgIT09IG51bGwpXG4gICAgICAgIHJldHVybiBjdXJyZW50TG9jYWxlU2V0dGluZztcbiAgICB9XG4gICAgaWYgKHRoaXMuZGVmYXVsdHNbY2F0ZWdvcnldKSB7XG4gICAgICB2YXIgZGVmYXVsdFNldHRpbmcgPSB0aGlzLmRlZmF1bHRzW2NhdGVnb3J5XVtpZGVudGlmaWVyXTtcbiAgICAgIGlmIChkZWZhdWx0U2V0dGluZyAhPT0gdW5kZWZpbmVkICYmIGRlZmF1bHRTZXR0aW5nICE9PSBudWxsKVxuICAgICAgICByZXR1cm4gZGVmYXVsdFNldHRpbmc7XG4gICAgfVxuICAgIHRocm93ICd2YWxpZGF0aW9uOiBJMThOOiBDb3VsZCBub3QgZmluZDogJyArIGlkZW50aWZpZXIgKyAnIGluIGNhdGVnb3J5OiAnICsgY2F0ZWdvcnk7XG4gIH1cblxuICBzZXR0aW5nKHNldHRpbmdJZGVudGlmaWVyKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VmFsdWVGb3Ioc2V0dGluZ0lkZW50aWZpZXIsICdzZXR0aW5ncycpO1xuICB9XG5cbiAgdHJhbnNsYXRlKHRyYW5zbGF0aW9uSWRlbnRpZmllciwgbmV3VmFsdWUsIHRocmVzaG9sZCkge1xuICAgIHZhciB0cmFuc2xhdGlvbiA9IHRoaXMuZ2V0VmFsdWVGb3IodHJhbnNsYXRpb25JZGVudGlmaWVyLCAnbWVzc2FnZXMnKTtcbiAgICBpZiAodHlwZW9mIHRyYW5zbGF0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gdHJhbnNsYXRpb24obmV3VmFsdWUsIHRocmVzaG9sZCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdHJhbnNsYXRpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gdHJhbnNsYXRpb247XG4gICAgfVxuICAgIHRocm93ICdWYWxpZGF0aW9uIG1lc3NhZ2UgZm9yICcgKyB0cmFuc2xhdGlvbklkZW50aWZpZXIgKyAnd2FzIGluIGFuIHVuc3VwcG9ydGVkIGZvcm1hdCc7XG4gIH1cbn1cblxuY2xhc3MgTG9jYWxlUmVwb3NpdG9yeSAge1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMuZGVmYXVsdCA9IG51bGw7XG4gICAgdGhpcy5pbnN0YW5jZXMgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5kZWZhdWx0cyA9IHtcbiAgICAgIHNldHRpbmdzOiB7fSxcbiAgICAgIG1lc3NhZ2VzOiB7fVxuICAgIH07XG4gIH1cblxuICBsb2FkKGxvY2FsZUlkZW50aWZpZXIsIGJhc2VQYXRoKSB7XG4gICAgaWYoIWJhc2VQYXRoKSBiYXNlUGF0aCA9ICdhdXJlbGlhLWN1c3RvbS1hcHAtY29tbW9uLWZpbGVzL3Jlc291cmNlcy8nO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmKHRoaXMuaW5zdGFuY2VzLmhhcyhsb2NhbGVJZGVudGlmaWVyKSkge1xuICAgICAgICBsZXQgbG9jYWxlID0gdGhpcy5pbnN0YW5jZXMuZ2V0KGxvY2FsZUlkZW50aWZpZXIpO1xuICAgICAgICByZXNvbHZlKGxvY2FsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBTeXN0ZW0uaW1wb3J0KGJhc2VQYXRoICsgbG9jYWxlSWRlbnRpZmllcikudGhlbigocmVzb3VyY2UpID0+IHtcbiAgICAgICAgICBsZXQgbG9jYWxlID0gdGhpcy5hZGRMb2NhbGUobG9jYWxlSWRlbnRpZmllciwgcmVzb3VyY2UuZGF0YSk7XG4gICAgICAgICAgcmVzb2x2ZShsb2NhbGUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFkZExvY2FsZShsb2NhbGVJZGVudGlmaWVyLCBkYXRhKVxuICB7XG4gICAgdmFyIGluc3RhbmNlID0gbmV3IExvY2FsZSh0aGlzLmRlZmF1bHRzLCBkYXRhKTtcbiAgICB0aGlzLmluc3RhbmNlcy5zZXQobG9jYWxlSWRlbnRpZmllciwgaW5zdGFuY2UpO1xuICAgIGlmKHRoaXMuZGVmYXVsdCA9PT0gbnVsbClcbiAgICAgIHRoaXMuZGVmYXVsdCA9IGluc3RhbmNlO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxufVxuXG5Mb2NhbGUuUmVwb3NpdG9yeSA9IG5ldyBMb2NhbGVSZXBvc2l0b3J5KCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=