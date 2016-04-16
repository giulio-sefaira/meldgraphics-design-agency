module app.landingPage {
  
  interface landingPageModel extends app.meldgraphics.meldgraphicsModel {
    desktopRetina: boolean;
    desktop: boolean;
    tabletRetina: boolean;
    tablet: boolean;
    mobile: boolean;
  }
  
  class landingPageCtrl extends app.meldgraphics.meldgraphicsCtrl {

    constructor(options: landingPageModel) {
      super(options);
      
    }
  }

  angular
    .module('meldgraphics')
    .controller('landingPageCtrl',
      landingPageCtrl);
}