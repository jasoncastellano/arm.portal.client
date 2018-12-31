(function () {
    'use strict';

    angular
        .module('app.reports')
        .controller('SoxReportController', soxReport);

    /* @ngInject */
    function soxReport($scope, reportsService, _, logger, $stateParams, config, helperService, $state) {
        let vm = angular.extend(this, {
            marketId: "",
            imageSrc: config.imageSrc,
            $onInit: onInit,
            load: load,
            loadByEdiRunIds: loadByEdiRunIds,
            headerFields: {},
            isVisible: false,
            columns: {},
            reportRows: [],
            isLoading: false,
            searchCriteria: {},
            printPreview: helperService.printPreview
        });


        function onInit() {
            $scope.$on("reports-searched", () => {
                load();
            });

            $scope.$on("report-criteria-loaded", () => {
                load();
            });

            $scope.$on("generate-sox", (event, cfg) => {
                loadByEdiRunIds(cfg);
            })

            vm.print = $stateParams.print;
        }

        function buildColumns() {
            var columns = [];

            _.each(_.orderBy(_.filter(vm.reportConfig.reportColumnConfigs, (c) => c.columnType === "Detail"), "position", "asc"), function (column) {
                columns.push({
                    data: _.camelCase(column.name),
                    display: column.displayName
                });
            });

            return columns;
        }

        function loadByEdiRunIds(cfg) {
            if (!cfg || !cfg.isValid) {
                return;
            }

            vm.isLoading = true;
            reportsService.getReportConfigurations(cfg.marketId, true)
            .then((data) => {
                let reportConfigs = data.reportConfigurations;
                vm.reportConfig = getReportConfig(reportConfigs);
                vm.columns = buildColumns();
                reportsService
                    .getSoxReport(vm.reportConfig.id, cfg.ediRunIds)
                    .then(
                        reportDataCallback,
                        () => { vm.isLoading = false; });
            });
        }

        function getReportConfig(reportConfigs) {
            return _.find(reportConfigs, (c) => _.startsWith(c.reportType, "Sox"));
        }

        function load() {
            vm.isLoading = true;
            vm.searchCriteria = reportsService.getReportsCriteria();

            // find the results report config
            vm.reportConfig = getReportConfig(vm.searchCriteria.reportConfigurations);

            vm.permalinkUrl = $state.href($state.$current.name, {
                marketId: vm.searchCriteria.marketId,
                reconRunId: vm.searchCriteria.reconRunId,
                reportConfigId: vm.reportConfig.id
            }, {absolute: true, inherit: false});
            vm.printUrl = vm.permalinkUrl + "?print=true";

            vm.columns = buildColumns();

            reportsService.getReport(vm.reportConfig.id, vm.searchCriteria.reconRunId, "html", !vm.showSearch).then(
                reportDataCallback,
                () => { vm.isLoading = false; });
        }

        function reportDataCallback(reportData) {
            vm.headerFields = reportData.headerFields;
            vm.isVisible = true;
            vm.isLoading = false;

            // map report rows to columns
            vm.reportRows = reportData.report;
        }

    }
})();