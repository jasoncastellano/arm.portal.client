(function () {
    "use strict";

    angular
        .module("app.market-config")
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
      routerHelper.configureStates(getStates());
    }

  function getStates() {
    return [
      {
        state: "marketconfig",
        config: {
          url: "/config/market/:groupId/:fileTypeId",
          component: "marketConfig",
          title: "Market Config",
          resolve: {
              groupId: ["$stateParams", ($stateParams) => $stateParams.groupId],
              fileTypeId: ["$stateParams", ($stateParams) => $stateParams.fileTypeId]
          },
          params: {
              fileTypeId: {squash: true, value: null}          
          }
        }
      }
    ];
  }
})();