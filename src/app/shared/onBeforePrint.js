(function () {
    'use strict';

    angular
        .module("app.shared")
        .directive("onBeforePrint", onBeforePrint);

    /* @ngInject */
    function onBeforePrint($window, $rootScope, $timeout, _) {
        // Usage:
        //  <div ng-class="{printed: isPrinted}" on-before-print="printed = true" />
        // Creates:
        //  Allows you to modify the page DOM and CSS styles before printing by exexuting the passed expression. 
        //  Will force a $digest phase before the print operation.

        var directive = {
                link: link,
                restrict: 'A'
            },
            beforePrintDirty = false,
            listeners = [];

        if ($window.matchMedia) {
            let mediaQueryList = $window.matchMedia("print");
            mediaQueryList.addListener((mql) => {
                if (mql.matches) {
                    beforePrint();
                }
            });
        }

        $window.onbeforeprint(beforePrint);

        return directive;

        function beforePrint() {
            if (beforePrintDirty) {
                return;
            }

            beforePrintDirty = true;

            if (listeners) {
                _.each(listeners, (listener) => {
                    listener.triggerHandler("beforePrint");
                })

                let scopePhase = $rootScope.$$phase;

                // This must be synchronous, so we call digest here.
                if (scopePhase !== "$apply" && scopePhase !== "$digest") {
                    $rootScope.$digest();
                }
            }

            // Used for WebKit to prevent duplicate calls
            $timeout(() => {
                beforePrintDirty = false;
            }, 100, false);
        };

        function link(scope, element, attrs) {
            let onBeforePrintHandler = () => {
                scope.$eval(attrs.onBeforePrint);
            };

            listeners.push(element);
            element.on("beforePrint", onBeforePrintHandler);

            scope.$on("$destroy", () => {
                element.off("beforePrint", onBeforePrintHandler);
                _.remove(listeners, (listener) => listener === element);
            });
        };
    }


})();