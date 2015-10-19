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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2dlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7c0JBTU0sUUFBUSxFQThCRCxNQUFNOzs7Ozs7QUFyQm5CLFdBQVMsR0FBRyxDQUFDLE9BQU8sRUFBRTtBQUNwQixRQUFJLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7O0FBR2hELFFBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUNsQixZQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzdDO0dBQ0Y7O0FBRUQsV0FBUyxRQUFRLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRTtBQUN0QyxRQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsSUFBSSxPQUFPLFlBQVksTUFBTSxFQUFFO0FBQzVELGFBQU87QUFDTCxlQUFPLEVBQUUsT0FBTztBQUNoQixZQUFJLEVBQUUsV0FBVztPQUNsQixDQUFDO0tBQ0g7O0FBRUQsV0FBTyxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7QUFDM0IsV0FBTyxPQUFPLENBQUM7R0FDaEI7Ozs7Ozt1QkE5Qk8sTUFBTTs7O0FBRVIsY0FBUSxHQUFHO0FBQ2YsY0FBTSxFQUFFLEtBQUs7QUFDYixhQUFLLEVBQUUsRUFBRTtBQUNULGVBQU8sRUFBRSxxQkFBcUI7QUFDOUIsWUFBSSxFQUFFLEVBQUU7QUFDUixpQkFBUyxFQUFFLElBQUk7QUFDZixZQUFJLEVBQUUsTUFBTTtPQUNiOztBQXVCWSxZQUFNO0FBQ04saUJBREEsTUFBTSxHQUNIO2dDQURILE1BQU07O0FBRWYsY0FBSSxPQUFPLEdBQUc7QUFDWix1QkFBVyxFQUFFLElBQUk7QUFDakIseUJBQWEsRUFBRSxvQkFBb0I7QUFDbkMsbUJBQU8sRUFBRSxJQUFJO1dBQ2QsQ0FBQzs7QUFFRixjQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQztBQUM1QyxjQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQ3BFLGdCQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztTQUMxQjs7cUJBWFUsTUFBTTs7aUJBYWIsY0FBQyxPQUFPLEVBQUU7QUFDWixlQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1dBQ25DOzs7aUJBRUcsY0FBQyxPQUFPLEVBQUU7QUFDWixlQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1dBQ2hDOzs7aUJBRUksZUFBQyxPQUFPLEVBQUU7QUFDYixlQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1dBQ2pDOzs7aUJBRU0saUJBQUMsT0FBTyxFQUFFO0FBQ2YsZUFBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztXQUNuQzs7O2VBM0JVLE1BQU07Ozt3QkFBTixNQUFNIiwiZmlsZSI6ImxvZ2dlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtb3NoZW5za3kgb24gNi8xNi8xNS5cbiAqL1xuaW1wb3J0IHRvYXN0ciBmcm9tICdDb2RlU2V2ZW4vdG9hc3RyJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICBzb3VyY2U6ICdhcHAnLFxuICB0aXRsZTogJycsXG4gIG1lc3NhZ2U6ICdubyBtZXNzYWdlIHByb3ZpZGVkJyxcbiAgZGF0YTogJycsXG4gIHNob3dUb2FzdDogdHJ1ZSxcbiAgdHlwZTogJ2luZm8nXG59O1xuXG5mdW5jdGlvbiBsb2cob3B0aW9ucykge1xuICB2YXIgb3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcbiAgLy9zeXN0ZW0ubG9nKG9wbnMuc291cmNlICsgJywgJyArIG9wbnMudHlwZSArICcsICcgKyBvcG5zLm1lc3NhZ2UgKyAnLCAnICsgb3Bucy5kYXRhICsgJyAnKTtcblxuICBpZiAob3B0cy5zaG93VG9hc3QpIHtcbiAgICB0b2FzdHJbb3B0cy50eXBlXShvcHRzLm1lc3NhZ2UsIG9wdHMudGl0bGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNhbml0aXplKG9wdGlvbnMsIG1lc3NhZ2VUeXBlKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycgfHwgb3B0aW9ucyBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgIHJldHVybiB7XG4gICAgICBtZXNzYWdlOiBvcHRpb25zLFxuICAgICAgdHlwZTogbWVzc2FnZVR5cGVcbiAgICB9O1xuICB9XG5cbiAgb3B0aW9ucy50eXBlID0gbWVzc2FnZVR5cGU7XG4gIHJldHVybiBvcHRpb25zO1xufVxuXG5leHBvcnQgY2xhc3MgTG9nZ2VyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbGV0IGRlZk9wdHMgPSB7XG4gICAgICBjbG9zZUJ1dHRvbjogdHJ1ZSxcbiAgICAgIHBvc2l0aW9uQ2xhc3M6ICd0b2FzdC1ib3R0b20tcmlnaHQnLFxuICAgICAgZmFkZU91dDogMTAwMFxuICAgIH07XG5cbiAgICBsZXQgY29uZmlnT3B0aW9ucyA9IENvbmZpZy5sb2dnZXJPcHRzIHx8IHt9O1xuICAgIGxldCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih0b2FzdHIub3B0aW9ucywgZGVmT3B0cywgY29uZmlnT3B0aW9ucyk7XG4gICAgdG9hc3RyLm9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG5cbiAgd2FybihvcHRpb25zKSB7XG4gICAgbG9nKHNhbml0aXplKG9wdGlvbnMsICd3YXJuaW5nJykpO1xuICB9XG5cbiAgaW5mbyhvcHRpb25zKSB7XG4gICAgbG9nKHNhbml0aXplKG9wdGlvbnMsICdpbmZvJykpO1xuICB9XG5cbiAgZXJyb3Iob3B0aW9ucykge1xuICAgIGxvZyhzYW5pdGl6ZShvcHRpb25zLCAnZXJyb3InKSk7XG4gIH1cblxuICBzdWNjZXNzKG9wdGlvbnMpIHtcbiAgICBsb2coc2FuaXRpemUob3B0aW9ucywgJ3N1Y2Nlc3MnKSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==