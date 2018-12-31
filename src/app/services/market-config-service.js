(function () {
    'use strict';

    angular
        .module("app")
        .factory('marketConfigService', marketConfigService);

    /* ngInject */
    function marketConfigService($http, config, $q, _, logger) {
        var service = {
            getBasicMarketConfig: getBasicMarketConfig,
            updateBasicMarketConfig: updateBasicMarketConfig
        };

        return service;

        function getBasicMarketConfig(marketId, ignoreLoadingBar) {
            return $http
                .get(config.apiBaseUrl + "api/markets/" + marketId + "/config", {
                    cache: true,
                    ignoreLoadingBar: ignoreLoadingBar
                })
                .then(function (response) {
                    if (angular.isObject(response.data)) {
                        return response.data;
                    } else {
                        return $q.reject(response.data);
                    }

                }, function (response) {
                    return $q.reject(response.data);
                })
                .catch(function (e) {
                    logger.log("DataError: ", e);
                    throw e;
                });
        }

        function updateBasicMarketConfig(marketConfig, ignoreLoadingBar) {
            return $http
                .put(config.apiBaseUrl + "api/markets/" + marketConfig.market.id + "/config", marketConfig, {
                    cache: true,
                    ignoreLoadingBar: ignoreLoadingBar
                })
                .then(function (response) {
                    if (angular.isObject(response.data) || response.status === 204) {
                        return response.data;
                    } else {
                        return $q.reject(response.data);
                    }

                }, function (response) {
                    return $q.reject(response.data);
                })
                .catch(function (e) {
                    logger.log("DataError: ", e);
                    throw e;
                });
        }
    }
})();