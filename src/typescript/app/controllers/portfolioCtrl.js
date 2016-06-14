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
