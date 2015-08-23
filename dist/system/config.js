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
//# sourceMappingURL=data:application/json;base64,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LENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3pDLHVCQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzthQUNoQjtBQUNELG1CQUFPLElBQUksQ0FBQztXQUNiOzs7aUJBRUssa0JBQUc7QUFDUCxtQkFBTyxNQUFNLENBQUMsVUFBVSxDQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztXQUNwRTs7O2VBMURVLE1BQU07Ozs7O0FBNkRuQixZQUFNLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImNvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtb3NoZW5za3kgb24gNi8xNy8xNS5cbiAqL1xuaW1wb3J0IHtMb2NhbGV9IGZyb20gJy4vbG9jYWxlJztcblxuZXhwb3J0IGNsYXNzIENvbmZpZ0RlZmF1bHRzIHtcbn1cblxuQ29uZmlnRGVmYXVsdHMuX2RlZmF1bHRzID0ge1xuICBsb2NhbGU6ICdlbi1VUycsXG4gIGxvY2FsZVJlc291cmNlczogJ3NlcnZpY2UvcmVzb3VyY2VzLydcbn07XG5cbkNvbmZpZ0RlZmF1bHRzLmRlZmF1bHRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgZGVmYXVsdHMgPSB7fTtcbiAgT2JqZWN0LmFzc2lnbihkZWZhdWx0cywgQ29uZmlnRGVmYXVsdHMuX2RlZmF1bHRzKTtcbiAgcmV0dXJuIGRlZmF1bHRzO1xufTtcblxuZXhwb3J0IGNsYXNzIENvbmZpZyB7XG4gIGNvbnN0cnVjdG9yKGlubmVyQ29uZmlnKSB7XG4gICAgdGhpcy5pbm5lckNvbmZpZyA9IGlubmVyQ29uZmlnO1xuICAgIHRoaXMudmFsdWVzID0gdGhpcy5pbm5lckNvbmZpZyA/IHt9IDogQ29uZmlnRGVmYXVsdHMuZGVmYXVsdHMoKTtcbiAgICB0aGlzLmNoYW5nZWRIYW5kbGVycyA9IG5ldyBNYXAoKTtcbiAgfVxuXG4gIGdldFZhbHVlKGlkZW50aWZpZXIpIHtcbiAgICBpZiAodGhpcy52YWx1ZXMuaGFzT3duUHJvcGVydHkoaWRlbnRpZmllcikgIT09IG51bGwgJiYgdGhpcy52YWx1ZXNbaWRlbnRpZmllcl0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWVzW2lkZW50aWZpZXJdO1xuICAgIH1cbiAgICBpZiAodGhpcy5pbm5lckNvbmZpZyAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJDb25maWcuZ2V0VmFsdWUoaWRlbnRpZmllcik7XG4gICAgfVxuICAgIHRocm93IEVycm9yKCdDb25maWcgbm90IGZvdW5kOiAnICsgaWRlbnRpZmllcik7XG4gIH1cblxuICBzZXRWYWx1ZShpZGVudGlmaWVyLCB2YWx1ZSkge1xuICAgIHRoaXMudmFsdWVzW2lkZW50aWZpZXJdID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7IC8vZmx1ZW50IEFQSVxuICB9XG5cbiAgb25Mb2NhbGVDaGFuZ2VkKGNhbGxiYWNrKSB7XG4gICAgaWYgKHRoaXMuaW5uZXJDb25maWcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJDb25maWcub25Mb2NhbGVDaGFuZ2VkKGNhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGlkID0gKytWYWxpZGF0aW9uQ29uZmlnLnVuaXF1ZUxpc3RlbmVySWQ7XG4gICAgICB0aGlzLmNoYW5nZWRIYW5kbGVycy5zZXQoaWQsIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHRoaXMuY2hhbmdlZEhhbmRsZXJzLmRlbGV0ZShpZCk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGdldERlcGVuZGVuY2llcygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRWYWx1ZSgnZGVwZW5kZW5jaWVzJyk7XG4gIH1cblxuICBzZXRIdHRwU2VydmljZShodHRwT3B0cykge1xuICAgIENvbmZpZy5odHRwT3B0cyA9IGh0dHBPcHRzO1xuICB9XG5cbiAgcm91dGVyQXV0aFN0ZXAob3B0cykge1xuICAgIENvbmZpZy5yb3V0ZXJBdXRoU3RlcE9wdHMgPSBvcHRzO1xuICB9XG5cbiAgdXNlTG9jYWxlKGxvY2FsZUlkZW50aWZpZXIpIHtcbiAgICB0aGlzLnNldFZhbHVlKCdsb2NhbGUnLCBsb2NhbGVJZGVudGlmaWVyKTtcbiAgICB2YXIgY2FsbGJhY2tzID0gQXJyYXkuZnJvbSh0aGlzLmNoYW5nZWRIYW5kbGVycy52YWx1ZXMoKSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNhbGxiYWNrc1tpXSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxvY2FsZSgpIHtcbiAgICByZXR1cm4gTG9jYWxlLlJlcG9zaXRvcnlcbiAgICAgIC5sb2FkKHRoaXMuZ2V0VmFsdWUoJ2xvY2FsZScpLCB0aGlzLmdldFZhbHVlKCdsb2NhbGVSZXNvdXJjZXMnKSk7XG4gIH1cbn1cblxuQ29uZmlnLnVuaXF1ZUxpc3RlbmVySWQgPSAwO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9