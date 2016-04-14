module app.sendMessage {

  interface sendMessageModel {
    pageClass: string
  }

  class sendMessageCtrl implements sendMessageModel {

    constructor(public pageClass: string = 'sendMessage') {

    }

  }

  angular
    .module('meldgraphics')
    .controller('sendMessageCtrl',
      sendMessageCtrl);
}