var app;
(function (app) {
    var main = angular.module('meldgraphics', ['ngAnimate',
        'duScroll',
        'ngRoute',
        'common.services',
        'angularFileUpload',
        'ngSanitize']);
    main.config(routeConfig);
    routeConfig.$inject = ['$routeProvider'];
    function routeConfig($routeProvider) {
        $routeProvider
            .when('/en', {
            templateUrl: '/templates/views/en/landingPage.html',
            controller: 'landingPageCtrl as vm'
        })
            .when('/en/portfolio', {
            templateUrl: '/templates/views/en/portfolio.html',
            controller: 'portfolioCtrl as vm'
        })
            .when('/en/contact', {
            templateUrl: '/templates/views/en/contact.html',
            controller: 'contactCtrl as vm'
        })
            .when('/en/contact/sendMessage', {
            templateUrl: '/templates/views/en/sendMessage.html',
            controller: 'sendMessageCtrl as vm'
        })
            .when('/ru', {
            templateUrl: '/templates/views/ru/landingPage.html',
            controller: 'landingPageCtrl as vm'
        })
            .when('/ru/portfolio', {
            templateUrl: '/templates/views/ru/portfolio.html',
            controller: 'portfolioCtrl as vm'
        })
            .when('/ru/contact', {
            templateUrl: '/templates/views/ru/contact.html',
            controller: 'contactCtrl as vm'
        })
            .when('/ru/contact/sendMessage', {
            templateUrl: '/templates/views/ru/sendMessage.html',
            controller: 'sendMessageCtrl as vm'
        })
            .when('/portfolio/presentHorizon', {
            templateUrl: '/templates/views/portfolio/horizonAdvisor.html',
            controller: 'portfolioDetailCtrl as vm'
        })
            .otherwise('/en');
    }
})(app || (app = {}));
