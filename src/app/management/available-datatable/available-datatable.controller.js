(function () {
    "use strict";

    angular
        .module("app.management")
        .controller("AvailableDatatableController", availableDatatableController);

    /* @ngInject */
    function availableDatatableController($scope, $q, $http, $uibModal, $compile, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, config, _, moment, $state) {
        var vm = angular.extend(this,
        {
            instance: {},
            imageSrc: config.imageSrc,
            recordCount: 0,
            selected: {},
            selectAll: false,
            isVisible: false,
            isLoading: false,
            isCollapsed: false,
            options: {},
            columns: {},
            promise: availablePromise,
            finish: finish,
            toggleSelect: toggleSelect,
            toggleSelectAll: toggleSelectAll,
            getSelectedIds: getSelectedIds,
            facetsEnvironments: [],
            $onInit: onInit,
            state: $state
        });

        function onInit() {
            vm.options = buildOptions();
            vm.columns = buildColumns();
            $scope.$watch(function() {
                    return vm.searchConfig;
                },
                loadData);
            $scope.$watch(() => vm.isLoading, (newVal, oldVal, scope) => {
                if(newVal === true) {
                    vm.recordCount = '...';
                }
            });

            $scope.$on("recon-added", reconActionListener);
        }

        function finish() {
            vm.handleSelectedFiles({selectedIds: getSelectedIds()});
        }

        function reconActionListener(event, args) {
            vm.isLoading = true;
            vm.isVisible = true;
            vm.selected = {};
            vm.instance.reloadData();    

        }

        function loadData(reload) {
            if (vm.searchConfig && vm.searchConfig.isValid) {
                vm.isLoading = true;
                vm.isVisible = true;
                vm.selected = {};
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
                .newColumn("chkSelectAll")
                .notSortable()
                .withTitle('<input type="checkbox" id="chkSelectAll" class="SelectAll" ng-model="vm.selectAll" ng-click="vm.toggleSelectAll(vm.selectAll, vm.selected)" />')
                .withClass("text-center row-select")
                .renderWith(function (data, type, row) {
                    vm.selected[row.ediRunId] = false;
                    return '<input type="checkbox" class="availableChk" ng-model="vm.selected[' + row.ediRunId + ']" ng-click="vm.toggleSelect(vm.selected)" />';
                })
            );

            dtColumns.push(
                DTColumnBuilder
                .newColumn("ediRunId", "EDI Run ID")
                .withClass('edi-run-id')                
            );
            dtColumns.push(
                DTColumnBuilder
                .newColumn("filename", "File Name")
                .withClass('filename')
            );
            dtColumns.push(
                DTColumnBuilder
                .newColumn("fileMonthYear", "Month/Year")
                .withClass("file-month-year")
            );

            return dtColumns;
        }

        function availablePromise() {
            if (!vm.searchConfig || !vm.searchConfig.isValid) {
                // Return empty promise for initialization
                return $q.when({});
            } else {
                var url =
                    config.apiBaseUrl + "api/" +
                        (vm.state.$current.name === 'soxManagement' ? 'GetSoxFiles' : 'GetAvailableFiles') +
                        "?MarketId=" +
                        vm.searchConfig.fileType.marketId +
                        "&StartDate=" +
                        moment(vm.searchConfig.fromDate).format("YYYY-MM-DD") +
                        "&EndDate=" +
                        moment(vm.searchConfig.toDate).format("YYYY-MM-DD");

                return $http.get(url, {cache: false, ignoreLoadingBar: true})
                    .then(function(response) {
                        return response.data.availableFiles;
                    })
                    .then(function(availableFiles) {
                        vm.isCollapsed = availableFiles.length === 0;
                        vm.recordCount = availableFiles.length;
                        if(vm.recordCount === 0) {
                            vm.isLoading = false;
                        }
                        vm.selectAll = false;
                        vm.options
                            .withOption("processing", true)
                            .withOption("width", "100%")
                            .withOption("createdRow",
                                function (row, data, dataIndex) {
                                    $compile(angular.element(row).contents())($scope);
                                })
                            .withOption("headerCallback",
                                function (header) {
                                    if (!vm.headerCompiled) {
                                        vm.headerCompiled = true;
                                        $compile(angular.element(header).contents())($scope);
                                    }
                                    vm.isLoading = false;
                                });
                        return availableFiles;
                    });
            }
        }

        

        function getSelectedIds() {
            return _.keys(_.pickBy(vm.selected, function (i) { return i; }));
        }

        function toggleSelect(selectedItems) {
            for (var id in selectedItems) {
                if (selectedItems.hasOwnProperty(id)) {
                    if (!selectedItems[id]) {
                        vm.selectAll = false;
                        return;
                    }
                }
            }
            vm.selectAll = true;
        }

        function toggleSelectAll(selectAll, selectedItems) {
            for (var id in selectedItems) {
                if (selectedItems.hasOwnProperty(id)) {
                    selectedItems[id] = selectAll;
                }
            }
        }
    }

        
})();
