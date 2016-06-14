var app;
(function (app) {
    var contact;
    (function (contact) {
        var contactCtrl = (function () {
            function contactCtrl(dataAccessService, $scope, $http, $q, $location, pageClass, projectBudgetValues, designDevelopmentOptions, printIllustrationOptions, uploadFileTypes, brandingStrategyOptions, projectDeadlineOptions) {
                if (pageClass === void 0) { pageClass = 'contact'; }
                this.dataAccessService = dataAccessService;
                this.$scope = $scope;
                this.$http = $http;
                this.$q = $q;
                this.$location = $location;
                this.pageClass = pageClass;
                this.projectBudgetValues = projectBudgetValues;
                this.designDevelopmentOptions = designDevelopmentOptions;
                this.printIllustrationOptions = printIllustrationOptions;
                this.uploadFileTypes = uploadFileTypes;
                this.brandingStrategyOptions = brandingStrategyOptions;
                this.projectDeadlineOptions = projectDeadlineOptions;
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
            contactCtrl.prototype.submitForm = function (form, $event) {
                var _this = this;
                $event.preventDefault();
                form.$submitted = true;
                if (form.$invalid)
                    return false;
                this.sendData(this.formData).then(function (data) {
                    var lang = (_this.$location.path().indexOf('/ru/')) ? 'ru' : 'en';
                    _this.$location.path("/" + lang + "/contact/sendMessage");
                }, function () {
                    console.log('Error');
                });
            };
            contactCtrl.prototype.sendData = function (formData) {
                var _this = this;
                var self = this;
                return self.$q(function (resolve, reject) {
                    _this.sendFiles(formData.files).then(function (uploadFiles) {
                        var sendData = angular.copy(formData);
                        sendData.files = uploadFiles;
                        self.$http.post('/handler.php', sendData)
                            .success(function (data) {
                            resolve(data);
                        })
                            .error(function (data, status) {
                            reject(data, status);
                        });
                    }, function (error) {
                        reject(error);
                    });
                });
            };
            contactCtrl.prototype.sendFiles = function (files) {
                var self = this;
                return self.$q(function (resolve, reject) {
                    var formData = new FormData();
                    angular.forEach(files, function (value, key) {
                        formData.append('upload' + key, value._file);
                    });
                    self.$http.post('/handler.php', formData, {
                        transformRequest: angular.identity,
                        headers: { 'Content-Type': undefined }
                    })
                        .success(function (data) {
                        resolve(data);
                    })
                        .error(function (data, status) {
                        reject(data, status);
                    });
                });
            };
            contactCtrl.$inject = ['dataAccessService', '$scope', '$http', '$q', '$location'];
            return contactCtrl;
        }());
        angular
            .module('meldgraphics')
            .controller('contactCtrl', contactCtrl);
    })(contact = app.contact || (app.contact = {}));
})(app || (app = {}));
