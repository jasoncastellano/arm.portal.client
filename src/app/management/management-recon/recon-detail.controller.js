(function () {
    "use strict";

    angular
        .module("app")
        .controller("ReconDetailController", reconDetailController);

    /* @ngInject */
    function reconDetailController($scope, logger, reportsService, $state) {
        var vm = angular.extend(this, {
            reconRuns: $scope.reconRuns,
            isCollapsed: true,
            getReportUrl: getReportUrl
        });

        function getReportUrl(marketId, runId, disabled) {    
            return disabled ? '' : $state.href('reports', {marketId: marketId, reconRunId: runId});
        }
    }
})();