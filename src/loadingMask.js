import $ from 'jquery';
//import {Resources} from './resources/en-US';

export class LoadingMask {
  constructor() {
    this.loadingMask = undefined;
    this.dimScreen = undefined;
    this.dialog = undefined;
    this.loadingTitle = undefined;
    this.title = undefined;
    this._createLoadingMask();
  }

  _createLoadingMask() {
    //todo: get from resources file
    this.title = "Loading";
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