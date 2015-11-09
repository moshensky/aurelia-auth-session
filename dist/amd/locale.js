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
//# sourceMappingURL=data:application/json;base64,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LENBQUMsQ0FBQztBQUM3RCxxQkFBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2pCLENBQUMsQ0FBQztXQUNKO1NBQ0YsQ0FBQyxDQUFDO09BQ0o7OzthQUVRLG1CQUFDLGdCQUFnQixFQUFFLElBQUksRUFDaEM7QUFDRSxZQUFJLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQy9DLFlBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQy9DLFlBQUcsSUFBSSxXQUFRLEtBQUssSUFBSSxFQUN0QixJQUFJLFdBQVEsR0FBRyxRQUFRLENBQUM7QUFDMUIsZUFBTyxRQUFRLENBQUM7T0FDakI7OztXQWpDRyxnQkFBZ0I7OztBQW9DdEIsUUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUMiLCJmaWxlIjoibG9jYWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbW9zaGVuc2t5IG9uIDYvMTcvMTUuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTG9jYWxle1xyXG4gIGNvbnN0cnVjdG9yKGRlZmF1bHRzLCBkYXRhKVxyXG4gIHtcclxuICAgIHRoaXMuZGVmYXVsdHMgPSBkZWZhdWx0cztcclxuICAgIHRoaXMuY3VycmVudExvY2FsZSA9IGRhdGE7XHJcbiAgfVxyXG5cclxuICBnZXRWYWx1ZUZvcihpZGVudGlmaWVyLCBjYXRlZ29yeSkge1xyXG4gICAgaWYgKHRoaXMuY3VycmVudExvY2FsZSAmJiB0aGlzLmN1cnJlbnRMb2NhbGVbY2F0ZWdvcnldKSB7XHJcbiAgICAgIHZhciBjdXJyZW50TG9jYWxlU2V0dGluZyA9IHRoaXMuY3VycmVudExvY2FsZVtjYXRlZ29yeV1baWRlbnRpZmllcl07XHJcbiAgICAgIGlmIChjdXJyZW50TG9jYWxlU2V0dGluZyAhPT0gdW5kZWZpbmVkICYmIGN1cnJlbnRMb2NhbGVTZXR0aW5nICE9PSBudWxsKVxyXG4gICAgICAgIHJldHVybiBjdXJyZW50TG9jYWxlU2V0dGluZztcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmRlZmF1bHRzW2NhdGVnb3J5XSkge1xyXG4gICAgICB2YXIgZGVmYXVsdFNldHRpbmcgPSB0aGlzLmRlZmF1bHRzW2NhdGVnb3J5XVtpZGVudGlmaWVyXTtcclxuICAgICAgaWYgKGRlZmF1bHRTZXR0aW5nICE9PSB1bmRlZmluZWQgJiYgZGVmYXVsdFNldHRpbmcgIT09IG51bGwpXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRTZXR0aW5nO1xyXG4gICAgfVxyXG4gICAgdGhyb3cgJ3ZhbGlkYXRpb246IEkxOE46IENvdWxkIG5vdCBmaW5kOiAnICsgaWRlbnRpZmllciArICcgaW4gY2F0ZWdvcnk6ICcgKyBjYXRlZ29yeTtcclxuICB9XHJcblxyXG4gIHNldHRpbmcoc2V0dGluZ0lkZW50aWZpZXIpIHtcclxuICAgIHJldHVybiB0aGlzLmdldFZhbHVlRm9yKHNldHRpbmdJZGVudGlmaWVyLCAnc2V0dGluZ3MnKTtcclxuICB9XHJcblxyXG4gIHRyYW5zbGF0ZSh0cmFuc2xhdGlvbklkZW50aWZpZXIsIG5ld1ZhbHVlLCB0aHJlc2hvbGQpIHtcclxuICAgIHZhciB0cmFuc2xhdGlvbiA9IHRoaXMuZ2V0VmFsdWVGb3IodHJhbnNsYXRpb25JZGVudGlmaWVyLCAnbWVzc2FnZXMnKTtcclxuICAgIGlmICh0eXBlb2YgdHJhbnNsYXRpb24gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgcmV0dXJuIHRyYW5zbGF0aW9uKG5ld1ZhbHVlLCB0aHJlc2hvbGQpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiB0cmFuc2xhdGlvbiA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIHRyYW5zbGF0aW9uO1xyXG4gICAgfVxyXG4gICAgdGhyb3cgJ1ZhbGlkYXRpb24gbWVzc2FnZSBmb3IgJyArIHRyYW5zbGF0aW9uSWRlbnRpZmllciArICd3YXMgaW4gYW4gdW5zdXBwb3J0ZWQgZm9ybWF0JztcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIExvY2FsZVJlcG9zaXRvcnkgIHtcclxuICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgdGhpcy5kZWZhdWx0ID0gbnVsbDtcclxuICAgIHRoaXMuaW5zdGFuY2VzID0gbmV3IE1hcCgpO1xyXG4gICAgdGhpcy5kZWZhdWx0cyA9IHtcclxuICAgICAgc2V0dGluZ3M6IHt9LFxyXG4gICAgICBtZXNzYWdlczoge31cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBsb2FkKGxvY2FsZUlkZW50aWZpZXIsIGJhc2VQYXRoKSB7XHJcbiAgICBpZighYmFzZVBhdGgpIGJhc2VQYXRoID0gJ2F1cmVsaWEtY3VzdG9tLWFwcC1jb21tb24tZmlsZXMvcmVzb3VyY2VzLyc7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgaWYodGhpcy5pbnN0YW5jZXMuaGFzKGxvY2FsZUlkZW50aWZpZXIpKSB7XHJcbiAgICAgICAgbGV0IGxvY2FsZSA9IHRoaXMuaW5zdGFuY2VzLmdldChsb2NhbGVJZGVudGlmaWVyKTtcclxuICAgICAgICByZXNvbHZlKGxvY2FsZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgU3lzdGVtLmltcG9ydChiYXNlUGF0aCArIGxvY2FsZUlkZW50aWZpZXIpLnRoZW4oKHJlc291cmNlKSA9PiB7XHJcbiAgICAgICAgICBsZXQgbG9jYWxlID0gdGhpcy5hZGRMb2NhbGUobG9jYWxlSWRlbnRpZmllciwgcmVzb3VyY2UuZGF0YSk7XHJcbiAgICAgICAgICByZXNvbHZlKGxvY2FsZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYWRkTG9jYWxlKGxvY2FsZUlkZW50aWZpZXIsIGRhdGEpXHJcbiAge1xyXG4gICAgdmFyIGluc3RhbmNlID0gbmV3IExvY2FsZSh0aGlzLmRlZmF1bHRzLCBkYXRhKTtcclxuICAgIHRoaXMuaW5zdGFuY2VzLnNldChsb2NhbGVJZGVudGlmaWVyLCBpbnN0YW5jZSk7XHJcbiAgICBpZih0aGlzLmRlZmF1bHQgPT09IG51bGwpXHJcbiAgICAgIHRoaXMuZGVmYXVsdCA9IGluc3RhbmNlO1xyXG4gICAgcmV0dXJuIGluc3RhbmNlO1xyXG4gIH1cclxufVxyXG5cclxuTG9jYWxlLlJlcG9zaXRvcnkgPSBuZXcgTG9jYWxlUmVwb3NpdG9yeSgpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
