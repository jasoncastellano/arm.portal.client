(function () {
    'use strict';

    angular
        .module('app')
        .factory('reportsService', reportsService);

    /* @ngInject */
    function reportsService($http, config, $q, $sessionStorage, logger, exception, _) {
        var service = {
            getReportConfigurations: getReportConfigurations,
            getReport: getReport,
            getReportHeader: getReportHeader,
            getReportsCriteria: getReportsCriteria,
            setReportsCriteria: setReportsCriteria,
            getExcelReportUrl: getExcelReportUrl,
            getSoxReport: getSoxReport,
            getTotalsReport: getTotalsReport,
            getTotalsReportGroupByList: getTotalsReportGroupByList
        };

        return service;

        function getReportConfigurations(marketId, ignoreLoadingBar) {
            var start = new Date().getTime();
            return $http
                .get(config.apiBaseUrl + "api/markets/" + marketId + "/config/reports", {
                    cache: true,
                    ignoreLoadingBar: ignoreLoadingBar
                })
                .then(function (response) {
                        if (angular.isObject(response.data)) {
                            logger.log("time taken for request: " + (new Date().getTime() - start) + "ms");
                            return response.data;
                        } else {
                            return $q.reject(response.data);
                        }

                    },
                    function (response) {
                        return $q.reject(response.data);
                    }
                )
                .catch((e) => exception.catcher("XHR failed for getReportConfigurations")(e));
        }

        function getExcelReportUrl(reportId, runId) {
            return config.apiBaseUrl +
                "api/reports/getreport" +
                "?ReconRunId=" + runId +
                "&ReportConfigurationId=" + reportId +
                "&ReportFormat=excel";
        }

        function getReport(reportId, runId, format, ignoreLoadingBar) {
            var url =
                config.apiBaseUrl +
                "api/reports/getreport" +
                "?ReconRunId=" + runId +
                "&ReportConfigurationId=" + reportId +
                "&ReportFormat=" + format;

            return $http.get(url, {
                    cache: true,
                    ignoreLoadingBar: ignoreLoadingBar
                })
                .then((response) => response.data)
                .catch((e) => {throw e;});
        }

        function getSoxReport(reportId, ediRunIds, ignoreLoadingBar) {
            let runIdString = _.join(_.map(ediRunIds, (id) => "EdiRunIds=" + id), "&"),
                url = config.apiBaseUrl +
                "api/reports/soxreport" +
                "?ReportConfigurationId=" + reportId +
                "&" + runIdString;

            return $http
                .get(url, {cache: true, ignoreLoadingBar: ignoreLoadingBar})
                .then((response) => response.data)
                .catch((e) => exception.catcher("XHR failed for getSoxReport")(e));
        }

        function getTotalsReport(reportId, runId, format, groupBy, ignoreLoadingBar) {
            var url =
                config.apiBaseUrl +
                "api/reports/gettotalsreport" +
                "?ReconRunId=" + runId +
                "&ReportConfigurationId=" + reportId +
                "&ReportFormat=" + format +
                "&GroupBy=" + groupBy;

            return $http.get(url, {
                    cache: true,
                    ignoreLoadingBar: ignoreLoadingBar
                })
                .then((response) => response.data)
                .catch((e) => {throw e;});
        }

        function getTotalsReportGroupByList(marketId, ignoreLoadingBar) {
            var url =
                config.apiBaseUrl +
                "api/reports/totals/groupbylist" +
                "?MarketConfigurationId=" + marketId;

            return $http.get(url, {
                    cache: true,
                    ignoreLoadingBar: ignoreLoadingBar
                })
                .then((response) => response.data)
                .catch((e) => {throw e;});
        }

        function getReportHeader(reportId, runId, format, ignoreLoadingBar) {
            var url =
                config.apiBaseUrl +
                "api/reports/getreportheader" +
                "?ReconRunId=" + runId +
                "&ReportConfigurationId=" + reportId +
                "&ReportFormat=" + format;

            return $http.get(url, {
                    cache: true,
                    ignoreLoadingBar: ignoreLoadingBar
                })
                .then((response) => response.data)
                .catch(function(e) {
                    exception.catcher("XHR failed for getReportHeader")(e);
                });
        }


        function getReportsCriteria() {
            return $sessionStorage.reportsCriteria;
        }

        function setReportsCriteria(reportsCriteria) {
            $sessionStorage.reportsCriteria = reportsCriteria;
        }
    }
})();