module app.selectField {

  angular
    .module('meldgraphics')
    .directive('selectField', () => {
      return {
        restrict: 'A',
        templateUrl: '/templates/directives/selectField.html',
        replace: false,
        scope: {
          list: '=',
          name: '@',
          placeholder: '@'
        },
        link: (scope, element, attrs) => {
          scope.showList = false;

          scope.openList = () => {
            scope.showList = !scope.showList;
          }

          scope.selectOption = item => {
            scope.selectValue = item;
            scope.showList = false;
          }
        }
      }
    });
}