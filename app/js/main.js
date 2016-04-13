var app;
(function (app) {
    var main = angular.module('meldgraphics', ['ngAnimate',
        'duScroll',
        'ngRoute']);
    main.config(routeConfig);
    routeConfig.$inject = ['$routeProvider'];
    function routeConfig($routeProvider) {
        $routeProvider
            .when('/', {
            templateUrl: '/views/landingPage.html',
            controller: 'landingPageCtrl as vm'
        })
            .when('/portfolio', {
            templateUrl: '/views/portfolio.html',
            controller: 'portfolioCtrl as vm'
        })
            .when('/contact', {
            templateUrl: '/views/contact.html',
            controller: 'contactCtrl as vm'
        })
            .when('/contact/sendMessage', {
            templateUrl: '/views/sendMessage.html',
            controller: 'sendMessageCtrl as vm'
        })
            .otherwise('/');
    }
})(app || (app = {}));

var app;
(function (app) {
    var meldgraphics;
    (function (meldgraphics) {
        class meldgraphicsCtrl {
            constructor($document, showNav = false, scrollTopValue = 0, scrollDurationValue = 2000, scrollOffset = 70, activeSectionClass = '.about-us') {
                this.$document = $document;
                this.showNav = showNav;
                this.scrollTopValue = scrollTopValue;
                this.scrollDurationValue = scrollDurationValue;
                this.scrollOffset = scrollOffset;
                this.activeSectionClass = activeSectionClass;
            }
            toggleNav() {
                this.showNav = !this.showNav;
            }
            scrollTop() {
                this.$document.scrollTop(this.scrollTopValue, this.scrollDurationValue);
            }
            scrollToSection(elementSelector) {
                var scrollOffset = this.$document[0].querySelector('.nav').offsetHeight - 10;
                var targetElement = this.$document[0].querySelector(elementSelector);
                this.$document.scrollToElement(targetElement, scrollOffset, this.scrollDurationValue / 2);
                this.activeSectionClass = elementSelector;
            }
        }
        meldgraphicsCtrl.$inject = ['$document'];
        meldgraphics.meldgraphicsCtrl = meldgraphicsCtrl;
        angular
            .module('meldgraphics')
            .controller('meldgraphicsCtrl', meldgraphicsCtrl);
    })(meldgraphics = app.meldgraphics || (app.meldgraphics = {}));
})(app || (app = {}));
var app;
(function (app) {
    var landingPage;
    (function (landingPage) {
        class landingPageCtrl extends app.meldgraphics.meldgraphicsCtrl {
        }
        angular
            .module('meldgraphics')
            .controller('landingPageCtrl', landingPageCtrl);
    })(landingPage = app.landingPage || (app.landingPage = {}));
})(app || (app = {}));

var app;
(function (app) {
    var scroll;
    (function (scroll) {
        angular
            .module('meldgraphics')
            .directive('scroll', function ($window) {
            return function (scope, element, attrs) {
                var nav = element[0].querySelector('.nav');
                var navBottom = nav.getBoundingClientRect().bottom;
                var aboutUs, aboutUsTop;
                scope.$on('$viewContentLoaded', function () {
                    aboutUs = element[0].querySelector('.about-us');
                    aboutUsTop = aboutUs.getBoundingClientRect().top;
                });
                angular.element($window).bind("scroll", function () {
                    aboutUsTop = aboutUs.getBoundingClientRect().top;
                    if (aboutUsTop < navBottom) {
                        element.addClass('document--nav-grey');
                    }
                    else {
                        element.removeClass('document--nav-grey');
                    }
                });
            };
        });
    })(scroll = app.scroll || (app.scroll = {}));
})(app || (app = {}));


