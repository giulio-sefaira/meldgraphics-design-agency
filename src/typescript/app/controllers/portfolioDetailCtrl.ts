module app.portfolioDetail {

  interface portfolioDetailModel {
    pageClass: string
  }

  class portfolioDetailCtrl implements portfolioDetailModel {

    static $inject = [];
    constructor(public pageClass: string = 'portfolio-detail') {

    }

  }

  angular
    .module('meldgraphics')
    .controller('portfolioDetailCtrl',
      portfolioDetailCtrl);

}