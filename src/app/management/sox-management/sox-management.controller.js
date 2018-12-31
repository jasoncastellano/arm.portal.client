(function () {
    "use strict";

    angular
        .module("sox-management")
        .controller("SoxManagementController", soxManagementController);

    /* @ngInject */
    function soxManagementController($scope, storedDataService, $q) {
        var vm = angular.extend(this, {
            onSearch: search,
            resultsLoaded: false,
            reportIsVisible: false,
            facetsEnvironments: [],
            generateReport: generateReport,
            $onInit: function () {
                getFacetsEnvironments();
            }
        });

        function generateReport(selectedIds) {
            let config = {
                marketId: vm.searchConfig.fileType.marketId,
                ediRunIds: selectedIds,
                isValid: selectedIds && selectedIds.length > 0
            };

            $scope.$broadcast("generate-sox", config);
            vm.reportIsVisible = true;
        }

        function search(config) {
            vm.reportIsVisible = false;
            // always make a new object so $watch can fire even if searchConfig didnt change
            vm.searchConfig = {
                market: config.market,
                fileType: config.fileType,
                fromDate: config.fromDate,
                toDate: config.toDate,
                isValid: config.isValid()
            };
            vm.resultsLoaded = true;
        }

        function getFacetsEnvironments() {
           return $q
                .when(storedDataService.getFacetsEnvironments(true))
                .then((facetsEnvironments) => {
                    vm.facetsEnvironments = facetsEnvironments;
                    return vm.facetsEnvironments;
                });
        }
    }
})();