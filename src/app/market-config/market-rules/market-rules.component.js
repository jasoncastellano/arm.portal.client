(function() {
    "use strict";

    var marketRules = {
        require: {
            parent: "^configCategory"
        },
        controller: "MarketRulesController",
        controllerAs: "vm",
        templateUrl: "src/app/market-config/market-rules/market-rules.html",
        bindings: {
            fileType: "<",
            isLoading: "<"
        }
    };

    angular
        .module("market-rules")
        .component("marketRules", marketRules);
})();