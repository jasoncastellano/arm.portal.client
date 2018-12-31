(function() {
    "use strict";

    angular
        .module("management-recon")
        .directive("reconDetail", reconDetail);

    reconDetail.$inject = ["$compile"];
    

    function reconDetail() {

        var directive = {
            priority: 100,
            terminal: true,
            controller: "ReconDetailController",
            controllerAs: "vm",
            restrict: "A",
            scope: {
                reconRuns: "<",
                finalized: "="
            },
            templateUrl: "src/app/management/management-recon/recon-detail.html"
        };
        return directive;
    }

})();