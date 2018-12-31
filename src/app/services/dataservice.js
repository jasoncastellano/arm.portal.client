(function () {
  "use strict";

  angular
    .module("app")
    .factory("dataservice", dataservice);

  /* @ngInject */
  function dataservice($http, config, $q, _, logger) {
    var service = {
      getFacetsEnvironments: getFacetsEnvironments,
      getMarkets: getMarkets,
      getReconRuns: getReconRuns,
      getUser: getUser,
      getTransactionTypes: getTransactionTypes
    }

    return service;

    function getFacetsEnvironments(ignoreLoadingBar) {
      return $http
        .get(config.apiBaseUrl + "api/getfacetsenvironments", {
          cache: true,
          ignoreLoadingBar: ignoreLoadingBar
        })
        .then(function (response) {
          return response.data;
        })
        .catch(function (e) {
          logger.log("DataError: ", e);
          throw e;
        });
    }

    function getReconRuns(marketId, reconId, statuses, ignoreLoadingBar) {
      // map statuses
      var flatStatuses = !statuses ? [] : _.join(_.flatMap(statuses, function (item) {
          return "statuses=" + item + "&"
        }), "&"),
        url = config.apiBaseUrl + "api/getreconruns?marketId=" + marketId;
        
        if(reconId) {
          url = + "&reconId=" + reconId;
        }
         
      
      if(flatStatuses.length > 0) {
        url = url + "&" + flatStatuses;
      }

      return $http
        .get(url, {ignoreLoadingBar: ignoreLoadingBar})
        .then(function(response) {
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

    function getMarkets(ignoreLoadingBar) {
      return $http
        .get(config.apiBaseUrl + "api/getmarkets?reconEnabled=false", {
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

    function getUser(ignoreLoadingBar) {
      return $http.get(config.apiBaseUrl + "api/getuser", {
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

    function getTransactionTypes(ignoreLoadingBar) {
      return $http.get(config.apiBaseUrl + "api/getTransactionTypes", {
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
  }
})();