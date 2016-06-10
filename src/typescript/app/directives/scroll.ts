module app.scroll {

  class scroll implements ng.IDirective {

    constructor(private $window: ng.IWindowService,
                private $location: ng.ILocationService,
                private $rootScope: ng.IRootScopeService,
                private $timeout: ng.ITimoutService) {
    }

    link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any) => {
      let nav = element[0].querySelector('.nav');
      let navBottom = nav.getBoundingClientRect().bottom;
      let windowHeight = this.$window.innerHeight;
      let aboutUs,
        aboutUsTop,
        services,
        servicesTop,
        process,
        processTop,
        projects,
        projectsTop,
        footer,
        footerTop,
        brain,
        brainTop,
        triangles,
        trianglesTop;

      scope.brainAnimateionRun = false;
      scope.trianglesAnimationRun = false;
      scope.frontLayer = true;
      scope.url = this.$location.path();
      scope.navGrey = (scope.url != '/');

      scope.$on('$routeChangeStart', (next, current) => {
        scope.frontLayer = true;
      });

      scope.$on('$routeChangeSuccess', (next, current) => {
        this.$timeout(() => {
          scope.frontLayer = false;
        }, 100);
      });

      scope.$on('$viewContentLoaded', () => {
        scope.url = this.$location.path();
        scope.navGrey = ((scope.url != '/ru') && (scope.url != '/en'));
        scope.lang = (~scope.url.indexOf('/en')) ? 'en' : 'ru';
      });

      this.$timeout(() => {
        scope.frontLayerPosition = 333;
      }, 4000);

      scope.setActiveMenuItem = () => {
        this.$rootScope.activeSectionClass = (footerTop < navBottom) ? '.footer' :
          (projectsTop < navBottom) ? '.projects' :
            (processTop < navBottom) ? '.process' :
              (servicesTop < navBottom) ? '.services' :
                (aboutUsTop < navBottom) ? '.about-us' : '';
        scope.activeSectionClass = this.$rootScope.activeSectionClass;
      };

      scope.animateElements = () => {
        brainTop = element[0].querySelector('.brain').getBoundingClientRect().top;
        if ((brainTop < (windowHeight - windowHeight * 0.2)) && !scope.brainAnimateionRun) {
          scope.brainAnimateionRun = true;
        }
        if ((trianglesTop < (windowHeight - windowHeight * 0.4)) && !scope.trianglesAnimationRun) {
          scope.trianglesAnimationRun = true;
        }
      }

      scope.setActiveMenuItem();

      scope.activeSectionClass = this.$rootScope.activeSectionClass;

      scope.setNavColor = (element) => {
        aboutUsTop = element[0].querySelector('.about-us').getBoundingClientRect().top;
        servicesTop = element[0].querySelector('.services').getBoundingClientRect().top;
        processTop = element[0].querySelector('.process').getBoundingClientRect().top;
        projectsTop = element[0].querySelector('.projects').getBoundingClientRect().top;
        footerTop = element[0].querySelector('.footer').getBoundingClientRect().top;
        trianglesTop = element[0].querySelector('.triangles').getBoundingClientRect().top;
        scope.$apply(() => {
          scope.navGrey = ((scope.url == '/en') || (scope.url == '/ru')) ? (aboutUsTop < navBottom) : true;
        });
      }

      angular.element(this.$window).bind("scroll", () => {
        scope.setNavColor(element);
        scope.setActiveMenuItem();
        scope.animateElements();
      });

      angular.element(this.$window).bind("resize", () => {
        scope.setNavColor();
        scope.setActiveMenuItem();
      });
    }

    static factory(): ng.IDirectiveFactory {
      const directive = ($window: ng.IWindowService, $location: ng.ILocationService, $rootScope: ng.IRootScopeService, $timeout: ng.ITimeoutService) => new scroll($window, $location, $rootScope, $timeout);
      directive.$inject = ['$window', '$location', '$rootScope', '$timeout'];
      return directive;
    }
  }

  angular
    .module('meldgraphics')
    .directive('scroll',
                scroll.factory());

}