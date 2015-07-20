System.register(['./locale'], function (_export) {
  'use strict';

  var Locale, ConfigDefaults, Config;

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

        Config.prototype.getValue = function getValue(identifier) {
          if (this.values.hasOwnProperty(identifier) !== null && this.values[identifier] !== undefined) {
            return this.values[identifier];
          }
          if (this.innerConfig !== null) {
            return this.innerConfig.getValue(identifier);
          }
          throw Error('Config not found: ' + identifier);
        };

        Config.prototype.setValue = function setValue(identifier, value) {
          this.values[identifier] = value;
          return this;
        };

        Config.prototype.onLocaleChanged = function onLocaleChanged(callback) {
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
        };

        Config.prototype.getDependencies = function getDependencies() {
          return this.getValue('dependencies');
        };

        Config.prototype.setHttpService = function setHttpService(httpOpts) {
          Config.httpOpts = httpOpts;
        };

        Config.prototype.routerAuthStep = function routerAuthStep(opts) {
          Config.routerAuthStepOpts = opts;
        };

        Config.prototype.useLocale = function useLocale(localeIdentifier) {
          this.setValue('locale', localeIdentifier);
          var callbacks = Array.from(this.changedHandlers.values());
          for (var i = 0; i < callbacks.length; i++) {
            callbacks[i]();
          }
          return this;
        };

        Config.prototype.locale = function locale() {
          return Locale.Repository.load(this.getValue('locale'), this.getValue('localeResources'));
        };

        return Config;
      })();

      _export('Config', Config);

      Config.uniqueListenerId = 0;
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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LGdCQUFnQixDQUFDLENBQUM7QUFDMUMsY0FBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDMUQsZUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDekMscUJBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1dBQ2hCO0FBQ0QsaUJBQU8sSUFBSSxDQUFDO1NBQ2I7O0FBckRVLGNBQU0sV0F1RGpCLE1BQU0sR0FBQSxrQkFBRztBQUNQLGlCQUFPLE1BQU0sQ0FBQyxVQUFVLENBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1NBQ3BFOztlQTFEVSxNQUFNOzs7d0JBQU4sTUFBTTs7QUE2RG5CLFlBQU0sQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1vc2hlbnNreSBvbiA2LzE3LzE1LlxuICovXG5pbXBvcnQge0xvY2FsZX0gZnJvbSAnLi9sb2NhbGUnO1xuXG5leHBvcnQgY2xhc3MgQ29uZmlnRGVmYXVsdHMge1xufVxuXG5Db25maWdEZWZhdWx0cy5fZGVmYXVsdHMgPSB7XG4gIGxvY2FsZTogJ2VuLVVTJyxcbiAgbG9jYWxlUmVzb3VyY2VzOiAnc2VydmljZS9yZXNvdXJjZXMvJ1xufTtcblxuQ29uZmlnRGVmYXVsdHMuZGVmYXVsdHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBkZWZhdWx0cyA9IHt9O1xuICBPYmplY3QuYXNzaWduKGRlZmF1bHRzLCBDb25maWdEZWZhdWx0cy5fZGVmYXVsdHMpO1xuICByZXR1cm4gZGVmYXVsdHM7XG59O1xuXG5leHBvcnQgY2xhc3MgQ29uZmlnIHtcbiAgY29uc3RydWN0b3IoaW5uZXJDb25maWcpIHtcbiAgICB0aGlzLmlubmVyQ29uZmlnID0gaW5uZXJDb25maWc7XG4gICAgdGhpcy52YWx1ZXMgPSB0aGlzLmlubmVyQ29uZmlnID8ge30gOiBDb25maWdEZWZhdWx0cy5kZWZhdWx0cygpO1xuICAgIHRoaXMuY2hhbmdlZEhhbmRsZXJzID0gbmV3IE1hcCgpO1xuICB9XG5cbiAgZ2V0VmFsdWUoaWRlbnRpZmllcikge1xuICAgIGlmICh0aGlzLnZhbHVlcy5oYXNPd25Qcm9wZXJ0eShpZGVudGlmaWVyKSAhPT0gbnVsbCAmJiB0aGlzLnZhbHVlc1tpZGVudGlmaWVyXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZXNbaWRlbnRpZmllcl07XG4gICAgfVxuICAgIGlmICh0aGlzLmlubmVyQ29uZmlnICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbm5lckNvbmZpZy5nZXRWYWx1ZShpZGVudGlmaWVyKTtcbiAgICB9XG4gICAgdGhyb3cgRXJyb3IoJ0NvbmZpZyBub3QgZm91bmQ6ICcgKyBpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHNldFZhbHVlKGlkZW50aWZpZXIsIHZhbHVlKSB7XG4gICAgdGhpcy52YWx1ZXNbaWRlbnRpZmllcl0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdGhpczsgLy9mbHVlbnQgQVBJXG4gIH1cblxuICBvbkxvY2FsZUNoYW5nZWQoY2FsbGJhY2spIHtcbiAgICBpZiAodGhpcy5pbm5lckNvbmZpZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbm5lckNvbmZpZy5vbkxvY2FsZUNoYW5nZWQoY2FsbGJhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgaWQgPSArK1ZhbGlkYXRpb25Db25maWcudW5pcXVlTGlzdGVuZXJJZDtcbiAgICAgIHRoaXMuY2hhbmdlZEhhbmRsZXJzLnNldChpZCwgY2FsbGJhY2spO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgdGhpcy5jaGFuZ2VkSGFuZGxlcnMuZGVsZXRlKGlkKTtcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgZ2V0RGVwZW5kZW5jaWVzKCkge1xuICAgIHJldHVybiB0aGlzLmdldFZhbHVlKCdkZXBlbmRlbmNpZXMnKTtcbiAgfVxuXG4gIHNldEh0dHBTZXJ2aWNlKGh0dHBPcHRzKSB7XG4gICAgQ29uZmlnLmh0dHBPcHRzID0gaHR0cE9wdHM7XG4gIH1cblxuICByb3V0ZXJBdXRoU3RlcChvcHRzKSB7XG4gICAgQ29uZmlnLnJvdXRlckF1dGhTdGVwT3B0cyA9IG9wdHM7XG4gIH1cblxuICB1c2VMb2NhbGUobG9jYWxlSWRlbnRpZmllcikge1xuICAgIHRoaXMuc2V0VmFsdWUoJ2xvY2FsZScsIGxvY2FsZUlkZW50aWZpZXIpO1xuICAgIHZhciBjYWxsYmFja3MgPSBBcnJheS5mcm9tKHRoaXMuY2hhbmdlZEhhbmRsZXJzLnZhbHVlcygpKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgY2FsbGJhY2tzW2ldKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbG9jYWxlKCkge1xuICAgIHJldHVybiBMb2NhbGUuUmVwb3NpdG9yeVxuICAgICAgLmxvYWQodGhpcy5nZXRWYWx1ZSgnbG9jYWxlJyksIHRoaXMuZ2V0VmFsdWUoJ2xvY2FsZVJlc291cmNlcycpKTtcbiAgfVxufVxuXG5Db25maWcudW5pcXVlTGlzdGVuZXJJZCA9IDA7XG4iXX0=