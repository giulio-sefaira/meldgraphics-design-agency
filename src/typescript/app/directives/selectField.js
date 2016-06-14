var app;
(function (app) {
    var selectField;
    (function (selectField_1) {
        var selectField = (function () {
            function selectField($document) {
                this.$document = $document;
                this.restrict = 'A';
                this.templateUrl = '/templates/directives/selectField.html';
                this.replace = false;
                this.scope = {
                    list: '=',
                    selected: '=',
                    name: '@',
                    placeholder: '@'
                };
                this.link = function (scope, element, attrs, ctrl) {
                    scope.showList = false;
                    scope.openList = function () {
                        scope.showList = !scope.showList;
                    };
                    scope.selectOption = function (item) {
                        scope.selected = item;
                        scope.selectValue = item;
                        scope.showList = false;
                    };
                };
            }
            selectField.factory = function () {
                var directive = function ($document) { return new selectField($document); };
                directive.$inject = ['$document'];
                return directive;
            };
            return selectField;
        }());
        angular
            .module('meldgraphics')
            .directive('selectField', selectField.factory());
    })(selectField = app.selectField || (app.selectField = {}));
})(app || (app = {}));
