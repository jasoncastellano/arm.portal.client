import angular from 'angular'
import toastr from 'toastr'
import logger from './logger.service'

let logger = angular
    .module("blocks.logger", [toastr]);

    angular.service("logger", logger);

export default logger.name;