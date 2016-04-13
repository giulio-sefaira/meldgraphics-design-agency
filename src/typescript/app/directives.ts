module app.scroll {

  angular
      .module('meldgraphics')
      .directive('scroll', function ($window) {
        return function(scope, element, attrs) {
        
          var nav = element[0].querySelector('.nav');
          var navBottom = nav.getBoundingClientRect().bottom;
          var aboutUs,
              aboutUsTop;

          scope.$on('$viewContentLoaded', function(){
            aboutUs = element[0].querySelector('.about-us');
            aboutUsTop = aboutUs.getBoundingClientRect().top;
          });

          angular.element($window).bind("scroll", function() {
            aboutUsTop = aboutUs.getBoundingClientRect().top;

            if (aboutUsTop < navBottom) {
              element.addClass('document--nav-grey');
            } else {
              element.removeClass('document--nav-grey');
            }
          });
        };
      });
}