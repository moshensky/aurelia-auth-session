import {Config} from './config';

export {Logger} from './logger';
export {Session} from './session';
export {Http} from './http';
export {AccessRightsAuthorizeStep, RolesAuthorizeStep} from './authorize-steps';

export function configure(aurelia, configCallback) {
  const config = new Config();

  //aurelia.globalizeResources('./validation/validate-custom-attribute');

  if(configCallback !== undefined && typeof(configCallback) === 'function')
  {
    configCallback(config);
  }

  //aurelia.withSingleton(Config, config);

  return config.locale();
}
