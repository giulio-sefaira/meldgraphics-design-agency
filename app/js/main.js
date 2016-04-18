var app;
(function (app) {
    var main = angular.module('meldgraphics', ['ngAnimate',
        'duScroll',
        'ngRoute',
        'common.services',
        'angularFileUpload']);
    main.config(routeConfig);
    routeConfig.$inject = ['$routeProvider'];
    function routeConfig($routeProvider) {
        $routeProvider
            .when('/', {
            templateUrl: '/templates/views/landingPage.html',
            controller: 'landingPageCtrl as vm'
        })
            .when('/portfolio', {
            templateUrl: '/templates/views/portfolio.html',
            controller: 'portfolioCtrl as vm'
        })
            .when('/contact', {
            templateUrl: '/templates/views/contact.html',
            controller: 'contactCtrl as vm'
        })
            .when('/contact/sendMessage', {
            templateUrl: '/templates/views/sendMessage.html',
            controller: 'sendMessageCtrl as vm'
        })
            .otherwise('/');
    }
})(app || (app = {}));
var app;
(function (app) {
    var meldgraphics;
    (function (meldgraphics) {
        class meldgraphicsCtrl {
            constructor($window, $document, $rootScope, $timeout, showNav = false, scrollTopValue = 0, scrollDurationValue = 2000, scrollOffset = 70) {
                this.$window = $window;
                this.$document = $document;
                this.$rootScope = $rootScope;
                this.$timeout = $timeout;
                this.showNav = showNav;
                this.scrollTopValue = scrollTopValue;
                this.scrollDurationValue = scrollDurationValue;
                this.scrollOffset = scrollOffset;
                angular.element(this.$window).bind("resize", () => {
                    if (this.$window.innerWidth > 768)
                        this.showNav = false;
                });
            }
            toggleNav() {
                this.showNav = !this.showNav;
            }
            scrollTop(duration = this.scrollDurationValue) {
                this.$document.scrollTop(this.scrollTopValue, duration);
            }
            scrollToSection(elementSelector) {
                this.$timeout(() => {
                    var scrollOffset = this.$document[0].querySelector('.nav').offsetHeight - 10;
                    var targetElement = this.$document[0].querySelector(elementSelector);
                    this.$document.scrollToElement(targetElement, scrollOffset, this.scrollDurationValue / 2);
                    this.$rootScope.activeSectionClass = elementSelector;
                }, 10);
            }
        }
        meldgraphicsCtrl.$inject = ['$window', '$document', '$rootScope', '$timeout'];
        meldgraphics.meldgraphicsCtrl = meldgraphicsCtrl;
        angular
            .module('meldgraphics')
            .controller('meldgraphicsCtrl', meldgraphicsCtrl);
    })(meldgraphics = app.meldgraphics || (app.meldgraphics = {}));
})(app || (app = {}));
// Collapse angular into ng
var ng = angular;
var app;
(function (app) {
    var contact;
    (function (contact) {
        class contactCtrl {
            constructor(dataAccessService, pageClass = 'contact', projectBudgetValues, designDevelopmentOptions, printIllustrationOptions, uploadFileTypes, brandingStrategyOptions, projectDeadlineOptions) {
                this.dataAccessService = dataAccessService;
                this.pageClass = pageClass;
                this.projectBudgetValues = projectBudgetValues;
                this.designDevelopmentOptions = designDevelopmentOptions;
                this.printIllustrationOptions = printIllustrationOptions;
                this.uploadFileTypes = uploadFileTypes;
                this.brandingStrategyOptions = brandingStrategyOptions;
                this.projectDeadlineOptions = projectDeadlineOptions;
                this.projectBudgetValues = dataAccessService.getProjectBudgetResource();
                this.designDevelopmentOptions = dataAccessService.getDesignDevelopmentOptions();
                this.printIllustrationOptions = dataAccessService.getPrintIllustrationOptions();
                this.uploadFileTypes = dataAccessService.getUploadFileTypes();
                this.brandingStrategyOptions = dataAccessService.getBrandingStrategyOptions();
                this.projectDeadlineOptions = dataAccessService.getProjectDeadlineOptions();
            }
        }
        contactCtrl.$inject = ['dataAccessService'];
        angular
            .module('meldgraphics')
            .controller('contactCtrl', contactCtrl);
    })(contact = app.contact || (app.contact = {}));
})(app || (app = {}));
var app;
(function (app) {
    var landingPage;
    (function (landingPage) {
        class landingPageCtrl extends app.meldgraphics.meldgraphicsCtrl {
            constructor($window, $document, $rootScope, $timeout, options) {
                super(options);
                this.$window = $window;
                this.$document = $document;
                this.$rootScope = $rootScope;
                this.$timeout = $timeout;
                this.retina = (this.$window.devicePixelRatio > 1) ? true : false;
                this.resolution = 'desktop';
                this.cashValue = this.disableCashing();
                this.defineResolution();
                angular.element(this.$window).bind("resize", () => {
                    this.defineResolution();
                });
            }
            disableCashing(min = 0, max = 1000000) {
                return Math.round(Math.random() * (max - min) + min);
            }
            defineResolution() {
                this.resolution = (this.$window.innerWidth <= 768) ? 'tablet' : 'desktop';
                if (this.$window.innerWidth <= 320) {
                    this.resolution = 'mobile';
                }
            }
        }
        landingPageCtrl.$inject = ['$window', '$document', '$rootScope', '$timeout'];
        angular
            .module('meldgraphics')
            .controller('landingPageCtrl', landingPageCtrl);
    })(landingPage = app.landingPage || (app.landingPage = {}));
})(app || (app = {}));
var app;
(function (app) {
    var portfolio;
    (function (portfolio) {
        class portfolioCtrl {
            constructor(dataAccessService, pageClass = 'portfolio', projectFilter = '', projectsList) {
                this.dataAccessService = dataAccessService;
                this.pageClass = pageClass;
                this.projectFilter = projectFilter;
                this.projectsList = projectsList;
                this.projectsList = dataAccessService.getPortfolioResource();
            }
        }
        portfolioCtrl.$inject = ['dataAccessService'];
        angular
            .module('meldgraphics')
            .controller('portfolioCtrl', portfolioCtrl);
    })(portfolio = app.portfolio || (app.portfolio = {}));
})(app || (app = {}));
var app;
(function (app) {
    var sendMessage;
    (function (sendMessage) {
        class sendMessageCtrl {
            constructor(pageClass = 'sendMessage') {
                this.pageClass = pageClass;
            }
        }
        angular
            .module('meldgraphics')
            .controller('sendMessageCtrl', sendMessageCtrl);
    })(sendMessage = app.sendMessage || (app.sendMessage = {}));
})(app || (app = {}));
var app;
(function (app) {
    var dropdownChooseList;
    (function (dropdownChooseList) {
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
                link: function (scope, element, attrs) {
                    scope.camelize = function (str) {
                        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
                            return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
                        }).replace(/\s+/g, '');
                    };
                    scope.showList = false;
                    scope.openList = function () {
                        scope.showList = !scope.showList;
                    };
                }
            };
        });
    })(dropdownChooseList = app.dropdownChooseList || (app.dropdownChooseList = {}));
})(app || (app = {}));
var app;
(function (app) {
    var scroll;
    (function (scroll) {
        angular
            .module('meldgraphics')
            .directive('scroll', function ($window, $location, $rootScope) {
            return function (scope, element, attrs) {
                var nav = element[0].querySelector('.nav');
                var navBottom = nav.getBoundingClientRect().bottom;
                var windowHeight = $window.innerHeight;
                var aboutUs, aboutUsTop, services, servicesTop, process, processTop, projects, projectsTop, footer, footerTop, brain, brainTop;
                scope.brainAnimateionRun = false;
                scope.url = $location.path();
                scope.navGrey = ($location.path() != '/') ? true : false;
                scope.$on('$viewContentLoaded', function () {
                    aboutUs = element[0].querySelector('.about-us');
                    services = element[0].querySelector('.services');
                    process = element[0].querySelector('.process');
                    projects = element[0].querySelector('.projects');
                    footer = element[0].querySelector('.footer');
                    brain = element[0].querySelector('.article__brain');
                    scope.url = $location.path();
                    scope.navGrey = (scope.url != '/') ? true : false;
                });
                scope.setActiveMenuItem = function () {
                    $rootScope.activeSectionClass = (footerTop < navBottom) ? '.footer' :
                        (projectsTop < navBottom) ? '.projects' :
                            (processTop < navBottom) ? '.process' :
                                (servicesTop < navBottom) ? '.services' :
                                    (aboutUsTop < navBottom) ? '.about-us' : '';
                    scope.activeSectionClass = $rootScope.activeSectionClass;
                };
                scope.animateElements = () => {
                    brainTop = brain.getBoundingClientRect().top;
                    if ((brainTop < (windowHeight - windowHeight * 0.3)) && !scope.brainAnimateionRun) {
                        scope.brainAnimateionRun = true;
                    }
                };
                scope.setActiveMenuItem();
                scope.activeSectionClass = $rootScope.activeSectionClass;
                scope.setNavColor = function () {
                    aboutUsTop = aboutUs.getBoundingClientRect().top;
                    servicesTop = services.getBoundingClientRect().top;
                    processTop = process.getBoundingClientRect().top;
                    projectsTop = projects.getBoundingClientRect().top;
                    footerTop = footer.getBoundingClientRect().top;
                    scope.$apply(function () {
                        scope.navGrey = (aboutUsTop < navBottom) ? true : false;
                    });
                };
                angular.element($window).bind("scroll", function () {
                    scope.setNavColor();
                    scope.setActiveMenuItem();
                    scope.animateElements();
                });
                angular.element($window).bind("resize", function () {
                    scope.setNavColor();
                    scope.setActiveMenuItem();
                });
            };
        });
    })(scroll = app.scroll || (app.scroll = {}));
})(app || (app = {}));
var app;
(function (app) {
    var selectField;
    (function (selectField) {
        angular
            .module('meldgraphics')
            .directive('selectField', function () {
            return {
                restrict: 'A',
                templateUrl: '/templates/directives/selectField.html',
                replace: false,
                scope: {
                    list: '=',
                    name: '@',
                    placeholder: '@'
                },
                link: function (scope, element, attrs) {
                    scope.showList = false;
                    scope.openList = function () {
                        scope.showList = !scope.showList;
                    };
                    scope.selectOption = function (item) {
                        scope.selectValue = item;
                        scope.showList = false;
                    };
                }
            };
        });
    })(selectField = app.selectField || (app.selectField = {}));
})(app || (app = {}));
var app;
(function (app) {
    var uploadFileField;
    (function (uploadFileField) {
        angular
            .module('meldgraphics')
            .directive('uploadFileField', function (FileUploader) {
            return {
                restrict: 'E',
                templateUrl: '/templates/directives/uploadFileField.html',
                replace: false,
                scope: {
                    fileTypes: '=',
                    name: '@'
                },
                link: function (scope, element, attrs) {
                    scope.uploader = new FileUploader();
                    scope.formatBytes = function (bytes, decimals) {
                        if (bytes == 0)
                            return '0 Byte';
                        var k = 1000;
                        var dm = decimals + 1 || 3;
                        var sizes = ['bytes', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'];
                        var i = Math.floor(Math.log(bytes) / Math.log(k));
                        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
                    };
                    scope.uploader.onAfterAddingFile = function (item) {
                        scope.selectedFileType = item.file.name.match(/\.(.+)$/)[1];
                        var isExcepted = false;
                        scope.fileTypes.forEach((value) => {
                            if (scope.selectedFileType == value) {
                                isExcepted = true;
                                return;
                            }
                        });
                        if (isExcepted)
                            return;
                        item.remove();
                        this.value = '';
                    };
                }
            };
        });
    })(uploadFileField = app.uploadFileField || (app.uploadFileField = {}));
})(app || (app = {}));
var app;
(function (app) {
    var common;
    (function (common) {
        angular.module('common.services', ['ngResource']);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
var app;
(function (app) {
    var common;
    (function (common) {
        class DataAccessService {
            constructor($resource) {
                this.$resource = $resource;
            }
            getProjectBudgetResource() {
                return [
                    100,
                    500,
                    1000,
                    5000,
                    10000
                ];
            }
            getDesignDevelopmentOptions() {
                return [
                    {
                        title: 'Ui/Ux Design',
                        options: ['Website design', 'Application design']
                    },
                    {
                        title: 'Development',
                        options: ['Front-end development', 'Mobile development', 'Technical planning', 'Content management']
                    }
                ];
            }
            getPrintIllustrationOptions() {
                return [
                    {
                        title: 'Print Design',
                        options: ['Outdoor advertising', 'Polygraphy', 'Magazines and books', 'Packaging']
                    },
                    {
                        title: 'Illustration',
                        options: ['Sketches', 'Book illustration']
                    }
                ];
            }
            getUploadFileTypes() {
                return ['pdf', 'zip', 'doc', 'jpg'];
            }
            getBrandingStrategyOptions() {
                return [
                    {
                        title: 'Branding',
                        options: ['Naming', 'Logo development', 'Corporate identity']
                    },
                    {
                        title: 'Strategy',
                        options: ['Research facility', 'Content strategy', 'Market research', 'Business analysis']
                    }
                ];
            }
            getProjectDeadlineOptions() {
                return [
                    'Can you make it yesterday?',
                    'In a week',
                    'in a month',
                    '2-3 months',
                    'I have more time'
                ];
            }
            getPortfolioResource() {
                return [{
                        title: 'Life Lines',
                        imageUrl: 'img/thumb-1.jpg',
                        url: 'http://google.ru',
                        type: 'branding'
                    },
                    {
                        title: 'Horizon Advisor',
                        imageUrl: 'img/thumb-2.jpg',
                        url: 'http://yandex.ru',
                        type: 'design ui/ux'
                    },
                    {
                        title: 'VegFit',
                        imageUrl: 'img/thumb-3.jpg',
                        url: 'http://fb.com',
                        type: 'print design & illustration'
                    },
                    {
                        title: 'Life Lines',
                        imageUrl: 'img/thumb-1.jpg',
                        url: 'http://google.ru',
                        type: 'print design & illustration'
                    },
                    {
                        title: 'Horizon Advisor',
                        imageUrl: 'img/thumb-2.jpg',
                        url: 'http://yandex.ru',
                        type: 'design ui/ux'
                    },
                    {
                        title: 'VegFit',
                        imageUrl: 'img/thumb-3.jpg',
                        url: 'http://fb.com',
                        type: 'branding'
                    },
                    {
                        title: 'Life Lines',
                        imageUrl: 'img/thumb-1.jpg',
                        url: 'http://google.ru',
                        type: 'branding'
                    },
                    {
                        title: 'Horizon Advisor',
                        imageUrl: 'img/thumb-2.jpg',
                        url: 'http://yandex.ru',
                        type: 'print design & illustration'
                    },
                    {
                        title: 'VegFit',
                        imageUrl: 'img/thumb-3.jpg',
                        url: 'http://fb.com',
                        type: 'design ui/ux'
                    }];
            }
        }
        DataAccessService.$inject = ['$resource'];
        common.DataAccessService = DataAccessService;
        angular
            .module('common.services')
            .service('dataAccessService', DataAccessService);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
/// <reference path="angularjs/angular.d.ts" />
/// <reference path="jquery/jquery.d.ts" />
/// <reference path="angularjs/angular-animate.d.ts" />
/// <reference path="angular-scroll/angular-scroll.d.ts" />
/// <reference path="angularjs/angular-route.d.ts" />
/// <reference path="angularjs/angular-resource.d.ts" />
/// <reference path="angular-file-upload/angular-file-upload.d.ts" />
/// <reference path="ng-file-upload/ng-file-upload.d.ts" />
