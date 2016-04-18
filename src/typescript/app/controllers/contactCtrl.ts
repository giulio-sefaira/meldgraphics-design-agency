module app.contact {

  interface contactModel {
    pageClass: string;
    projectBudgetValues: any;
    designDevelopmentOptions: any;
    printIllustrationOptions: any;
    uploadFilesTypes: any;
    brandingStrategyOptions: any;
    projectDeadlineOptions: any;
  }

  class contactCtrl implements contactModel {

    static $inject = ['dataAccessService'];
    constructor(
      private dataAccessService: app.common.DataAccessService,
      public pageClass: string = 'contact',
      public projectBudgetValues: any,
      public designDevelopmentOptions: any,
      public printIllustrationOptions: any,
      public uploadFileTypes: any,
      public brandingStrategyOptions: any,
      public projectDeadlineOptions: any) {

        this.projectBudgetValues = dataAccessService.getProjectBudgetResource();
        this.designDevelopmentOptions = dataAccessService.getDesignDevelopmentOptions();
        this.printIllustrationOptions = dataAccessService.getPrintIllustrationOptions();
        this.uploadFileTypes = dataAccessService.getUploadFileTypes();
        this.brandingStrategyOptions = dataAccessService.getBrandingStrategyOptions();
        this.projectDeadlineOptions = dataAccessService.getProjectDeadlineOptions();
    }
    
  }

  angular
    .module('meldgraphics')
    .controller('contactCtrl',
      contactCtrl);
}