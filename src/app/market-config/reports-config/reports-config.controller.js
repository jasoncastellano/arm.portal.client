(function () {
    'use strict';

    angular
        .module('reports-config')
        .controller('ReportsConfigController', reportsConfigController);

    /* @ngInject */
    function reportsConfigController($q, $scope, reportsService) {
        var vm = angular.extend(this, {
            $onInit: onInit
        });

        function onInit() {
            $scope.$watch(() => vm.fileType, () => {
                if (vm.fileType) {
                    vm.parent.isLoading = true;
                    loadReportConfigs().then(() => {
                        vm.parent.isLoading = false;
                    });
                }
            });
        }

        function loadReportConfigs() {
            return reportsService
                .getReportConfigurations(vm.fileType.marketId, true)
                .then((data) => {
                    vm.reportConfigs = data.reportConfigurations;
                    return vm.reportConfigs;
                });
        }

    }
})();