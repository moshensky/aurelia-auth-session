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
//# sourceMappingURL=data:application/json;base64,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LElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUMxRCxpQkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDekMsdUJBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2FBQ2hCO0FBQ0QsbUJBQU8sSUFBSSxDQUFDO1dBQ2I7OztpQkFFSyxrQkFBRztBQUNQLG1CQUFPLE1BQU0sQ0FBQyxVQUFVLENBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1dBQ3BFOzs7ZUE5RFUsTUFBTTs7O3dCQUFOLE1BQU07O0FBaUVuQixZQUFNLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImNvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtb3NoZW5za3kgb24gNi8xNy8xNS5cbiAqL1xuaW1wb3J0IHtMb2NhbGV9IGZyb20gJy4vbG9jYWxlJztcblxuZXhwb3J0IGNsYXNzIENvbmZpZ0RlZmF1bHRzIHtcbn1cblxuQ29uZmlnRGVmYXVsdHMuX2RlZmF1bHRzID0ge1xuICBsb2NhbGU6ICdlbi1VUycsXG4gIGxvY2FsZVJlc291cmNlczogJ3NlcnZpY2UvcmVzb3VyY2VzLydcbn07XG5cbkNvbmZpZ0RlZmF1bHRzLmRlZmF1bHRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgZGVmYXVsdHMgPSB7fTtcbiAgT2JqZWN0LmFzc2lnbihkZWZhdWx0cywgQ29uZmlnRGVmYXVsdHMuX2RlZmF1bHRzKTtcbiAgcmV0dXJuIGRlZmF1bHRzO1xufTtcblxuZXhwb3J0IGNsYXNzIENvbmZpZyB7XG4gIGNvbnN0cnVjdG9yKGlubmVyQ29uZmlnKSB7XG4gICAgdGhpcy5pbm5lckNvbmZpZyA9IGlubmVyQ29uZmlnO1xuICAgIHRoaXMudmFsdWVzID0gdGhpcy5pbm5lckNvbmZpZyA/IHt9IDogQ29uZmlnRGVmYXVsdHMuZGVmYXVsdHMoKTtcbiAgICB0aGlzLmNoYW5nZWRIYW5kbGVycyA9IG5ldyBNYXAoKTtcbiAgfVxuXG4gIGdldFZhbHVlKGlkZW50aWZpZXIpIHtcbiAgICBpZiAodGhpcy52YWx1ZXMuaGFzT3duUHJvcGVydHkoaWRlbnRpZmllcikgIT09IG51bGwgJiYgdGhpcy52YWx1ZXNbaWRlbnRpZmllcl0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWVzW2lkZW50aWZpZXJdO1xuICAgIH1cbiAgICBpZiAodGhpcy5pbm5lckNvbmZpZyAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJDb25maWcuZ2V0VmFsdWUoaWRlbnRpZmllcik7XG4gICAgfVxuICAgIHRocm93IEVycm9yKCdDb25maWcgbm90IGZvdW5kOiAnICsgaWRlbnRpZmllcik7XG4gIH1cblxuICBzZXRWYWx1ZShpZGVudGlmaWVyLCB2YWx1ZSkge1xuICAgIHRoaXMudmFsdWVzW2lkZW50aWZpZXJdID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7IC8vZmx1ZW50IEFQSVxuICB9XG5cbiAgb25Mb2NhbGVDaGFuZ2VkKGNhbGxiYWNrKSB7XG4gICAgaWYgKHRoaXMuaW5uZXJDb25maWcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJDb25maWcub25Mb2NhbGVDaGFuZ2VkKGNhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGlkID0gKytWYWxpZGF0aW9uQ29uZmlnLnVuaXF1ZUxpc3RlbmVySWQ7XG4gICAgICB0aGlzLmNoYW5nZWRIYW5kbGVycy5zZXQoaWQsIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHRoaXMuY2hhbmdlZEhhbmRsZXJzLmRlbGV0ZShpZCk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGdldERlcGVuZGVuY2llcygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRWYWx1ZSgnZGVwZW5kZW5jaWVzJyk7XG4gIH1cblxuICBzZXRIdHRwU2VydmljZShodHRwT3B0cykge1xuICAgIENvbmZpZy5odHRwT3B0cyA9IGh0dHBPcHRzO1xuICB9XG5cbiAgc2V0TG9nZ2VyU2VydmljZShsb2dnZXJPcHRzKSB7XG4gICAgQ29uZmlnLmxvZ2dlck9wdHMgPSBsb2dnZXJPcHRzO1xuICB9XG5cbiAgcm91dGVyQXV0aFN0ZXAob3B0cykge1xuICAgIENvbmZpZy5yb3V0ZXJBdXRoU3RlcE9wdHMgPSBvcHRzO1xuICB9XG5cbiAgdXNlTG9jYWxlKGxvY2FsZUlkZW50aWZpZXIpIHtcbiAgICB0aGlzLnNldFZhbHVlKCdsb2NhbGUnLCBsb2NhbGVJZGVudGlmaWVyKTtcbiAgICB2YXIgY2FsbGJhY2tzID0gQXJyYXkuZnJvbSh0aGlzLmNoYW5nZWRIYW5kbGVycy52YWx1ZXMoKSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNhbGxiYWNrc1tpXSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxvY2FsZSgpIHtcbiAgICByZXR1cm4gTG9jYWxlLlJlcG9zaXRvcnlcbiAgICAgIC5sb2FkKHRoaXMuZ2V0VmFsdWUoJ2xvY2FsZScpLCB0aGlzLmdldFZhbHVlKCdsb2NhbGVSZXNvdXJjZXMnKSk7XG4gIH1cbn1cblxuQ29uZmlnLnVuaXF1ZUxpc3RlbmVySWQgPSAwO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9