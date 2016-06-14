var app;
(function (app) {
    var dropdownChooseList;
    (function (dropdownChooseList_1) {
        var dropdownChooseList = (function () {
            function dropdownChooseList() {
                this.restrict = 'A';
                this.templateUrl = '/templates/directives/dropdownChooseList.html';
                this.replace = false;
                this.scope = {
                    title: "@",
                    list: "=",
                    checked: '='
                };
                this.link = function (scope, element, attrs, ctrl) {
                    scope.camelize = function (str) { return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
                        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
                    }).replace(/\s+/g, ''); };
                    scope.showList = false;
                    scope.checked = {};
                    scope.openList = function () {
                        scope.showList = !scope.showList;
                    };
                };
            }
            dropdownChooseList.factory = function () {
                var directive = function () { return new dropdownChooseList(); };
                return directive;
            };
            return dropdownChooseList;
        }());
        angular
            .module('meldgraphics')
            .directive('dropdownChooseList', dropdownChooseList.factory());
    })(dropdownChooseList = app.dropdownChooseList || (app.dropdownChooseList = {}));
})(app || (app = {}));
