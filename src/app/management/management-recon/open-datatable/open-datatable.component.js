(function() {
    "use strict";

    var openDatatable = {
        bindings: {
            searchConfig: "<",
            facetsEnvironments: "<",
            onRequestRecon: "&"
        },
        templateUrl: "src/app/management/management-recon/open-datatable/open-datatable.html",
        controller: "OpenDatatableController",
        controllerAs: "vm"
    };

    angular
        .module("management-recon")
        .component("openDatatable", openDatatable);
})();