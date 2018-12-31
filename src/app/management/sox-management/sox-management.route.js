(function () {
    "use strict";

    angular
        .module("sox-management")
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
      routerHelper.configureStates(getStates());
    }

  function getStates() {
    return [
      {
        state: "soxManagement",
        config: {
          url: "/management/sox",
          component: "soxManagement",
          title: "Sox Management",
          settings: {
            nav: 1,
            content: "<i></i> sox management"
          }
        }
      }
    ];
  }
})();
