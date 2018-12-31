(function() {
    "use strict";

    var ruleCategory = {
        bindings: {
            ruleCategory: "<"
        },
        controller: "RuleCategoryController",
        controllerAs: "vm",
        templateUrl: "src/app/market-config/market-rules/rule-category/rule-category.html"
    };

    angular
        .module("market-rules")
        .component("ruleCategory", ruleCategory);
})();