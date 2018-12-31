(function () {
    'use strict';

    angular
        .module('market-rules')
        .controller("RuleCategoryController", ruleCategoryController);

    /* @ngInject */
    function ruleCategoryController(_) {
        var vm = angular.extend(this, {
            isCollapsed: true,
            sortableOptions: {
                placeholder: "placeholder",
                start: function(e, ui) {
                    ui.item.toggleClass("placeholder");
                },
                stop: function(e, ui) {
                    ui.item.toggleClass("placeholder")
                },
                items: "tr:not(.not-sortable)"
            },
            getRuleIndex: getRuleIndex,
            $onInit: onInit
        });

        function onInit() {
            
        }

        function getRuleIndex(rule) {
            return _.findIndex(vm.ruleCategory.rules, (i) => i.id === rule.id) + 1;
        }
       
    }
})();