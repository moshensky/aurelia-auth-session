import {Config} from './config';

export {Logger} from './logger';
export {Session} from './session';
export {Http} from './http';
export {AccessRightsAuthorizeStep, RolesAuthorizeStep} from './authorize-steps';

export function configure(aurelia, configCallback) {
  const config = new Config();

  if(configCallback !== undefined && typeof(configCallback) === 'function')
  {
    configCallback(config);
  }

  return config.locale();
}
