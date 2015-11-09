define(['exports', 'CodeSeven/toastr', './config'], function (exports, _CodeSevenToastr, _config) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _toastr = _interopRequireDefault(_CodeSevenToastr);

  var defaults = {
    source: 'app',
    title: '',
    message: 'no message provided',
    data: '',
    showToast: true,
    type: 'info'
  };

  function log(options) {
    var opts = Object.assign({}, defaults, options);

    if (opts.showToast) {
      _toastr['default'][opts.type](opts.message, opts.title);
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

  var Logger = (function () {
    function Logger() {
      _classCallCheck(this, Logger);

      var defOpts = {
        closeButton: true,
        positionClass: 'toast-bottom-right',
        fadeOut: 1000
      };

      var configOptions = _config.Config.loggerOpts || {};
      var options = Object.assign(_toastr['default'].options, defOpts, configOptions);
      _toastr['default'].options = options;
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

  exports.Logger = Logger;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2dlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFNQSxNQUFNLFFBQVEsR0FBRztBQUNmLFVBQU0sRUFBRSxLQUFLO0FBQ2IsU0FBSyxFQUFFLEVBQUU7QUFDVCxXQUFPLEVBQUUscUJBQXFCO0FBQzlCLFFBQUksRUFBRSxFQUFFO0FBQ1IsYUFBUyxFQUFFLElBQUk7QUFDZixRQUFJLEVBQUUsTUFBTTtHQUNiLENBQUM7O0FBRUYsV0FBUyxHQUFHLENBQUMsT0FBTyxFQUFFO0FBQ3BCLFFBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFHaEQsUUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQ2xCLHlCQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM3QztHQUNGOztBQUVELFdBQVMsUUFBUSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUU7QUFDdEMsUUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxZQUFZLE1BQU0sRUFBRTtBQUM1RCxhQUFPO0FBQ0wsZUFBTyxFQUFFLE9BQU87QUFDaEIsWUFBSSxFQUFFLFdBQVc7T0FDbEIsQ0FBQztLQUNIOztBQUVELFdBQU8sQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO0FBQzNCLFdBQU8sT0FBTyxDQUFDO0dBQ2hCOztNQUVZLE1BQU07QUFDTixhQURBLE1BQU0sR0FDSDs0QkFESCxNQUFNOztBQUVmLFVBQUksT0FBTyxHQUFHO0FBQ1osbUJBQVcsRUFBRSxJQUFJO0FBQ2pCLHFCQUFhLEVBQUUsb0JBQW9CO0FBQ25DLGVBQU8sRUFBRSxJQUFJO09BQ2QsQ0FBQzs7QUFFRixVQUFJLGFBQWEsR0FBRyxRQXhDaEIsTUFBTSxDQXdDaUIsVUFBVSxJQUFJLEVBQUUsQ0FBQztBQUM1QyxVQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLG1CQUFPLE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDcEUseUJBQU8sT0FBTyxHQUFHLE9BQU8sQ0FBQztLQUMxQjs7aUJBWFUsTUFBTTs7YUFhYixjQUFDLE9BQU8sRUFBRTtBQUNaLFdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7T0FDbkM7OzthQUVHLGNBQUMsT0FBTyxFQUFFO0FBQ1osV0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztPQUNoQzs7O2FBRUksZUFBQyxPQUFPLEVBQUU7QUFDYixXQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO09BQ2pDOzs7YUFFTSxpQkFBQyxPQUFPLEVBQUU7QUFDZixXQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO09BQ25DOzs7V0EzQlUsTUFBTSIsImZpbGUiOiJsb2dnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBtb3NoZW5za3kgb24gNi8xNi8xNS5cclxuICovXHJcbmltcG9ydCB0b2FzdHIgZnJvbSAnQ29kZVNldmVuL3RvYXN0cic7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XHJcblxyXG5jb25zdCBkZWZhdWx0cyA9IHtcclxuICBzb3VyY2U6ICdhcHAnLFxyXG4gIHRpdGxlOiAnJyxcclxuICBtZXNzYWdlOiAnbm8gbWVzc2FnZSBwcm92aWRlZCcsXHJcbiAgZGF0YTogJycsXHJcbiAgc2hvd1RvYXN0OiB0cnVlLFxyXG4gIHR5cGU6ICdpbmZvJ1xyXG59O1xyXG5cclxuZnVuY3Rpb24gbG9nKG9wdGlvbnMpIHtcclxuICB2YXIgb3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcclxuICAvL3N5c3RlbS5sb2cob3Bucy5zb3VyY2UgKyAnLCAnICsgb3Bucy50eXBlICsgJywgJyArIG9wbnMubWVzc2FnZSArICcsICcgKyBvcG5zLmRhdGEgKyAnICcpO1xyXG5cclxuICBpZiAob3B0cy5zaG93VG9hc3QpIHtcclxuICAgIHRvYXN0cltvcHRzLnR5cGVdKG9wdHMubWVzc2FnZSwgb3B0cy50aXRsZSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzYW5pdGl6ZShvcHRpb25zLCBtZXNzYWdlVHlwZSkge1xyXG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycgfHwgb3B0aW9ucyBpbnN0YW5jZW9mIFN0cmluZykge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbWVzc2FnZTogb3B0aW9ucyxcclxuICAgICAgdHlwZTogbWVzc2FnZVR5cGVcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBvcHRpb25zLnR5cGUgPSBtZXNzYWdlVHlwZTtcclxuICByZXR1cm4gb3B0aW9ucztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExvZ2dlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBsZXQgZGVmT3B0cyA9IHtcclxuICAgICAgY2xvc2VCdXR0b246IHRydWUsXHJcbiAgICAgIHBvc2l0aW9uQ2xhc3M6ICd0b2FzdC1ib3R0b20tcmlnaHQnLFxyXG4gICAgICBmYWRlT3V0OiAxMDAwXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBjb25maWdPcHRpb25zID0gQ29uZmlnLmxvZ2dlck9wdHMgfHwge307XHJcbiAgICBsZXQgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24odG9hc3RyLm9wdGlvbnMsIGRlZk9wdHMsIGNvbmZpZ09wdGlvbnMpO1xyXG4gICAgdG9hc3RyLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgd2FybihvcHRpb25zKSB7XHJcbiAgICBsb2coc2FuaXRpemUob3B0aW9ucywgJ3dhcm5pbmcnKSk7XHJcbiAgfVxyXG5cclxuICBpbmZvKG9wdGlvbnMpIHtcclxuICAgIGxvZyhzYW5pdGl6ZShvcHRpb25zLCAnaW5mbycpKTtcclxuICB9XHJcblxyXG4gIGVycm9yKG9wdGlvbnMpIHtcclxuICAgIGxvZyhzYW5pdGl6ZShvcHRpb25zLCAnZXJyb3InKSk7XHJcbiAgfVxyXG5cclxuICBzdWNjZXNzKG9wdGlvbnMpIHtcclxuICAgIGxvZyhzYW5pdGl6ZShvcHRpb25zLCAnc3VjY2VzcycpKTtcclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
