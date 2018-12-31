import angular from 'angular';
import ngAnimate from 'ngAnimate';
import ngSanitize from 'ngSanitize';


export default angular.module('app.core', [
    ngAnimate.name,
    ngSanitize.name,
    "ui.router",
    "ngStorage",
    "angular-cache",
    "angular-loading-bar",
    "blocks.logger",
    "blocks.router",
    "blocks.exception",
    "19degrees.ngSweetAlert2",
    "angularSpinners",
    "angular-clipboard",
    "angular.backtop",
    "ui.dashboard"
]).name;
