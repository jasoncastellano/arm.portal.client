(function() {
'use strict';

    angular
        .module('app.shared')
        .controller('permalinkController', permalinkController);
    
    /* @ngInject */
    function permalinkController($sce) {
        var vm = angular.extend(this, {
            popoverIsOpen: false,
            templateUrl: "permalinkTemplate.html"
        });
    }
})();