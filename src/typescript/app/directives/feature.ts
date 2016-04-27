module app.feature {

  class feature implements ng.IDirective {
    restrict = 'E';
    templateUrl = '/templates/directives/feature.html';
    replace = false;
    scope = {
      name: '=',
      title: '@',
      description: '@',
      retina: '='
    };

    constructor() { }

    link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any) => {

    }

    static factory(): ng.IDirectiveFactory {
      const directive = () => new uploadFileField();
      directive.$inject = [];
      return directive;
    }
  }

  angular
    .module('meldgraphics')
    .directive('feature', feature.factory());

}