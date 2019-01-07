import angular from 'angular';
import uiRouter from 'angular-ui-router';
import blocksLogger from '../logger/logger.module';
import {RouterHelperProvider} from './router-helper.provider';


// var Visualizer = window["ui-router-visualizer"].Visualizer;

let routerModule = angular.module("blocks.router", [uiRouter, blocksLogger]);

routerModule.provider('routerHelperProvider', RouterHelperProvider);

export default routerModule;

// router.run(function($uiRouter){
//   var pluginInstance = $uiRouter.plugin(Visualizer);
// })
