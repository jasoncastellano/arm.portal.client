import angular from 'angular';
    
    let routerHelperProvider = angular
      .module("blocks.router")
      .provider("routerHelper", routerHelperProvider);

    
    /* @ngInject */
    function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
        /* jshint validthis:true */
        var config = {
            docTitle: undefined,
            resolveAlways: {}
        };

        if (!(window.history && window.history.pushState)) {
            window.location.hash = "/";
        }

        $locationProvider.html5Mode(true);
        $urlMatcherFactoryProvider.caseInsensitive(true);
        // $urlRouterProvider.rule(function ($injector, $location) {
        //     if($location.path()) {
        //     //what this function returns will be set as the $location.url
        //      var path = $location.path(), 
        //         normalized = path.toLowerCase();
        //      if (path !== normalized) {
        //          //instead of returning a new url string, I'll just change the $location.path directly so I don't have to worry about constructing a new url string and so a new state change is not triggered
        //          $location.replace().path(normalized);
        //      }
        //      // because we've returned nothing, no state change occurs
        //     }
        //  });
        $urlRouterProvider.when('/', '/management/recon');
        $urlRouterProvider.when('', '/management/recon');

        this.configure = function (cfg) {
            angular.extend(config, cfg);
        };

        this.$get = RouterHelper;

        /* @ngInject */
        function RouterHelper($location, $rootScope, $state, logger, $transitions) {
            var handlingStateChangeError = false;
            var hasOtherwise = false;
            var stateCounts = {
                errors: 0,
                changes: 0
            };

            var service = {
                configureStates: configureStates,
                getStates: getStates,
                stateCounts: stateCounts
            };

            init();

            return service;

            ///////////////

            function configureStates(states, otherwisePath) {
                states.forEach(function (state) {
                    state.config.resolve =
                      angular.extend(state.config.resolve || {}, config.resolveAlways);
                    $stateProvider.state(state.state, state.config);
                });
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }

            function handleRoutingErrors() {
                // Route cancellation:
                // On routing error, go to the dashboard.
                // Provide an exit clause if it tries to do it twice.
                $transitions.onError({ }, (trans) => {
                    if (handlingStateChangeError) {
                        return;
                    }
                    stateCounts.errors++;
                    handlingStateChangeError = true;
                    var destination = (trans.to() &&
                    (trans.to().title || trans.to().name || trans.to().loadedTemplateUrl)) ||
                    "unknown target";
                    var msg = "Error routing to " + destination + ". " +
                    (trans.error().data || "") + ". <br/>" + (trans.error().statusText || "") +
                    ": " + (trans.error().status || "");
                    logger.warning(msg, [trans.to()]);
                    $location.path("/"); }
                );
            }

            function init() {
                handleRoutingErrors();
                updateDocTitle();
            }

            function getStates() { return $state.get(); }

            function updateDocTitle() {
                $transitions.onSuccess({}, (trans) => {
                      stateCounts.changes++;
                      handlingStateChangeError = false;
                      var title = config.docTitle + " " + (trans.to().title || "");
                      $rootScope.title = title; // data bind to <title>
                  }
                );
            }
        }
    }

export default routerHelperProvider;