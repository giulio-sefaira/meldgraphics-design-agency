module app.portfolio {

  interface portfolioModel {

  }

  class portfolioCtrl implements portfolioModel {

    constructor() {

    }


  }

  angular
    .module('meldgraphics')
    .controller('portfolioCtrl',
      portfolioCtrl);
}