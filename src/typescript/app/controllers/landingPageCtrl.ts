module app.landingPage {
  
  import IWindowService = angular.IWindowService;
  interface landingPageModel extends app.meldgraphics.meldgraphicsModel {
    resolution: string,
    retina: boolean,
    cashValue: number,
    defineResolution(): void,
    desableCashing(): number
  }

   class landingPageCtrl extends app.meldgraphics.meldgraphicsCtrl {

    static $inject = ['$window', '$document', '$rootScope'];
    constructor(private $window: IWindowService,
                private $document: ng.IDocumentService,
                private $rootScope: ng.IRootScopeService,
                options: landingPageModel) {
      super(options);

      this.retina = (this.$window.devicePixelRatio > 1) ? true : false;
      this.resolution = 'desktop';
      this.cashValue = this.disableCashing();

      this.defineResolution();

      angular.element(this.$window).bind("resize", () => {
        this.defineResolution();
      });

    }

    disableCashing(min: number = 0, max: number = 1000000): number {
      return Math.round(Math.random() * (max - min) + min);
    }

    defineResolution(): void {
      this.resolution = (this.$window.innerWidth <= 768) ? 'tablet' : 'desktop';
      if (this.$window.innerWidth <= 320) {
        this.resolution = 'mobile';
      }
    }
  }

  angular
    .module('meldgraphics')
    .controller('landingPageCtrl',
                 landingPageCtrl);
}