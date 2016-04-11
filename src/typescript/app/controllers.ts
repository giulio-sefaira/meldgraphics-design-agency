module app.meldgraphics {
  interface meldgraphicsModel {
    showNav: boolean;
    toggleNav(): void;
  }

  class meldgraphicsCtrl implements meldgraphicsModel {
      showNav: boolean;

      constructor() {
          this.showNav = false;
      }

      toggleNav(): void {
          this.showNav = !this.showNav;
      }
  }

  angular
      .module('meldgraphics')
      .controller('meldgraphicsCtrl', meldgraphicsCtrl);
}