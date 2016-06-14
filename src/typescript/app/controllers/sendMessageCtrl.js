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
