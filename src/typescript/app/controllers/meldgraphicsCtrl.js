var app;
(function (app) {
    var meldgraphics;
    (function (meldgraphics) {
        var meldgraphicsCtrl = (function () {
            function meldgraphicsCtrl($window, $location, showNav, lang, features) {
                var _this = this;
                if (showNav === void 0) { showNav = false; }
                this.$window = $window;
                this.$location = $location;
                this.showNav = showNav;
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
            meldgraphicsCtrl.prototype.toggleNav = function () {
                this.showNav = !this.showNav;
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
