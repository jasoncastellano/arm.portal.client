(function() {
    "use strict";

    var shell = {
        controller: "ShellController",
        controllerAs: "vm",
        templateUrl: "src/app/layout/shell.html"
    };

    angular
        .module("app.layout")
        .component("shell", shell);

})();