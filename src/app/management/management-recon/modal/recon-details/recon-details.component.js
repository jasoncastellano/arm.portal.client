(function() {
    'use strict';

    angular
        .module("management-recon")
        .component("reconDetails", {
            templateUrl: "src/app/management/management-recon/modal/recon-details/recon-details.html",
            bindings: {
                resolve: "<",
                modalInstance: "<"
            },
            controller: "ReconDetailsController",
            controllerAs: "vm"
        });

})();