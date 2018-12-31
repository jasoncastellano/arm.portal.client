(function () {
    'use strict';

    angular
        .module('app')
        .factory('adminService', adminService);

    /* @ngInject */
    function adminService($http, config, $q, $sessionStorage, logger, exception, _) {
        var service = {
            getMarketRules: getMarketRules,
            getMarketRuleCategory: getMarketRuleCategory
        };

        return service;

        function getMarketRules(marketId, ignoreLoadingBar) {
            return $http
                .get(config.apiBaseUrl + "api/markets/" + marketId + "/config/rules", {
                    cache: true,
                    ignoreLoadingBar: ignoreLoadingBar
                })
                .then(function (response) {
                        if (angular.isObject(response.data)) {
                            return response.data;
                        } else {
                            return $q.reject(response.data);
                        }

                    },
                    function (response) {
                        return $q.reject(response.data);
                    }
                )
                .catch(function (e) {
                    logger.error("DataError: ", e);
                    throw e;
                });
        }

        function getMarketRuleCategory(marketId, categoryId, ignoreLoadingBar) {
            return $http
                .get(config.apiBaseUrl + "api/markets/" + marketId + "/config/rules/" + categoryId, {
                    cache: true,
                    ignoreLoadingBar: ignoreLoadingBar
                })
                .then(function (response) {
                        if (angular.isObject(response.data)) {
                            return response.data;
                        } else {
                            return $q.reject(response.data);
                        }

                    },
                    function (response) {
                        return $q.reject(response.data);
                    }
                )
                .catch(function (e) {
                    logger.error("DataError: ", e);
                    throw e;
                });
        }
    }
})();