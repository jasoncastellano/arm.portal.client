import angular from 'angular';

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [
  // Angular
  'ngResource',
  "ngResource",
  "ui.bootstrap",
  "angular.filter",
  "ngStorage",

  // Custom
  "app.core",
  "app.layout",
  "app.dashboard",
  "app.management",
  "app.reports",
    "app.shared",
    "app.market-config",
    "app.admin"
  

  // Third-party
]);

export default MODULE_NAME;