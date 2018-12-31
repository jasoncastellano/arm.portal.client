(function() {
"use strict";

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module("app.dashboard")
        .component("dashboard", {
            templateUrl: "src/app/dashboard/dashboard.html",
            controller: "DashboardController",
            controllerAs: "vm",
            bindings: {
                
            }
        });
})();