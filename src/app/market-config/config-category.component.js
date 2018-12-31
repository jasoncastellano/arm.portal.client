(function () {
    'use strict';

    /* ngInject */
    var configCategory = {
        // Usage: Wraps content component in panel header/detail
        transclude: true,
        templateUrl: "src/app/market-config/config-category.html",
        bindings: {
            title: "@categoryTitle",
            collapsed: "<",
            isLoading: "<",
            imageSrc: "<"
        },
        controllerAs: "vm"
    };

    angular
        .module("app.market-config")
        .component('configCategory', configCategory);
})();