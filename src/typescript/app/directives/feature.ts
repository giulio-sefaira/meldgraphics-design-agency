module app.feature {

  class feature implements ng.IDirective {
    restrict = 'C';
    templateUrl = '/templates/directives/feature.html';
    replace = false;
    scope = {
      name: '=',
      title: '=',
      description: '=',
      retina: '=',
      active: '=',
      size: '=',
      lang: '='
    };

    constructor(private $timeout: ng.ITimeoutService) { }

    link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any) => {
      scope.startAnimation = false;
      scope.endAnimation = true;
      scope.runAnimation = (state) => {
        if (!state && !scope.startAnimation && scope.endAnimation) {
          scope.startAnimation = true;
          scope.endAnimation = false;
          scope.disableCashing(0, 1000000);
          /*this.$timeout(() => {
            scope.endAnimation = true;
          }, 2800);*/
        }
      }
      scope.stopAnimation = () => {
        scope.startAnimation = false;
        scope.endAnimation = true;
      }      
      scope.cash = 1;
      scope.disableCashing = (min, max) => {
        scope.cash = Math.round(Math.random() * (max - min) + min);
      }
    }

    static factory(): ng.IDirectiveFactory {
      const directive = ($timeout: ng.ITimeoutService) => new feature($timeout);
      directive.$inject = ['$timeout'];
      return directive;
    }
  }

  angular
    .module('meldgraphics')
    .directive('feature',
                feature.factory());

}