var app;
(function (app) {
    var feature;
    (function (feature_1) {
        var feature = (function () {
            function feature($timeout) {
                this.$timeout = $timeout;
                this.restrict = 'C';
                this.templateUrl = '/templates/directives/feature.html';
                this.replace = false;
                this.scope = {
                    name: '=',
                    title: '=',
                    description: '=',
                    retina: '=',
                    active: '=',
                    size: '=',
                    lang: '='
                };
                this.link = function (scope, element, attrs, ctrl) {
                    scope.startAnimation = false;
                    scope.endAnimation = true;
                    scope.runAnimation = function (state) {
                        if (!state && !scope.startAnimation && scope.endAnimation) {
                            scope.startAnimation = true;
                            scope.endAnimation = false;
                            scope.disableCashing(0, 1000000);
                        }
                    };
                    scope.stopAnimation = function () {
                        scope.startAnimation = false;
                        scope.endAnimation = true;
                    };
                    scope.cash = 1;
                    scope.disableCashing = function (min, max) {
                        scope.cash = Math.round(Math.random() * (max - min) + min);
                    };
                };
            }
            feature.factory = function () {
                var directive = function ($timeout) { return new feature($timeout); };
                directive.$inject = ['$timeout'];
                return directive;
            };
            return feature;
        }());
        angular
            .module('meldgraphics')
            .directive('feature', feature.factory());
    })(feature = app.feature || (app.feature = {}));
})(app || (app = {}));
