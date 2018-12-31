(function () {
    'use strict';

    angular
        .module('market-rules')
        .controller('MarketRulesController', marketRulesController);

    /* @ngInject */
    function marketRulesController($scope, adminService, logger) {
        var vm = angular.extend(this, {
            
            $onInit: onInit,
            loadRuleCategories: loadRuleCategories,
            label: "Search by Market",
            ruleCategories: []
        })

        function onInit() {
            $scope.$watch(() => vm.parent.fileType, () => {
                if(vm.fileType){
                    loadRuleCategories();
                }
            });
            
        }

        function loadRuleCategories() {
            vm.parent.isLoading = true;
            return adminService
                .getMarketRules(vm.fileType.marketId, true)
                .then(function (data) {
                    vm.ruleCategories = data;
                    vm.parent.isLoading = false;
                    return vm.ruleCategories;
                });
        }
    }
})();