(function () {
    "use strict";

    angular
        .module("management-recon")
        .controller("ReconRequestController", reconRequestController);

    reconRequestController.$inject = ["$rootScope", "$scope", "dataservice", "sweetAlert", "reconRequestService", "_", "datepickerOptions"];


    /* @ngInject */
    function reconRequestController($rootScope, $scope, dataservice,
        sweetAlert, reconRequestService, _, datepickerOptions) {

        var vm = angular.extend(this, {
            datepickerOptions: datepickerOptions,
            effectiveDatePicker: {
                opened: false,
                openDatePicker: openEffectiveDatePicker
            },
            cutoffDatePicker: {
                opened: false,
                openDatePicker: openCutoffDatePicker
            },
            ok: onOk,
            cancel: onCancel,
            reconRequest: {}
        });

        vm.$onInit = function() {
            vm.reconRequest.EdiRunIds = vm.resolve.modalData.runIds;
            vm.reconRequest.MarketId = vm.resolve.modalData.marketId;
        }

        function onOk() {
            sweetAlert.swal({
                    title: 'Request this Recon?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, request it!',
                    cancelButtonText: 'No, cancel!',
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    buttonsStyling: false
                })
                .then(function() {
                        reconRequestService.addRecon(vm.reconRequest)
                        .then(function () {
                            $rootScope.$broadcast("recon-added", true);
                        });
                        vm.modalInstance.close(vm.reconRequest);
                    });
            return;
        };
        function onCancel() {
            vm.modalInstance.dismiss("cancel");
        };

        function openEffectiveDatePicker() {
            vm.effectiveDatePicker.opened = true;
        }

        function openCutoffDatePicker() {
            vm.cutoffDatePicker.opened = true;
        }
    }
})();
