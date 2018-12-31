(function () {
    "use strict";

    angular
        .module("management-recon")
        .run(appRun);

  appRun.$inject = ["routerHelper"];

    /* @ngInject */
    function appRun(routerHelper) {
      routerHelper.configureStates(getStates());
    }

  function getStates() {
    return [
      {
        state: "reconManagement",
        config: {
          url: "/management/recon",
          component: "managementRecon",
          title: "Recon Management",
          settings: {
            nav: 1,
            content: "<i></i> management recon"
          }
        }
      }
    ];
  }
})();
