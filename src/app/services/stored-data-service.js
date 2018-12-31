(function() {
'use strict';

    angular
        .module('app')
        .factory('storedDataService', storedDataService);

    /* @ngInject */
    function storedDataService($sessionStorage, dataservice) {
        var service = {
            getMarkets: getMarkets,
            getFacetsEnvironments: getFacetsEnvironments,
            getUser: getUser,
            getTransactionTypes: getTransactionTypes
        };
        
        return service;

        ////////////////
        function getMarkets(ignoreLoadingBar) {
            if($sessionStorage.markets) {
                return $sessionStorage.markets;
            }

            return dataservice.getMarkets(ignoreLoadingBar)
                .then(function (data) {
                    $sessionStorage.markets = data.markets;
                    return $sessionStorage.markets;
                });
        }

        function getUser(ignoreLoadingBar) {
            if($sessionStorage.user) {
                return $sessionStorage.user;
            }

            return dataservice.getUser(ignoreLoadingBar)
                .then((data) => {
                    $sessionStorage.user = data.user;
                    return $sessionStorage.user;
                });
        }

        function getFacetsEnvironments(ignoreLoadingBar) {
            if(Boolean($sessionStorage.facetsEnvironments) && $sessionStorage.facetsEnvironments.length > 0) {
                return $sessionStorage.facetsEnvironments;
            }

            return dataservice.getFacetsEnvironments(ignoreLoadingBar)
                .then(function (data) {
                    $sessionStorage.facetsEnvironments = data.facetsEnvironments;
                    return $sessionStorage.facetsEnvironments;
                });
        }

        function getTransactionTypes(ignoreLoadingBar) {
            if($sessionStorage.transactionTypes) {
                return $sessionStorage.transactionTypes;
            }

            return dataservice.getTransactionTypes(ignoreLoadingBar)
                .then(function (data) {
                    $sessionStorage.transactionTypes = data;
                    return $sessionStorage.transactionTypes;
                });
        }

        
    }
})();