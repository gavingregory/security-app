(function(){

  angular
    .module('app')
    .controller('MessagesController', [
      MessagesController
    ]);

  function MessagesController() {
    var vm = this;

    vm.messages = [];

    // messagesService
    //   .loadAllItems()
    //   .then(function(messages) {
    //     vm.messages = [].concat(messages);
    //   });
  }

})();
