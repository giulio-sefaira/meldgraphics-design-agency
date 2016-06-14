var app;
(function (app) {
    var scroll;
    (function (scroll_1) {
        var scroll = (function () {
            function scroll($window, $document, $location, $rootScope, $timeout) {
                var _this = this;
                this.$window = $window;
                this.$document = $document;
                this.$location = $location;
                this.$rootScope = $rootScope;
                this.$timeout = $timeout;
                this.link = function (scope, element, attrs, ctrl) {
                    var nav = element[0].querySelector('.nav');
                    var navBottom = nav.getBoundingClientRect().bottom;
                    var windowHeight = _this.$window.innerHeight;
                    var scrollTopValue = 0;
                    var scrollDurationValue = 2000;
                    var scrollOffset = 70;
                    var aboutUs, aboutUsTop, services, servicesTop, process, processTop, projects, projectsTop, footer, footerTop, brain, brainTop, triangles, trianglesTop;
                    scope.brainAnimateionRun = false;
                    scope.trianglesAnimationRun = false;
                    scope.frontLayer = true;
                    scope.url = _this.$location.path();
                    scope.navGrey = (scope.url != '/');
                    scope.$on('$routeChangeStart', function (next, current) {
                        scope.frontLayer = true;
                    });
                    scope.$on('$routeChangeSuccess', function (next, current) {
                        _this.$timeout(function () {
                            scope.frontLayer = false;
                        }, 100);
                        _this.$timeout(function () {
                            if (scope.homePage) {
                                scope.scrollMotion();
                            }
                        }, 1000);
                    });
                    scope.$on('$viewContentLoaded', function () {
                        scope.url = _this.$location.path();
                        scope.navGrey = ((scope.url != '/ru') && (scope.url != '/en'));
                        scope.lang = (~scope.url.indexOf('/en')) ? 'en' : 'ru';
                        scope.homePage = ((scope.url == '/en') || (scope.url == '/ru'));
                    });
                    _this.$timeout(function () {
                        scope.frontLayerPosition = 333;
                    }, 4000);
                    scope.setActiveMenuItem = function () {
                        if (scope.homePage) {
                            scope.activeSectionClass = (footerTop < navBottom) ? '.footer' :
                                (projectsTop < navBottom) ? '.projects' :
                                    (processTop < navBottom) ? '.process' :
                                        (servicesTop < navBottom) ? '.services' :
                                            (aboutUsTop < navBottom) ? '.about-us' : '';
                        }
                    };
                    scope.animateElements = function () {
                        if (scope.homePage) {
                            brainTop = element[0].querySelector('.brain').getBoundingClientRect().top;
                            if ((brainTop < (windowHeight - windowHeight * 0.2)) && !scope.brainAnimateionRun) {
                                scope.brainAnimateionRun = true;
                            }
                            if ((trianglesTop < (windowHeight - windowHeight * 0.4)) && !scope.trianglesAnimationRun) {
                                scope.trianglesAnimationRun = true;
                            }
                        }
                    };
                    scope.scrollMotion = function () {
                        var scrollOffset = element[0].querySelector('.nav').offsetHeight - 20;
                        var targetElement = element[0].querySelector(scope.selectedItemClass);
                        _this.$document.scrollToElement(targetElement, scrollOffset, scrollDurationValue / 2);
                    };
                    scope.scrollTop = function (duration) {
                        if (duration === void 0) { duration = scrollDurationValue; }
                        _this.$document.scrollTop(scrollTopValue, duration);
                    };
                    scope.scrollToSection = function (elementSelector) {
                        scope.selectedItemClass = elementSelector;
                        if (scope.homePage) {
                            scope.scrollMotion();
                        }
                    };
                    scope.setActiveMenuItem();
                    scope.setNavColor = function (element) {
                        if (scope.homePage) {
                            aboutUsTop = element[0].querySelector('.about-us').getBoundingClientRect().top;
                            servicesTop = element[0].querySelector('.services').getBoundingClientRect().top;
                            processTop = element[0].querySelector('.process').getBoundingClientRect().top;
                            projectsTop = element[0].querySelector('.projects').getBoundingClientRect().top;
                            footerTop = element[0].querySelector('.footer').getBoundingClientRect().top;
                            trianglesTop = element[0].querySelector('.triangles').getBoundingClientRect().top;
                        }
                        scope.$apply(function () {
                            scope.navGrey = (scope.homePage) ? (aboutUsTop < navBottom) : true;
                        });
                    };
                    angular.element(_this.$window).bind("scroll", function () {
                        scope.setNavColor(element);
                        scope.setActiveMenuItem();
                        scope.animateElements();
                    });
                    angular.element(_this.$window).bind("resize", function () {
                        scope.setNavColor(element);
                        scope.setActiveMenuItem();
                    });
                };
            }
            scroll.factory = function () {
                var directive = function ($window, $document, $location, $rootScope, $timeout) { return new scroll($window, $document, $location, $rootScope, $timeout); };
                directive.$inject = ['$window', '$document', '$location', '$rootScope', '$timeout'];
                return directive;
            };
            return scroll;
        }());
        angular
            .module('meldgraphics')
            .directive('scroll', scroll.factory());
    })(scroll = app.scroll || (app.scroll = {}));
})(app || (app = {}));
