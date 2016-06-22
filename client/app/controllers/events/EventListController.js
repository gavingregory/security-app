(function(){
  'use strict';

angular
  .module('app')
  .controller('EventListController', [
    '$mdPanel', '$scope', 'eventFactory', 'toastFactory', '_', EventListController
  ]);

  function EventListController($mdPanel, $scope, eventFactory, toastFactory, _) {
    var vm = this;
    vm.events = [];
    this.addCommentDialog = _addCommentDialog;
    this.showCommentsDialog = _showCommentsDialog;

    eventFactory.list().then(function(res){
      vm.events = [].concat(res.data);
    })
    .catch(function(res){
      toastFactory.showSimpleToast('Unable to fetch events.');
    });

    function _addCommentDialog($event, e) {

      var config = {
        controller: ['mdPanelRef', '$scope', 'commentFactory', function (mdPanelRef, $scope, commentFactory) {
          var commentVm = this;
          this._mdPanelRef = mdPanelRef;
          commentVm.closeDialog = _closeDialog;
          this.create = _create;
          this.comment = {};

          function _create (event_id, comment) {
            commentFactory.create(event_id, comment)
              .then(function (res) {
                /* inject new back into the main array */
                for (var i = 0; i < vm.events.length; i++) {
                  if (vm.events[i]._id === res.data._id) {
                    vm.events[i].comments = res.data.comments;
                    break;
                  }
                }
                _closeDialog();
              })
              .catch(function (res) {
                toastFactory.showSimpleToast('Unable to create comment.');
              });
          }

          function _closeDialog () {
            commentVm._mdPanelRef && commentVm._mdPanelRef.close();
          };

        }],
        locals: {
          event: e
        },
        templateUrl: 'app/views/events/_addComment.html'
      };

      _showDialog($event, config);
    }

    function _showCommentsDialog($event, e) {
      var config = {
        controller: ['mdPanelRef', function (mdPanelRef) {
          var vm = this;
          this._mdPanelRef = mdPanelRef;
          vm.closeDialog = function () {
            this._mdPanelRef && this._mdPanelRef.close();
          };
        }],
        locals: {
          event: e
        },
        templateUrl: 'app/views/events/_comments.html'
      };

      _showDialog($event, config);
    }

    function _showDialog ($event, _config) {
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
        disableParentScroll: true,
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

      _.extend(config, _config); // inject and overwite properties in config with _config

      $mdPanel.open(config);
    };


  };
})();
