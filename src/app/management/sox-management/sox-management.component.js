(function() {
'use strict';

    angular
        .module('sox-management')
        .component('soxManagement', {
            templateUrl: 'src/app/management/sox-management/sox-management.html',
            controller: "SoxManagementController",
            controllerAs: "vm"
        });
})();