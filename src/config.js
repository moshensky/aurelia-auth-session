/**
 * Created by moshensky on 6/17/15.
 */
import {Locale} from './locale';

export class ConfigDefaults {
}

ConfigDefaults._defaults = {
  locale: 'en-US',
  localeResources: 'service/resources/'
};

ConfigDefaults.defaults = function () {
  var defaults = {};
  Object.assign(defaults, ConfigDefaults._defaults);
  return defaults;
};

export class Config {
  constructor(innerConfig) {
    this.innerConfig = innerConfig;
    this.values = this.innerConfig ? {} : ConfigDefaults.defaults();
    this.changedHandlers = new Map();
  }

  getValue(identifier) {
    if (this.values.hasOwnProperty(identifier) !== null && this.values[identifier] !== undefined) {
      return this.values[identifier];
    }
    if (this.innerConfig !== null) {
      return this.innerConfig.getValue(identifier);
    }
    throw Error('Config not found: ' + identifier);
  }

  setValue(identifier, value) {
    this.values[identifier] = value;
    return this; //fluent API
  }

  onLocaleChanged(callback) {
    if (this.innerConfig !== undefined) {
      return this.innerConfig.onLocaleChanged(callback);
    } else {
      let id = ++ValidationConfig.uniqueListenerId;
      this.changedHandlers.set(id, callback);
      return () => {
        this.changedHandlers.delete(id);
      };
    }
  }

  getDependencies() {
    return this.getValue('dependencies');
  }

  setHttpService(httpOpts) {
    Config.httpOpts = httpOpts;
  }

  routerAuthStep(opts) {
    Config.routerAuthStepOpts = opts;
  }

  useLocale(localeIdentifier) {
    this.setValue('locale', localeIdentifier);
    var callbacks = Array.from(this.changedHandlers.values());
    for (let i = 0; i < callbacks.length; i++) {
      callbacks[i]();
    }
    return this;
  }

  locale() {
    return Locale.Repository
      .load(this.getValue('locale'), this.getValue('localeResources'));
  }
}

Config.uniqueListenerId = 0;
