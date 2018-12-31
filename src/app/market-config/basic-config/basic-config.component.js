(function() {
    "use strict";

    var basicConfig = {
        require: {
            parent: "^configCategory"
        },
        controller: "BasicConfigController",
        controllerAs: "vm",
        templateUrl: "src/app/market-config/basic-config/basic-config.html",
        bindings: {
            fileType: "<",
            isLoading: "<"
        }
    };

    angular
        .module("app.market-config")
        .component("basicConfig", basicConfig);
})();