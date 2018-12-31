(function () {
    "use strict";

    angular
        .module("management-recon")
        .controller("RunRequestController", runRequestController);

    /* @ngInject */
    function runRequestController($rootScope, $scope, dataservice,
        sweetAlert, reconRequestService, _, datepickerOptions, sweetAlertOptions) {

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
            runRequest: {}
        });

        vm.$onInit = function() {
            vm.runRequest.reconId = vm.resolve.modalData.reconId;
            vm.runRequest.marketId = vm.resolve.modalData.marketId;
        }

        function onOk() {
            var options = angular.extend(sweetAlertOptions.prompt,
            {
                title: 'Request a new run for this Recon?',
                text: "You won't be able to revert this!"
            });
            
            sweetAlert.swal(options)
                .then(function() {
                        reconRequestService.addReconRun(vm.runRequest)
                        .then(function () {
                            $rootScope.$broadcast("recon-run-added");
                        });
                        vm.modalInstance.close(vm.runRequest);
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
