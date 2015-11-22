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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Y0FLYSxjQUFjLEVBY2QsTUFBTTs7Ozs7Ozs7dUJBaEJYLE1BQU07OztBQUVELG9CQUFjLFlBQWQsY0FBYzs4QkFBZCxjQUFjOzs7OztBQUczQixvQkFBYyxDQUFDLFNBQVMsR0FBRztBQUN6QixjQUFNLEVBQUUsT0FBTztBQUNmLHVCQUFlLEVBQUUsb0JBQW9CO09BQ3RDLENBQUM7O0FBRUYsb0JBQWMsQ0FBQyxRQUFRLEdBQUcsWUFBWTtBQUNwQyxZQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDbEIsY0FBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2xELGVBQU8sUUFBUSxDQUFDO09BQ2pCLENBQUM7O0FBRVcsWUFBTTtBQUNOLGlCQURBLE1BQU0sQ0FDTCxXQUFXLEVBQUU7Z0NBRGQsTUFBTTs7QUFFZixjQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztBQUMvQixjQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxHQUFHLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUNoRSxjQUFJLENBQUMsZUFBZSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7U0FDbEM7O3FCQUxVLE1BQU07O2lCQU9ULGtCQUFDLFVBQVUsRUFBRTtBQUNuQixnQkFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxTQUFTLEVBQUU7QUFDNUYscUJBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNoQztBQUNELGdCQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssSUFBSSxFQUFFO0FBQzdCLHFCQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzlDO0FBQ0Qsa0JBQU0sS0FBSyxDQUFDLG9CQUFvQixHQUFHLFVBQVUsQ0FBQyxDQUFDO1dBQ2hEOzs7aUJBRU8sa0JBQUMsVUFBVSxFQUFFLEtBQUssRUFBRTtBQUMxQixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDaEMsbUJBQU8sSUFBSSxDQUFDO1dBQ2I7OztpQkFFYyx5QkFBQyxRQUFRLEVBQUU7OztBQUN4QixnQkFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsRUFBRTtBQUNsQyxxQkFBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNuRCxNQUFNOztBQUNMLG9CQUFJLEVBQUUsR0FBRyxFQUFFLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDO0FBQzdDLHNCQUFLLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZDO3FCQUFPLFlBQU07QUFDWCwwQkFBSyxlQUFlLFVBQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzttQkFDakM7a0JBQUM7Ozs7YUFDSDtXQUNGOzs7aUJBRWMsMkJBQUc7QUFDaEIsbUJBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztXQUN0Qzs7O2lCQUVhLHdCQUFDLFFBQVEsRUFBRTtBQUN2QixrQkFBTSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7V0FDNUI7OztpQkFFZSwwQkFBQyxVQUFVLEVBQUU7QUFDM0Isa0JBQU0sQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1dBQ2hDOzs7aUJBRWEsd0JBQUMsSUFBSSxFQUFFO0FBQ25CLGtCQUFNLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1dBQ2xDOzs7aUJBRVEsbUJBQUMsZ0JBQWdCLEVBQUU7QUFDMUIsZ0JBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDMUMsZ0JBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQzFELGlCQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN6Qyx1QkFBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7YUFDaEI7QUFDRCxtQkFBTyxJQUFJLENBQUM7V0FDYjs7O2lCQUVLLGtCQUFHO0FBQ1AsbUJBQU8sTUFBTSxDQUFDLFVBQVUsQ0FDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7V0FDcEU7OztlQTlEVSxNQUFNOzs7OztBQWlFbkIsWUFBTSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJjb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbW9zaGVuc2t5IG9uIDYvMTcvMTUuXG4gKi9cbmltcG9ydCB7TG9jYWxlfSBmcm9tICcuL2xvY2FsZSc7XG5cbmV4cG9ydCBjbGFzcyBDb25maWdEZWZhdWx0cyB7XG59XG5cbkNvbmZpZ0RlZmF1bHRzLl9kZWZhdWx0cyA9IHtcbiAgbG9jYWxlOiAnZW4tVVMnLFxuICBsb2NhbGVSZXNvdXJjZXM6ICdzZXJ2aWNlL3Jlc291cmNlcy8nXG59O1xuXG5Db25maWdEZWZhdWx0cy5kZWZhdWx0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGRlZmF1bHRzID0ge307XG4gIE9iamVjdC5hc3NpZ24oZGVmYXVsdHMsIENvbmZpZ0RlZmF1bHRzLl9kZWZhdWx0cyk7XG4gIHJldHVybiBkZWZhdWx0cztcbn07XG5cbmV4cG9ydCBjbGFzcyBDb25maWcge1xuICBjb25zdHJ1Y3Rvcihpbm5lckNvbmZpZykge1xuICAgIHRoaXMuaW5uZXJDb25maWcgPSBpbm5lckNvbmZpZztcbiAgICB0aGlzLnZhbHVlcyA9IHRoaXMuaW5uZXJDb25maWcgPyB7fSA6IENvbmZpZ0RlZmF1bHRzLmRlZmF1bHRzKCk7XG4gICAgdGhpcy5jaGFuZ2VkSGFuZGxlcnMgPSBuZXcgTWFwKCk7XG4gIH1cblxuICBnZXRWYWx1ZShpZGVudGlmaWVyKSB7XG4gICAgaWYgKHRoaXMudmFsdWVzLmhhc093blByb3BlcnR5KGlkZW50aWZpZXIpICE9PSBudWxsICYmIHRoaXMudmFsdWVzW2lkZW50aWZpZXJdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlc1tpZGVudGlmaWVyXTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaW5uZXJDb25maWcgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVyQ29uZmlnLmdldFZhbHVlKGlkZW50aWZpZXIpO1xuICAgIH1cbiAgICB0aHJvdyBFcnJvcignQ29uZmlnIG5vdCBmb3VuZDogJyArIGlkZW50aWZpZXIpO1xuICB9XG5cbiAgc2V0VmFsdWUoaWRlbnRpZmllciwgdmFsdWUpIHtcbiAgICB0aGlzLnZhbHVlc1tpZGVudGlmaWVyXSA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzOyAvL2ZsdWVudCBBUElcbiAgfVxuXG4gIG9uTG9jYWxlQ2hhbmdlZChjYWxsYmFjaykge1xuICAgIGlmICh0aGlzLmlubmVyQ29uZmlnICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVyQ29uZmlnLm9uTG9jYWxlQ2hhbmdlZChjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBpZCA9ICsrVmFsaWRhdGlvbkNvbmZpZy51bmlxdWVMaXN0ZW5lcklkO1xuICAgICAgdGhpcy5jaGFuZ2VkSGFuZGxlcnMuc2V0KGlkLCBjYWxsYmFjayk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICB0aGlzLmNoYW5nZWRIYW5kbGVycy5kZWxldGUoaWQpO1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBnZXREZXBlbmRlbmNpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VmFsdWUoJ2RlcGVuZGVuY2llcycpO1xuICB9XG5cbiAgc2V0SHR0cFNlcnZpY2UoaHR0cE9wdHMpIHtcbiAgICBDb25maWcuaHR0cE9wdHMgPSBodHRwT3B0cztcbiAgfVxuXG4gIHNldExvZ2dlclNlcnZpY2UobG9nZ2VyT3B0cykge1xuICAgIENvbmZpZy5sb2dnZXJPcHRzID0gbG9nZ2VyT3B0cztcbiAgfVxuXG4gIHJvdXRlckF1dGhTdGVwKG9wdHMpIHtcbiAgICBDb25maWcucm91dGVyQXV0aFN0ZXBPcHRzID0gb3B0cztcbiAgfVxuXG4gIHVzZUxvY2FsZShsb2NhbGVJZGVudGlmaWVyKSB7XG4gICAgdGhpcy5zZXRWYWx1ZSgnbG9jYWxlJywgbG9jYWxlSWRlbnRpZmllcik7XG4gICAgdmFyIGNhbGxiYWNrcyA9IEFycmF5LmZyb20odGhpcy5jaGFuZ2VkSGFuZGxlcnMudmFsdWVzKCkpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjYWxsYmFja3NbaV0oKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsb2NhbGUoKSB7XG4gICAgcmV0dXJuIExvY2FsZS5SZXBvc2l0b3J5XG4gICAgICAubG9hZCh0aGlzLmdldFZhbHVlKCdsb2NhbGUnKSwgdGhpcy5nZXRWYWx1ZSgnbG9jYWxlUmVzb3VyY2VzJykpO1xuICB9XG59XG5cbkNvbmZpZy51bmlxdWVMaXN0ZW5lcklkID0gMDtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==