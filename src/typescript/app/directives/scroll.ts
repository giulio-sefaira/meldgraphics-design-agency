module app.scroll {

  angular
      .module('meldgraphics')
      .directive('scroll', ($window, $location, $rootScope) => {
        return (scope, element, attrs) => {

            let nav = element[0].querySelector('.nav');
            let navBottom = nav.getBoundingClientRect().bottom;
            let windowHeight = $window.innerHeight;
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
            scope.url = $location.path();
            scope.navGrey = (scope.url != '/');

            scope.$on('$viewContentLoaded', () => {
              aboutUs = element[0].querySelector('.about-us');
              services = element[0].querySelector('.services');
              process = element[0].querySelector('.process');
              projects = element[0].querySelector('.projects');
              footer = element[0].querySelector('.footer');
              brain = element[0].querySelector('.article__brain');
              triangles = element[0].querySelector('.triangles');
              scope.frontLayer = false;
              scope.url = $location.path();
              scope.navGrey = (scope.url != '/');
            });

            scope.setActiveMenuItem = () => {
              $rootScope.activeSectionClass = (footerTop < navBottom) ? '.footer' :
                (projectsTop < navBottom) ? '.projects' :
                (processTop < navBottom) ? '.process' :
                (servicesTop < navBottom) ? '.services' :
                (aboutUsTop < navBottom) ? '.about-us' : '';
              scope.activeSectionClass = $rootScope.activeSectionClass;
            };

            scope.animateElements = () => {
              brainTop = brain.getBoundingClientRect().top;
              if ((brainTop < (windowHeight - windowHeight * 0.2)) && !scope.brainAnimateionRun) {
                scope.brainAnimateionRun = true;
              }
              if ((trianglesTop < (windowHeight - windowHeight * 0.15)) && !scope.trianglesAnimationRun) {
                scope.trianglesAnimationRun = true;
              }
            }

            scope.setActiveMenuItem();

            scope.activeSectionClass = $rootScope.activeSectionClass;

            scope.setNavColor = () => {
              aboutUsTop = aboutUs.getBoundingClientRect().top;
              servicesTop = services.getBoundingClientRect().top;
              processTop = process.getBoundingClientRect().top;
              projectsTop = projects.getBoundingClientRect().top;
              footerTop = footer.getBoundingClientRect().top;
              trianglesTop = triangles.getBoundingClientRect().top;
              scope.$apply(() => {
                scope.navGrey = (aboutUsTop < navBottom);
              });
            }

            angular.element($window).bind("scroll", () => {
              scope.setNavColor();
              scope.setActiveMenuItem();
              scope.animateElements();
            });

            angular.element($window).bind("resize", () => {
              scope.setNavColor();
              scope.setActiveMenuItem();
            });

        };
      });
}