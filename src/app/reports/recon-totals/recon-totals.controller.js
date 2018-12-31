(function () {
    'use strict';

    angular
        .module('app.reports')
        .controller('ReconTotalsController', reconTotals);

    /* @ngInject */
    function reconTotals($scope, reportsService, _, logger, config, helperService, $state, $stateParams) {
        let vm = angular.extend(this, {
            marketId: "",
            imageSrc: config.imageSrc,
            $onInit: onInit,
            load: load,
            headerFields: {},
            listFieldNames: ['EDI Run ID(s)'],
            isVisible: false,
            columns: {},
            reportRows: [],
            groupByOptions: [],
            isLoading: false,
            searchCriteria: {},
            printPreview: helperService.printPreview,
            onGroupByChange: onGroupByChange
        });


        function onInit() {
            $scope.$on("reports-searched", () => {
                load();
            });

            $scope.$on("report-criteria-loaded", () => {
                load();
            });

            vm.print = $stateParams.print;
        }

        function buildColumns() {
            var columns = [];

            _.each(_.orderBy(_.filter(vm.reportConfig.reportColumnConfigs, (c) => c.columnType === "Detail"), "position", "asc"), function (column) {
                columns.push({data: _.camelCase(column.name), display: column.displayName});
            });

            return columns;
        }

        function loadReport() {
            reportsService.getTotalsReport(vm.reportConfig.id, vm.searchCriteria.reconRunId, "html", vm.groupBy, !vm.parent.showSearch).then(
                (reportData) => {
                    loadHeaderFields(reportData.headerFields);
                    
                    vm.isVisible = true;
                    vm.isLoading = false;

                    // map report rows to columns
                    vm.reportRows = reportData.report;
                    
                    
                },
                () => {
                    vm.isLoading = false;
                });
        }

        function onGroupByChange() {
            loadReport();
        }

        function load() {
            vm.isLoading = true;
            vm.searchCriteria = reportsService.getReportsCriteria();

            // find the results report config
            vm.reportConfig = _.find(vm.searchCriteria.reportConfigurations, (c) => _.startsWith(c.reportType, "Totals"));
            vm.columns = buildColumns();

            vm.permalinkUrl = $state.href($state.$current.name, {
                marketId: vm.searchCriteria.marketId,
                reconRunId: vm.searchCriteria.reconRunId,
                reportConfigId: vm.reportConfig.id
            }, {absolute: true, inherit: false});
            vm.printUrl = vm.permalinkUrl + "?print=true";

            reportsService
                .getTotalsReportGroupByList(vm.searchCriteria.marketId, !vm.parent.showSearch)
                .then((data) => {
                    vm.groupByOptions = data;
                    vm.groupBy = vm.groupByOptions[0];

                    loadReport();
                })
        }

        function loadHeaderFields(headerData) {
            // get the generic header headerFields
            let genericFields = _.filter(headerData, (d) => d.reportDataAlignment === "None"),
                chunked = _.chunk(genericFields, _.round(genericFields.length / 2));

            vm.headerFields.left = chunked[0];
            vm.headerFields.right = chunked[1];
        }

        
    }
})();