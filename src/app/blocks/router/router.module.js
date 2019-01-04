import angular from 'angular';
import uiRouter from 'angular-ui-router';
import blocksLogger from '../logger/logger.module';
import {RouterHelperProvider} from './router-helper.provider';


// var Visualizer = window["ui-router-visualizer"].Visualizer;

export default RouterModule = angular
  .module("blocks.router", [uiRouter, blocksLogger])
  .provider('routerHelperProvider', RouterHelperProvider).name;

// router.run(function($uiRouter){
//   var pluginInstance = $uiRouter.plugin(Visualizer);
// })
