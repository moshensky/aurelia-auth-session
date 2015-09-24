System.register(['CodeSeven/toastr/build/toastr.min.css!text', 'CodeSeven/toastr'], function (_export) {
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
    setters: [function (_CodeSevenToastrBuildToastrMinCssText) {}, function (_CodeSevenToastr) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2dlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Y0FNTSxRQUFRLEVBOEJELE1BQU07Ozs7OztBQXJCbkIsV0FBUyxHQUFHLENBQUMsT0FBTyxFQUFFO0FBQ3BCLFFBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFHaEQsUUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQ2xCLFlBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDN0M7R0FDRjs7QUFFRCxXQUFTLFFBQVEsQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFO0FBQ3RDLFFBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxJQUFJLE9BQU8sWUFBWSxNQUFNLEVBQUU7QUFDNUQsYUFBTztBQUNMLGVBQU8sRUFBRSxPQUFPO0FBQ2hCLFlBQUksRUFBRSxXQUFXO09BQ2xCLENBQUM7S0FDSDs7QUFFRCxXQUFPLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztBQUMzQixXQUFPLE9BQU8sQ0FBQztHQUNoQjs7Ozs7OztBQTVCSyxjQUFRLEdBQUc7QUFDZixjQUFNLEVBQUUsS0FBSztBQUNiLGFBQUssRUFBRSxFQUFFO0FBQ1QsZUFBTyxFQUFFLHFCQUFxQjtBQUM5QixZQUFJLEVBQUUsRUFBRTtBQUNSLGlCQUFTLEVBQUUsSUFBSTtBQUNmLFlBQUksRUFBRSxNQUFNO09BQ2I7O0FBdUJZLFlBQU07QUFDTixpQkFEQSxNQUFNLEdBQ0g7Z0NBREgsTUFBTTs7QUFFZixnQkFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQ2xDLGdCQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsR0FBRyxvQkFBb0IsQ0FBQztBQUNwRCxnQkFBTSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsR0FBRyxvQkFBb0IsQ0FBQztBQUM5RCxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQy9COztxQkFOVSxNQUFNOztpQkFRYixjQUFDLE9BQU8sRUFBRTtBQUNaLGVBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7V0FDbkM7OztpQkFFRyxjQUFDLE9BQU8sRUFBRTtBQUNaLGVBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7V0FDaEM7OztpQkFFSSxlQUFDLE9BQU8sRUFBRTtBQUNiLGVBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7V0FDakM7OztpQkFFTSxpQkFBQyxPQUFPLEVBQUU7QUFDZixlQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1dBQ25DOzs7ZUF0QlUsTUFBTSIsImZpbGUiOiJsb2dnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbW9zaGVuc2t5IG9uIDYvMTYvMTUuXG4gKi9cbmltcG9ydCAnQ29kZVNldmVuL3RvYXN0ci9idWlsZC90b2FzdHIubWluLmNzcyF0ZXh0JztcbmltcG9ydCB0b2FzdHIgZnJvbSAnQ29kZVNldmVuL3RvYXN0cic7XG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICBzb3VyY2U6ICdhcHAnLFxuICB0aXRsZTogJycsXG4gIG1lc3NhZ2U6ICdubyBtZXNzYWdlIHByb3ZpZGVkJyxcbiAgZGF0YTogJycsXG4gIHNob3dUb2FzdDogdHJ1ZSxcbiAgdHlwZTogJ2luZm8nXG59O1xuXG5mdW5jdGlvbiBsb2cob3B0aW9ucykge1xuICB2YXIgb3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcbiAgLy9zeXN0ZW0ubG9nKG9wbnMuc291cmNlICsgJywgJyArIG9wbnMudHlwZSArICcsICcgKyBvcG5zLm1lc3NhZ2UgKyAnLCAnICsgb3Bucy5kYXRhICsgJyAnKTtcblxuICBpZiAob3B0cy5zaG93VG9hc3QpIHtcbiAgICB0b2FzdHJbb3B0cy50eXBlXShvcHRzLm1lc3NhZ2UsIG9wdHMudGl0bGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNhbml0aXplKG9wdGlvbnMsIG1lc3NhZ2VUeXBlKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycgfHwgb3B0aW9ucyBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgIHJldHVybiB7XG4gICAgICBtZXNzYWdlOiBvcHRpb25zLFxuICAgICAgdHlwZTogbWVzc2FnZVR5cGVcbiAgICB9O1xuICB9XG5cbiAgb3B0aW9ucy50eXBlID0gbWVzc2FnZVR5cGU7XG4gIHJldHVybiBvcHRpb25zO1xufVxuXG5leHBvcnQgY2xhc3MgTG9nZ2VyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdG9hc3RyLm9wdGlvbnMuY2xvc2VCdXR0b24gPSB0cnVlO1xuICAgIHRvYXN0ci5vcHRpb25zLnBvc2l0aW9uQ2xhc3MgPSAndG9hc3QtYm90dG9tLXJpZ2h0JztcbiAgICB0b2FzdHIub3B0aW9ucy5iYWNrZ3JvdW5kcG9zaXRpb25DbGFzcyA9ICd0b2FzdC1ib3R0b20tcmlnaHQnO1xuICAgIHRvYXN0ci5vcHRpb25zLmZhZGVPdXQgPSAxMDAwO1xuICB9XG5cbiAgd2FybihvcHRpb25zKSB7XG4gICAgbG9nKHNhbml0aXplKG9wdGlvbnMsICd3YXJuaW5nJykpO1xuICB9XG5cbiAgaW5mbyhvcHRpb25zKSB7XG4gICAgbG9nKHNhbml0aXplKG9wdGlvbnMsICdpbmZvJykpO1xuICB9XG5cbiAgZXJyb3Iob3B0aW9ucykge1xuICAgIGxvZyhzYW5pdGl6ZShvcHRpb25zLCAnZXJyb3InKSk7XG4gIH1cblxuICBzdWNjZXNzKG9wdGlvbnMpIHtcbiAgICBsb2coc2FuaXRpemUob3B0aW9ucywgJ3N1Y2Nlc3MnKSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==