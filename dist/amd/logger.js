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

      _toastr['default'].options.closeButton = true;
      _toastr['default'].options.positionClass = 'toast-bottom-right';
      _toastr['default'].options.backgroundpositionClass = 'toast-bottom-right';
      _toastr['default'].options.fadeOut = 1000;

      _toastr['default'].options = Object.assign({}, _config.Config.loggerOpts || {}, _toastr['default'].options);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2dlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFNQSxNQUFNLFFBQVEsR0FBRztBQUNmLFVBQU0sRUFBRSxLQUFLO0FBQ2IsU0FBSyxFQUFFLEVBQUU7QUFDVCxXQUFPLEVBQUUscUJBQXFCO0FBQzlCLFFBQUksRUFBRSxFQUFFO0FBQ1IsYUFBUyxFQUFFLElBQUk7QUFDZixRQUFJLEVBQUUsTUFBTTtHQUNiLENBQUM7O0FBRUYsV0FBUyxHQUFHLENBQUMsT0FBTyxFQUFFO0FBQ3BCLFFBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFHaEQsUUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQ2xCLHlCQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM3QztHQUNGOztBQUVELFdBQVMsUUFBUSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUU7QUFDdEMsUUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxZQUFZLE1BQU0sRUFBRTtBQUM1RCxhQUFPO0FBQ0wsZUFBTyxFQUFFLE9BQU87QUFDaEIsWUFBSSxFQUFFLFdBQVc7T0FDbEIsQ0FBQztLQUNIOztBQUVELFdBQU8sQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO0FBQzNCLFdBQU8sT0FBTyxDQUFDO0dBQ2hCOztNQUVZLE1BQU07QUFDTixhQURBLE1BQU0sR0FDSDs0QkFESCxNQUFNOztBQUVmLHlCQUFPLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQ2xDLHlCQUFPLE9BQU8sQ0FBQyxhQUFhLEdBQUcsb0JBQW9CLENBQUM7QUFDcEQseUJBQU8sT0FBTyxDQUFDLHVCQUF1QixHQUFHLG9CQUFvQixDQUFDO0FBQzlELHlCQUFPLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDOztBQUU5Qix5QkFBTyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsUUF2Qy9CLE1BQU0sQ0F1Q2dDLFVBQVUsSUFBSSxFQUFFLEVBQUUsbUJBQU8sT0FBTyxDQUFDLENBQUM7S0FDN0U7O2lCQVJVLE1BQU07O2FBVWIsY0FBQyxPQUFPLEVBQUU7QUFDWixXQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO09BQ25DOzs7YUFFRyxjQUFDLE9BQU8sRUFBRTtBQUNaLFdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7T0FDaEM7OzthQUVJLGVBQUMsT0FBTyxFQUFFO0FBQ2IsV0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztPQUNqQzs7O2FBRU0saUJBQUMsT0FBTyxFQUFFO0FBQ2YsV0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztPQUNuQzs7O1dBeEJVLE1BQU07OztVQUFOLE1BQU0sR0FBTixNQUFNIiwiZmlsZSI6ImxvZ2dlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtb3NoZW5za3kgb24gNi8xNi8xNS5cbiAqL1xuaW1wb3J0IHRvYXN0ciBmcm9tICdDb2RlU2V2ZW4vdG9hc3RyJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICBzb3VyY2U6ICdhcHAnLFxuICB0aXRsZTogJycsXG4gIG1lc3NhZ2U6ICdubyBtZXNzYWdlIHByb3ZpZGVkJyxcbiAgZGF0YTogJycsXG4gIHNob3dUb2FzdDogdHJ1ZSxcbiAgdHlwZTogJ2luZm8nXG59O1xuXG5mdW5jdGlvbiBsb2cob3B0aW9ucykge1xuICB2YXIgb3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcbiAgLy9zeXN0ZW0ubG9nKG9wbnMuc291cmNlICsgJywgJyArIG9wbnMudHlwZSArICcsICcgKyBvcG5zLm1lc3NhZ2UgKyAnLCAnICsgb3Bucy5kYXRhICsgJyAnKTtcblxuICBpZiAob3B0cy5zaG93VG9hc3QpIHtcbiAgICB0b2FzdHJbb3B0cy50eXBlXShvcHRzLm1lc3NhZ2UsIG9wdHMudGl0bGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNhbml0aXplKG9wdGlvbnMsIG1lc3NhZ2VUeXBlKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycgfHwgb3B0aW9ucyBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgIHJldHVybiB7XG4gICAgICBtZXNzYWdlOiBvcHRpb25zLFxuICAgICAgdHlwZTogbWVzc2FnZVR5cGVcbiAgICB9O1xuICB9XG5cbiAgb3B0aW9ucy50eXBlID0gbWVzc2FnZVR5cGU7XG4gIHJldHVybiBvcHRpb25zO1xufVxuXG5leHBvcnQgY2xhc3MgTG9nZ2VyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdG9hc3RyLm9wdGlvbnMuY2xvc2VCdXR0b24gPSB0cnVlO1xuICAgIHRvYXN0ci5vcHRpb25zLnBvc2l0aW9uQ2xhc3MgPSAndG9hc3QtYm90dG9tLXJpZ2h0JztcbiAgICB0b2FzdHIub3B0aW9ucy5iYWNrZ3JvdW5kcG9zaXRpb25DbGFzcyA9ICd0b2FzdC1ib3R0b20tcmlnaHQnO1xuICAgIHRvYXN0ci5vcHRpb25zLmZhZGVPdXQgPSAxMDAwO1xuXG4gICAgdG9hc3RyLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBDb25maWcubG9nZ2VyT3B0cyB8fCB7fSwgdG9hc3RyLm9wdGlvbnMpO1xuICB9XG5cbiAgd2FybihvcHRpb25zKSB7XG4gICAgbG9nKHNhbml0aXplKG9wdGlvbnMsICd3YXJuaW5nJykpO1xuICB9XG5cbiAgaW5mbyhvcHRpb25zKSB7XG4gICAgbG9nKHNhbml0aXplKG9wdGlvbnMsICdpbmZvJykpO1xuICB9XG5cbiAgZXJyb3Iob3B0aW9ucykge1xuICAgIGxvZyhzYW5pdGl6ZShvcHRpb25zLCAnZXJyb3InKSk7XG4gIH1cblxuICBzdWNjZXNzKG9wdGlvbnMpIHtcbiAgICBsb2coc2FuaXRpemUob3B0aW9ucywgJ3N1Y2Nlc3MnKSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==