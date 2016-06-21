(function(){
  'use strict';

angular
  .module('app')
  .controller('EventListController', [
    '$mdPanel', 'eventFactory', EventListController
  ]);

  function EventListController($mdPanel, eventFactory) {
    var vm = this;
    vm.events = [];

    eventFactory.list().then(function(res){
      vm.events = [].concat(res.data);
    })
    .catch(function(res){
      console.log(res);
    });

    this.showDialog = function($event, row) {
      console.log($event);
      console.log(row);
      var config = {
        attachTo: angular.element(document.body),
        controller: ['mdPanelRef', function (mdPanelRef) {
          var vm = this;
          this._mdPanelRef = mdPanelRef;
          vm.closeDialog = function () {
            this._mdPanelRef && this._mdPanelRef.close();
          };
        }],
        controllerAs: 'vm',
        locals: {
          event: row
        },
        disableParentScroll: true,
        templateUrl: 'app/views/events/_comments.html',
        hasBackdrop: true,
        panelClass: 'event-comment-dialog',
        position: $mdPanel.newPanelPosition()
          .absolute()
          .center(),
        trapFocus: true,
        zIndex: 150,
        clickOutsideToClose: true,
        escapeToClose: true,
        focusOnOpen: true
      };
      $mdPanel.open(config);
    };


  };
})();
