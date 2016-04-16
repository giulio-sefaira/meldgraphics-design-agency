module app.uploadFileField {

  angular
    .module('meldgraphics')
    .directive('uploadFileField', function (FileUploader) {
      return {
        restrict: 'E',
        templateUrl: '/templates/directives/uploadFileField.html',
        replace: false,
        scope: {
          fileTypes: '=',
          name: '@'
        },
        link: function(scope, element, attrs) {

          scope.uploader = new FileUploader();
          scope.formatBytes = function(bytes,decimals) {
            if(bytes == 0) return '0 Byte';
            var k = 1000;
            var dm = decimals + 1 || 3;
            var sizes = ['bytes', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'];
            var i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
          }
          scope.uploader.onAfterAddingFile = function(item) {
            scope.selectedFileType = item.file.name.match(/\.(.+)$/)[1];
            var isExcepted = false;
            scope.fileTypes.forEach((value) => {
              if (scope.selectedFileType == value) {
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