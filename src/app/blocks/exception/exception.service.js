class Exception {
    /* @ngInject */
    constructor($q, logger) {
        'ngInject';
        this.$q = $q;
        this.logger = logger;
    }

    catcher(message) {
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