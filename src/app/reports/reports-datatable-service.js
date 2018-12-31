(function() {
'use strict';

    angular
        .module('app.reports')
        .factory('reportsDatatableService', reportsDatatableService);

    /* @ngInject */
    function reportsDatatableService(DTColumnBuilder) {
        var service = {
            buildDynamicColumns: buildDynamicColumns
        };
        
        return service;

        ////////////////
        function buildDynamicColumns(reportConfig) { 
            var dtColumns = [];

            _.each(_.orderBy(reportConfig.reportColumnConfigs, "position", "asc"), function (column) {
                dtColumns.push(DTColumnBuilder.newColumn(column.name, column.displayName));
            });

            return dtColumns;
        }
    }
})();