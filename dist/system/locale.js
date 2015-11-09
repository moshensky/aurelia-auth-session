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
//# sourceMappingURL=data:application/json;base64,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QUFHLE1BQUssU0FBUyxDQUFDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3RCx5QkFBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNqQixDQUFDLENBQUM7ZUFDSjthQUNGLENBQUMsQ0FBQztXQUNKOzs7aUJBRVEsbUJBQUMsZ0JBQWdCLEVBQUUsSUFBSSxFQUNoQztBQUNFLGdCQUFJLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQy9DLGdCQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMvQyxnQkFBRyxJQUFJLFdBQVEsS0FBSyxJQUFJLEVBQ3RCLElBQUksV0FBUSxHQUFHLFFBQVEsQ0FBQztBQUMxQixtQkFBTyxRQUFRLENBQUM7V0FDakI7OztlQWpDRyxnQkFBZ0I7OztBQW9DdEIsWUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUMiLCJmaWxlIjoibG9jYWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbW9zaGVuc2t5IG9uIDYvMTcvMTUuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTG9jYWxle1xyXG4gIGNvbnN0cnVjdG9yKGRlZmF1bHRzLCBkYXRhKVxyXG4gIHtcclxuICAgIHRoaXMuZGVmYXVsdHMgPSBkZWZhdWx0cztcclxuICAgIHRoaXMuY3VycmVudExvY2FsZSA9IGRhdGE7XHJcbiAgfVxyXG5cclxuICBnZXRWYWx1ZUZvcihpZGVudGlmaWVyLCBjYXRlZ29yeSkge1xyXG4gICAgaWYgKHRoaXMuY3VycmVudExvY2FsZSAmJiB0aGlzLmN1cnJlbnRMb2NhbGVbY2F0ZWdvcnldKSB7XHJcbiAgICAgIHZhciBjdXJyZW50TG9jYWxlU2V0dGluZyA9IHRoaXMuY3VycmVudExvY2FsZVtjYXRlZ29yeV1baWRlbnRpZmllcl07XHJcbiAgICAgIGlmIChjdXJyZW50TG9jYWxlU2V0dGluZyAhPT0gdW5kZWZpbmVkICYmIGN1cnJlbnRMb2NhbGVTZXR0aW5nICE9PSBudWxsKVxyXG4gICAgICAgIHJldHVybiBjdXJyZW50TG9jYWxlU2V0dGluZztcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmRlZmF1bHRzW2NhdGVnb3J5XSkge1xyXG4gICAgICB2YXIgZGVmYXVsdFNldHRpbmcgPSB0aGlzLmRlZmF1bHRzW2NhdGVnb3J5XVtpZGVudGlmaWVyXTtcclxuICAgICAgaWYgKGRlZmF1bHRTZXR0aW5nICE9PSB1bmRlZmluZWQgJiYgZGVmYXVsdFNldHRpbmcgIT09IG51bGwpXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRTZXR0aW5nO1xyXG4gICAgfVxyXG4gICAgdGhyb3cgJ3ZhbGlkYXRpb246IEkxOE46IENvdWxkIG5vdCBmaW5kOiAnICsgaWRlbnRpZmllciArICcgaW4gY2F0ZWdvcnk6ICcgKyBjYXRlZ29yeTtcclxuICB9XHJcblxyXG4gIHNldHRpbmcoc2V0dGluZ0lkZW50aWZpZXIpIHtcclxuICAgIHJldHVybiB0aGlzLmdldFZhbHVlRm9yKHNldHRpbmdJZGVudGlmaWVyLCAnc2V0dGluZ3MnKTtcclxuICB9XHJcblxyXG4gIHRyYW5zbGF0ZSh0cmFuc2xhdGlvbklkZW50aWZpZXIsIG5ld1ZhbHVlLCB0aHJlc2hvbGQpIHtcclxuICAgIHZhciB0cmFuc2xhdGlvbiA9IHRoaXMuZ2V0VmFsdWVGb3IodHJhbnNsYXRpb25JZGVudGlmaWVyLCAnbWVzc2FnZXMnKTtcclxuICAgIGlmICh0eXBlb2YgdHJhbnNsYXRpb24gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgcmV0dXJuIHRyYW5zbGF0aW9uKG5ld1ZhbHVlLCB0aHJlc2hvbGQpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiB0cmFuc2xhdGlvbiA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIHRyYW5zbGF0aW9uO1xyXG4gICAgfVxyXG4gICAgdGhyb3cgJ1ZhbGlkYXRpb24gbWVzc2FnZSBmb3IgJyArIHRyYW5zbGF0aW9uSWRlbnRpZmllciArICd3YXMgaW4gYW4gdW5zdXBwb3J0ZWQgZm9ybWF0JztcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIExvY2FsZVJlcG9zaXRvcnkgIHtcclxuICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgdGhpcy5kZWZhdWx0ID0gbnVsbDtcclxuICAgIHRoaXMuaW5zdGFuY2VzID0gbmV3IE1hcCgpO1xyXG4gICAgdGhpcy5kZWZhdWx0cyA9IHtcclxuICAgICAgc2V0dGluZ3M6IHt9LFxyXG4gICAgICBtZXNzYWdlczoge31cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBsb2FkKGxvY2FsZUlkZW50aWZpZXIsIGJhc2VQYXRoKSB7XHJcbiAgICBpZighYmFzZVBhdGgpIGJhc2VQYXRoID0gJ2F1cmVsaWEtY3VzdG9tLWFwcC1jb21tb24tZmlsZXMvcmVzb3VyY2VzLyc7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgaWYodGhpcy5pbnN0YW5jZXMuaGFzKGxvY2FsZUlkZW50aWZpZXIpKSB7XHJcbiAgICAgICAgbGV0IGxvY2FsZSA9IHRoaXMuaW5zdGFuY2VzLmdldChsb2NhbGVJZGVudGlmaWVyKTtcclxuICAgICAgICByZXNvbHZlKGxvY2FsZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgU3lzdGVtLmltcG9ydChiYXNlUGF0aCArIGxvY2FsZUlkZW50aWZpZXIpLnRoZW4oKHJlc291cmNlKSA9PiB7XHJcbiAgICAgICAgICBsZXQgbG9jYWxlID0gdGhpcy5hZGRMb2NhbGUobG9jYWxlSWRlbnRpZmllciwgcmVzb3VyY2UuZGF0YSk7XHJcbiAgICAgICAgICByZXNvbHZlKGxvY2FsZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYWRkTG9jYWxlKGxvY2FsZUlkZW50aWZpZXIsIGRhdGEpXHJcbiAge1xyXG4gICAgdmFyIGluc3RhbmNlID0gbmV3IExvY2FsZSh0aGlzLmRlZmF1bHRzLCBkYXRhKTtcclxuICAgIHRoaXMuaW5zdGFuY2VzLnNldChsb2NhbGVJZGVudGlmaWVyLCBpbnN0YW5jZSk7XHJcbiAgICBpZih0aGlzLmRlZmF1bHQgPT09IG51bGwpXHJcbiAgICAgIHRoaXMuZGVmYXVsdCA9IGluc3RhbmNlO1xyXG4gICAgcmV0dXJuIGluc3RhbmNlO1xyXG4gIH1cclxufVxyXG5cclxuTG9jYWxlLlJlcG9zaXRvcnkgPSBuZXcgTG9jYWxlUmVwb3NpdG9yeSgpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
