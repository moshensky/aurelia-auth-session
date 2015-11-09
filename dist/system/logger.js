System.register(['CodeSeven/toastr', './config'], function (_export) {
  'use strict';

  var toastr, Config, defaults, Logger;

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
    setters: [function (_CodeSevenToastr) {
      toastr = _CodeSevenToastr['default'];
    }, function (_config) {
      Config = _config.Config;
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

          var defOpts = {
            closeButton: true,
            positionClass: 'toast-bottom-right',
            fadeOut: 1000
          };

          var configOptions = Config.loggerOpts || {};
          var options = Object.assign(toastr.options, defOpts, configOptions);
          toastr.options = options;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2dlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7c0JBTU0sUUFBUSxFQThCRCxNQUFNOzs7Ozs7QUFyQm5CLFdBQVMsR0FBRyxDQUFDLE9BQU8sRUFBRTtBQUNwQixRQUFJLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7O0FBR2hELFFBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUNsQixZQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzdDO0dBQ0Y7O0FBRUQsV0FBUyxRQUFRLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRTtBQUN0QyxRQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsSUFBSSxPQUFPLFlBQVksTUFBTSxFQUFFO0FBQzVELGFBQU87QUFDTCxlQUFPLEVBQUUsT0FBTztBQUNoQixZQUFJLEVBQUUsV0FBVztPQUNsQixDQUFDO0tBQ0g7O0FBRUQsV0FBTyxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7QUFDM0IsV0FBTyxPQUFPLENBQUM7R0FDaEI7Ozs7Ozt1QkE5Qk8sTUFBTTs7O0FBRVIsY0FBUSxHQUFHO0FBQ2YsY0FBTSxFQUFFLEtBQUs7QUFDYixhQUFLLEVBQUUsRUFBRTtBQUNULGVBQU8sRUFBRSxxQkFBcUI7QUFDOUIsWUFBSSxFQUFFLEVBQUU7QUFDUixpQkFBUyxFQUFFLElBQUk7QUFDZixZQUFJLEVBQUUsTUFBTTtPQUNiOztBQXVCWSxZQUFNO0FBQ04saUJBREEsTUFBTSxHQUNIO2dDQURILE1BQU07O0FBRWYsY0FBSSxPQUFPLEdBQUc7QUFDWix1QkFBVyxFQUFFLElBQUk7QUFDakIseUJBQWEsRUFBRSxvQkFBb0I7QUFDbkMsbUJBQU8sRUFBRSxJQUFJO1dBQ2QsQ0FBQzs7QUFFRixjQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQztBQUM1QyxjQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQ3BFLGdCQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztTQUMxQjs7cUJBWFUsTUFBTTs7aUJBYWIsY0FBQyxPQUFPLEVBQUU7QUFDWixlQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1dBQ25DOzs7aUJBRUcsY0FBQyxPQUFPLEVBQUU7QUFDWixlQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1dBQ2hDOzs7aUJBRUksZUFBQyxPQUFPLEVBQUU7QUFDYixlQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1dBQ2pDOzs7aUJBRU0saUJBQUMsT0FBTyxFQUFFO0FBQ2YsZUFBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztXQUNuQzs7O2VBM0JVLE1BQU0iLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbW9zaGVuc2t5IG9uIDYvMTYvMTUuXHJcbiAqL1xyXG5pbXBvcnQgdG9hc3RyIGZyb20gJ0NvZGVTZXZlbi90b2FzdHInO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi9jb25maWcnO1xyXG5cclxuY29uc3QgZGVmYXVsdHMgPSB7XHJcbiAgc291cmNlOiAnYXBwJyxcclxuICB0aXRsZTogJycsXHJcbiAgbWVzc2FnZTogJ25vIG1lc3NhZ2UgcHJvdmlkZWQnLFxyXG4gIGRhdGE6ICcnLFxyXG4gIHNob3dUb2FzdDogdHJ1ZSxcclxuICB0eXBlOiAnaW5mbydcclxufTtcclxuXHJcbmZ1bmN0aW9uIGxvZyhvcHRpb25zKSB7XHJcbiAgdmFyIG9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XHJcbiAgLy9zeXN0ZW0ubG9nKG9wbnMuc291cmNlICsgJywgJyArIG9wbnMudHlwZSArICcsICcgKyBvcG5zLm1lc3NhZ2UgKyAnLCAnICsgb3Bucy5kYXRhICsgJyAnKTtcclxuXHJcbiAgaWYgKG9wdHMuc2hvd1RvYXN0KSB7XHJcbiAgICB0b2FzdHJbb3B0cy50eXBlXShvcHRzLm1lc3NhZ2UsIG9wdHMudGl0bGUpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2FuaXRpemUob3B0aW9ucywgbWVzc2FnZVR5cGUpIHtcclxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnIHx8IG9wdGlvbnMgaW5zdGFuY2VvZiBTdHJpbmcpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG1lc3NhZ2U6IG9wdGlvbnMsXHJcbiAgICAgIHR5cGU6IG1lc3NhZ2VUeXBlXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgb3B0aW9ucy50eXBlID0gbWVzc2FnZVR5cGU7XHJcbiAgcmV0dXJuIG9wdGlvbnM7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMb2dnZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgbGV0IGRlZk9wdHMgPSB7XHJcbiAgICAgIGNsb3NlQnV0dG9uOiB0cnVlLFxyXG4gICAgICBwb3NpdGlvbkNsYXNzOiAndG9hc3QtYm90dG9tLXJpZ2h0JyxcclxuICAgICAgZmFkZU91dDogMTAwMFxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgY29uZmlnT3B0aW9ucyA9IENvbmZpZy5sb2dnZXJPcHRzIHx8IHt9O1xyXG4gICAgbGV0IG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHRvYXN0ci5vcHRpb25zLCBkZWZPcHRzLCBjb25maWdPcHRpb25zKTtcclxuICAgIHRvYXN0ci5vcHRpb25zID0gb3B0aW9ucztcclxuICB9XHJcblxyXG4gIHdhcm4ob3B0aW9ucykge1xyXG4gICAgbG9nKHNhbml0aXplKG9wdGlvbnMsICd3YXJuaW5nJykpO1xyXG4gIH1cclxuXHJcbiAgaW5mbyhvcHRpb25zKSB7XHJcbiAgICBsb2coc2FuaXRpemUob3B0aW9ucywgJ2luZm8nKSk7XHJcbiAgfVxyXG5cclxuICBlcnJvcihvcHRpb25zKSB7XHJcbiAgICBsb2coc2FuaXRpemUob3B0aW9ucywgJ2Vycm9yJykpO1xyXG4gIH1cclxuXHJcbiAgc3VjY2VzcyhvcHRpb25zKSB7XHJcbiAgICBsb2coc2FuaXRpemUob3B0aW9ucywgJ3N1Y2Nlc3MnKSk7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
