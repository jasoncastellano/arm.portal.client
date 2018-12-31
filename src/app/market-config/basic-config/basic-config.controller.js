(function () {
    'use strict';

    angular
        .module('app.market-config')
        .controller('BasicConfigController', basicConfigController);

    /* @ngInject */
    function basicConfigController($scope, marketConfigService, logger, storedDataService, $q, _) {
        var vm = angular.extend(this, {

            $onInit: onInit,
            loadConfig: loadConfig,
            validateJson: validateJson,
            saveChanges: saveChanges,
            showTransactionTypes: showTransactionTypes
        })

        function onInit() {
            vm.parent.isLoading = true;
            $scope.$watch(() => vm.fileType, () => {
                if(vm.fileType){
                    
                    $q.when(loadConfig())
                    .then(loadTransactionTypes)
                    .then(() => {
                        vm.parent.isLoading = false;
                    });
                }
            });
            
        }


        function loadConfig() {
            return marketConfigService
                .getBasicMarketConfig(vm.fileType.marketId, true)
                .then(function (data) {
                    vm.marketConfig = data;
                    return vm.marketConfig;
                });
        }

        function saveChanges() {
            marketConfigService
                .updateBasicMarketConfig(vm.marketConfig);
        }

        function loadTransactionTypes() {
            return $q
                .when(storedDataService.getTransactionTypes(true))
                .then((data) => {
                    vm.transactionTypes = data;
                    return vm.transactionTypes;
                });

        }

        function validateJson(data) {
            if (!data) {
                return;
            }

            try {
                angular.fromJson(data);
            } catch (ex) {
                return "Invalid JSON: " + ex.message;
            }
        }

        function showTransactionTypes() {
            if(!vm.marketConfig) {
                return;
            }
            let codes = _.map(vm.transactionTypes, (t) => t.code),
            selected = _.intersection(codes, vm.marketConfig.transactionTypes);

            return selected.length ? selected.join(',') : "Not set";
        }
    }
})();