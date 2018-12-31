(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', dashboardController);

    /* @ngInject */
    function dashboardController() {
        var vm = angular.extend(this, {
            dashboardOptions: {
                widgetDefinitions: [
                    {
                        name: "test1"
                    }
                ],
                defaultWidgets: [
                    {
                        name: "test1"
                    }
                ]
            }
        });
    }
})();
