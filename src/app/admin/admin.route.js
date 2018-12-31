(function () {
    "use strict";

    angular
        .module("app.admin")
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
      routerHelper.configureStates(getStates());
    }

  function getStates() {
    return [
      {
        state: "admin",
        config: {
          url: "/admin",
          component: "marketRules",
          title: "Market Rule Configuration",
          settings: {
            nav: 1,
            content: "<i></i> market rule configurationt"
          }
        }
      }
    ];
  }
})();