(function () {
    "use strict";

    angular
        .module("app.reports")
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function findParams($stateParams, position) {
        let parts = $stateParams.folderPath.split('/'),
            result = parts.length >= position ? parts[position] : null;
        return result;
    }

    function getStates() {
        return [
          {
              state: "reports",
              config: {
                  url: "/reports/:marketId/:reconRunId/:reportConfigId?print",
                  title: "Reports",
                  views: {
                      "": { component: "reports"},
                      "results-report@reports": {component: "reconResults"},
                      "totals-report@reports": {component: "reconTotals"},
                      "sox-report@reports": {component: "soxReport"}
                  },
                  resolve: {
                      marketId: ["$stateParams", ($stateParams) => $stateParams.marketId],
                      reconRunId: ["$stateParams", ($stateParams) => $stateParams.reconRunId],
                      reportConfigId: ["$stateParams", ($stateParams) => $stateParams.reportConfigId],
                      print: ["$stateParams", ($stateParams) => $stateParams.print]
                  },
                  params: {
                      marketId: {squash: true, value: null},
                      reconRunId: {squash: true, value: null},
                      reportConfigId: {squash: true, value: null},
                      print: {squash: true, value: null}
                  }
              }
          }
        ];
    }
})();
