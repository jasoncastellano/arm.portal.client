(function () {
    'use strict';

    angular
        .module('app.reports')
        .controller('ReportsSearchController', reportsSearch);


    /* @ngInject */
    function reportsSearch(dataservice, logger, $scope, reportsService, storedDataService, $q) {
        var vm = angular.extend(this, {
            searchConfig: {

                isValid: function () {
                    return angular.isDefined(this.market) && angular.isDefined(this.fileType) && angular.isDefined(this.reconRun);
                }
            },
            markets: [],
            fileTypes: [],
            reconRuns: [],
            reportConfigurations: [],
            onFileTypeChange: onFileTypeChange,
            getReconRuns: getReconRuns,
            sectionLabel: "Reports Search",
            onSearch: onSearch,
            $onInit: onInit,
            sidebarToggled: true,
            loadingRuns: false,
            loadingMarkets: false
        });

        function onInit() {
            vm.isCollapsed = !vm.parent.showSearch;
            getMarkets(true);
        }

        function onFileTypeChange() {
            getReconRuns();
            getReportConfigurations();
        }

        function onSearch() {
            var reportsCriteria = {
                reportConfigurations: vm.reportConfigurations,
                reconRunId: vm.searchConfig.reconRun.id,
                marketId: vm.searchConfig.fileType.marketId
            };
            reportsService.setReportsCriteria(reportsCriteria);
            $scope.$emit("reports-searched-parent");
        }

        function getMarkets() {
            vm.loadingMarkets = true;
            return $q
                .when(storedDataService.getMarkets(true, true))
                .then((markets) => {
                    vm.markets = _.filter(markets, (m) => m.reconEnabled);
                    vm.filetypes = getFileTypes();
                    vm.loadingMarkets = false;
                    vm.isCollapsed = !vm.parent.showSearch;
                    return vm.markets;
                });
        }

        function getFileTypes() {
            var fileTypes = _.map(vm.markets, function (m) {
                return {
                    'stateAbbreviation': m.stateAbbreviation,
                    'fileType': m.armMarketName,
                    'marketId': m.id
                };
            });
            return fileTypes;
        }

        function getReportConfigurations() {
            if (!vm.searchConfig.fileType) {
                return;
            }
            reportsService.getReportConfigurations(vm.searchConfig.fileType.marketId, true)
                .then(function (data) {
                    vm.reportConfigurations = data.reportConfigurations;
                });
        }

        function getReconRuns() {
            if (!vm.searchConfig.fileType) {
                return;
            }
            vm.reconRuns = [];
            vm.loadingRuns = true;
            dataservice.getReconRuns(vm.searchConfig.fileType.marketId, null, ["Completed"], true)
                .then(function (data) {
                    vm.reconRuns = data.reconRuns;
                    vm.loadingRuns = false;
                    if (vm.reconRuns.length === 0) {
                        logger.warning("No Recon Runs Found");
                    }
                });
        }
    }
})();