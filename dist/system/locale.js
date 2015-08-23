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
//# sourceMappingURL=data:application/json;base64,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QUFHLE1BQUssU0FBUyxDQUFDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3RCx5QkFBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNqQixDQUFDLENBQUM7ZUFDSjthQUNGLENBQUMsQ0FBQztXQUNKOzs7aUJBRVEsbUJBQUMsZ0JBQWdCLEVBQUUsSUFBSSxFQUNoQztBQUNFLGdCQUFJLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQy9DLGdCQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMvQyxnQkFBRyxJQUFJLFdBQVEsS0FBSyxJQUFJLEVBQ3RCLElBQUksV0FBUSxHQUFHLFFBQVEsQ0FBQztBQUMxQixtQkFBTyxRQUFRLENBQUM7V0FDakI7OztlQWpDRyxnQkFBZ0I7OztBQW9DdEIsWUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUMiLCJmaWxlIjoibG9jYWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1vc2hlbnNreSBvbiA2LzE3LzE1LlxuICovXG5leHBvcnQgY2xhc3MgTG9jYWxle1xuICBjb25zdHJ1Y3RvcihkZWZhdWx0cywgZGF0YSlcbiAge1xuICAgIHRoaXMuZGVmYXVsdHMgPSBkZWZhdWx0cztcbiAgICB0aGlzLmN1cnJlbnRMb2NhbGUgPSBkYXRhO1xuICB9XG5cbiAgZ2V0VmFsdWVGb3IoaWRlbnRpZmllciwgY2F0ZWdvcnkpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50TG9jYWxlICYmIHRoaXMuY3VycmVudExvY2FsZVtjYXRlZ29yeV0pIHtcbiAgICAgIHZhciBjdXJyZW50TG9jYWxlU2V0dGluZyA9IHRoaXMuY3VycmVudExvY2FsZVtjYXRlZ29yeV1baWRlbnRpZmllcl07XG4gICAgICBpZiAoY3VycmVudExvY2FsZVNldHRpbmcgIT09IHVuZGVmaW5lZCAmJiBjdXJyZW50TG9jYWxlU2V0dGluZyAhPT0gbnVsbClcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRMb2NhbGVTZXR0aW5nO1xuICAgIH1cbiAgICBpZiAodGhpcy5kZWZhdWx0c1tjYXRlZ29yeV0pIHtcbiAgICAgIHZhciBkZWZhdWx0U2V0dGluZyA9IHRoaXMuZGVmYXVsdHNbY2F0ZWdvcnldW2lkZW50aWZpZXJdO1xuICAgICAgaWYgKGRlZmF1bHRTZXR0aW5nICE9PSB1bmRlZmluZWQgJiYgZGVmYXVsdFNldHRpbmcgIT09IG51bGwpXG4gICAgICAgIHJldHVybiBkZWZhdWx0U2V0dGluZztcbiAgICB9XG4gICAgdGhyb3cgJ3ZhbGlkYXRpb246IEkxOE46IENvdWxkIG5vdCBmaW5kOiAnICsgaWRlbnRpZmllciArICcgaW4gY2F0ZWdvcnk6ICcgKyBjYXRlZ29yeTtcbiAgfVxuXG4gIHNldHRpbmcoc2V0dGluZ0lkZW50aWZpZXIpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRWYWx1ZUZvcihzZXR0aW5nSWRlbnRpZmllciwgJ3NldHRpbmdzJyk7XG4gIH1cblxuICB0cmFuc2xhdGUodHJhbnNsYXRpb25JZGVudGlmaWVyLCBuZXdWYWx1ZSwgdGhyZXNob2xkKSB7XG4gICAgdmFyIHRyYW5zbGF0aW9uID0gdGhpcy5nZXRWYWx1ZUZvcih0cmFuc2xhdGlvbklkZW50aWZpZXIsICdtZXNzYWdlcycpO1xuICAgIGlmICh0eXBlb2YgdHJhbnNsYXRpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB0cmFuc2xhdGlvbihuZXdWYWx1ZSwgdGhyZXNob2xkKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0cmFuc2xhdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB0cmFuc2xhdGlvbjtcbiAgICB9XG4gICAgdGhyb3cgJ1ZhbGlkYXRpb24gbWVzc2FnZSBmb3IgJyArIHRyYW5zbGF0aW9uSWRlbnRpZmllciArICd3YXMgaW4gYW4gdW5zdXBwb3J0ZWQgZm9ybWF0JztcbiAgfVxufVxuXG5jbGFzcyBMb2NhbGVSZXBvc2l0b3J5ICB7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy5kZWZhdWx0ID0gbnVsbDtcbiAgICB0aGlzLmluc3RhbmNlcyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLmRlZmF1bHRzID0ge1xuICAgICAgc2V0dGluZ3M6IHt9LFxuICAgICAgbWVzc2FnZXM6IHt9XG4gICAgfTtcbiAgfVxuXG4gIGxvYWQobG9jYWxlSWRlbnRpZmllciwgYmFzZVBhdGgpIHtcbiAgICBpZighYmFzZVBhdGgpIGJhc2VQYXRoID0gJ2F1cmVsaWEtY3VzdG9tLWFwcC1jb21tb24tZmlsZXMvcmVzb3VyY2VzLyc7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYodGhpcy5pbnN0YW5jZXMuaGFzKGxvY2FsZUlkZW50aWZpZXIpKSB7XG4gICAgICAgIGxldCBsb2NhbGUgPSB0aGlzLmluc3RhbmNlcy5nZXQobG9jYWxlSWRlbnRpZmllcik7XG4gICAgICAgIHJlc29sdmUobG9jYWxlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFN5c3RlbS5pbXBvcnQoYmFzZVBhdGggKyBsb2NhbGVJZGVudGlmaWVyKS50aGVuKChyZXNvdXJjZSkgPT4ge1xuICAgICAgICAgIGxldCBsb2NhbGUgPSB0aGlzLmFkZExvY2FsZShsb2NhbGVJZGVudGlmaWVyLCByZXNvdXJjZS5kYXRhKTtcbiAgICAgICAgICByZXNvbHZlKGxvY2FsZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYWRkTG9jYWxlKGxvY2FsZUlkZW50aWZpZXIsIGRhdGEpXG4gIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBuZXcgTG9jYWxlKHRoaXMuZGVmYXVsdHMsIGRhdGEpO1xuICAgIHRoaXMuaW5zdGFuY2VzLnNldChsb2NhbGVJZGVudGlmaWVyLCBpbnN0YW5jZSk7XG4gICAgaWYodGhpcy5kZWZhdWx0ID09PSBudWxsKVxuICAgICAgdGhpcy5kZWZhdWx0ID0gaW5zdGFuY2U7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG59XG5cbkxvY2FsZS5SZXBvc2l0b3J5ID0gbmV3IExvY2FsZVJlcG9zaXRvcnkoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==