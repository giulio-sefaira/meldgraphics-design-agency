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
