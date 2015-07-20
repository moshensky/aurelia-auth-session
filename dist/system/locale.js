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
//# sourceMappingURL=data:application/json;base64,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QUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsUUFBUSxFQUFLO0FBQzVELG9CQUFJLE1BQU0sR0FBRyxNQUFLLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0QsdUJBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztlQUNqQixDQUFDLENBQUM7YUFDSjtXQUNGLENBQUMsQ0FBQztTQUNKOztBQXhCRyx3QkFBZ0IsV0EwQnBCLFNBQVMsR0FBQSxtQkFBQyxnQkFBZ0IsRUFBRSxJQUFJLEVBQ2hDO0FBQ0UsY0FBSSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMvQyxjQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMvQyxjQUFHLElBQUksV0FBUSxLQUFLLElBQUksRUFDdEIsSUFBSSxXQUFRLEdBQUcsUUFBUSxDQUFDO0FBQzFCLGlCQUFPLFFBQVEsQ0FBQztTQUNqQjs7ZUFqQ0csZ0JBQWdCOzs7QUFvQ3RCLFlBQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDIiwiZmlsZSI6ImxvY2FsZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtb3NoZW5za3kgb24gNi8xNy8xNS5cbiAqL1xuZXhwb3J0IGNsYXNzIExvY2FsZXtcbiAgY29uc3RydWN0b3IoZGVmYXVsdHMsIGRhdGEpXG4gIHtcbiAgICB0aGlzLmRlZmF1bHRzID0gZGVmYXVsdHM7XG4gICAgdGhpcy5jdXJyZW50TG9jYWxlID0gZGF0YTtcbiAgfVxuXG4gIGdldFZhbHVlRm9yKGlkZW50aWZpZXIsIGNhdGVnb3J5KSB7XG4gICAgaWYgKHRoaXMuY3VycmVudExvY2FsZSAmJiB0aGlzLmN1cnJlbnRMb2NhbGVbY2F0ZWdvcnldKSB7XG4gICAgICB2YXIgY3VycmVudExvY2FsZVNldHRpbmcgPSB0aGlzLmN1cnJlbnRMb2NhbGVbY2F0ZWdvcnldW2lkZW50aWZpZXJdO1xuICAgICAgaWYgKGN1cnJlbnRMb2NhbGVTZXR0aW5nICE9PSB1bmRlZmluZWQgJiYgY3VycmVudExvY2FsZVNldHRpbmcgIT09IG51bGwpXG4gICAgICAgIHJldHVybiBjdXJyZW50TG9jYWxlU2V0dGluZztcbiAgICB9XG4gICAgaWYgKHRoaXMuZGVmYXVsdHNbY2F0ZWdvcnldKSB7XG4gICAgICB2YXIgZGVmYXVsdFNldHRpbmcgPSB0aGlzLmRlZmF1bHRzW2NhdGVnb3J5XVtpZGVudGlmaWVyXTtcbiAgICAgIGlmIChkZWZhdWx0U2V0dGluZyAhPT0gdW5kZWZpbmVkICYmIGRlZmF1bHRTZXR0aW5nICE9PSBudWxsKVxuICAgICAgICByZXR1cm4gZGVmYXVsdFNldHRpbmc7XG4gICAgfVxuICAgIHRocm93ICd2YWxpZGF0aW9uOiBJMThOOiBDb3VsZCBub3QgZmluZDogJyArIGlkZW50aWZpZXIgKyAnIGluIGNhdGVnb3J5OiAnICsgY2F0ZWdvcnk7XG4gIH1cblxuICBzZXR0aW5nKHNldHRpbmdJZGVudGlmaWVyKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VmFsdWVGb3Ioc2V0dGluZ0lkZW50aWZpZXIsICdzZXR0aW5ncycpO1xuICB9XG5cbiAgdHJhbnNsYXRlKHRyYW5zbGF0aW9uSWRlbnRpZmllciwgbmV3VmFsdWUsIHRocmVzaG9sZCkge1xuICAgIHZhciB0cmFuc2xhdGlvbiA9IHRoaXMuZ2V0VmFsdWVGb3IodHJhbnNsYXRpb25JZGVudGlmaWVyLCAnbWVzc2FnZXMnKTtcbiAgICBpZiAodHlwZW9mIHRyYW5zbGF0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gdHJhbnNsYXRpb24obmV3VmFsdWUsIHRocmVzaG9sZCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdHJhbnNsYXRpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gdHJhbnNsYXRpb247XG4gICAgfVxuICAgIHRocm93ICdWYWxpZGF0aW9uIG1lc3NhZ2UgZm9yICcgKyB0cmFuc2xhdGlvbklkZW50aWZpZXIgKyAnd2FzIGluIGFuIHVuc3VwcG9ydGVkIGZvcm1hdCc7XG4gIH1cbn1cblxuY2xhc3MgTG9jYWxlUmVwb3NpdG9yeSAge1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMuZGVmYXVsdCA9IG51bGw7XG4gICAgdGhpcy5pbnN0YW5jZXMgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5kZWZhdWx0cyA9IHtcbiAgICAgIHNldHRpbmdzOiB7fSxcbiAgICAgIG1lc3NhZ2VzOiB7fVxuICAgIH07XG4gIH1cblxuICBsb2FkKGxvY2FsZUlkZW50aWZpZXIsIGJhc2VQYXRoKSB7XG4gICAgaWYoIWJhc2VQYXRoKSBiYXNlUGF0aCA9ICdhdXJlbGlhLWN1c3RvbS1hcHAtY29tbW9uLWZpbGVzL3Jlc291cmNlcy8nO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmKHRoaXMuaW5zdGFuY2VzLmhhcyhsb2NhbGVJZGVudGlmaWVyKSkge1xuICAgICAgICBsZXQgbG9jYWxlID0gdGhpcy5pbnN0YW5jZXMuZ2V0KGxvY2FsZUlkZW50aWZpZXIpO1xuICAgICAgICByZXNvbHZlKGxvY2FsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBTeXN0ZW0uaW1wb3J0KGJhc2VQYXRoICsgbG9jYWxlSWRlbnRpZmllcikudGhlbigocmVzb3VyY2UpID0+IHtcbiAgICAgICAgICBsZXQgbG9jYWxlID0gdGhpcy5hZGRMb2NhbGUobG9jYWxlSWRlbnRpZmllciwgcmVzb3VyY2UuZGF0YSk7XG4gICAgICAgICAgcmVzb2x2ZShsb2NhbGUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFkZExvY2FsZShsb2NhbGVJZGVudGlmaWVyLCBkYXRhKVxuICB7XG4gICAgdmFyIGluc3RhbmNlID0gbmV3IExvY2FsZSh0aGlzLmRlZmF1bHRzLCBkYXRhKTtcbiAgICB0aGlzLmluc3RhbmNlcy5zZXQobG9jYWxlSWRlbnRpZmllciwgaW5zdGFuY2UpO1xuICAgIGlmKHRoaXMuZGVmYXVsdCA9PT0gbnVsbClcbiAgICAgIHRoaXMuZGVmYXVsdCA9IGluc3RhbmNlO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxufVxuXG5Mb2NhbGUuUmVwb3NpdG9yeSA9IG5ldyBMb2NhbGVSZXBvc2l0b3J5KCk7XG4iXX0=