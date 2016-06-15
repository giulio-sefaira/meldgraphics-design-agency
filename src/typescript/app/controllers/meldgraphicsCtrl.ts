module app.meldgraphics {
  
  export interface meldgraphicsModel {
    lang: string;
    features: any;
    scrollTop(duration: string): void;
    scrollToSection(elementSelector: string): void
  }

  export class meldgraphicsCtrl implements meldgraphicsModel {

    static $inject = ['$window', '$location'];
    constructor(
      private $window: ng.IWindowService,
      private $location: ng.ILocationService,
      public lang: string,
      public features: any) {

      angular.element(this.$window).bind("resize", () => {
        if (this.$window.innerWidth > 768) this.showNav = false;
      });

    }

    getUrlPath():string {
      return this.$location.path().substring(3);
    }

    setLang(lang): string {
      return this.lang = lang;
    }

  }
  
  angular
    .module('meldgraphics')
    .controller('meldgraphicsCtrl',
                 meldgraphicsCtrl);
}