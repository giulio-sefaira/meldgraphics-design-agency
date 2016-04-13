module app.sendMessage {

  interface sendMessageModel {

  }

  class sendMessageCtrl implements sendMessageModel {

    constructor() {

    }

  }

  angular
    .module('meldgraphics')
    .controller('sendMessageCtrl',
      sendMessageCtrl);
}