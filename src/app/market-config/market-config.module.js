(function() {
    'use strict';

    angular.module("app.market-config", [
        "app.core",
        "market-rules",
        "reports-config",

        "xeditable",
        "checklist-model"
    ])
    .run(function(editableOptions, editableThemes) {
        editableOptions.theme = "bs3";
    });
    
})();