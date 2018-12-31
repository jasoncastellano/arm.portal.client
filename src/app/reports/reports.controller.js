(function () {
    "use strict";

    angular
        .module("app.reports")
        .controller("ReportsController", reportsController);

    /* @ngInject */
    function reportsController($scope, logger, reportsService, $stateParams, _) {
        var vm = angular.extend(this, {
            $onInit: onInit,
            showSearch: true,
            activeTab: 0
        });

        function onInit (){
            $scope.$on("reports-searched-parent", () => {
                $scope.$broadcast("reports-searched");
            })

            if(vm.marketId && vm.reconRunId) {
                vm.showSearch = false;
                reportsService
                    .getReportConfigurations(vm.marketId)
                    .then(function(data) {
                        reportsService.setReportsCriteria({
                            reportConfigurations: data.reportConfigurations,
                            marketId: vm.marketId,
                            reconRunId: vm.reconRunId
                        });

                        if(vm.reportConfigId) {
                            let reportConfig = _.find(reportsService.getReportsCriteria().reportConfigurations, (c) => c.id === $stateParams.reportConfigId);
                            if(reportConfig) {
                                if(_.startsWith(reportConfig.reportType, "ReconResults")) {
                                    vm.activeTab = 0;
                                } else if(reportConfig.reportType === "Totals") {
                                    vm.activeTab = 1;
                                } else {
                                    vm.activeTab = 2;
                                }
                            }
                        }
                        $scope.$broadcast("report-criteria-loaded");
                    });
            }
        }


    }
})();