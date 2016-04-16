module app.selectField {

  angular
    .module('meldgraphics')
    .directive('selectField', function () {
      return {
        restrict: 'A',
        templateUrl: '/templates/directives/selectField.html',
        replace: false,
        scope: {
          list: '=',
          name: '@',
          placeholder: '@'
        },
        link: function(scope, element, attrs) {
          scope.showList = false;

          scope.openList = function() {
            scope.showList = !scope.showList;
          }

          scope.selectOption = function(item) {
            scope.selectValue = item;
            scope.showList = false;
          }
        }
      }
    });
}