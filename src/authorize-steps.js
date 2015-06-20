/**
 * Created by moshensky on 6/17/15.
 */
import {inject} from 'aurelia-dependency-injection';
import {Session} from './session';
import {Logger} from './logger';
import {Locale} from './locale';
import {Config} from './config';
import {Redirect} from 'aurelia-router';

@inject(Session, Logger)
export class RolesAuthorizeStep {
  constructor(session, logger) {
    this.session = session;
    this.logger = logger;
    this.locale = Locale.Repository.default;
    this.loginRoute = Config.routerAuthStepOpts.loginRoute;
  }

  run(routingContext, next) {
    if (!this.session.isUserLoggedIn() && routingContext.nextInstruction.config.route !== this.loginRoute) {
      this.logger.warn(this.locale.translate('pleaseLogin'));
      return next.cancel(new Redirect(this.loginRoute));
    }

    let canAccess = routingContext.nextInstructions.every(i => {
      if (i.config.roles) {
        return this.session.userHasAtLeastOneRole(i.config.roles);
      }

      return true;
    });

    if (canAccess === false) {
      this.logger.error(this.locale.translate('notAuthorized'));
      return next.cancel();
    }

    return next();
  }
}

@inject(Session, Logger)
export class AccessRightsAuthorizeStep {
  constructor(session, logger) {
    this.session = session;
    this.logger = logger;
    this.locale = Locale.Repository.default;
  }

  run(routingContext, next) {
    if (!this.session.isUserLoggedIn() && routingContext.nextInstruction.config.route !== this.loginRoute) {
      this.logger.warn(this.locale.translate('pleaseLogin'));
      return next.cancel(new Redirect(this.loginRoute));
    }

    let neededAccessRights = routingContext.nextInstructions.reduce((acc, i) => {
      if (i.config.accessRight) {
        acc.push(i.config.accessRight);
      }

      return acc;
    }, []);

    let canAccess = this.session.userHasAllAccessRights(neededAccessRights);

    if (canAccess === false) {
      this.logger.error(this.locale.translate('notAuthorized'));
      return next.cancel();
    }

    return next();
  }
}
