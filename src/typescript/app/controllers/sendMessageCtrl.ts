module app.sendMessage {

  interface sendMessageModel {
    pageClass: string
  }

  class sendMessageCtrl implements sendMessageModel {

    static $inject = [];
    constructor(public pageClass: string = 'send-message') {

    }

  }

  angular
    .module('meldgraphics')
    .controller('sendMessageCtrl',
                 sendMessageCtrl);

}