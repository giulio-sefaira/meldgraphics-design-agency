module app {
  var main = angular.module('meldgraphics',
                              ['ngAnimate',
                               'duScroll',
                               'ngRoute']);

  main.config(routeConfig);

  routeConfig.$inject = ['$routeProvider'];
  function routeConfig($routeProvider: ng.route.IRouteProvider): void {
    $routeProvider
      .when('/',
        {
          templateUrl: '/views/landingPage.html',
          controller: 'landingPageCtrl as vm'
        })
      .when('/portfolio',
        {
          templateUrl: '/views/portfolio.html',
          controller: 'portfolioCtrl as vm'
        })
      .when('/contact',
        {
          templateUrl: '/views/contact.html',
          controller: 'contactCtrl as vm'
        })
      .when('/contact/sendMessage',
        {
          templateUrl: '/views/sendMessage.html',
          controller: 'sendMessageCtrl as vm'
        })
      .otherwise('/');
  }
}