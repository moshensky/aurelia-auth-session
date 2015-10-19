define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var Locale = (function () {
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

  exports.Locale = Locale;

  var LocaleRepository = (function () {
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
});
//# sourceMappingURL=data:application/json;base64,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RUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0QscUJBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNqQixDQUFDLENBQUM7V0FDSjtTQUNGLENBQUMsQ0FBQztPQUNKOzs7YUFFUSxtQkFBQyxnQkFBZ0IsRUFBRSxJQUFJLEVBQ2hDO0FBQ0UsWUFBSSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMvQyxZQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMvQyxZQUFHLElBQUksV0FBUSxLQUFLLElBQUksRUFDdEIsSUFBSSxXQUFRLEdBQUcsUUFBUSxDQUFDO0FBQzFCLGVBQU8sUUFBUSxDQUFDO09BQ2pCOzs7V0FqQ0csZ0JBQWdCOzs7QUFvQ3RCLFFBQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDIiwiZmlsZSI6ImxvY2FsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtb3NoZW5za3kgb24gNi8xNy8xNS5cbiAqL1xuZXhwb3J0IGNsYXNzIExvY2FsZXtcbiAgY29uc3RydWN0b3IoZGVmYXVsdHMsIGRhdGEpXG4gIHtcbiAgICB0aGlzLmRlZmF1bHRzID0gZGVmYXVsdHM7XG4gICAgdGhpcy5jdXJyZW50TG9jYWxlID0gZGF0YTtcbiAgfVxuXG4gIGdldFZhbHVlRm9yKGlkZW50aWZpZXIsIGNhdGVnb3J5KSB7XG4gICAgaWYgKHRoaXMuY3VycmVudExvY2FsZSAmJiB0aGlzLmN1cnJlbnRMb2NhbGVbY2F0ZWdvcnldKSB7XG4gICAgICB2YXIgY3VycmVudExvY2FsZVNldHRpbmcgPSB0aGlzLmN1cnJlbnRMb2NhbGVbY2F0ZWdvcnldW2lkZW50aWZpZXJdO1xuICAgICAgaWYgKGN1cnJlbnRMb2NhbGVTZXR0aW5nICE9PSB1bmRlZmluZWQgJiYgY3VycmVudExvY2FsZVNldHRpbmcgIT09IG51bGwpXG4gICAgICAgIHJldHVybiBjdXJyZW50TG9jYWxlU2V0dGluZztcbiAgICB9XG4gICAgaWYgKHRoaXMuZGVmYXVsdHNbY2F0ZWdvcnldKSB7XG4gICAgICB2YXIgZGVmYXVsdFNldHRpbmcgPSB0aGlzLmRlZmF1bHRzW2NhdGVnb3J5XVtpZGVudGlmaWVyXTtcbiAgICAgIGlmIChkZWZhdWx0U2V0dGluZyAhPT0gdW5kZWZpbmVkICYmIGRlZmF1bHRTZXR0aW5nICE9PSBudWxsKVxuICAgICAgICByZXR1cm4gZGVmYXVsdFNldHRpbmc7XG4gICAgfVxuICAgIHRocm93ICd2YWxpZGF0aW9uOiBJMThOOiBDb3VsZCBub3QgZmluZDogJyArIGlkZW50aWZpZXIgKyAnIGluIGNhdGVnb3J5OiAnICsgY2F0ZWdvcnk7XG4gIH1cblxuICBzZXR0aW5nKHNldHRpbmdJZGVudGlmaWVyKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VmFsdWVGb3Ioc2V0dGluZ0lkZW50aWZpZXIsICdzZXR0aW5ncycpO1xuICB9XG5cbiAgdHJhbnNsYXRlKHRyYW5zbGF0aW9uSWRlbnRpZmllciwgbmV3VmFsdWUsIHRocmVzaG9sZCkge1xuICAgIHZhciB0cmFuc2xhdGlvbiA9IHRoaXMuZ2V0VmFsdWVGb3IodHJhbnNsYXRpb25JZGVudGlmaWVyLCAnbWVzc2FnZXMnKTtcbiAgICBpZiAodHlwZW9mIHRyYW5zbGF0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gdHJhbnNsYXRpb24obmV3VmFsdWUsIHRocmVzaG9sZCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdHJhbnNsYXRpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gdHJhbnNsYXRpb247XG4gICAgfVxuICAgIHRocm93ICdWYWxpZGF0aW9uIG1lc3NhZ2UgZm9yICcgKyB0cmFuc2xhdGlvbklkZW50aWZpZXIgKyAnd2FzIGluIGFuIHVuc3VwcG9ydGVkIGZvcm1hdCc7XG4gIH1cbn1cblxuY2xhc3MgTG9jYWxlUmVwb3NpdG9yeSAge1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMuZGVmYXVsdCA9IG51bGw7XG4gICAgdGhpcy5pbnN0YW5jZXMgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5kZWZhdWx0cyA9IHtcbiAgICAgIHNldHRpbmdzOiB7fSxcbiAgICAgIG1lc3NhZ2VzOiB7fVxuICAgIH07XG4gIH1cblxuICBsb2FkKGxvY2FsZUlkZW50aWZpZXIsIGJhc2VQYXRoKSB7XG4gICAgaWYoIWJhc2VQYXRoKSBiYXNlUGF0aCA9ICdhdXJlbGlhLWN1c3RvbS1hcHAtY29tbW9uLWZpbGVzL3Jlc291cmNlcy8nO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmKHRoaXMuaW5zdGFuY2VzLmhhcyhsb2NhbGVJZGVudGlmaWVyKSkge1xuICAgICAgICBsZXQgbG9jYWxlID0gdGhpcy5pbnN0YW5jZXMuZ2V0KGxvY2FsZUlkZW50aWZpZXIpO1xuICAgICAgICByZXNvbHZlKGxvY2FsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBTeXN0ZW0uaW1wb3J0KGJhc2VQYXRoICsgbG9jYWxlSWRlbnRpZmllcikudGhlbigocmVzb3VyY2UpID0+IHtcbiAgICAgICAgICBsZXQgbG9jYWxlID0gdGhpcy5hZGRMb2NhbGUobG9jYWxlSWRlbnRpZmllciwgcmVzb3VyY2UuZGF0YSk7XG4gICAgICAgICAgcmVzb2x2ZShsb2NhbGUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFkZExvY2FsZShsb2NhbGVJZGVudGlmaWVyLCBkYXRhKVxuICB7XG4gICAgdmFyIGluc3RhbmNlID0gbmV3IExvY2FsZSh0aGlzLmRlZmF1bHRzLCBkYXRhKTtcbiAgICB0aGlzLmluc3RhbmNlcy5zZXQobG9jYWxlSWRlbnRpZmllciwgaW5zdGFuY2UpO1xuICAgIGlmKHRoaXMuZGVmYXVsdCA9PT0gbnVsbClcbiAgICAgIHRoaXMuZGVmYXVsdCA9IGluc3RhbmNlO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxufVxuXG5Mb2NhbGUuUmVwb3NpdG9yeSA9IG5ldyBMb2NhbGVSZXBvc2l0b3J5KCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=