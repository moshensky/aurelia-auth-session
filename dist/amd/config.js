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
//# sourceMappingURL=data:application/json;base64,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Q0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3pDLG1CQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUNoQjtBQUNELGVBQU8sSUFBSSxDQUFDO09BQ2I7OzthQUVLLGtCQUFHO0FBQ1AsZUFBTyxRQTVFSCxNQUFNLENBNEVJLFVBQVUsQ0FDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7T0FDcEU7OztXQTlEVSxNQUFNOzs7OztBQWlFbkIsUUFBTSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJjb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBtb3NoZW5za3kgb24gNi8xNy8xNS5cclxuICovXHJcbmltcG9ydCB7TG9jYWxlfSBmcm9tICcuL2xvY2FsZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29uZmlnRGVmYXVsdHMge1xyXG59XHJcblxyXG5Db25maWdEZWZhdWx0cy5fZGVmYXVsdHMgPSB7XHJcbiAgbG9jYWxlOiAnZW4tVVMnLFxyXG4gIGxvY2FsZVJlc291cmNlczogJ3NlcnZpY2UvcmVzb3VyY2VzLydcclxufTtcclxuXHJcbkNvbmZpZ0RlZmF1bHRzLmRlZmF1bHRzID0gZnVuY3Rpb24gKCkge1xyXG4gIHZhciBkZWZhdWx0cyA9IHt9O1xyXG4gIE9iamVjdC5hc3NpZ24oZGVmYXVsdHMsIENvbmZpZ0RlZmF1bHRzLl9kZWZhdWx0cyk7XHJcbiAgcmV0dXJuIGRlZmF1bHRzO1xyXG59O1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbmZpZyB7XHJcbiAgY29uc3RydWN0b3IoaW5uZXJDb25maWcpIHtcclxuICAgIHRoaXMuaW5uZXJDb25maWcgPSBpbm5lckNvbmZpZztcclxuICAgIHRoaXMudmFsdWVzID0gdGhpcy5pbm5lckNvbmZpZyA/IHt9IDogQ29uZmlnRGVmYXVsdHMuZGVmYXVsdHMoKTtcclxuICAgIHRoaXMuY2hhbmdlZEhhbmRsZXJzID0gbmV3IE1hcCgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VmFsdWUoaWRlbnRpZmllcikge1xyXG4gICAgaWYgKHRoaXMudmFsdWVzLmhhc093blByb3BlcnR5KGlkZW50aWZpZXIpICE9PSBudWxsICYmIHRoaXMudmFsdWVzW2lkZW50aWZpZXJdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudmFsdWVzW2lkZW50aWZpZXJdO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaW5uZXJDb25maWcgIT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJDb25maWcuZ2V0VmFsdWUoaWRlbnRpZmllcik7XHJcbiAgICB9XHJcbiAgICB0aHJvdyBFcnJvcignQ29uZmlnIG5vdCBmb3VuZDogJyArIGlkZW50aWZpZXIpO1xyXG4gIH1cclxuXHJcbiAgc2V0VmFsdWUoaWRlbnRpZmllciwgdmFsdWUpIHtcclxuICAgIHRoaXMudmFsdWVzW2lkZW50aWZpZXJdID0gdmFsdWU7XHJcbiAgICByZXR1cm4gdGhpczsgLy9mbHVlbnQgQVBJXHJcbiAgfVxyXG5cclxuICBvbkxvY2FsZUNoYW5nZWQoY2FsbGJhY2spIHtcclxuICAgIGlmICh0aGlzLmlubmVyQ29uZmlnICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJDb25maWcub25Mb2NhbGVDaGFuZ2VkKGNhbGxiYWNrKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBpZCA9ICsrVmFsaWRhdGlvbkNvbmZpZy51bmlxdWVMaXN0ZW5lcklkO1xyXG4gICAgICB0aGlzLmNoYW5nZWRIYW5kbGVycy5zZXQoaWQsIGNhbGxiYWNrKTtcclxuICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICB0aGlzLmNoYW5nZWRIYW5kbGVycy5kZWxldGUoaWQpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0RGVwZW5kZW5jaWVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0VmFsdWUoJ2RlcGVuZGVuY2llcycpO1xyXG4gIH1cclxuXHJcbiAgc2V0SHR0cFNlcnZpY2UoaHR0cE9wdHMpIHtcclxuICAgIENvbmZpZy5odHRwT3B0cyA9IGh0dHBPcHRzO1xyXG4gIH1cclxuXHJcbiAgc2V0TG9nZ2VyU2VydmljZShsb2dnZXJPcHRzKSB7XHJcbiAgICBDb25maWcubG9nZ2VyT3B0cyA9IGxvZ2dlck9wdHM7XHJcbiAgfVxyXG5cclxuICByb3V0ZXJBdXRoU3RlcChvcHRzKSB7XHJcbiAgICBDb25maWcucm91dGVyQXV0aFN0ZXBPcHRzID0gb3B0cztcclxuICB9XHJcblxyXG4gIHVzZUxvY2FsZShsb2NhbGVJZGVudGlmaWVyKSB7XHJcbiAgICB0aGlzLnNldFZhbHVlKCdsb2NhbGUnLCBsb2NhbGVJZGVudGlmaWVyKTtcclxuICAgIHZhciBjYWxsYmFja3MgPSBBcnJheS5mcm9tKHRoaXMuY2hhbmdlZEhhbmRsZXJzLnZhbHVlcygpKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNhbGxiYWNrc1tpXSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBsb2NhbGUoKSB7XHJcbiAgICByZXR1cm4gTG9jYWxlLlJlcG9zaXRvcnlcclxuICAgICAgLmxvYWQodGhpcy5nZXRWYWx1ZSgnbG9jYWxlJyksIHRoaXMuZ2V0VmFsdWUoJ2xvY2FsZVJlc291cmNlcycpKTtcclxuICB9XHJcbn1cclxuXHJcbkNvbmZpZy51bmlxdWVMaXN0ZW5lcklkID0gMDtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
