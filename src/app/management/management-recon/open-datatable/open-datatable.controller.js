(function () {
    "use strict";

    angular
        .module("management-recon")
        .controller("OpenDatatableController", openDatatableController);

    /* @ngInject */
    function openDatatableController($scope, $rootScope, $q, $http, $compile, $uibModal,
        DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, config, _, logger, reconRequestService, sweetAlert, sweetAlertOptions) {
        var vm = angular.extend(this,
        {
            instance: {},
            recordCount: 0,
            imageSrc: config.imageSrc,
            isCollapsed: false,
            sectionLabel: "Open Recons",
            rowsDrawn: 0,
            isVisible: false,
            options: {},
            columns: {},
            promise: openReconsPromise,
            toggleOpenDetail: toggleOpenDetail,
            openReconDetails: openReconDetailModal,
            openRequestModal: openRequestModal,
            finalizeRecon: finalizeRecon,
            $onInit: onInit
        });

        function onInit() {
            vm.options = buildOptions();
            vm.columns = buildColumns();
            $scope.$watch(function () {
                return vm.searchConfig;
            },
                updateData);

            $scope.$watch(() => vm.isLoading, (newVal, oldVal, scope) => {
                if(newVal === true) {
                    vm.recordCount = '...';
                }
            });

            $scope.$on("recon-added", updateData);
            $scope.$on("recon-run-added", updateData);
            $scope.$on("recon-finalized", updateData);
        }

        function updateData() {
            if (vm.searchConfig && vm.searchConfig.isValid) {
                vm.isVisible = true;
                vm.isLoading = true;
                vm.rowsDrawn = 0;
                vm.recordCount = 0;
                vm.instance.changeData(vm.promise);
            }
        }

        function finalizeRecon(id, runStatus) {
            if (runStatus !== 'Completed') {
                return;
            }

            var options = angular.extend(sweetAlertOptions.prompt,
            {
                "title": "Finalize Recon: " + id,
                "text": "Are you sure?"
            });

            sweetAlert.swal(options)
                .then(function() {
                    reconRequestService.finalizeRecon(id)
                        .then(function() {
                            $rootScope.$broadcast("recon-finalized");
                            logger.info("Recon " + id + " has been finalized.");
                        });
                });
        }
       

        function buildOptions() {
            return DTOptionsBuilder
              .fromFnPromise(vm.promise)
              .withBootstrap();
        }
        
        function buildColumns() {
            var dtColumns = [];
            dtColumns.push(
                DTColumnBuilder
                .newColumn(null)
                .notSortable()
                .withClass("details-control")
                .renderWith(function (data, type, row) {
                    return '<div class="details-control" ng-click="vm.toggleOpenDetail(' + data.id + ')"></div>';
                }));
            dtColumns.push(DTColumnBuilder
                .newColumn("id", "Recon ID")
                .renderWith(function(data, type, row) {
                    return '<a href="#" ng-click="vm.openReconDetails(' + data + ')">' + data + '</a>';
                }));
            dtColumns.push(DTColumnBuilder
                .newColumn("null")
                .withTitle("Month/Year")
                .renderWith(function (data, type, row) {
                    return row.reconFiles[0].fileMonthYear;
                }));

            dtColumns.push(
                DTColumnBuilder
                .newColumn(null)
                .withTitle("Status")
                .renderWith(function (data, type, row) {
                    return _.orderBy(row.reconRuns, ['id'], ['desc'])[0].runStatus;
                }));
            dtColumns.push(
                DTColumnBuilder
                .newColumn(null)
                .withTitle("Run Count")
                .withClass("text-right")
                .renderWith(function (data, type, row) {
                    return row.reconRuns.length;
                }));

            dtColumns.push(
                DTColumnBuilder
                .newColumn(null)
                .withTitle("Actions")
                .withClass("row-actions")
                .renderWith(function (data, type, row) {
                    let runStatus = _.first(_.orderBy(data.reconRuns, "createdDate", "Desc")).runStatus;
                    return '<span class="btn btn-action" ng-click="vm.openRequestModal(' + data.id + ')" uib-tooltip="Add Recon Run"><i class="fa fa-plus"></i></span><span class="btn btn-action" ng-click="vm.finalizeRecon(' + data.id + ',&quot;' + runStatus + '&quot;)" uib-tooltip="Finalize Recon" ng-disabled="&quot;' +
                        runStatus + '&quot; !== &quot;Completed&quot;"><i class="fa fa-check"></i></span>';
                }));

            return dtColumns;
        }

        function toggleOpenDetail(id) {
            var dt = vm.instance.DataTable,
                row = dt.row('#' + id),
                tr = $('#' + vm.instance.id + ' #' + id),
                container = $("div.slider", row.child());

            if (row.child.isShown()) {
                tr.removeClass('details');
                container.slideUp(function () {
                    row.child.hide();
                    tr.removeClass('shown');
                });
            } else {
                tr.addClass('details');
                row.child.show();
                tr.addClass('shown');
                container.slideDown();
            }
        }

        function openReconDetailModal(id) {
            $uibModal.open({
                animation: true,
                component: "reconDetails",
                size: "lg",
                resolve: {
                    modalData: function () {
                        var data = {
                            reconId: id,
                            files: _.find(vm.instance.DataTable.data(), function(r) { return r.id === id.toString(); }).reconFiles
                        };
                        return data;
                    }
                }
            });
        }

        function openRequestModal(reconId) {

            var modalInstance = $uibModal.open({
                animation: true,
                component: "runRequest",
                resolve: {
                    modalData: function () {
                        return {
                            reconId: reconId,
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

        function openReconsPromise() {
            if (!vm.searchConfig || !vm.searchConfig.isValid) {
                return $q.when({});
            } else {
                var url =
                    config.apiBaseUrl +
                        "api/getrecons" +
                        "?MarketId=" +
                        vm.searchConfig.fileType.marketId;
               return $http.get(url, {cache: false, ignoreLoadingBar: true})
                    .then(function(response) {
                        return response.data.recons;
                    })
                    .then(function(recons) {
                        vm.recordCount = recons.length;
                        vm.isCollapsed = recons.length === 0;

                        if(vm.recordCount === 0) {
                            vm.isLoading = false;
                        }
                        vm.options
                            .withOption("processing", true)
                            .withOption("width", "100%")
                            .withOption("autoWidth, false")
                            .withOption("rowId", "id")
                            .withOption("createdRow", openRowCallback);
                        return recons;
                    });
            }
        }

        function openRowCallback(row, data, displayIndex) {
            var dt = this.api();
            $scope.$apply(function () {
                var scope = $scope.$new(true);
                scope.reconRuns = data.reconRuns;
                var template = '<div id="' + data.id + '-detail" recon-detail recon-runs="reconRuns" uib-collapse="false" />';
                var content = $compile(template)(scope);
                $compile(angular.element(row).contents())($scope);
                dt.row(row).child(content);
                vm.rowsDrawn++;

                if(vm.rowsDrawn === vm.recordCount) {
                    vm.isLoading = false;
                }
            });
        }
    }

        
})();
