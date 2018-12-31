(function() {
'use strict';

    angular
        .module('reports-config')
        .controller('ReportConfigColumnsController', reportConfigColumnsController);

    /* @ngInject */
    function reportConfigColumnsController(_, $scope) {
        var vm = angular.extend(this, {
            showAlignment: showAlignment,
            showTargetReport: showTargetReport,
            showColumnType: showColumnType,
            removeColumn: removeColumn,
            updateColumn: updateColumn,
            loadColumns: loadColumns,
            sortableOptions: {
                placeholder: "placeholder",
                start: function(e, ui) {
                    ui.item.toggleClass("placeholder");
                },
                stop: function(e, ui) {
                    ui.item.toggleClass("placeholder")
                },
                update: function(e, ui) {
                    let item = ui.item.sortable;
                    if(item.droptargetModel[0].columnType !== item.model.columnType) {
                        item.model.columnType = item.droptargetModel[0].columnType;
                    }
                },
                items: "tr:not(.not-sortable)"
            },
            $onInit: onInit
        });

        

        function onInit() {
            vm.columnContainerClass = vm.parent.config.name + "_columns-container";
            vm.sortableOptions.connectWith = "." + vm.columnContainerClass;
            loadColumns();
            $scope.$on('column-type-changed', (event, args) => {
                if(args !== $scope.$id) {
                    vm.loadColumns();
                }
            })        
        }

        function loadColumns() {
            vm.columns = vm.columnType == 'Header' ? vm.parent.headerColumns : vm.parent.detailColumns;
        }

        function showColumnType(column) {
            let selected = _.filter(vm.parent.columnTypes, (ct) => ct.text === column.columnType);
            return selected.length ? selected[0].text : "";
        }

        function showAlignment(column){
            let selected = _.filter(vm.parent.sourceAlignments, (a) => a.text === column.reportDataAlignment);
            
            return selected.length ? selected[0].text : "None";
        }

        function showTargetReport(column) {
            let selected = _.filter(vm.parent.config.subReportConfigs, function (sr) {return sr.Id === column.targetReportConfigId});
            return selected.length ? selected[0].Name : "";
        }

        function updateColumn(data, key) {
             vm.parent.splitColumns();
             vm.loadColumns();
             vm.parent.signalColumnTypeChange($scope.$id);
        }
        
        function removeColumn(key) {
            _.remove(vm.columns, (c) => c.$$hashKey === key);
        }

        
    }
})();