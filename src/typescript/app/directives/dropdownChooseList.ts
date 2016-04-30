module app.dropdownChooseList {

  class dropdownChooseList implements ng.IDirective {
    restrict = 'A';
    templateUrl = '/templates/directives/dropdownChooseList.html';
    replace = false;
    scope = {
      title: "@",
      list: "=",
      checked: '='
    };

    constructor() { }

    link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any) => {
      scope.camelize = str => str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
        index == 0 ? letter.toLowerCase() : letter.toUpperCase()
      ).replace(/\s+/g, '');

      scope.showList = false;

      scope.checked = {};

      scope.openList = () => {
        scope.showList = !scope.showList;
      }
    }

    static factory(): ng.IDirectiveFactory {
      const directive = () => new dropdownChooseList();
      return directive;
    }

  }

  angular
    .module('meldgraphics')
    .directive('dropdownChooseList', dropdownChooseList.factory());

}