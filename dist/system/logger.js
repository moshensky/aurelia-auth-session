System.register(['CodeSeven/toastr/build/toastr.min.css!', 'CodeSeven/toastr'], function (_export) {
  'use strict';

  var toastr, defaults, Logger;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function log(options) {
    var opts = Object.assign({}, defaults, options);

    if (opts.showToast) {
      toastr[opts.type](opts.message, opts.title);
    }
  }

  function sanitize(options, messageType) {
    if (typeof options === 'string' || options instanceof String) {
      return {
        message: options,
        type: messageType
      };
    }

    options.type = messageType;
    return options;
  }

  return {
    setters: [function (_CodeSevenToastrBuildToastrMinCss) {}, function (_CodeSevenToastr) {
      toastr = _CodeSevenToastr['default'];
    }],
    execute: function () {
      defaults = {
        source: 'app',
        title: '',
        message: 'no message provided',
        data: '',
        showToast: true,
        type: 'info'
      };

      Logger = (function () {
        function Logger() {
          _classCallCheck(this, Logger);

          toastr.options.closeButton = true;
          toastr.options.positionClass = 'toast-bottom-right';
          toastr.options.backgroundpositionClass = 'toast-bottom-right';
          toastr.options.fadeOut = 1000;
        }

        _createClass(Logger, [{
          key: 'warn',
          value: function warn(options) {
            log(sanitize(options, 'warning'));
          }
        }, {
          key: 'info',
          value: function info(options) {
            log(sanitize(options, 'info'));
          }
        }, {
          key: 'error',
          value: function error(options) {
            log(sanitize(options, 'error'));
          }
        }, {
          key: 'success',
          value: function success(options) {
            log(sanitize(options, 'success'));
          }
        }]);

        return Logger;
      })();

      _export('Logger', Logger);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2dlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Y0FNTSxRQUFRLEVBOEJELE1BQU07Ozs7OztBQXJCbkIsV0FBUyxHQUFHLENBQUMsT0FBTyxFQUFFO0FBQ3BCLFFBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFHaEQsUUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQ2xCLFlBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDN0M7R0FDRjs7QUFFRCxXQUFTLFFBQVEsQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFO0FBQ3RDLFFBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxJQUFJLE9BQU8sWUFBWSxNQUFNLEVBQUU7QUFDNUQsYUFBTztBQUNMLGVBQU8sRUFBRSxPQUFPO0FBQ2hCLFlBQUksRUFBRSxXQUFXO09BQ2xCLENBQUM7S0FDSDs7QUFFRCxXQUFPLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztBQUMzQixXQUFPLE9BQU8sQ0FBQztHQUNoQjs7Ozs7OztBQTVCSyxjQUFRLEdBQUc7QUFDZixjQUFNLEVBQUUsS0FBSztBQUNiLGFBQUssRUFBRSxFQUFFO0FBQ1QsZUFBTyxFQUFFLHFCQUFxQjtBQUM5QixZQUFJLEVBQUUsRUFBRTtBQUNSLGlCQUFTLEVBQUUsSUFBSTtBQUNmLFlBQUksRUFBRSxNQUFNO09BQ2I7O0FBdUJZLFlBQU07QUFDTixpQkFEQSxNQUFNLEdBQ0g7Z0NBREgsTUFBTTs7QUFFZixnQkFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQ2xDLGdCQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsR0FBRyxvQkFBb0IsQ0FBQztBQUNwRCxnQkFBTSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsR0FBRyxvQkFBb0IsQ0FBQztBQUM5RCxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQy9COztxQkFOVSxNQUFNOztpQkFRYixjQUFDLE9BQU8sRUFBRTtBQUNaLGVBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7V0FDbkM7OztpQkFFRyxjQUFDLE9BQU8sRUFBRTtBQUNaLGVBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7V0FDaEM7OztpQkFFSSxlQUFDLE9BQU8sRUFBRTtBQUNiLGVBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7V0FDakM7OztpQkFFTSxpQkFBQyxPQUFPLEVBQUU7QUFDZixlQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1dBQ25DOzs7ZUF0QlUsTUFBTSIsImZpbGUiOiJsb2dnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbW9zaGVuc2t5IG9uIDYvMTYvMTUuXG4gKi9cbmltcG9ydCAnQ29kZVNldmVuL3RvYXN0ci9idWlsZC90b2FzdHIubWluLmNzcyEnO1xuaW1wb3J0IHRvYXN0ciBmcm9tICdDb2RlU2V2ZW4vdG9hc3RyJztcblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIHNvdXJjZTogJ2FwcCcsXG4gIHRpdGxlOiAnJyxcbiAgbWVzc2FnZTogJ25vIG1lc3NhZ2UgcHJvdmlkZWQnLFxuICBkYXRhOiAnJyxcbiAgc2hvd1RvYXN0OiB0cnVlLFxuICB0eXBlOiAnaW5mbydcbn07XG5cbmZ1bmN0aW9uIGxvZyhvcHRpb25zKSB7XG4gIHZhciBvcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAvL3N5c3RlbS5sb2cob3Bucy5zb3VyY2UgKyAnLCAnICsgb3Bucy50eXBlICsgJywgJyArIG9wbnMubWVzc2FnZSArICcsICcgKyBvcG5zLmRhdGEgKyAnICcpO1xuXG4gIGlmIChvcHRzLnNob3dUb2FzdCkge1xuICAgIHRvYXN0cltvcHRzLnR5cGVdKG9wdHMubWVzc2FnZSwgb3B0cy50aXRsZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2FuaXRpemUob3B0aW9ucywgbWVzc2FnZVR5cGUpIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJyB8fCBvcHRpb25zIGluc3RhbmNlb2YgU3RyaW5nKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2U6IG9wdGlvbnMsXG4gICAgICB0eXBlOiBtZXNzYWdlVHlwZVxuICAgIH07XG4gIH1cblxuICBvcHRpb25zLnR5cGUgPSBtZXNzYWdlVHlwZTtcbiAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbmV4cG9ydCBjbGFzcyBMb2dnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0b2FzdHIub3B0aW9ucy5jbG9zZUJ1dHRvbiA9IHRydWU7XG4gICAgdG9hc3RyLm9wdGlvbnMucG9zaXRpb25DbGFzcyA9ICd0b2FzdC1ib3R0b20tcmlnaHQnO1xuICAgIHRvYXN0ci5vcHRpb25zLmJhY2tncm91bmRwb3NpdGlvbkNsYXNzID0gJ3RvYXN0LWJvdHRvbS1yaWdodCc7XG4gICAgdG9hc3RyLm9wdGlvbnMuZmFkZU91dCA9IDEwMDA7XG4gIH1cblxuICB3YXJuKG9wdGlvbnMpIHtcbiAgICBsb2coc2FuaXRpemUob3B0aW9ucywgJ3dhcm5pbmcnKSk7XG4gIH1cblxuICBpbmZvKG9wdGlvbnMpIHtcbiAgICBsb2coc2FuaXRpemUob3B0aW9ucywgJ2luZm8nKSk7XG4gIH1cblxuICBlcnJvcihvcHRpb25zKSB7XG4gICAgbG9nKHNhbml0aXplKG9wdGlvbnMsICdlcnJvcicpKTtcbiAgfVxuXG4gIHN1Y2Nlc3Mob3B0aW9ucykge1xuICAgIGxvZyhzYW5pdGl6ZShvcHRpb25zLCAnc3VjY2VzcycpKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9