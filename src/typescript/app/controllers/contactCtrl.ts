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

    static $inject = ['dataAccessService', '$scope', '$http', '$q', '$location'];
    constructor(
      private dataAccessService: app.common.DataAccessService,
      private $scope: ng.IScopeService,
      private $http: ng.IHttpService,
      private $q: ng.IQService,
      private $location: ng.ILocationService,
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
        
        this.$http = $http;
        this.$q = $q;
        this.formData = {};
    }
    
    submitForm(form, $event): void {
      $event.preventDefault();
      form.$submitted = true;

      if (form.$invalid) return false;
      
      this.sendData(this.formData).then(data => {
        let lang = (this.$location.path().indexOf('/ru/')) ? 'ru' : 'en';
        this.$location.path(`/${lang}/contact/sendMessage`);
      }, () => {
        console.log('Error');
      });
  
    }
  
    sendData(formData): Promise {
      let self = this;
      return self.$q((resolve, reject) => {
        this.sendFiles(formData.files).then(uploadFiles => {

          let sendData = angular.copy(formData);
          sendData.files = uploadFiles;

          self.$http.post('/handler.php', sendData)
            .success(data => {
              resolve(data);
            })
            .error((data, status) => {
              reject(data, status);
            });

        }, error => {
          reject(error);
        });
      });
    }
  
    sendFiles(files): Promise {
      let self = this;
      return self.$q((resolve, reject) => {

        let formData = new FormData();
        angular.forEach(files, (value, key) => {
            formData.append('upload' + key, value._file);
        });

        self.$http.post('/handler.php', formData, {
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined}
          })
          .success(data => {
              resolve(data);
          })
          .error((data, status) => {
              reject(data, status);
          });

      });
    }
    
  }

  angular
    .module('meldgraphics')
    .controller('contactCtrl',
                 contactCtrl);
}