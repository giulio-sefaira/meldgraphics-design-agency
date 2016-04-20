var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        var meldgraphicsCtrl = (function () {
            function meldgraphicsCtrl($window, $document, $rootScope, $timeout, showNav, scrollTopValue, scrollDurationValue, scrollOffset) {
                var _this = this;
                if (showNav === void 0) { showNav = false; }
                if (scrollTopValue === void 0) { scrollTopValue = 0; }
                if (scrollDurationValue === void 0) { scrollDurationValue = 2000; }
                if (scrollOffset === void 0) { scrollOffset = 70; }
                this.$window = $window;
                this.$document = $document;
                this.$rootScope = $rootScope;
                this.$timeout = $timeout;
                this.showNav = showNav;
                this.scrollTopValue = scrollTopValue;
                this.scrollDurationValue = scrollDurationValue;
                this.scrollOffset = scrollOffset;
                angular.element(this.$window).bind("resize", function () {
                    if (_this.$window.innerWidth > 768)
                        _this.showNav = false;
                });
            }
            meldgraphicsCtrl.prototype.toggleNav = function () {
                this.showNav = !this.showNav;
            };
            meldgraphicsCtrl.prototype.scrollTop = function (duration) {
                if (duration === void 0) { duration = this.scrollDurationValue; }
                this.$document.scrollTop(this.scrollTopValue, duration);
            };
            meldgraphicsCtrl.prototype.scrollToSection = function (elementSelector) {
                var _this = this;
                this.$timeout(function () {
                    var scrollOffset = _this.$document[0].querySelector('.nav').offsetHeight - 10;
                    var targetElement = _this.$document[0].querySelector(elementSelector);
                    _this.$document.scrollToElement(targetElement, scrollOffset, _this.scrollDurationValue / 2);
                    _this.$rootScope.activeSectionClass = elementSelector;
                }, 10);
            };
            meldgraphicsCtrl.$inject = ['$window', '$document', '$rootScope', '$timeout'];
            return meldgraphicsCtrl;
        }());
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
        var contactCtrl = (function () {
            function contactCtrl(dataAccessService, pageClass, projectBudgetValues, designDevelopmentOptions, printIllustrationOptions, uploadFileTypes, brandingStrategyOptions, projectDeadlineOptions) {
                if (pageClass === void 0) { pageClass = 'contact'; }
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
            contactCtrl.$inject = ['dataAccessService'];
            return contactCtrl;
        }());
        angular
            .module('meldgraphics')
            .controller('contactCtrl', contactCtrl);
    })(contact = app.contact || (app.contact = {}));
})(app || (app = {}));
var app;
(function (app) {
    var landingPage;
    (function (landingPage) {
        var landingPageCtrl = (function (_super) {
            __extends(landingPageCtrl, _super);
            function landingPageCtrl($window, $document, $rootScope, $timeout, options) {
                var _this = this;
                _super.call(this, options);
                this.$window = $window;
                this.$document = $document;
                this.$rootScope = $rootScope;
                this.$timeout = $timeout;
                this.retina = (this.$window.devicePixelRatio > 1) ? true : false;
                this.resolution = 'desktop';
                this.cashValue = this.disableCashing();
                this.defineResolution();
                angular.element(this.$window).bind("resize", function () {
                    _this.defineResolution();
                });
            }
            landingPageCtrl.prototype.disableCashing = function (min, max) {
                if (min === void 0) { min = 0; }
                if (max === void 0) { max = 1000000; }
                return Math.round(Math.random() * (max - min) + min);
            };
            landingPageCtrl.prototype.defineResolution = function () {
                this.resolution = (this.$window.innerWidth <= 768) ? 'tablet' : 'desktop';
                if (this.$window.innerWidth <= 320) {
                    this.resolution = 'mobile';
                }
            };
            landingPageCtrl.$inject = ['$window', '$document', '$rootScope', '$timeout'];
            return landingPageCtrl;
        }(app.meldgraphics.meldgraphicsCtrl));
        angular
            .module('meldgraphics')
            .controller('landingPageCtrl', landingPageCtrl);
    })(landingPage = app.landingPage || (app.landingPage = {}));
})(app || (app = {}));
var app;
(function (app) {
    var portfolio;
    (function (portfolio) {
        var portfolioCtrl = (function () {
            function portfolioCtrl(dataAccessService, pageClass, projectFilter, projectsList) {
                if (pageClass === void 0) { pageClass = 'portfolio'; }
                if (projectFilter === void 0) { projectFilter = ''; }
                this.dataAccessService = dataAccessService;
                this.pageClass = pageClass;
                this.projectFilter = projectFilter;
                this.projectsList = projectsList;
                this.projectsList = dataAccessService.getPortfolioResource();
            }
            portfolioCtrl.$inject = ['dataAccessService'];
            return portfolioCtrl;
        }());
        angular
            .module('meldgraphics')
            .controller('portfolioCtrl', portfolioCtrl);
    })(portfolio = app.portfolio || (app.portfolio = {}));
})(app || (app = {}));
var app;
(function (app) {
    var sendMessage;
    (function (sendMessage) {
        var sendMessageCtrl = (function () {
            function sendMessageCtrl(pageClass) {
                if (pageClass === void 0) { pageClass = 'sendMessage'; }
                this.pageClass = pageClass;
            }
            return sendMessageCtrl;
        }());
        angular
            .module('meldgraphics')
            .controller('sendMessageCtrl', sendMessageCtrl);
    })(sendMessage = app.sendMessage || (app.sendMessage = {}));
})(app || (app = {}));
var app;
(function (app) {
    var animatedElement;
    (function (animatedElement) {
        angular
            .module('meldgraphics')
            .directive('animated', function ($window, $timeout) {
            return {
                restrict: 'C',
                scope: {
                    animation: '@',
                    animationDelay: '@',
                    compareElement: '@'
                },
                link: function (scope, element, attrs) {
                    element.addClass(scope.animation + "--before");
                    var restrictLine = $window.innerHeight - $window.innerHeight * 0.12;
                    var previousElement = element[0].previousSibling;
                    var elementParent = element[0].parentNode;
                    var comparePoint;
                    while (previousElement.nodeType == 3) {
                        previousElement = previousElement.previousSibling;
                        if (!previousElement) {
                            break;
                        }
                    }
                    function runAnimation() {
                        if (scope.compareElement == 'parent') {
                            comparePoint = elementParent.getBoundingClientRect().top;
                        }
                        else {
                            comparePoint = (!previousElement) ? elementParent.getBoundingClientRect().top : previousElement.getBoundingClientRect().bottom;
                        }
                        if (comparePoint < restrictLine) {
                            $timeout(function () {
                                element.addClass(scope.animation);
                                element.removeClass(scope.animation + "--before");
                            }, scope.animationDelay || 0);
                        }
                    }
                    angular.element($window).bind("scroll", function () {
                        runAnimation();
                    });
                }
            };
        });
    })(animatedElement = app.animatedElement || (app.animatedElement = {}));
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
                var aboutUs, aboutUsTop, services, servicesTop, process, processTop, projects, projectsTop, footer, footerTop, brain, brainTop, triangles, trianglesTop;
                scope.brainAnimateionRun = false;
                scope.trianglesAnimationRun = false;
                scope.frontLayer = true;
                scope.url = $location.path();
                scope.navGrey = ($location.path() != '/') ? true : false;
                scope.$on('$viewContentLoaded', function () {
                    aboutUs = element[0].querySelector('.about-us');
                    services = element[0].querySelector('.services');
                    process = element[0].querySelector('.process');
                    projects = element[0].querySelector('.projects');
                    footer = element[0].querySelector('.footer');
                    brain = element[0].querySelector('.article__brain');
                    triangles = element[0].querySelector('.triangles');
                    scope.frontLayer = false;
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
                scope.animateElements = function () {
                    brainTop = brain.getBoundingClientRect().top;
                    if ((brainTop < (windowHeight - windowHeight * 0.2)) && !scope.brainAnimateionRun) {
                        scope.brainAnimateionRun = true;
                    }
                    if ((trianglesTop < (windowHeight - windowHeight * 0.15)) && !scope.trianglesAnimationRun) {
                        scope.trianglesAnimationRun = true;
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
                    trianglesTop = triangles.getBoundingClientRect().top;
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
                        scope.fileTypes.forEach(function (value) {
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
        var DataAccessService = (function () {
            function DataAccessService($resource) {
                this.$resource = $resource;
            }
            DataAccessService.prototype.getProjectBudgetResource = function () {
                return [
                    100,
                    500,
                    1000,
                    5000,
                    10000
                ];
            };
            DataAccessService.prototype.getDesignDevelopmentOptions = function () {
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
            };
            DataAccessService.prototype.getPrintIllustrationOptions = function () {
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
            };
            DataAccessService.prototype.getUploadFileTypes = function () {
                return ['pdf', 'zip', 'doc', 'jpg'];
            };
            DataAccessService.prototype.getBrandingStrategyOptions = function () {
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
            };
            DataAccessService.prototype.getProjectDeadlineOptions = function () {
                return [
                    'Can you make it yesterday?',
                    'In a week',
                    'in a month',
                    '2-3 months',
                    'I have more time'
                ];
            };
            DataAccessService.prototype.getPortfolioResource = function () {
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
            };
            DataAccessService.$inject = ['$resource'];
            return DataAccessService;
        }());
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
/// <reference path="../node_modules/immutable/dist/immutable.d.ts" />
