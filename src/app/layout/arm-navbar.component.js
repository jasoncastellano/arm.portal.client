(function() {
    "use strict";

    var armNavbar = {
        controller: "ArmNavbarController",
        controllerAs: "vm",
        templateUrl: "src/app/layout/arm-navbar.html"
    };

    angular
        .module("app.layout")
        .component("armNavbar", armNavbar);

})();