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
//# sourceMappingURL=data:application/json;base64,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UyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDaEI7QUFDRCxlQUFPLElBQUksQ0FBQztPQUNiOzs7YUFFSyxrQkFBRztBQUNQLGVBQU8sUUF4RUgsTUFBTSxDQXdFSSxVQUFVLENBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO09BQ3BFOzs7V0ExRFUsTUFBTTs7Ozs7QUE2RG5CLFFBQU0sQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1vc2hlbnNreSBvbiA2LzE3LzE1LlxuICovXG5pbXBvcnQge0xvY2FsZX0gZnJvbSAnLi9sb2NhbGUnO1xuXG5leHBvcnQgY2xhc3MgQ29uZmlnRGVmYXVsdHMge1xufVxuXG5Db25maWdEZWZhdWx0cy5fZGVmYXVsdHMgPSB7XG4gIGxvY2FsZTogJ2VuLVVTJyxcbiAgbG9jYWxlUmVzb3VyY2VzOiAnc2VydmljZS9yZXNvdXJjZXMvJ1xufTtcblxuQ29uZmlnRGVmYXVsdHMuZGVmYXVsdHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBkZWZhdWx0cyA9IHt9O1xuICBPYmplY3QuYXNzaWduKGRlZmF1bHRzLCBDb25maWdEZWZhdWx0cy5fZGVmYXVsdHMpO1xuICByZXR1cm4gZGVmYXVsdHM7XG59O1xuXG5leHBvcnQgY2xhc3MgQ29uZmlnIHtcbiAgY29uc3RydWN0b3IoaW5uZXJDb25maWcpIHtcbiAgICB0aGlzLmlubmVyQ29uZmlnID0gaW5uZXJDb25maWc7XG4gICAgdGhpcy52YWx1ZXMgPSB0aGlzLmlubmVyQ29uZmlnID8ge30gOiBDb25maWdEZWZhdWx0cy5kZWZhdWx0cygpO1xuICAgIHRoaXMuY2hhbmdlZEhhbmRsZXJzID0gbmV3IE1hcCgpO1xuICB9XG5cbiAgZ2V0VmFsdWUoaWRlbnRpZmllcikge1xuICAgIGlmICh0aGlzLnZhbHVlcy5oYXNPd25Qcm9wZXJ0eShpZGVudGlmaWVyKSAhPT0gbnVsbCAmJiB0aGlzLnZhbHVlc1tpZGVudGlmaWVyXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZXNbaWRlbnRpZmllcl07XG4gICAgfVxuICAgIGlmICh0aGlzLmlubmVyQ29uZmlnICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbm5lckNvbmZpZy5nZXRWYWx1ZShpZGVudGlmaWVyKTtcbiAgICB9XG4gICAgdGhyb3cgRXJyb3IoJ0NvbmZpZyBub3QgZm91bmQ6ICcgKyBpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHNldFZhbHVlKGlkZW50aWZpZXIsIHZhbHVlKSB7XG4gICAgdGhpcy52YWx1ZXNbaWRlbnRpZmllcl0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdGhpczsgLy9mbHVlbnQgQVBJXG4gIH1cblxuICBvbkxvY2FsZUNoYW5nZWQoY2FsbGJhY2spIHtcbiAgICBpZiAodGhpcy5pbm5lckNvbmZpZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbm5lckNvbmZpZy5vbkxvY2FsZUNoYW5nZWQoY2FsbGJhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgaWQgPSArK1ZhbGlkYXRpb25Db25maWcudW5pcXVlTGlzdGVuZXJJZDtcbiAgICAgIHRoaXMuY2hhbmdlZEhhbmRsZXJzLnNldChpZCwgY2FsbGJhY2spO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgdGhpcy5jaGFuZ2VkSGFuZGxlcnMuZGVsZXRlKGlkKTtcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgZ2V0RGVwZW5kZW5jaWVzKCkge1xuICAgIHJldHVybiB0aGlzLmdldFZhbHVlKCdkZXBlbmRlbmNpZXMnKTtcbiAgfVxuXG4gIHNldEh0dHBTZXJ2aWNlKGh0dHBPcHRzKSB7XG4gICAgQ29uZmlnLmh0dHBPcHRzID0gaHR0cE9wdHM7XG4gIH1cblxuICByb3V0ZXJBdXRoU3RlcChvcHRzKSB7XG4gICAgQ29uZmlnLnJvdXRlckF1dGhTdGVwT3B0cyA9IG9wdHM7XG4gIH1cblxuICB1c2VMb2NhbGUobG9jYWxlSWRlbnRpZmllcikge1xuICAgIHRoaXMuc2V0VmFsdWUoJ2xvY2FsZScsIGxvY2FsZUlkZW50aWZpZXIpO1xuICAgIHZhciBjYWxsYmFja3MgPSBBcnJheS5mcm9tKHRoaXMuY2hhbmdlZEhhbmRsZXJzLnZhbHVlcygpKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgY2FsbGJhY2tzW2ldKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbG9jYWxlKCkge1xuICAgIHJldHVybiBMb2NhbGUuUmVwb3NpdG9yeVxuICAgICAgLmxvYWQodGhpcy5nZXRWYWx1ZSgnbG9jYWxlJyksIHRoaXMuZ2V0VmFsdWUoJ2xvY2FsZVJlc291cmNlcycpKTtcbiAgfVxufVxuXG5Db25maWcudW5pcXVlTGlzdGVuZXJJZCA9IDA7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=