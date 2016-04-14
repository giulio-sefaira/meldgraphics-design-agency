module app.contact {

  interface contactModel {
    pageClass: string
  }

  class contactCtrl implements contactModel {

    constructor(public pageClass: string = 'contact') {

    }


  }

  angular
    .module('meldgraphics')
    .controller('contactCtrl',
      contactCtrl);
}