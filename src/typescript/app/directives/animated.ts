module app.animatedElement {

  angular
    .module('meldgraphics')
    .directive('animated', function ($window, $timeout) {
      return {
        restrict: 'C',
        scope: {
          animation: '@',
          animationDelay: '@',
          compareElement: '@'
        },
        link: function(scope, element, attrs) {
          element.addClass(`${scope.animation}--before`);
          var restrictLine = $window.innerHeight - $window.innerHeight * 0.12;
          var previousElement = element[0].previousSibling;
          var elementParent = element[0].parentNode;
          var comparePoint;
          while (previousElement.nodeType == 3) {
            previousElement = previousElement.previousSibling;
            if (!previousElement) {
              break;
            }
          }

          function runAnimation() {
            if (scope.compareElement == 'parent') {
              comparePoint = elementParent.getBoundingClientRect().top;
            } else {
              comparePoint = (!previousElement) ? elementParent.getBoundingClientRect().top : previousElement.getBoundingClientRect().bottom;
            }

            if (comparePoint < restrictLine) {
              $timeout(() => {
                element.addClass(scope.animation);
                element.removeClass(`${scope.animation}--before`);
              }, scope.animationDelay || 0);
            }
          }

          angular.element($window).bind("scroll", function() {
            runAnimation();
          });
        }
      }
    });

}