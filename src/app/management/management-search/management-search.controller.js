(function () {
    'use strict';

    angular
        .module('app.management')
        .controller('ManagementSearchController', managementSearch);

    /* @ngInject */
    function managementSearch(moment, dataservice, datepickerOptions, storedDataService, $q) {
        var vm = angular.extend(this, {
            searchConfig: {
                fromDate: moment().startOf('month').toDate(),
                toDate: moment().endOf('month').toDate(),
                isValid: function () {
                    return angular.isDefined(this.fromDate) &&
                        angular.isDefined(this.toDate) &&
                        angular.isDefined(this.market) &&
                        angular.isDefined(this.fileType);
                }
            },

            //sectionLabel: "Search Recons and Available Files",
            datepickerOptions: datepickerOptions,
            fromDatePicker: {
                opened: false,
                openDatePicker: openFromDatePicker
            },
            toDatePicker: {
                opened: false,
                openDatePicker: openToDatePicker
            },
            loadingMarkets: false,
            markets: [],

            $onInit: onInit
        });

        
        function onInit() {
            getMarkets();
        }

        function openFromDatePicker() {
            vm.fromDatePicker.opened = true;
        }

        function openToDatePicker() {
            vm.toDatePicker.opened = true;
        }

        function getMarkets() {
            vm.loadingMarkets = true;
            return $q
                .when(storedDataService.getMarkets(true))
                .then((markets) => {
                    let filteredMarkets = vm.onlyReconMarkets ? _.filter(markets, (m) => m.reconEnabled) : markets;
                    vm.filetypes = _.map(filteredMarkets, function (m) {
                        return {
                            'stateAbbreviation': m.stateAbbreviation,
                            'fileType': m.armMarketName,
                            'marketId': m.id
                        }
                    });
                    vm.loadingMarkets = false;
                    return vm.markets;
                });
        }
    }
})();