import angular from 'angular'
import toastr from 'toastr'
import logger from './logger.service'

let logger = angular
    .module("blocks.logger", [toastr])
    .service("logger", logger);

export default logger;