var app;
(function (app) {
    var animatedElement;
    (function (animatedElement) {
        var animated = (function () {
            function animated($window, $timeout) {
                var _this = this;
                this.$window = $window;
                this.$timeout = $timeout;
                this.restrict = 'C';
                this.scope = {
                    animation: '@',
                    animationDelay: '@',
                    compareElement: '@',
                    animationRunPoint: '@'
                };
                this.link = function (scope, element, attrs, ctrl) {
                    element.addClass(scope.animation + "--before");
                    var restrictLine = _this.$window.innerHeight - _this.$window.innerHeight * ((scope.animationRunPoint || 12) / 100);
                    var previousElement = element[0].previousSibling;
                    var elementParent = element[0].parentNode;
                    var comparePoint;
                    while (previousElement.nodeType == 3) {
                        previousElement = previousElement.previousSibling;
                        if (!previousElement) {
                            break;
                        }
                    }
                    var runAnimation = function () {
                        if (scope.compareElement == 'parent') {
                            comparePoint = elementParent.getBoundingClientRect().top;
                        }
                        else {
                            comparePoint = (!previousElement) ? elementParent.getBoundingClientRect().top : previousElement.getBoundingClientRect().bottom;
                        }
                        if (comparePoint < restrictLine) {
                            _this.$timeout(function () {
                                element.addClass(scope.animation);
                                element.removeClass(scope.animation + "--before");
                            }, scope.animationDelay || 0);
                        }
                    };
                    angular.element(_this.$window).bind("scroll", function () {
                        runAnimation();
                    });
                };
            }
            animated.factory = function () {
                var directive = function ($window, $timeout) { return new animated($window, $timeout); };
                directive.$inject = ['$window', '$timeout'];
                return directive;
            };
            return animated;
        }());
        angular
            .module('meldgraphics')
            .directive('animated', animated.factory());
    })(animatedElement = app.animatedElement || (app.animatedElement = {}));
})(app || (app = {}));
