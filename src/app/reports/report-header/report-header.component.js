(function() {
"use strict";

    angular
        .module("app.reports")
        .component("reportHeader", {
            templateUrl: "src/app/reports/report-header/report-header.html",
            controller: reportHeaderController,
            controllerAs: "vm",
            bindings: {
                headerFields: "<",
                listFieldNames: "<"
            },
        });

    /* @ngInject */
    function reportHeaderController(_) {
        var vm = angular.extend(this, {
            isListField: isListField
        });

        function isListField(fieldName) {
            return _.find(vm.listFieldNames, (n) => n === fieldName);
        }
    }
})();