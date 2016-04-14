module app.scroll {

  angular
      .module('meldgraphics')
      .directive('scroll', function ($window, $location) {
        return function(scope, element, attrs) {
        
          var nav = element[0].querySelector('.nav');
          var navBottom = nav.getBoundingClientRect().bottom;
          var aboutUs,
              aboutUsTop;
          var url = $location.path();
          scope.navGrey = ($location.path() != '/') ? true : false;

          scope.$on('$viewContentLoaded', function(){
            aboutUs = element[0].querySelector('.about-us');
            aboutUsTop = aboutUs.getBoundingClientRect().top;
            url = $location.path();
            scope.navGrey = (url != '/') ? true : false;
          });

          function setNavColor() {
            aboutUsTop = aboutUs.getBoundingClientRect().top;
            scope.$apply(function () {
              scope.navGrey = (aboutUsTop < navBottom) ? true : false;
            });
          }

          if (url == '/') {
            angular.element($window).bind("scroll", function() {
              setNavColor();
            });

            angular.element($window).bind("resize", function() {
              setNavColor();
            });
          }

        };
      });
}