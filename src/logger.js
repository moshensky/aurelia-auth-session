/**
 * Created by moshensky on 6/16/15.
 */
import toastr from 'CodeSeven/toastr';
import {Config} from './config';

const defaults = {
  source: 'app',
  title: '',
  message: 'no message provided',
  data: '',
  showToast: true,
  type: 'info'
};

function log(options) {
  var opts = Object.assign({}, defaults, options);
  //system.log(opns.source + ', ' + opns.type + ', ' + opns.message + ', ' + opns.data + ' ');

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

export class Logger {
  constructor() {
    toastr.options.closeButton = true;
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.options.backgroundpositionClass = 'toast-bottom-right';
    toastr.options.fadeOut = 1000;

    toastr.options = Object.assign({}, Config.loggerOpts || {}, toastr.options);
  }

  warn(options) {
    log(sanitize(options, 'warning'));
  }

  info(options) {
    log(sanitize(options, 'info'));
  }

  error(options) {
    log(sanitize(options, 'error'));
  }

  success(options) {
    log(sanitize(options, 'success'));
  }
}
