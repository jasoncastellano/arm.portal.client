(function() {
    "use strict";

    var finalizedDatatable = {
        bindings: {
            searchConfig: "<"
        },
        templateUrl: "src/app/management/management-recon/finalized-datatable/finalized-datatable.html",
        controller: "FinalizedDatatableController",
        controllerAs: "vm"
    };

    angular
        .module("management-recon")
        .component("finalizedDatatable", finalizedDatatable);
})();