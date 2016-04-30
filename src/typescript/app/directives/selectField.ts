module app.selectField {

  class selectField implements ng.IDirective {
    restrict = 'A';
    templateUrl = '/templates/directives/selectField.html';
    replace = false;
    scope = {
      list: '=',
      selected: '=',
      name: '@',
      placeholder: '@'
    };

    constructor() { }

    link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any) => {
      scope.showList = false;

      scope.openList = () => {
        scope.showList = !scope.showList;
      }

      scope.selectOption = item => {
        scope.selected = item;
        scope.selectValue = item;
        scope.showList = false;
      }
    }

    static factory(): ng.IDirectiveFactory {
      const directive = () => new selectField();
      return directive;
    }
  }

  angular
    .module('meldgraphics')
    .directive('selectField', selectField.factory());

}