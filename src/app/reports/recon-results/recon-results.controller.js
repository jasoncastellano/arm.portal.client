(function () {
    'use strict';

    angular
        .module('recon-results')
        .run("")
        .controller('ReconResultsController', reconResults);

    /* @ngInject */
    function reconResults($scope, reportsService, _, logger, $compile, $anchorScroll, $state, $location, $stateParams, config, helperService) {
        let vm = angular.extend(this, {
            marketId: "",
            $onInit: onInit,
            imageSrc: config.imageSrc,
            load: load,
            resultsCategories: [],
            headerFields: {},
            listFieldNames: ['Filename(s)', 'EDI Run ID(s)'],
            isVisible: false,
            isLoading: false,
            selectedCategory: {},
            showAllCategoryDetail: false,
            onToggleAllCategoryDetail: onToggleAllCategoryDetail,
            onCategorySelected: onCategorySelected,
            subReportConfigs: [],
            expandDetail: function () {
                $scope.$broadcast("expando");
            },
            searchCriteria: {},
            detailScopes: [],
            printPreview: helperService.printPreview,
            getExcelReportUrl: reportsService.getExcelReportUrl,
            reportConfigId: ''
        });


        function onInit() {
            $scope.$on("reports-searched", () => {
                load();
            });

            $scope.$on("report-criteria-loaded", () => {
                load();
            });

            vm.print = $stateParams.print;
        }

        function load() {
            vm.isLoading = true;
            vm.searchCriteria = reportsService.getReportsCriteria();

            // find the results report config
            let reportConfig = _.find(vm.searchCriteria.reportConfigurations, (c) => _.startsWith(c.reportType, "ReconResults") && c.subReportConfigs.length > 0);
            vm.reportConfigId = reportConfig.id;
            vm.subReportConfigs = reportConfig.subReportConfigs;
            
            vm.permalinkUrl = $state.href($state.$current.name, {
                marketId: vm.searchCriteria.marketId,
                reconRunId: vm.searchCriteria.reconRunId,
                reportConfigId: vm.reportConfigId
            }, {absolute: true, inherit: false});
            vm.printUrl = vm.permalinkUrl + "?print=true";

            reportsService.getReportHeader(reportConfig.id, vm.searchCriteria.reconRunId, "html", !vm.parent.showSearch).then(
                (headerData) => {
                    loadHeaderFields(headerData);
                    loadResultsCategories(headerData);

                    if(vm.print) {
                        loadAllCategoryDetail();
                        vm.showAllCategoryDetail = true;
                    }

                    vm.isVisible = true;
                    vm.isLoading = false;
                },
                () => {
                    vm.isLoading = false;
                });
        }

        function loadResultsCategories(headerData) {
            let categories = _.filter(headerData, (d) => d.dataAlignment !== "None");
            vm.resultsCategories = categories;
        }

        function loadHeaderFields(headerData) {
            // get the generic header headerFields
            let genericFields = _.filter(headerData, (d) => d.dataAlignment === "None"),
                chunked = _.chunk(genericFields, _.round(genericFields.length / 2));

            vm.headerFields.left = chunked[0];
            vm.headerFields.right = chunked[1];
        }

        function onToggleAllCategoryDetail() {
            vm.showAllCategoryDetail = !vm.showAllCategoryDetail;

            if (vm.showAllCategoryDetail) {
                loadAllCategoryDetail();
            }
        }

        function loadAllCategoryDetail() {
            let filteredCategories = _.filter(vm.resultsCategories, (c) => c.value > 0 && c.targetReportId !== null);

            _.each(filteredCategories, (fc) => {
                onCategorySelected(fc);
            });
        }

        function onCategorySelected(selectedCategory, setSelectedCategory) {
            let detailId = selectedCategory.targetReportId + "_detail",
                target = angular.element("#" + detailId);

            if (setSelectedCategory) {
                vm.selectedCategory = selectedCategory;
            }

            if (target.length === 0) {
                // get report config
                let reportConfig = _.find(vm.subReportConfigs, (c) => c.id === selectedCategory.targetReportId),
                    scope = $scope.$new(true);

                scope.reportConfig = reportConfig;
                scope.category = selectedCategory;
                scope.runId = vm.searchCriteria.reconRunId;
                scope.print = vm.print;

                vm.detailScopes.push(scope);
                let template = '<results-category-detail class="break-before" ng-if="runId === $parent.vm.searchCriteria.reconRunId" id="' + selectedCategory.targetReportId + '_detail" run-id="runId" category="category" print="print" report-config="reportConfig"></results-category-detail>',
                    content = $compile(template)(scope);
                angular.element("#results-detail-container").append(content);
            }

            if(vm.showAllCategoryDetail) {
                goToAnchor(detailId);
            }

        }

        function goToAnchor(id) {
            if($location.hash() !== id) {
                $location.hash(id);
            }
            else {
                $anchorScroll();
            }
        }
    }
})();