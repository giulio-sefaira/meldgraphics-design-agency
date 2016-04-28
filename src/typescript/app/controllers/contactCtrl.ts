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

        this.projectBudgetValues = this.dataAccessService.getProjectBudgetResource();
        this.designDevelopmentOptions = this.dataAccessService.getDesignDevelopmentOptions();
        this.printIllustrationOptions = this.dataAccessService.getPrintIllustrationOptions();
        this.uploadFileTypes = this.dataAccessService.getUploadFileTypes();
        this.brandingStrategyOptions = this.dataAccessService.getBrandingStrategyOptions();
        this.projectDeadlineOptions = this.dataAccessService.getProjectDeadlineOptions();
    }
    
  }

  angular
    .module('meldgraphics')
    .controller('contactCtrl',
      contactCtrl);
}