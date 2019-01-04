import angular from 'angular';
import blocksLogger from '../logger/logger.module';
import exception from './exception.service'

export default angular
    .module("blocks.exception", [blocksLogger])
    .service("exception", exception);
