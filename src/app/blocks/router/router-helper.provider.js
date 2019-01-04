import angular from 'angular';

class RouterHelperProvider {
    /* @ngInject */
    constructor($locationProvider, $stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
        this.config = {
            docTitle: undefined,
            resolveAlways: {}
        };

        if (!(window.history && window.history.pushState)) {
            window.location.hash = "/";
        }

        $locationProvider.html5Mode(true);
        $urlMatcherFactoryProvider.caseInsensitive(true);

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

}

export default RouterHelperProvider;