(function() {
'use strict';

    angular
        .module("app.market-config")
        .component("marketConfig", {
            templateUrl: "src/app/market-config/market-config.html",
            controller: "MarketConfigController",
            controllerAs: "vm",
            bindings: {
                groupId: "<",
                fileTypeId: "<"
            }
        });
})();