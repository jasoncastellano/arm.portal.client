(function () {
    'use strict';

    angular
        .module('recon-results')
        .controller("ResultsCategoriesController", resultsCategories);

    /* @ngInject */
    function resultsCategories(reportsService) {
        angular.extend(this,
        {
            getExcelReportUrl: reportsService.getExcelReportUrl
        });

    }


})();
