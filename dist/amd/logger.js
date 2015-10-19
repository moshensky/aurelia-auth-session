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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2dlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFNQSxNQUFNLFFBQVEsR0FBRztBQUNmLFVBQU0sRUFBRSxLQUFLO0FBQ2IsU0FBSyxFQUFFLEVBQUU7QUFDVCxXQUFPLEVBQUUscUJBQXFCO0FBQzlCLFFBQUksRUFBRSxFQUFFO0FBQ1IsYUFBUyxFQUFFLElBQUk7QUFDZixRQUFJLEVBQUUsTUFBTTtHQUNiLENBQUM7O0FBRUYsV0FBUyxHQUFHLENBQUMsT0FBTyxFQUFFO0FBQ3BCLFFBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFHaEQsUUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQ2xCLHlCQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM3QztHQUNGOztBQUVELFdBQVMsUUFBUSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUU7QUFDdEMsUUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxZQUFZLE1BQU0sRUFBRTtBQUM1RCxhQUFPO0FBQ0wsZUFBTyxFQUFFLE9BQU87QUFDaEIsWUFBSSxFQUFFLFdBQVc7T0FDbEIsQ0FBQztLQUNIOztBQUVELFdBQU8sQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO0FBQzNCLFdBQU8sT0FBTyxDQUFDO0dBQ2hCOztNQUVZLE1BQU07QUFDTixhQURBLE1BQU0sR0FDSDs0QkFESCxNQUFNOztBQUVmLFVBQUksT0FBTyxHQUFHO0FBQ1osbUJBQVcsRUFBRSxJQUFJO0FBQ2pCLHFCQUFhLEVBQUUsb0JBQW9CO0FBQ25DLGVBQU8sRUFBRSxJQUFJO09BQ2QsQ0FBQzs7QUFFRixVQUFJLGFBQWEsR0FBRyxRQXhDaEIsTUFBTSxDQXdDaUIsVUFBVSxJQUFJLEVBQUUsQ0FBQztBQUM1QyxVQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLG1CQUFPLE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDcEUseUJBQU8sT0FBTyxHQUFHLE9BQU8sQ0FBQztLQUMxQjs7aUJBWFUsTUFBTTs7YUFhYixjQUFDLE9BQU8sRUFBRTtBQUNaLFdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7T0FDbkM7OzthQUVHLGNBQUMsT0FBTyxFQUFFO0FBQ1osV0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztPQUNoQzs7O2FBRUksZUFBQyxPQUFPLEVBQUU7QUFDYixXQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO09BQ2pDOzs7YUFFTSxpQkFBQyxPQUFPLEVBQUU7QUFDZixXQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO09BQ25DOzs7V0EzQlUsTUFBTTs7O1VBQU4sTUFBTSxHQUFOLE1BQU0iLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1vc2hlbnNreSBvbiA2LzE2LzE1LlxuICovXG5pbXBvcnQgdG9hc3RyIGZyb20gJ0NvZGVTZXZlbi90b2FzdHInO1xuaW1wb3J0IHtDb25maWd9IGZyb20gJy4vY29uZmlnJztcblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIHNvdXJjZTogJ2FwcCcsXG4gIHRpdGxlOiAnJyxcbiAgbWVzc2FnZTogJ25vIG1lc3NhZ2UgcHJvdmlkZWQnLFxuICBkYXRhOiAnJyxcbiAgc2hvd1RvYXN0OiB0cnVlLFxuICB0eXBlOiAnaW5mbydcbn07XG5cbmZ1bmN0aW9uIGxvZyhvcHRpb25zKSB7XG4gIHZhciBvcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAvL3N5c3RlbS5sb2cob3Bucy5zb3VyY2UgKyAnLCAnICsgb3Bucy50eXBlICsgJywgJyArIG9wbnMubWVzc2FnZSArICcsICcgKyBvcG5zLmRhdGEgKyAnICcpO1xuXG4gIGlmIChvcHRzLnNob3dUb2FzdCkge1xuICAgIHRvYXN0cltvcHRzLnR5cGVdKG9wdHMubWVzc2FnZSwgb3B0cy50aXRsZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2FuaXRpemUob3B0aW9ucywgbWVzc2FnZVR5cGUpIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJyB8fCBvcHRpb25zIGluc3RhbmNlb2YgU3RyaW5nKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2U6IG9wdGlvbnMsXG4gICAgICB0eXBlOiBtZXNzYWdlVHlwZVxuICAgIH07XG4gIH1cblxuICBvcHRpb25zLnR5cGUgPSBtZXNzYWdlVHlwZTtcbiAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbmV4cG9ydCBjbGFzcyBMb2dnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBsZXQgZGVmT3B0cyA9IHtcbiAgICAgIGNsb3NlQnV0dG9uOiB0cnVlLFxuICAgICAgcG9zaXRpb25DbGFzczogJ3RvYXN0LWJvdHRvbS1yaWdodCcsXG4gICAgICBmYWRlT3V0OiAxMDAwXG4gICAgfTtcblxuICAgIGxldCBjb25maWdPcHRpb25zID0gQ29uZmlnLmxvZ2dlck9wdHMgfHwge307XG4gICAgbGV0IG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHRvYXN0ci5vcHRpb25zLCBkZWZPcHRzLCBjb25maWdPcHRpb25zKTtcbiAgICB0b2FzdHIub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICB3YXJuKG9wdGlvbnMpIHtcbiAgICBsb2coc2FuaXRpemUob3B0aW9ucywgJ3dhcm5pbmcnKSk7XG4gIH1cblxuICBpbmZvKG9wdGlvbnMpIHtcbiAgICBsb2coc2FuaXRpemUob3B0aW9ucywgJ2luZm8nKSk7XG4gIH1cblxuICBlcnJvcihvcHRpb25zKSB7XG4gICAgbG9nKHNhbml0aXplKG9wdGlvbnMsICdlcnJvcicpKTtcbiAgfVxuXG4gIHN1Y2Nlc3Mob3B0aW9ucykge1xuICAgIGxvZyhzYW5pdGl6ZShvcHRpb25zLCAnc3VjY2VzcycpKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9