import angular from 'angular';
import uiRouter from 'angular-ui-router';
import blocksLogger from '../logger/logger.module';
import './router-helper.provider';


// var Visualizer = window["ui-router-visualizer"].Visualizer;

let router = angular
  .module("blocks.router", [
  uiRouter,
  blocksLogger
]);

// router.run(function($uiRouter){
//   var pluginInstance = $uiRouter.plugin(Visualizer);
// })

export default router;