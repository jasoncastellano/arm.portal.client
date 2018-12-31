(function () {
    "use strict";

    angular
        .module("management-recon")
        .controller("FinalizedDatatableController", finalizedDatatableController);

    finalizedDatatableController.$inject = ["$scope", "$q", "$http", "$compile", "$uibModal", "DTOptionsBuilder", "DTColumnBuilder", "DTColumnDefBuilder", "config", "_", "moment"];

    /* @ngInject */
    function finalizedDatatableController($scope, $q, $http, $compile, $uibModal, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, config, _, moment) {
        var vm = angular.extend(this,
        {
            instance: {},
            recordCount: 0,
            imageSrc: config.imageSrc,
            rowsDrawn: 0,
            isVisible: false,
            isCollapsed: false,
            sectionLabel: "Finalized Recons",
            options: {},
            columns: {},
            promise: finalizedReconsPromise,
            toggleOpenDetail: toggleOpenDetail,
            openReconDetails: openReconDetailModal,
            $onInit: onInit
        });

        function onInit() {
            vm.options = buildOptions();
            vm.columns = buildColumns();
            $scope.$watch(function () {
                return vm.searchConfig;
            }, updateData);
            
            $scope.$watch(() => vm.isLoading, (newVal, oldVal, scope) => {
                if(newVal === true) {
                    vm.recordCount = '...';
                }
            });

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
                .newColumn("finalizedBy", "Finalized By"));
            dtColumns.push(
                DTColumnBuilder
                .newColumn(null)
                .withTitle("Finalized Date")
                .renderWith(function(data, type, row) {
                    return moment().format(data.finalizedDate, "yyyy-MM-dd HH:mm:ss");
                }));
            dtColumns.push(
                DTColumnBuilder
                .newColumn(null)
                .withTitle("Run Count")
                .withClass("text-right")
                .renderWith(function (data, type, row) {
                    return row.reconRuns.length;
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
                            files: _.find(vm.instance.DataTable.data(), function(r) { return r.id === id.toString(); }).ReconFiles
                        };
                        return data;
                    }
                }
            });
        }

        
        function finalizedReconsPromise() {
            if (!vm.searchConfig || !vm.searchConfig.isValid) {
                return $q.when({});
            } else {
                var url =
                    config.apiBaseUrl +
                        "api/getrecons" +
                        "?Finalized=true&MarketId=" +
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
                            .withOption("createdRow", finalizedRowCallback);
                        return recons;
                    });
            }
        }

        function finalizedRowCallback(row, data, displayIndex) {
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
