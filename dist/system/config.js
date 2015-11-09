System.register(['./locale'], function (_export) {
  'use strict';

  var Locale, ConfigDefaults, Config;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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
        localeResources: 'service/resources/'
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
            return Locale.Repository.load(this.getValue('locale'), this.getValue('localeResources'));
          }
        }]);

        return Config;
      })();

      _export('Config', Config);

      Config.uniqueListenerId = 0;
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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LGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQzFELGlCQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN6Qyx1QkFBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7YUFDaEI7QUFDRCxtQkFBTyxJQUFJLENBQUM7V0FDYjs7O2lCQUVLLGtCQUFHO0FBQ1AsbUJBQU8sTUFBTSxDQUFDLFVBQVUsQ0FDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7V0FDcEU7OztlQTlEVSxNQUFNOzs7OztBQWlFbkIsWUFBTSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJjb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBtb3NoZW5za3kgb24gNi8xNy8xNS5cclxuICovXHJcbmltcG9ydCB7TG9jYWxlfSBmcm9tICcuL2xvY2FsZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29uZmlnRGVmYXVsdHMge1xyXG59XHJcblxyXG5Db25maWdEZWZhdWx0cy5fZGVmYXVsdHMgPSB7XHJcbiAgbG9jYWxlOiAnZW4tVVMnLFxyXG4gIGxvY2FsZVJlc291cmNlczogJ3NlcnZpY2UvcmVzb3VyY2VzLydcclxufTtcclxuXHJcbkNvbmZpZ0RlZmF1bHRzLmRlZmF1bHRzID0gZnVuY3Rpb24gKCkge1xyXG4gIHZhciBkZWZhdWx0cyA9IHt9O1xyXG4gIE9iamVjdC5hc3NpZ24oZGVmYXVsdHMsIENvbmZpZ0RlZmF1bHRzLl9kZWZhdWx0cyk7XHJcbiAgcmV0dXJuIGRlZmF1bHRzO1xyXG59O1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbmZpZyB7XHJcbiAgY29uc3RydWN0b3IoaW5uZXJDb25maWcpIHtcclxuICAgIHRoaXMuaW5uZXJDb25maWcgPSBpbm5lckNvbmZpZztcclxuICAgIHRoaXMudmFsdWVzID0gdGhpcy5pbm5lckNvbmZpZyA/IHt9IDogQ29uZmlnRGVmYXVsdHMuZGVmYXVsdHMoKTtcclxuICAgIHRoaXMuY2hhbmdlZEhhbmRsZXJzID0gbmV3IE1hcCgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VmFsdWUoaWRlbnRpZmllcikge1xyXG4gICAgaWYgKHRoaXMudmFsdWVzLmhhc093blByb3BlcnR5KGlkZW50aWZpZXIpICE9PSBudWxsICYmIHRoaXMudmFsdWVzW2lkZW50aWZpZXJdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudmFsdWVzW2lkZW50aWZpZXJdO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaW5uZXJDb25maWcgIT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJDb25maWcuZ2V0VmFsdWUoaWRlbnRpZmllcik7XHJcbiAgICB9XHJcbiAgICB0aHJvdyBFcnJvcignQ29uZmlnIG5vdCBmb3VuZDogJyArIGlkZW50aWZpZXIpO1xyXG4gIH1cclxuXHJcbiAgc2V0VmFsdWUoaWRlbnRpZmllciwgdmFsdWUpIHtcclxuICAgIHRoaXMudmFsdWVzW2lkZW50aWZpZXJdID0gdmFsdWU7XHJcbiAgICByZXR1cm4gdGhpczsgLy9mbHVlbnQgQVBJXHJcbiAgfVxyXG5cclxuICBvbkxvY2FsZUNoYW5nZWQoY2FsbGJhY2spIHtcclxuICAgIGlmICh0aGlzLmlubmVyQ29uZmlnICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJDb25maWcub25Mb2NhbGVDaGFuZ2VkKGNhbGxiYWNrKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBpZCA9ICsrVmFsaWRhdGlvbkNvbmZpZy51bmlxdWVMaXN0ZW5lcklkO1xyXG4gICAgICB0aGlzLmNoYW5nZWRIYW5kbGVycy5zZXQoaWQsIGNhbGxiYWNrKTtcclxuICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICB0aGlzLmNoYW5nZWRIYW5kbGVycy5kZWxldGUoaWQpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0RGVwZW5kZW5jaWVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0VmFsdWUoJ2RlcGVuZGVuY2llcycpO1xyXG4gIH1cclxuXHJcbiAgc2V0SHR0cFNlcnZpY2UoaHR0cE9wdHMpIHtcclxuICAgIENvbmZpZy5odHRwT3B0cyA9IGh0dHBPcHRzO1xyXG4gIH1cclxuXHJcbiAgc2V0TG9nZ2VyU2VydmljZShsb2dnZXJPcHRzKSB7XHJcbiAgICBDb25maWcubG9nZ2VyT3B0cyA9IGxvZ2dlck9wdHM7XHJcbiAgfVxyXG5cclxuICByb3V0ZXJBdXRoU3RlcChvcHRzKSB7XHJcbiAgICBDb25maWcucm91dGVyQXV0aFN0ZXBPcHRzID0gb3B0cztcclxuICB9XHJcblxyXG4gIHVzZUxvY2FsZShsb2NhbGVJZGVudGlmaWVyKSB7XHJcbiAgICB0aGlzLnNldFZhbHVlKCdsb2NhbGUnLCBsb2NhbGVJZGVudGlmaWVyKTtcclxuICAgIHZhciBjYWxsYmFja3MgPSBBcnJheS5mcm9tKHRoaXMuY2hhbmdlZEhhbmRsZXJzLnZhbHVlcygpKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNhbGxiYWNrc1tpXSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBsb2NhbGUoKSB7XHJcbiAgICByZXR1cm4gTG9jYWxlLlJlcG9zaXRvcnlcclxuICAgICAgLmxvYWQodGhpcy5nZXRWYWx1ZSgnbG9jYWxlJyksIHRoaXMuZ2V0VmFsdWUoJ2xvY2FsZVJlc291cmNlcycpKTtcclxuICB9XHJcbn1cclxuXHJcbkNvbmZpZy51bmlxdWVMaXN0ZW5lcklkID0gMDtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
