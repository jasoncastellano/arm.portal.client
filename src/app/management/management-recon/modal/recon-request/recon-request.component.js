(function() {
    'use strict';

    angular
        .module("management-recon")
        .component("reconRequest", {
            templateUrl: "src/app/management/management-recon/modal/recon-request/recon-request.html",
            bindings: {
                onRequestClose: "&",
                onRequestDismiss: "&",
                resolve: "<",
                modalInstance: "<"
            },
            controller: "ReconRequestController",
            controllerAs: "vm"
        });

})();