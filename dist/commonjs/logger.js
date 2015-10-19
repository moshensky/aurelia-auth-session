'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _CodeSevenToastr = require('CodeSeven/toastr');

var _CodeSevenToastr2 = _interopRequireDefault(_CodeSevenToastr);

var _config = require('./config');

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
    _CodeSevenToastr2['default'][opts.type](opts.message, opts.title);
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
    var options = Object.assign(_CodeSevenToastr2['default'].options, defOpts, configOptions);
    _CodeSevenToastr2['default'].options = options;
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