module app.portfolio {

  interface portfolioModel {
    pageClass: string,
    projectsList: any,
    projectFilter: string
  }

  class portfolioCtrl implements portfolioModel {

    static $inject = ['dataAccessService'];
    constructor(
      private dataAccessService: app.common.DataAccessService,
      public pageClass: string = 'portfolio',
      public projectFilter: string = '',
      public projectsList: any) {
        this.projectsList = dataAccessService.getPortfolioResource();
    }

  }

  angular
    .module('meldgraphics')
    .controller('portfolioCtrl',
                 portfolioCtrl);

}