module app {
  var main = angular.module('meldgraphics',
                              ['ngAnimate',
                               'duScroll',
                               'ngRoute',
                               'common.services',
                               'angularFileUpload',
                               'ngSanitize']);

  main.config(routeConfig);

  routeConfig.$inject = ['$routeProvider'];
  function routeConfig($routeProvider: ng.route.IRouteProvider): void {
    $routeProvider
      .when('/',
        {
          templateUrl: '/templates/views/landingPage.html',
          controller: 'landingPageCtrl as vm'
        })
      .when('/portfolio',
        {
          templateUrl: '/templates/views/portfolio.html',
          controller: 'portfolioCtrl as vm'
        })
      .when('/contact',
        {
          templateUrl: '/templates/views/contact.html',
          controller: 'contactCtrl as vm'
        })
      .when('/contact/sendMessage',
        {
          templateUrl: '/templates/views/sendMessage.html',
          controller: 'sendMessageCtrl as vm'
        })
      .otherwise('/');
  }
}