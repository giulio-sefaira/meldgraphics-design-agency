var app;
(function (app) {
    var uploadFileField;
    (function (uploadFileField_1) {
        var uploadFileField = (function () {
            function uploadFileField(FileUploader) {
                var _this = this;
                this.FileUploader = FileUploader;
                this.restrict = 'E';
                this.templateUrl = '/templates/directives/uploadFileField.html';
                this.replace = false;
                this.scope = {
                    fileTypes: '=',
                    name: '@',
                    selectFiles: '='
                };
                this.link = function (scope, element, attrs, ctrl) {
                    scope.uploader = new _this.FileUploader();
                    scope.selectFiles = scope.uploader.queue;
                    scope.formatBytes = function (bytes, decimals) {
                        if (bytes == 0)
                            return '0 Byte';
                        var k = 1000;
                        var dm = decimals + 1 || 3;
                        var sizes = ['bytes', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'];
                        var i = Math.floor(Math.log(bytes) / Math.log(k));
                        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
                    };
                    scope.selectedFileType = function (item) { return item.file.name.match(/\.(.+)$/)[1]; };
                    scope.uploader.onAfterAddingFile = function (item) {
                        var selectedFileType = scope.selectedFileType(item);
                        var isExcepted = false;
                        scope.fileTypes.forEach(function (value) {
                            if (selectedFileType == value) {
                                isExcepted = true;
                                return;
                            }
                        });
                        if (isExcepted)
                            return;
                        item.remove();
                        _this.value = '';
                    };
                };
            }
            uploadFileField.factory = function () {
                var directive = function (FileUploader) { return new uploadFileField(FileUploader); };
                directive.$inject = ['FileUploader'];
                return directive;
            };
            return uploadFileField;
        }());
        angular
            .module('meldgraphics')
            .directive('uploadFileField', uploadFileField.factory());
    })(uploadFileField = app.uploadFileField || (app.uploadFileField = {}));
})(app || (app = {}));
