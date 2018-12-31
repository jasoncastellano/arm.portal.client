(function () {
    "use strict";

    angular
      .module("blocks.exception")
      .factory("exception", exception);

    /* @ngInject */
    function exception($q, logger) {
        var service = {
            catcher: catcher
        };
        return service;

        function catcher(message) {
            return function (e) {
                var thrownDescription;
                var newMessage;
                if (e.data && e.data.exceptionMessage) {
                    thrownDescription = "\n" + e.data.exceptionMessage;
                    newMessage = message + thrownDescription;
                }
                e.data.description = newMessage;
                logger.error(newMessage);
            };
        }
    }
})();