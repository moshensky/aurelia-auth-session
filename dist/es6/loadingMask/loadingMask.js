import $ from 'jquery';
import {Locale} from '../locale';

export class LoadingMask {
  constructor(resources) {
    this.loadingMask = undefined;
    this.dimScreen = undefined;
    this.dialog = undefined;
    this.loadingTitle = undefined;
    this.title = undefined;
    this.locale = Locale.Repository.default;
    this._createLoadingMask();
  }

  _createLoadingMask() {
    this.title = this.locale.translate('loading');
    this.dimScreen = '<div id="loadingMask" class="spinner"><div class="loadingTitle">' + this.title +'</div><div class="mask"></div></div>';
    $('body').append(this.dimScreen);
    this.loadingMask = $('#loadingMask');
    this.loadingTitle = $('.loadingTitle').css({
      color: '#ffffff',
      opacity: 1,
      fontSize: '2.5em',
      fontFamily: 'Roboto'
    });
  }

  show() {
    this.loadingMask.show();
  }

  hide() {
    this.loadingMask.hide();
  }
}