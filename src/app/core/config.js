(function () {
    "use strict";
 
    var core = angular.module("app.core"),
        defaultCache = {
            maxAge: 30 * 60 * 1000, // Items expire after 30 min
            cashFlushInterval: 60 * 60 * 1000, // Cache is cleared every hour
            deleteOnExpire: "aggressive" // Items will be deleted from cache when they expire
        },
        config = {
        appErrorPrefix: "[ARM Error] ",
        imageSrc: '/* @echo IMAGESRC */' || 'src/assets/images',
        appTitle: "ARM",
        apiBaseUrl: window.location.origin + "/arm/"
        };
    core.value("config", config);

    core
        .config(toastrConfig)
        .config(datepickerPopupConfig)
        .config(generalConfig)
        .config(loadingBarConfig)
        .run(setDefaultHttpCache);

    /* @ngInject */
    function setDefaultHttpCache($http, CacheFactory) {
        $http.defaults.cache = CacheFactory("defaultCache", defaultCache);
    }

    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = "toast-top-right";
    }

    /* @ngInject */
    function loadingBarConfig(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.loadingBarTemplate = '<div id="loading-bar"><div class="bar"><div class="peg"></div></div></div>';
    }

    /* @ngInject */
    function datepickerPopupConfig(uibDatepickerPopupConfig) {
        uibDatepickerPopupConfig.datepickerPopup = 'MM/dd/yyyy';
        uibDatepickerPopupConfig.closeText = 'Close';
    };

  
    /* @ngInject */
    function generalConfig($logProvider, routerHelperProvider, $localStorageProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        
        routerHelperProvider.configure({ docTitle: config.appTitle + ": " });
        $localStorageProvider.setKeyPrefix("arm");
    }

})();