(function () {
    "use strict";

    angular
      .module("app.core")
      .run(appRun);

    /* @ngInject */
    function appRun($rootScope, routerHelper, $state, $stateParams) {
        var otherwise = "/404";
        routerHelper.configureStates(getStates()
        , otherwise
        );

        $rootScope._ = window._;
    }

    function getStates() {
        return [
          {
              state: "404",
              config: {
                  url: "/404",
                  templateUrl: "app/core/404.html",
                  title: "404"
              }
          }
        ];
    }
})();