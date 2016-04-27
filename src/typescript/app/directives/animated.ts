module app.animatedElement {

  class animated implements ng.IDirective {
    restrict = 'C';
    scope = {
      animation: '@',
      animationDelay: '@',
      compareElement: '@'
    };

    constructor(private $window: ng.IWindowService, private $timeout: ng.ITimeoutService) { }

    link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any) => {
      element.addClass(`${scope.animation}--before`);
      let restrictLine = this.$window.innerHeight - this.$window.innerHeight * 0.12;
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
          this.$timeout(() => {
            element.addClass(scope.animation);
            element.removeClass(`${scope.animation}--before`);
          }, scope.animationDelay || 0);
        }
      }

      angular.element(this.$window).bind("scroll", () => {
        runAnimation();
      });
    }

    static factory(): ng.IDirectiveFactory {
      const directive = ($window: ng.IWindowService, $timeout: ng.ITimeoutService) => new animated($window, $timeout);
      directive.$inject = ['$window', '$timeout'];
      return directive;
    }
  }

  angular
    .module('meldgraphics')
    .directive('animated', animated.factory());

}