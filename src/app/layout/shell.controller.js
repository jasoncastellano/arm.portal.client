(function () {
    "use strict";

    angular
      .module("app.layout")
      .controller("ShellController", shellController)
      .filter("splitByComma", () => (input, delimiter) => {
            let del = delimiter || ',';
            return input.split(del);
        });


    /* @ngInject */
    function shellController($rootScope, $timeout, config, logger, storedDataService, $splash, helperService, $q) {
        var vm = angular.extend(this, {
            splashTitle: "Good " + helperService.getPeriodOfDay() + "!",
            splashMessage: "One moment while we load your session...",
            $onInit: activate
        });
        
        function activate() {
            loadDataCache();            
        }

        function loadDataCache() {
            vm.splash = $splash.open({
                    title: vm.splashTitle,
                    message: vm.splashMessage
                });

            vm.splash.opened.then(() => {
                // $q.all([
                //     $q.when(storedDataService.getMarkets(true)),
                //     $q.when(storedDataService.getFacetsEnvironments(true),
                //     $q.when(storedDataService.getUser(true)))
                //     ])
                // .then(() => {
                //     vm.splash.close();
                // });
                vm.splash.close();
            })

            
        }
    }
})();