module app.meldgraphics {
  
  export interface meldgraphicsModel {
    showNav: boolean;
    lang: string;
    features: any;
    toggleNav(): void;
    scrollTop(duration: string): void;
    scrollToSection(elementSelector: string): void
  }

  export class meldgraphicsCtrl implements meldgraphicsModel {

    static $inject = ['$window', '$location'];
    constructor(
      private $window: ng.IWindowService,
      private $location: ng.ILocationService,
      public showNav: boolean = false,
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

    toggleNav(): void {
      this.showNav = !this.showNav;
    }

  }
  
  angular
    .module('meldgraphics')
    .controller('meldgraphicsCtrl',
                 meldgraphicsCtrl);
}