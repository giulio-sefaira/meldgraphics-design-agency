module app.dropdownChooseList {

  angular
    .module('meldgraphics')
    .directive('dropdownChooseList', function () {
      return {
        restrict: 'A',
        templateUrl: '/templates/directives/dropdownChooseList.html',
        replace: false,
        scope: {
          title: "@",
          list: "="
        },
        link: function(scope, element, attrs) {
          scope.camelize = function(str) {
            return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
              return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
            }).replace(/\s+/g, '');
          }

          scope.showList = false;

          scope.openList = function() {
            scope.showList = !scope.showList;
          }
        }
      }
    });
}