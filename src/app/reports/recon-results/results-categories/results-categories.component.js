(function() {
    "use strict";

    var resultsCategories = {
        require: {
            parent: "^recon-results"
        },
        bindings: {
            resultsCategories: "<",
            onSelected: "&",
            align: "@"
        },
        controller: "ResultsCategoriesController",
        controllerAs: "vm",
        templateUrl: "src/app/reports/recon-results/results-categories/results-categories.html"
    };

    angular
        .module("recon-results")
        .component("resultsCategories", resultsCategories);
})();