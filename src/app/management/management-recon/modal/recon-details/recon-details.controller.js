(function () {
    'use strict';

    angular
        .module('management-recon')
        .controller('ReconDetailsController', reconDetailsController);

    reconDetailsController.$inject = []; 

    function reconDetailsController() {
        /* jshint validthis:true */
        var vm = angular.extend(this,
        {
            close: function() {
                vm.modalInstance.close();
            }
    });
    }
})();
