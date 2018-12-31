(function() {
'use strict';

    var reconTotals = {
        require: {
            parent: "^reports"
        },
        templateUrl: 'src/app/reports/recon-totals/recon-totals.html',
        controller: "ReconTotalsController",
        controllerAs: "vm"
    };

    angular
        .module('app.reports')
        .component('reconTotals', reconTotals);
})();