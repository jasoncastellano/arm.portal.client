(function() {
    'use strict';

    angular
        .module("management-recon")
        .component("runRequest", {
            templateUrl: "src/app/management/management-recon/modal/run-request/run-request.html",
            bindings: {
                onRequestClose: "&",
                onRequestDismiss: "&",
                resolve: "<",
                modalInstance: "<"
            },
            controller: "RunRequestController",
            controllerAs: "vm"
        });

})();