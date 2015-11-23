/**
 * Created by moshensky on 6/17/15.
 */
import {inject} from 'aurelia-dependency-injection';
import {Session} from './session';
import {Logger} from './logger';
import {Locale} from './locale';
import {Config} from './config';
import {Redirect} from 'aurelia-router';


class BaseAuthorizeStep {
  constructor(session, logger) {
    this.session = session;
    this.logger = logger;
    this.locale = Locale.Repository.default;
    this.loginRoute = Config.routerAuthStepOpts.loginRoute;
  }

  run(navigationInstruction, next) {
    if (!this.session.isUserLoggedIn() && navigationInstruction.config.route !== this.loginRoute) {
      this.logger.warn(this.locale.translate('pleaseLogin'));
      return next.cancel(new Redirect(this.loginRoute));
    }

    let canAccess = this.authorize(navigationInstruction);
    if (canAccess === false) {
      this.logger.error(this.locale.translate('notAuthorized'));
      return next.cancel();
    }

    return next();
  }

  authorize(navigationInstruction) {
    if (navigationInstruction.parentInstruction === null) {
      return this.canAccess(navigationInstruction);
    } else {
      let canAccess = this.canAccess(navigationInstruction);
      if (hasRole){
        return this.authorize(navigationInstruction.parentInstruction)
      } else {
        return false;
      }
    }
  }

  canAccess() {

  }
}


@inject(Session, Logger)
export class RolesAuthorizeStep extends BaseAuthorizeStep {
  constructor(session, logger) {
    super(session, logger);
  }

  canAccess(navigationInstruction) {
    if (navigationInstruction.config.roles) {
      return this.session.userHasAtLeastOneRole(navigationInstruction.config.roles);
    }

    return true;
  }
}


@inject(Session, Logger)
export class AccessRightsAuthorizeStep extends BaseAuthorizeStep {
  constructor(session, logger) {
    super(session, logger);
  }

  canAccess(navigationInstruction) {
    if (navigationInstruction.config.accessRight) {
      return this.session.userHasAccessRight(navigationInstruction.config.accessRight);
    }

    return true;
  }
}

