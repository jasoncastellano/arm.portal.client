(function() {
    "use strict";

    var managementSearch = {
        bindings: {
            onSearch: "&",
            label: "@",
            onlyReconMarkets: "<"
        },
        controller: "ManagementSearchController",
        controllerAs: "vm",
        templateUrl: "src/app/management/management-search/management-search.html"
    };

    angular
        .module("app.management")
        .component("managementSearch", managementSearch);
})();