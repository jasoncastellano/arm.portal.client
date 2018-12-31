(function() {
    "use strict";

    var resultsCategoryDetail = {
        require: {
            parent: "^recon-results"
        },
        bindings: {
            reportConfig: "<",
            category: "<",
            currentlySelectedCategory: "<",
            runId: "<",
            print: "<"
        },
        controller: "ResultsCategoryDetailController",
        controllerAs: "vm",
        templateUrl: "src/app/reports/recon-results/results-category-detail/results-category-detail.html"
    };

    angular
        .module("recon-results")
        .component("resultsCategoryDetail", resultsCategoryDetail);
})();