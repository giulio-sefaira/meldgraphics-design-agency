module app.animatedElement {

  angular
    .module('meldgraphics')
    .directive('animated', ($window, $timeout) => {
      return {
        restrict: 'C',
        scope: {
          animation: '@',
          animationDelay: '@',
          compareElement: '@'
        },
        link: (scope, element, attrs) => {
          element.addClass(`${scope.animation}--before`);
          let restrictLine = $window.innerHeight - $window.innerHeight * 0.12;
          let previousElement = element[0].previousSibling;
          let elementParent = element[0].parentNode;
          let comparePoint;
          while (previousElement.nodeType == 3) {
            previousElement = previousElement.previousSibling;
            if (!previousElement) {
              break;
            }
          }

          let runAnimation = () => {
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

          angular.element($window).bind("scroll", () => {
            runAnimation();
          });
        }
      }
    });

}