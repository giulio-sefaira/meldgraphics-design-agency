angular.module('meldgraphics', ['ngAnimate']);
var meldgraphicsCtrl = function() {
  var vm = this;
  
  vm.showNav = false;

  vm.toggleNav = function() {
      vm.showNav = !vm.showNav;
  }
}
angular
  .module('meldgraphics')
  .controller('meldgraphicsCtrl', meldgraphicsCtrl);
