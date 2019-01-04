import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'ngAnimate';
import ngSanitize from 'ngSanitize';
import ngStorage from 'ngStorage';
import angularCache from 'angular-cache';
import angularLoadingBar from 'angular-loading-bar';
import blocksLogger from '../blocks/logger/logger.service';
import blocksRouter from '../blocks/router/router.module';
import blocksException from '../blocks/exception/exception.module';
import sweetAlert from '19degrees.ngSweetAlert';
import angularSpinners from 'angular-spinners';
import angularClipboard from 'angular-clipboard';
import angularBacktop from 'angular.backtop';


export default angular.module('app.core', [
    ngAnimate,
    ngSanitize,
    uiRouter,
    ngStorage,
    angularCache,
    angularLoadingBar,
    blocksLogger,
    blocksRouter,
    blocksException,
    sweetAlert,
    angularSpinners,
    angularClipboard,
    angularBacktop
]).name;
