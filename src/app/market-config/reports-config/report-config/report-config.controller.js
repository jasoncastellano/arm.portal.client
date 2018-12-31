(function() {
'use strict';

    angular
        .module('reports-config')
        .controller('ReportConfigController', reportConfigController);

    /* @ngInject */
    function reportConfigController($filter, $scope) {
        var vm = angular.extend(this, {
            $onInit: onInit,
            saveColumn: saveColumn,
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
            sourceAlignments: [
                {value: 0, text: "None"},
                {value: 1, text: "Facets"},
                {value: 2, text: "State"}
            ],
            columnTypes: [
                {value: "H", text: "Header"},
                {value: "D", text: "Detail"}
            ],
            splitColumns: splitColumns,
            signalColumnTypeChange: signalColumnTypeChange
        });
        

        
        function onInit() {
            splitColumns();
        }

        function saveColumn(data){

        }

        function splitColumns() {
            vm.headerColumns = $filter('filter')(vm.config.reportColumnConfigs, {columnType: 'Header'});
            vm.headerColumns = $filter('orderBy')(vm.headerColumns, 'position');

            vm.detailColumns = $filter('filter')(vm.config.reportColumnConfigs, {columnType: 'Detail'});
            vm.detailColumns = $filter('orderBy')(vm.detailColumns, 'position');
        }

        function signalColumnTypeChange(scopeId) {
            $scope.$broadcast('column-type-changed', scopeId);
        }

        

        
    }
})();