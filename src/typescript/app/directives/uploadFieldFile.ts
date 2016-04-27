module app.uploadFileField {

  angular
    .module('meldgraphics')
    .directive('uploadFileField', function (FileUploader, $http) {
      return {
        restrict: 'E',
        templateUrl: '/templates/directives/uploadFileField.html',
        replace: false,
        scope: {
          fileTypes: '=',
          name: '@',
          selectFiles: '='
        },
        link: (scope, element, attrs) => {

          scope.uploader = new FileUploader();
          scope.selectFiles = scope.uploader.queue;

          scope.formatBytes = (bytes, decimals) => {
            if(bytes == 0) return '0 Byte';
            let k = 1000;
            let dm = decimals + 1 || 3;
            let sizes = ['bytes', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'];
            let i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
          };

          scope.selectedFileType = item => item.file.name.match(/\.(.+)$/)[1];

          scope.uploader.onAfterAddingFile = item => {
            console.log('scope.uploader.queue', scope.uploader.queue);
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
      }
    });
}