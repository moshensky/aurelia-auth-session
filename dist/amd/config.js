define(['exports', './locale'], function (exports, _locale) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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
      key: 'setLoggerService',
      value: function setLoggerService(loggerOpts) {
        Config.loggerOpts = loggerOpts;
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
});
//# sourceMappingURL=data:application/json;base64,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Q0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3pDLG1CQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUNoQjtBQUNELGVBQU8sSUFBSSxDQUFDO09BQ2I7OzthQUVLLGtCQUFHO0FBQ1AsZUFBTyxRQTVFSCxNQUFNLENBNEVJLFVBQVUsQ0FDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7T0FDcEU7OztXQTlEVSxNQUFNOzs7OztBQWlFbkIsUUFBTSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJjb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbW9zaGVuc2t5IG9uIDYvMTcvMTUuXG4gKi9cbmltcG9ydCB7TG9jYWxlfSBmcm9tICcuL2xvY2FsZSc7XG5cbmV4cG9ydCBjbGFzcyBDb25maWdEZWZhdWx0cyB7XG59XG5cbkNvbmZpZ0RlZmF1bHRzLl9kZWZhdWx0cyA9IHtcbiAgbG9jYWxlOiAnZW4tVVMnLFxuICBsb2NhbGVSZXNvdXJjZXM6ICdzZXJ2aWNlL3Jlc291cmNlcy8nXG59O1xuXG5Db25maWdEZWZhdWx0cy5kZWZhdWx0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGRlZmF1bHRzID0ge307XG4gIE9iamVjdC5hc3NpZ24oZGVmYXVsdHMsIENvbmZpZ0RlZmF1bHRzLl9kZWZhdWx0cyk7XG4gIHJldHVybiBkZWZhdWx0cztcbn07XG5cbmV4cG9ydCBjbGFzcyBDb25maWcge1xuICBjb25zdHJ1Y3Rvcihpbm5lckNvbmZpZykge1xuICAgIHRoaXMuaW5uZXJDb25maWcgPSBpbm5lckNvbmZpZztcbiAgICB0aGlzLnZhbHVlcyA9IHRoaXMuaW5uZXJDb25maWcgPyB7fSA6IENvbmZpZ0RlZmF1bHRzLmRlZmF1bHRzKCk7XG4gICAgdGhpcy5jaGFuZ2VkSGFuZGxlcnMgPSBuZXcgTWFwKCk7XG4gIH1cblxuICBnZXRWYWx1ZShpZGVudGlmaWVyKSB7XG4gICAgaWYgKHRoaXMudmFsdWVzLmhhc093blByb3BlcnR5KGlkZW50aWZpZXIpICE9PSBudWxsICYmIHRoaXMudmFsdWVzW2lkZW50aWZpZXJdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlc1tpZGVudGlmaWVyXTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaW5uZXJDb25maWcgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVyQ29uZmlnLmdldFZhbHVlKGlkZW50aWZpZXIpO1xuICAgIH1cbiAgICB0aHJvdyBFcnJvcignQ29uZmlnIG5vdCBmb3VuZDogJyArIGlkZW50aWZpZXIpO1xuICB9XG5cbiAgc2V0VmFsdWUoaWRlbnRpZmllciwgdmFsdWUpIHtcbiAgICB0aGlzLnZhbHVlc1tpZGVudGlmaWVyXSA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzOyAvL2ZsdWVudCBBUElcbiAgfVxuXG4gIG9uTG9jYWxlQ2hhbmdlZChjYWxsYmFjaykge1xuICAgIGlmICh0aGlzLmlubmVyQ29uZmlnICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVyQ29uZmlnLm9uTG9jYWxlQ2hhbmdlZChjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBpZCA9ICsrVmFsaWRhdGlvbkNvbmZpZy51bmlxdWVMaXN0ZW5lcklkO1xuICAgICAgdGhpcy5jaGFuZ2VkSGFuZGxlcnMuc2V0KGlkLCBjYWxsYmFjayk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICB0aGlzLmNoYW5nZWRIYW5kbGVycy5kZWxldGUoaWQpO1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBnZXREZXBlbmRlbmNpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VmFsdWUoJ2RlcGVuZGVuY2llcycpO1xuICB9XG5cbiAgc2V0SHR0cFNlcnZpY2UoaHR0cE9wdHMpIHtcbiAgICBDb25maWcuaHR0cE9wdHMgPSBodHRwT3B0cztcbiAgfVxuXG4gIHNldExvZ2dlclNlcnZpY2UobG9nZ2VyT3B0cykge1xuICAgIENvbmZpZy5sb2dnZXJPcHRzID0gbG9nZ2VyT3B0cztcbiAgfVxuXG4gIHJvdXRlckF1dGhTdGVwKG9wdHMpIHtcbiAgICBDb25maWcucm91dGVyQXV0aFN0ZXBPcHRzID0gb3B0cztcbiAgfVxuXG4gIHVzZUxvY2FsZShsb2NhbGVJZGVudGlmaWVyKSB7XG4gICAgdGhpcy5zZXRWYWx1ZSgnbG9jYWxlJywgbG9jYWxlSWRlbnRpZmllcik7XG4gICAgdmFyIGNhbGxiYWNrcyA9IEFycmF5LmZyb20odGhpcy5jaGFuZ2VkSGFuZGxlcnMudmFsdWVzKCkpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjYWxsYmFja3NbaV0oKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsb2NhbGUoKSB7XG4gICAgcmV0dXJuIExvY2FsZS5SZXBvc2l0b3J5XG4gICAgICAubG9hZCh0aGlzLmdldFZhbHVlKCdsb2NhbGUnKSwgdGhpcy5nZXRWYWx1ZSgnbG9jYWxlUmVzb3VyY2VzJykpO1xuICB9XG59XG5cbkNvbmZpZy51bmlxdWVMaXN0ZW5lcklkID0gMDtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==