module app.contact {

  interface contactModel {

  }

  class contactCtrl implements contactModel {

    constructor() {

    }


  }

  angular
    .module('meldgraphics')
    .controller('contactCtrl',
      contactCtrl);
}