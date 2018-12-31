(function() {
    "use strict";

    var availableDatatable = {
        bindings: {
            searchConfig: "<",
            buttonLabel: "@",
            sectionLabel: "@",
            facetsEnvironments: "<",
            handleSelectedFiles: "&"
        },
        templateUrl: "src/app/management/available-datatable/available-datatable.html",
        controller: "AvailableDatatableController",
        controllerAs: "vm"
    };

    angular
        .module("app.management")
        .component("availableDatatable", availableDatatable);

    

})();