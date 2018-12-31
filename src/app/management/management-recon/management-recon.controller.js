(function () {
    "use strict";

    angular
        .module("management-recon")
        .controller("ManagementReconController", managementReconController);

    /* @ngInject */
    function managementReconController(dataservice, $uibModal, storedDataService, $q, logger) {
        var vm = angular.extend(this, {
            onSearch: search,
            resultsLoaded: false,
            facetsEnvironments: [],
            openRequestModal: openRequestModal,
            $onInit: onInit
        });
        
        function onInit() {
            getFacetsEnvironments();
        }
        function openRequestModal(selectedIds) {
            var modalInstance = $uibModal.open({
                animation: true,
                component: "reconRequest",
                resolve: {
                    modalData: function () {
                        return {
                            runIds: selectedIds,
                            marketId: vm.searchConfig.fileType.marketId,
                            facetsEnvironments: vm.facetsEnvironments
                        }
                    }
                }
            });

            modalInstance.result.then(function (request) {
                vm.requested = request;
            });
        }

        function search(config) {
            // always make a new object so $watch can fire even if searchConfig didnt change
            vm.searchConfig = {
                market: config.market,
                fileType: config.fileType,
                fromDate: config.fromDate,
                toDate: config.toDate,
                isValid: config.isValid()
            };
            vm.resultsLoaded = true;
        }

        function getFacetsEnvironments() {
            return $q
                .when(storedDataService.getFacetsEnvironments())
                .then((facetsEnvironments) => {
                    vm.facetsEnvironments = facetsEnvironments;
                    return vm.facetsEnvironments;
                });
        }
    }
})();