
// function logger($log, toastr) {
//     var service = {
//         showToasts: true,

//         error: error,
//         info: info,
//         success: success,
//         warning: warning,

//         // straight to console; bypass toastr
//         log: $log.log
//     };

//     return service;
//     /////////////////////

    
// };

class Logger {
    /* @ngInject */
    constructor($log, toastr) {
        this.log = $log;
        this.toastr = toastr;
        this.showToasts = true;
    }

    error(message, data, title) {
        toastr.error(message, title);
        log.error("Error: " + message, data);
    }

    info(message, data, title) {
        toastr.info(message, title);
        log.info("Info: " + message, data);
    }

    success(message, data, title) {
        toastr.success(message, title);
        log.info("Success: " + message, data);
    }

    warning(message, data, title) {
        toastr.warning(message, title);
        log.warn("Warning: " + message, data);
    }
}