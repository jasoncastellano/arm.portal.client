(function () {
    "use strict";

    angular
        .module("management-recon")
        .service("reconRequestService", reconRequestService);

    reconRequestService.$inject = ["$http", "config"];

    /* @ngInject */
    function reconRequestService($http, config) {
        this.addReconRun = addReconRun;
        this.addRecon = addRecon;
        this.finalizeRecon = finalizeRecon;

        function addReconRun(request) {
            return $http.post(config.apiBaseUrl + "api/AddReconRun", request)
                .then(
                    function(response) {
                        return {
                            message: response.ResponseMessage
                        };
                    },
                    function(httpError) {
                        throw httpError.status + " : " + httpError.data;
                    });

        }

        function addRecon(request) {
            return $http.post(config.apiBaseUrl + "api/AddRecon", request)
                .then(
                    function (response) {
                        return {
                            message: response.ResponseMessage
                    };
                    },
                    function (httpError) {
                        throw httpError.status + " : " + httpError.data;
                    });

        }

        function finalizeRecon(reconId) {
            return $http.post(config.apiBaseUrl + "api/finalizerecon", '"' + reconId + '"')
                .then(
                    function (response) {
                        return {
                            message: response.ResponseMessage
                        };
                    },
                    function (httpError) {
                        throw httpError.status + " : " + httpError.data;
                    });

        }
    }
})();