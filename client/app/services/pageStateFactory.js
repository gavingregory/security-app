(function(){
  'use strict';

  angular.module('app')
          .factory('pageStateFactory', [
          '$log',
          pageStateFactory
  ]);

  function pageStateFactory($log) {

    /**
     * crudState is a class that has has read/write/update/delete flags. Pages should each
     * instantiate a crudState to define what function of CRUD it is performing on an
     * entity. This is useful because they can pass that state to any directives,
     * and they can react to that state in a common manner.
     * @class
     * @param crudState {string} A string, either 'create', 'read', 'update' or 'delete'.
     */
    function _crudState (crudState) {
      if (crudState !== 'create' && crudState !== 'read' && crudState !== 'update' && crudState !== 'delete')
        throw TypeError('Page CRUD state requires a valid string');
      this.create = (crudState === 'create' ? true : false);
      this.read = (crudState === 'read'? true : false);
      this.update = (crudState === 'update'? true : false);
      this.delete = (crudState === 'delete'? true: false);
      this.display = crudState;
    }

    return {
      crudState : _crudState
    };
  }

})();
