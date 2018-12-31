(function () {
    "use strict";

    angular.module("recon-results", [
        // Angular modules
        "ngAnimate",
        "ngRoute",

        // Custom modules
        
        // 3rd Party Modules
        "angular.backtop"
        ])
        .run(anchorScroll);

        /* @ngInject */
        function anchorScroll($anchorScroll) {
            $anchorScroll.yOffset = 50;
        }
})();
