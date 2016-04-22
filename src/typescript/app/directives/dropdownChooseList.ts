module app.dropdownChooseList {

  angular
    .module('meldgraphics')
    .directive('dropdownChooseList', () => {
      return {
        restrict: 'A',
        templateUrl: '/templates/directives/dropdownChooseList.html',
        replace: false,
        scope: {
          title: "@",
          list: "="
        },
        link: (scope, element, attrs) => {
          scope.camelize = str => str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
              index == 0 ? letter.toLowerCase() : letter.toUpperCase()
            ).replace(/\s+/g, '');

          scope.showList = false;

          scope.openList = () => {
            scope.showList = !scope.showList;
          }
        }
      }
    });
}