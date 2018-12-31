(function () {
    "use strict";


    var managementRecon = {
        templateUrl: "src/app/management/management-recon/management-recon.html",
        controller: "ManagementReconController",
        controllerAs: "vm"
    };

    angular
        .module("management-recon")
        .component("managementRecon", managementRecon);
})();