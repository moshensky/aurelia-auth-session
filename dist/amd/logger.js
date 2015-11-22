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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2dlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFNQSxNQUFNLFFBQVEsR0FBRztBQUNmLFVBQU0sRUFBRSxLQUFLO0FBQ2IsU0FBSyxFQUFFLEVBQUU7QUFDVCxXQUFPLEVBQUUscUJBQXFCO0FBQzlCLFFBQUksRUFBRSxFQUFFO0FBQ1IsYUFBUyxFQUFFLElBQUk7QUFDZixRQUFJLEVBQUUsTUFBTTtHQUNiLENBQUM7O0FBRUYsV0FBUyxHQUFHLENBQUMsT0FBTyxFQUFFO0FBQ3BCLFFBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFHaEQsUUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQ2xCLHlCQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM3QztHQUNGOztBQUVELFdBQVMsUUFBUSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUU7QUFDdEMsUUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxZQUFZLE1BQU0sRUFBRTtBQUM1RCxhQUFPO0FBQ0wsZUFBTyxFQUFFLE9BQU87QUFDaEIsWUFBSSxFQUFFLFdBQVc7T0FDbEIsQ0FBQztLQUNIOztBQUVELFdBQU8sQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO0FBQzNCLFdBQU8sT0FBTyxDQUFDO0dBQ2hCOztNQUVZLE1BQU07QUFDTixhQURBLE1BQU0sR0FDSDs0QkFESCxNQUFNOztBQUVmLFVBQUksT0FBTyxHQUFHO0FBQ1osbUJBQVcsRUFBRSxJQUFJO0FBQ2pCLHFCQUFhLEVBQUUsb0JBQW9CO0FBQ25DLGVBQU8sRUFBRSxJQUFJO09BQ2QsQ0FBQzs7QUFFRixVQUFJLGFBQWEsR0FBRyxRQXhDaEIsTUFBTSxDQXdDaUIsVUFBVSxJQUFJLEVBQUUsQ0FBQztBQUM1QyxVQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLG1CQUFPLE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDcEUseUJBQU8sT0FBTyxHQUFHLE9BQU8sQ0FBQztLQUMxQjs7aUJBWFUsTUFBTTs7YUFhYixjQUFDLE9BQU8sRUFBRTtBQUNaLFdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7T0FDbkM7OzthQUVHLGNBQUMsT0FBTyxFQUFFO0FBQ1osV0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztPQUNoQzs7O2FBRUksZUFBQyxPQUFPLEVBQUU7QUFDYixXQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO09BQ2pDOzs7YUFFTSxpQkFBQyxPQUFPLEVBQUU7QUFDZixXQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO09BQ25DOzs7V0EzQlUsTUFBTSIsImZpbGUiOiJsb2dnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbW9zaGVuc2t5IG9uIDYvMTYvMTUuXG4gKi9cbmltcG9ydCB0b2FzdHIgZnJvbSAnQ29kZVNldmVuL3RvYXN0cic7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi9jb25maWcnO1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgc291cmNlOiAnYXBwJyxcbiAgdGl0bGU6ICcnLFxuICBtZXNzYWdlOiAnbm8gbWVzc2FnZSBwcm92aWRlZCcsXG4gIGRhdGE6ICcnLFxuICBzaG93VG9hc3Q6IHRydWUsXG4gIHR5cGU6ICdpbmZvJ1xufTtcblxuZnVuY3Rpb24gbG9nKG9wdGlvbnMpIHtcbiAgdmFyIG9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG4gIC8vc3lzdGVtLmxvZyhvcG5zLnNvdXJjZSArICcsICcgKyBvcG5zLnR5cGUgKyAnLCAnICsgb3Bucy5tZXNzYWdlICsgJywgJyArIG9wbnMuZGF0YSArICcgJyk7XG5cbiAgaWYgKG9wdHMuc2hvd1RvYXN0KSB7XG4gICAgdG9hc3RyW29wdHMudHlwZV0ob3B0cy5tZXNzYWdlLCBvcHRzLnRpdGxlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzYW5pdGl6ZShvcHRpb25zLCBtZXNzYWdlVHlwZSkge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnIHx8IG9wdGlvbnMgaW5zdGFuY2VvZiBTdHJpbmcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVzc2FnZTogb3B0aW9ucyxcbiAgICAgIHR5cGU6IG1lc3NhZ2VUeXBlXG4gICAgfTtcbiAgfVxuXG4gIG9wdGlvbnMudHlwZSA9IG1lc3NhZ2VUeXBlO1xuICByZXR1cm4gb3B0aW9ucztcbn1cblxuZXhwb3J0IGNsYXNzIExvZ2dlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGxldCBkZWZPcHRzID0ge1xuICAgICAgY2xvc2VCdXR0b246IHRydWUsXG4gICAgICBwb3NpdGlvbkNsYXNzOiAndG9hc3QtYm90dG9tLXJpZ2h0JyxcbiAgICAgIGZhZGVPdXQ6IDEwMDBcbiAgICB9O1xuXG4gICAgbGV0IGNvbmZpZ09wdGlvbnMgPSBDb25maWcubG9nZ2VyT3B0cyB8fCB7fTtcbiAgICBsZXQgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24odG9hc3RyLm9wdGlvbnMsIGRlZk9wdHMsIGNvbmZpZ09wdGlvbnMpO1xuICAgIHRvYXN0ci5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIHdhcm4ob3B0aW9ucykge1xuICAgIGxvZyhzYW5pdGl6ZShvcHRpb25zLCAnd2FybmluZycpKTtcbiAgfVxuXG4gIGluZm8ob3B0aW9ucykge1xuICAgIGxvZyhzYW5pdGl6ZShvcHRpb25zLCAnaW5mbycpKTtcbiAgfVxuXG4gIGVycm9yKG9wdGlvbnMpIHtcbiAgICBsb2coc2FuaXRpemUob3B0aW9ucywgJ2Vycm9yJykpO1xuICB9XG5cbiAgc3VjY2VzcyhvcHRpb25zKSB7XG4gICAgbG9nKHNhbml0aXplKG9wdGlvbnMsICdzdWNjZXNzJykpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=