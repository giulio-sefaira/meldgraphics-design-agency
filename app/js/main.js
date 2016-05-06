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
            function meldgraphicsCtrl($window, $document, $rootScope, $timeout, showNav, features, scrollTopValue, scrollDurationValue, scrollOffset) {
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
                this.features = features;
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
                    _this.$location.path('/cantact/sendMessage');
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
                    compareElement: '@'
                };
                this.link = function (scope, element, attrs, ctrl) {
                    element.addClass(scope.animation + "--before");
                    var restrictLine = _this.$window.innerHeight - _this.$window.innerHeight * 0.12;
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
                var _this = this;
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
                    size: '='
                };
                this.link = function (scope, element, attrs, ctrl) {
                    scope.startAnimation = false;
                    scope.endAnimation = true;
                    scope.runAnimation = function (state) {
                        if (!state && !scope.startAnimation && scope.endAnimation) {
                            scope.startAnimation = true;
                            scope.endAnimation = false;
                            scope.disableCashing(0, 1000000);
                            _this.$timeout(function () {
                                scope.endAnimation = true;
                            }, 2800);
                        }
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
            function scroll($window, $location, $rootScope) {
                var _this = this;
                this.$window = $window;
                this.$location = $location;
                this.$rootScope = $rootScope;
                this.link = function (scope, element, attrs, ctrl) {
                    var nav = element[0].querySelector('.nav');
                    var navBottom = nav.getBoundingClientRect().bottom;
                    var windowHeight = _this.$window.innerHeight;
                    var aboutUs, aboutUsTop, services, servicesTop, process, processTop, projects, projectsTop, footer, footerTop, brain, brainTop, triangles, trianglesTop;
                    scope.brainAnimateionRun = false;
                    scope.trianglesAnimationRun = false;
                    scope.frontLayer = true;
                    scope.url = _this.$location.path();
                    scope.navGrey = (scope.url != '/');
                    scope.$on('$viewContentLoaded', function () {
                        aboutUs = element[0].querySelector('.about-us');
                        services = element[0].querySelector('.services');
                        process = element[0].querySelector('.process');
                        projects = element[0].querySelector('.projects');
                        footer = element[0].querySelector('.footer');
                        brain = element[0].querySelector('.article__brain');
                        triangles = element[0].querySelector('.triangles');
                        scope.frontLayer = false;
                        scope.url = _this.$location.path();
                        scope.navGrey = (scope.url != '/');
                    });
                    scope.setActiveMenuItem = function () {
                        _this.$rootScope.activeSectionClass = (footerTop < navBottom) ? '.footer' :
                            (projectsTop < navBottom) ? '.projects' :
                                (processTop < navBottom) ? '.process' :
                                    (servicesTop < navBottom) ? '.services' :
                                        (aboutUsTop < navBottom) ? '.about-us' : '';
                        scope.activeSectionClass = _this.$rootScope.activeSectionClass;
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
                    scope.activeSectionClass = _this.$rootScope.activeSectionClass;
                    scope.setNavColor = function () {
                        aboutUsTop = aboutUs.getBoundingClientRect().top;
                        servicesTop = services.getBoundingClientRect().top;
                        processTop = process.getBoundingClientRect().top;
                        projectsTop = projects.getBoundingClientRect().top;
                        footerTop = footer.getBoundingClientRect().top;
                        trianglesTop = triangles.getBoundingClientRect().top;
                        scope.$apply(function () {
                            scope.navGrey = (aboutUsTop < navBottom);
                        });
                    };
                    angular.element(_this.$window).bind("scroll", function () {
                        scope.setNavColor();
                        scope.setActiveMenuItem();
                        scope.animateElements();
                    });
                    angular.element(_this.$window).bind("resize", function () {
                        scope.setNavColor();
                        scope.setActiveMenuItem();
                    });
                };
            }
            scroll.factory = function () {
                var directive = function ($window, $location, $rootScope) { return new scroll($window, $location, $rootScope); };
                directive.$inject = ['$window', '$location', '$rootScope'];
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
            function selectField() {
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
                var directive = function () { return new selectField(); };
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
            DataAccessService.prototype.getFeatures = function () {
                return [{
                        name: '2',
                        title: 'UX/UI Design',
                        description: ['Website design', 'Application design'],
                        size: {
                            width: 150,
                            height: 160
                        }
                    },
                    {
                        name: '5',
                        title: 'Strategy',
                        description: ['Research facility', 'Content strategy', 'Market research', 'Business Analysis'],
                        size: {
                            width: 150,
                            height: 130
                        }
                    },
                    {
                        name: '6',
                        title: 'Development',
                        description: ['Front-end Development', 'Mobile Development', 'Technical Planning', 'Content Managment'],
                        size: {
                            width: 145,
                            height: 140
                        }
                    },
                    {
                        name: '3',
                        title: 'Branding',
                        description: ['Naming', 'Logo Development', 'Corporate Identity'],
                        size: {
                            width: 90,
                            height: 110
                        }
                    },
                    {
                        name: '1',
                        title: 'Print Design',
                        description: ['Outdoor Advertising', 'Polygraphy', 'Magazines & Books', 'Packaging'],
                        size: {
                            width: 140,
                            height: 130
                        }
                    },
                    {
                        name: '4',
                        title: 'Illustration',
                        description: ['Sketches', 'Book Illustration'],
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
/// <reference path="angular-file-upload/angular-file-upload.d.ts" />
/// <reference path="angular-scroll/angular-scroll.d.ts" />
/// <reference path="angularjs/angular-animate.d.ts" />
/// <reference path="angularjs/angular-resource.d.ts" />
/// <reference path="angularjs/angular-route.d.ts" />
/// <reference path="angularjs/angular.d.ts" />
/// <reference path="jquery/jquery.d.ts" />
/// <reference path="ng-file-upload/ng-file-upload.d.ts" />
/// <reference path="angularjs/angular-sanitize.d.ts" />
