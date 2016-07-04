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
        'angularFileUpload',
        'ngSanitize']);
    main.config(routeConfig);
    routeConfig.$inject = ['$routeProvider'];
    function routeConfig($routeProvider) {
        $routeProvider
            .when('/en', {
            templateUrl: '/templates/views/en/landingPage.html',
            controller: 'landingPageCtrl as vm'
        })
            .when('/en/portfolio', {
            templateUrl: '/templates/views/en/portfolio.html',
            controller: 'portfolioCtrl as vm'
        })
            .when('/en/contact', {
            templateUrl: '/templates/views/en/contact.html',
            controller: 'contactCtrl as vm'
        })
            .when('/en/contact/sendMessage', {
            templateUrl: '/templates/views/en/sendMessage.html',
            controller: 'sendMessageCtrl as vm'
        })
            .when('/ru', {
            templateUrl: '/templates/views/ru/landingPage.html',
            controller: 'landingPageCtrl as vm'
        })
            .when('/ru/portfolio', {
            templateUrl: '/templates/views/ru/portfolio.html',
            controller: 'portfolioCtrl as vm'
        })
            .when('/ru/contact', {
            templateUrl: '/templates/views/ru/contact.html',
            controller: 'contactCtrl as vm'
        })
            .when('/ru/contact/sendMessage', {
            templateUrl: '/templates/views/ru/sendMessage.html',
            controller: 'sendMessageCtrl as vm'
        })
            .when('/ru/portfolio/presentHorizon', {
            templateUrl: '/templates/views/ru/portfolio/horizonAdvisor.html',
            controller: 'portfolioDetailCtrl as vm'
        })
            .when('/en/portfolio/presentHorizon', {
            templateUrl: '/templates/views/en/portfolio/horizonAdvisor.html',
            controller: 'portfolioDetailCtrl as vm'
        })
            .otherwise('/en');
    }
})(app || (app = {}));
var app;
(function (app) {
    var meldgraphics;
    (function (meldgraphics) {
        var meldgraphicsCtrl = (function () {
            function meldgraphicsCtrl($window, $location, lang, features) {
                var _this = this;
                this.$window = $window;
                this.$location = $location;
                this.lang = lang;
                this.features = features;
                angular.element(this.$window).bind("resize", function () {
                    if (_this.$window.innerWidth > 768)
                        _this.showNav = false;
                });
            }
            meldgraphicsCtrl.prototype.getUrlPath = function () {
                return this.$location.path().substring(3);
            };
            meldgraphicsCtrl.prototype.setLang = function (lang) {
                return this.lang = lang;
            };
            meldgraphicsCtrl.$inject = ['$window', '$location'];
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
            function contactCtrl(dataAccessService, $scope, $http, $q, $location, pageClass, projectBudgetValues, designDevelopmentOptions, printIllustrationOptions, uploadFileTypes, brandingStrategyOptions, projectDeadlineOptions) {
                if (pageClass === void 0) { pageClass = 'contact'; }
                this.dataAccessService = dataAccessService;
                this.$scope = $scope;
                this.$http = $http;
                this.$q = $q;
                this.$location = $location;
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
                this.$http = $http;
                this.$q = $q;
                this.formData = {};
            }
            contactCtrl.prototype.submitForm = function (form, $event) {
                var _this = this;
                $event.preventDefault();
                form.$submitted = true;
                if (form.$invalid)
                    return false;
                this.sendData(this.formData).then(function (data) {
                    var lang = (_this.$location.path().indexOf('/ru/')) ? 'ru' : 'en';
                    _this.$location.path("/" + lang + "/contact/sendMessage");
                }, function () {
                    console.log('Error');
                });
            };
            contactCtrl.prototype.sendData = function (formData) {
                var _this = this;
                var self = this;
                return self.$q(function (resolve, reject) {
                    _this.sendFiles(formData.files).then(function (uploadFiles) {
                        var sendData = angular.copy(formData);
                        sendData.files = uploadFiles;
                        self.$http.post('/handler.php', sendData)
                            .success(function (data) {
                            resolve(data);
                        })
                            .error(function (data, status) {
                            reject(data, status);
                        });
                    }, function (error) {
                        reject(error);
                    });
                });
            };
            contactCtrl.prototype.sendFiles = function (files) {
                var self = this;
                return self.$q(function (resolve, reject) {
                    var formData = new FormData();
                    angular.forEach(files, function (value, key) {
                        formData.append('upload' + key, value._file);
                    });
                    self.$http.post('/handler.php', formData, {
                        transformRequest: angular.identity,
                        headers: { 'Content-Type': undefined }
                    })
                        .success(function (data) {
                        resolve(data);
                    })
                        .error(function (data, status) {
                        reject(data, status);
                    });
                });
            };
            contactCtrl.$inject = ['dataAccessService', '$scope', '$http', '$q', '$location'];
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
            function landingPageCtrl($window, $document, $rootScope, $timeout, dataAccessService, options) {
                var _this = this;
                _super.call(this, options);
                this.$window = $window;
                this.$document = $document;
                this.$rootScope = $rootScope;
                this.$timeout = $timeout;
                this.dataAccessService = dataAccessService;
                this.mobileDevice = this.mobileAndTabletCheck();
                this.retina = (this.$window.devicePixelRatio > 1);
                this.resolution = 'desktop';
                this.cashValue = this.disableCashing();
                this.features = this.dataAccessService.getFeatures();
                this.defineResolution();
                angular.element(this.$window).bind("resize", function () {
                    _this.defineResolution();
                });
                angular.element(this.$window).bind("scroll", function () {
                    _this.setActiveFeature({});
                });
            }
            landingPageCtrl.prototype.setActiveFeature = function (activeFeature) {
                this.features.filter(function (item) { return item.$$hashKey != activeFeature.$$hashKey; })
                    .forEach(function (item, index, array) {
                    item.active = false;
                });
                activeFeature.active = !activeFeature.active;
            };
            landingPageCtrl.prototype.mobileAndTabletCheck = function () {
                var check = false;
                (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
                    check = true; })(navigator.userAgent || navigator.vendor || window.opera);
                return check;
            };
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
            landingPageCtrl.$inject = ['$window', '$document', '$rootScope', '$timeout', 'dataAccessService'];
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
    var portfolioDetail;
    (function (portfolioDetail) {
        var portfolioDetailCtrl = (function () {
            function portfolioDetailCtrl(pageClass) {
                if (pageClass === void 0) { pageClass = 'portfolio-detail'; }
                this.pageClass = pageClass;
            }
            portfolioDetailCtrl.$inject = [];
            return portfolioDetailCtrl;
        }());
        angular
            .module('meldgraphics')
            .controller('portfolioDetailCtrl', portfolioDetailCtrl);
    })(portfolioDetail = app.portfolioDetail || (app.portfolioDetail = {}));
})(app || (app = {}));
var app;
(function (app) {
    var sendMessage;
    (function (sendMessage) {
        var sendMessageCtrl = (function () {
            function sendMessageCtrl(pageClass) {
                if (pageClass === void 0) { pageClass = 'send-message'; }
                this.pageClass = pageClass;
            }
            sendMessageCtrl.$inject = [];
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
        var animated = (function () {
            function animated($window, $timeout) {
                var _this = this;
                this.$window = $window;
                this.$timeout = $timeout;
                this.restrict = 'C';
                this.scope = {
                    animation: '@',
                    animationDelay: '@',
                    compareElement: '@',
                    animationRunPoint: '@'
                };
                this.link = function (scope, element, attrs, ctrl) {
                    element.addClass(scope.animation + "--before");
                    var restrictLine = _this.$window.innerHeight - _this.$window.innerHeight * ((scope.animationRunPoint || 12) / 100);
                    var previousElement = element[0].previousSibling;
                    var elementParent = element[0].parentNode;
                    var comparePoint;
                    while (previousElement.nodeType == 3) {
                        previousElement = previousElement.previousSibling;
                        if (!previousElement) {
                            break;
                        }
                    }
                    var runAnimation = function () {
                        if (scope.compareElement == 'parent') {
                            comparePoint = elementParent.getBoundingClientRect().top;
                        }
                        else {
                            comparePoint = (!previousElement) ? elementParent.getBoundingClientRect().top : previousElement.getBoundingClientRect().bottom;
                        }
                        if (comparePoint < restrictLine) {
                            _this.$timeout(function () {
                                element.addClass(scope.animation);
                                element.removeClass(scope.animation + "--before");
                            }, scope.animationDelay || 0);
                        }
                    };
                    angular.element(_this.$window).bind("scroll", function () {
                        runAnimation();
                    });
                };
            }
            animated.factory = function () {
                var directive = function ($window, $timeout) { return new animated($window, $timeout); };
                directive.$inject = ['$window', '$timeout'];
                return directive;
            };
            return animated;
        }());
        angular
            .module('meldgraphics')
            .directive('animated', animated.factory());
    })(animatedElement = app.animatedElement || (app.animatedElement = {}));
})(app || (app = {}));
var app;
(function (app) {
    var dropdownChooseList;
    (function (dropdownChooseList_1) {
        var dropdownChooseList = (function () {
            function dropdownChooseList() {
                this.restrict = 'A';
                this.templateUrl = '/templates/directives/dropdownChooseList.html';
                this.replace = false;
                this.scope = {
                    title: "@",
                    list: "=",
                    checked: '='
                };
                this.link = function (scope, element, attrs, ctrl) {
                    scope.camelize = function (str) { return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
                        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
                    }).replace(/\s+/g, ''); };
                    scope.showList = false;
                    scope.checked = {};
                    scope.openList = function () {
                        scope.showList = !scope.showList;
                    };
                };
            }
            dropdownChooseList.factory = function () {
                var directive = function () { return new dropdownChooseList(); };
                return directive;
            };
            return dropdownChooseList;
        }());
        angular
            .module('meldgraphics')
            .directive('dropdownChooseList', dropdownChooseList.factory());
    })(dropdownChooseList = app.dropdownChooseList || (app.dropdownChooseList = {}));
})(app || (app = {}));
var app;
(function (app) {
    var feature;
    (function (feature_1) {
        var feature = (function () {
            function feature($timeout) {
                this.$timeout = $timeout;
                this.restrict = 'C';
                this.templateUrl = '/templates/directives/feature.html';
                this.replace = false;
                this.scope = {
                    name: '=',
                    title: '=',
                    description: '=',
                    retina: '=',
                    active: '=',
                    size: '=',
                    lang: '='
                };
                this.link = function (scope, element, attrs, ctrl) {
                    scope.startAnimation = false;
                    scope.endAnimation = true;
                    scope.runAnimation = function (state) {
                        if (!state && !scope.startAnimation && scope.endAnimation) {
                            scope.startAnimation = true;
                            scope.endAnimation = false;
                            scope.disableCashing(0, 1000000);
                        }
                    };
                    scope.stopAnimation = function () {
                        scope.startAnimation = false;
                        scope.endAnimation = true;
                    };
                    scope.cash = 1;
                    scope.disableCashing = function (min, max) {
                        scope.cash = Math.round(Math.random() * (max - min) + min);
                    };
                };
            }
            feature.factory = function () {
                var directive = function ($timeout) { return new feature($timeout); };
                directive.$inject = ['$timeout'];
                return directive;
            };
            return feature;
        }());
        angular
            .module('meldgraphics')
            .directive('feature', feature.factory());
    })(feature = app.feature || (app.feature = {}));
})(app || (app = {}));
var app;
(function (app) {
    var scroll;
    (function (scroll_1) {
        var scroll = (function () {
            function scroll($window, $document, $location, $rootScope, $timeout) {
                var _this = this;
                this.$window = $window;
                this.$document = $document;
                this.$location = $location;
                this.$rootScope = $rootScope;
                this.$timeout = $timeout;
                this.link = function (scope, element, attrs, ctrl) {
                    var nav = element[0].querySelector('.nav');
                    var navBottom = nav.getBoundingClientRect().bottom;
                    var windowHeight = _this.$window.innerHeight;
                    var scrollTopValue = 0;
                    var scrollDurationValue = 2000;
                    var scrollOffset = 70;
                    var aboutUs, aboutUsTop, services, servicesTop, process, processTop, projects, projectsTop, footer, footerTop, brain, brainTop, triangles, trianglesTop;
                    scope.brainAnimateionRun = false;
                    scope.trianglesAnimationRun = false;
                    scope.frontLayer = true;
                    scope.url = _this.$location.path();
                    scope.navGrey = (scope.url != '/');
                    scope.showNav = false;
                    scope.$on('$routeChangeStart', function (next, current) {
                        scope.frontLayer = true;
                    });
                    scope.$on('$routeChangeSuccess', function (next, current) {
                        _this.$timeout(function () {
                            scope.frontLayer = false;
                        }, 100);
                        _this.$timeout(function () {
                            if (scope.homePage) {
                                scope.scrollMotion();
                            }
                        }, 1000);
                    });
                    scope.$on('$viewContentLoaded', function () {
                        scope.url = _this.$location.path();
                        scope.navGrey = ((scope.url != '/ru') && (scope.url != '/en'));
                        scope.lang = (~scope.url.indexOf('/en')) ? 'en' : 'ru';
                        scope.homePage = ((scope.url == '/en') || (scope.url == '/ru'));
                    });
                    _this.$timeout(function () {
                        scope.frontLayerPosition = 333;
                    }, 4000);
                    scope.setActiveMenuItem = function () {
                        if (scope.homePage) {
                            scope.activeSectionClass = (footerTop < navBottom) ? '.footer' :
                                (projectsTop < navBottom) ? '.projects' :
                                    (processTop < navBottom) ? '.process' :
                                        (servicesTop < navBottom) ? '.services' :
                                            (aboutUsTop < navBottom) ? '.about-us' : '';
                        }
                    };
                    scope.toggleNav = function () {
                        scope.showNav = !scope.showNav;
                    };
                    scope.animateElements = function () {
                        if (scope.homePage) {
                            brainTop = element[0].querySelector('.brain').getBoundingClientRect().top;
                            if ((brainTop < (windowHeight - windowHeight * 0.2)) && !scope.brainAnimateionRun) {
                                scope.brainAnimateionRun = true;
                            }
                            if ((trianglesTop < (windowHeight - windowHeight * 0.4)) && !scope.trianglesAnimationRun) {
                                scope.trianglesAnimationRun = true;
                            }
                        }
                    };
                    scope.scrollMotion = function () {
                        var scrollOffset = element[0].querySelector('.nav').offsetHeight - 20;
                        var targetElement = element[0].querySelector(scope.selectedItemClass);
                        _this.$document.scrollToElement(targetElement, scrollOffset, scrollDurationValue / 2);
                    };
                    scope.scrollTop = function (duration) {
                        if (duration === void 0) { duration = scrollDurationValue; }
                        _this.$document.scrollTop(scrollTopValue, duration);
                    };
                    scope.onLangChange = function () {
                        if (_this.$window.innerWidth < 550) {
                            scope.toggleNav();
                        }
                    };
                    scope.scrollToSection = function (elementSelector) {
                        scope.selectedItemClass = elementSelector;
                        if (_this.$window.innerWidth < 550) {
                            scope.toggleNav();
                        }
                        if (scope.homePage) {
                            scope.scrollMotion();
                        }
                    };
                    scope.setActiveMenuItem();
                    scope.setNavColor = function (element) {
                        if (scope.homePage) {
                            aboutUsTop = element[0].querySelector('.about-us').getBoundingClientRect().top;
                            servicesTop = element[0].querySelector('.services').getBoundingClientRect().top;
                            processTop = element[0].querySelector('.process').getBoundingClientRect().top;
                            projectsTop = element[0].querySelector('.projects').getBoundingClientRect().top;
                            footerTop = element[0].querySelector('.footer').getBoundingClientRect().top;
                            trianglesTop = element[0].querySelector('.triangles').getBoundingClientRect().top;
                        }
                        scope.$apply(function () {
                            scope.navGrey = (scope.homePage) ? (aboutUsTop < navBottom) : true;
                        });
                    };
                    angular.element(_this.$window).bind("scroll", function () {
                        scope.setNavColor(element);
                        scope.setActiveMenuItem();
                        scope.animateElements();
                    });
                    angular.element(_this.$window).bind("resize", function () {
                        scope.setNavColor(element);
                        scope.setActiveMenuItem();
                    });
                };
            }
            scroll.factory = function () {
                var directive = function ($window, $document, $location, $rootScope, $timeout) { return new scroll($window, $document, $location, $rootScope, $timeout); };
                directive.$inject = ['$window', '$document', '$location', '$rootScope', '$timeout'];
                return directive;
            };
            return scroll;
        }());
        angular
            .module('meldgraphics')
            .directive('scroll', scroll.factory());
    })(scroll = app.scroll || (app.scroll = {}));
})(app || (app = {}));
var app;
(function (app) {
    var selectField;
    (function (selectField_1) {
        var selectField = (function () {
            function selectField($document) {
                this.$document = $document;
                this.restrict = 'A';
                this.templateUrl = '/templates/directives/selectField.html';
                this.replace = false;
                this.scope = {
                    list: '=',
                    selected: '=',
                    name: '@',
                    placeholder: '@'
                };
                this.link = function (scope, element, attrs, ctrl) {
                    scope.showList = false;
                    scope.openList = function () {
                        scope.showList = !scope.showList;
                    };
                    scope.selectOption = function (item) {
                        scope.selected = item;
                        scope.selectValue = item;
                        scope.showList = false;
                    };
                };
            }
            selectField.factory = function () {
                var directive = function ($document) { return new selectField($document); };
                directive.$inject = ['$document'];
                return directive;
            };
            return selectField;
        }());
        angular
            .module('meldgraphics')
            .directive('selectField', selectField.factory());
    })(selectField = app.selectField || (app.selectField = {}));
})(app || (app = {}));
var app;
(function (app) {
    var uploadFileField;
    (function (uploadFileField_1) {
        var uploadFileField = (function () {
            function uploadFileField(FileUploader) {
                var _this = this;
                this.FileUploader = FileUploader;
                this.restrict = 'E';
                this.templateUrl = '/templates/directives/uploadFileField.html';
                this.replace = false;
                this.scope = {
                    fileTypes: '=',
                    name: '@',
                    selectFiles: '='
                };
                this.link = function (scope, element, attrs, ctrl) {
                    scope.uploader = new _this.FileUploader();
                    scope.selectFiles = scope.uploader.queue;
                    scope.formatBytes = function (bytes, decimals) {
                        if (bytes == 0)
                            return '0 Byte';
                        var k = 1000;
                        var dm = decimals + 1 || 3;
                        var sizes = ['bytes', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'];
                        var i = Math.floor(Math.log(bytes) / Math.log(k));
                        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
                    };
                    scope.selectedFileType = function (item) { return item.file.name.match(/\.(.+)$/)[1]; };
                    scope.uploader.onAfterAddingFile = function (item) {
                        var selectedFileType = scope.selectedFileType(item);
                        var isExcepted = false;
                        scope.fileTypes.forEach(function (value) {
                            if (selectedFileType == value) {
                                isExcepted = true;
                                return;
                            }
                        });
                        if (isExcepted)
                            return;
                        item.remove();
                        _this.value = '';
                    };
                };
            }
            uploadFileField.factory = function () {
                var directive = function (FileUploader) { return new uploadFileField(FileUploader); };
                directive.$inject = ['FileUploader'];
                return directive;
            };
            return uploadFileField;
        }());
        angular
            .module('meldgraphics')
            .directive('uploadFileField', uploadFileField.factory());
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
                    '&#8364;100 - &#8364;500',
                    '&#8364;500 - &#8364;1000',
                    '&#8364;1000 - &#8364;5000',
                    '&#8364;5000 - &#8364;10000',
                    '> &#8364;10000'
                ];
            };
            DataAccessService.prototype.getDesignDevelopmentOptions = function () {
                return {
                    ru: [
                        {
                            title: 'Ui/Ux Дизайн',
                            options: ['Веб-дизайн', 'Веб-разработка']
                        },
                        {
                            title: 'Разработка',
                            options: ['Front-end разработка', 'Мобильные приложения', 'Техническое планирование', 'Контент-менеджмент']
                        }
                    ],
                    en: [
                        {
                            title: 'Ui/Ux Design',
                            options: ['Website design', 'Application design']
                        },
                        {
                            title: 'Development',
                            options: ['Front-end development', 'Mobile development', 'Technical planning', 'Content management']
                        }
                    ]
                };
            };
            DataAccessService.prototype.getPrintIllustrationOptions = function () {
                return {
                    ru: [
                        {
                            title: 'Печатный дизайн',
                            options: ['Наружная реклама', 'Полиграфия', 'Журналы и книги', 'Упаковки']
                        },
                        {
                            title: 'Иллюстрация',
                            options: ['Скетчи', 'Иллюстрации к книгам']
                        }
                    ],
                    en: [
                        {
                            title: 'Print Design',
                            options: ['Outdoor advertising', 'Polygraphy', 'Magazines and books', 'Packaging']
                        },
                        {
                            title: 'Illustration',
                            options: ['Sketches', 'Book illustration']
                        }
                    ]
                };
            };
            DataAccessService.prototype.getUploadFileTypes = function () {
                return ['pdf', 'zip', 'doc', 'jpg'];
            };
            DataAccessService.prototype.getBrandingStrategyOptions = function () {
                return {
                    ru: [
                        {
                            title: 'Брендинг',
                            options: ['Нейминг', 'Разработка логотипа', 'Корпоративная айдентика']
                        },
                        {
                            title: 'Стратегия',
                            options: ['Исследование объекта', 'Коммуникационная стратегия', 'Исследование рынка', 'Бизнес-анализ']
                        }
                    ],
                    en: [
                        {
                            title: 'Branding',
                            options: ['Naming', 'Logo development', 'Corporate identity']
                        },
                        {
                            title: 'Strategy',
                            options: ['Research facility', 'Content strategy', 'Market research', 'Business analysis']
                        }
                    ]
                };
            };
            DataAccessService.prototype.getProjectDeadlineOptions = function () {
                return {
                    ru: [
                        'Уже должен быть готов!',
                        'Неделя',
                        'Месяц',
                        '2-3 месяца',
                        'У меня есть больше времени'
                    ],
                    en: [
                        'Can you make it yesterday?',
                        'In a week',
                        'in a month',
                        '2-3 months',
                        'I have more time'
                    ]
                };
            };
            DataAccessService.prototype.getFeatures = function () {
                return [{
                        name: '2',
                        title: {
                            en: 'UX/UI Design',
                            ru: 'UX/UI Дизайн'
                        },
                        description: {
                            en: ['Website design', 'Application design'],
                            ru: ['Веб-дизайн', 'Веб-разработка']
                        },
                        size: {
                            width: 150,
                            height: 160
                        }
                    },
                    {
                        name: '5',
                        title: {
                            en: 'Strategy',
                            ru: 'Бизнес Стратегия'
                        },
                        description: {
                            en: ['Research facility', 'Content strategy', 'Market research', 'Business Analysis'],
                            ru: ['Исследование объекта', 'Коммуникационная стратегия', 'Исследование рынка', 'Бизнес-анализ']
                        },
                        size: {
                            width: 150,
                            height: 130
                        }
                    },
                    {
                        name: '6',
                        title: {
                            en: 'Development',
                            ru: 'Разработка'
                        },
                        description: {
                            en: ['Front-end Development', 'Mobile Development', 'Technical Planning', 'Content Managment'],
                            ru: ['Front-end разработка', 'Мобильные приложения', 'Техническое планирование', 'Контент-менеджмент']
                        },
                        size: {
                            width: 145,
                            height: 140
                        }
                    },
                    {
                        name: '3',
                        title: {
                            en: 'Branding',
                            ru: 'Брендинг'
                        },
                        description: {
                            en: ['Naming', 'Logo Development', 'Corporate Identity'],
                            ru: ['Нейминг', 'Разработка логотипов', 'Корпоративная айдентика']
                        },
                        size: {
                            width: 90,
                            height: 110
                        }
                    },
                    {
                        name: '1',
                        title: {
                            en: 'Print Design',
                            ru: 'Печатный дизайн'
                        },
                        description: {
                            en: ['Outdoor Advertising', 'Polygraphy', 'Magazines & Books', 'Packaging'],
                            ru: ['Наружная реклама', 'Полиграфия', 'Журналы и книги', 'Упаковки']
                        },
                        size: {
                            width: 140,
                            height: 130
                        }
                    },
                    {
                        name: '4',
                        title: {
                            en: 'Illustration',
                            ru: 'Иллюстрация'
                        },
                        description: {
                            en: ['Sketches', 'Book Illustration'],
                            ru: ['Скетчи', 'Иллюстрации к книгам']
                        },
                        size: {
                            width: 150,
                            height: 110
                        }
                    }];
            };
            DataAccessService.prototype.getPortfolioResource = function () {
                return [{
                        title: 'Life Lines',
                        imageUrl: 'img/thumb-1.jpg',
                        url: '/portfolio/presentHorizon',
                        type: 'branding'
                    },
                    {
                        title: 'Horizon Advisor',
                        imageUrl: 'img/thumb-2.jpg',
                        url: '/portfolio/presentHorizon',
                        type: 'design ui/ux'
                    },
                    {
                        title: 'VegFit',
                        imageUrl: 'img/thumb-3.jpg',
                        url: '/portfolio/presentHorizon',
                        type: 'print design & illustration'
                    },
                    {
                        title: 'Life Lines',
                        imageUrl: 'img/thumb-1.jpg',
                        url: '/portfolio/presentHorizon',
                        type: 'print design & illustration'
                    },
                    {
                        title: 'Horizon Advisor',
                        imageUrl: 'img/thumb-2.jpg',
                        url: '/portfolio/presentHorizon',
                        type: 'design ui/ux'
                    },
                    {
                        title: 'VegFit',
                        imageUrl: 'img/thumb-3.jpg',
                        url: '/portfolio/presentHorizon',
                        type: 'branding'
                    },
                    {
                        title: 'Life Lines',
                        imageUrl: 'img/thumb-1.jpg',
                        url: '/portfolio/presentHorizon',
                        type: 'branding'
                    },
                    {
                        title: 'Horizon Advisor',
                        imageUrl: 'img/thumb-2.jpg',
                        url: '/portfolio/presentHorizon',
                        type: 'print design & illustration'
                    },
                    {
                        title: 'VegFit',
                        imageUrl: 'img/thumb-3.jpg',
                        url: '/portfolio/presentHorizon',
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
/// <reference path="angular-file-upload/angular-file-upload.d.ts" />
/// <reference path="angular-scroll/angular-scroll.d.ts" />
/// <reference path="angularjs/angular-animate.d.ts" />
/// <reference path="angularjs/angular-resource.d.ts" />
/// <reference path="angularjs/angular-route.d.ts" />
/// <reference path="angularjs/angular.d.ts" />
/// <reference path="jquery/jquery.d.ts" />
/// <reference path="ng-file-upload/ng-file-upload.d.ts" />
/// <reference path="angularjs/angular-sanitize.d.ts" />
