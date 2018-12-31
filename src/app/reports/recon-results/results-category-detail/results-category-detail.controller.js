(function () {
    'use strict';

    angular
        .module('recon-results')
        .controller("ResultsCategoryDetailController", resultsCategoryDetailController);

    /* @ngInject */
    function resultsCategoryDetailController($scope, $animate, reportsService, DTOptionsBuilder, DTColumnBuilder, _, config, exception) {
        var vm = angular.extend(this, {
            instance: {},
            imageSrc: config.imageSrc,
            recordCount: 0,
            isVisible: false,
            isCollapsed: false,
            options: {},
            columns: {},
            promise: getPromise,
            $onInit: onInit,
            isShown: false
        });

        function onInit() {
            vm.isLoading = true;
            vm.title = vm.category.name;
            vm.columns = buildColumns();
            vm.options = buildOptions();

            $scope.$on("expando", togglePrintMode);

            togglePrintMode();
        }

        function togglePrintMode() {
            if(vm.print) {
                vm.options
                    .withOption("paging", false)
                    .withOption("searching", false);
            } else {
                vm.options
                    .withOption("paging", true)
                    .withOption("searching", true);
            }
        }

        function updateData() {
            vm.instance.rerender();
        }

        function buildOptions() {
            return DTOptionsBuilder
                .fromFnPromise(vm.promise)
                .withBootstrap();
        }

        function buildColumns() {
            var dtColumns = [];

            _.each(_.orderBy(vm.reportConfig.reportColumnConfigs, "position", "asc"), function (column) {
                dtColumns.push(DTColumnBuilder.newColumn(_.lowerFirst(column.name), column.displayName));
            });

            return dtColumns;
        }

        function getPromise() {
            return reportsService
                .getReport(vm.reportConfig.id, vm.runId, "Json", true)
                .then(function (data) {
                    let report = data.report;
                    vm.isVisible = true;
                    vm.isCollapsed = report.length === 0;
                    vm.recordCount = report.length;
                    vm.options
                        .withOption("processing", true)
                        .withOption("width", "100%")
                        .withOption("autoWidth", false)
                        .withOption("initComplete", (settings, json) => {
                            vm.isLoading = false;
                        });
                    return report;
                })
                .catch((e) => {
                    exception.catcher("Unable to retreive report")(e);
                });
        }
    }
})();