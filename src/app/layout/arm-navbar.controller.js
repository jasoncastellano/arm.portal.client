(function() {
'use strict';

    angular
        .module('app.layout')
        .controller('ArmNavbarController', armNavbarController);

    /* @ngInject */
    function armNavbarController(storedDataService, helperService, $interval, $location, $q, _) {
        var vm = angular.extend(this, {
                isActive: isActive,
                $onInit: onInit,
                tickInterval: 1000,
                periodOfDay: "",
                user: {}
            });

        function isActive(viewLocation) {
            return _.startsWith($location.path(), viewLocation);
        }

        function onInit() {
            getMarkets();
            setUser();
            tick();
            $interval(tick, 1000);
        }

        function setUser() {
            $q.when(storedDataService.getUser(true))
                .then((user) => {
                    vm.user = user;
                });
        }

        function tick() {
            let period = helperService.getPeriodOfDay();
            if(vm.periodOfDay !== period) {
                vm.periodOfDay = period;
            }
        }

        

        function getMarkets() {
            return $q
                .when(storedDataService.getMarkets(true))
                .then((markets) => {
                    vm.markets = markets;
                    return vm.markets;
                });
        }
    }
})();