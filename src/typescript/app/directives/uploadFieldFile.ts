module app.uploadFileField {

  class uploadFileField implements ng.IDirective {
    restrict = 'E';
    templateUrl = '/templates/directives/uploadFileField.html';
    replace = false;
    scope = {
      fileTypes: '=',
      name: '@',
      selectFiles: '='
    };

    constructor(private FileUploader) { }

    link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any) => {
      
      scope.uploader = new this.FileUploader();
      scope.selectFiles = scope.uploader.queue;
      
      scope.formatBytes = (bytes, decimals) => {
        if(bytes == 0) return '0 Byte';
        let k = 1000;
        let dm = decimals + 1 || 3;
        let sizes = ['bytes', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'];
        let i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
      }

      scope.selectedFileType = item => item.file.name.match(/(?:\.([^.]+))?$/)[1];

      scope.uploader.onAfterAddingFile = item => {
        let selectedFileType = scope.selectedFileType(item);
        let isExcepted = false;
        scope.fileTypes.forEach(value => {
          if (selectedFileType == value) {
            isExcepted = true;
            return;
          }
        });
        if (isExcepted) return;
        item.remove();
        this.value = '';
      }
    }

    static factory(): ng.IDirectiveFactory {
      const directive = (FileUploader) => new uploadFileField(FileUploader);
      directive.$inject = ['FileUploader'];
      return directive;
    }
  }

  angular
    .module('meldgraphics')
    .directive('uploadFileField',
                uploadFileField.factory());

}