import angular from 'angular';
import appCore from '../../core/core.module';
import uiBootstrap from 'angular-ui-bootstrap';

/* ngInject */
function splash($uibModal, $rootScope) {
    return {
        open: (attrs, opts) => {
            let scope = $rootScope.$new();
            angular.extend(scope, attrs);
            opts = angular.extend(opts || {}, {
                backdrop: false,
                scope: scope,
                templateUrl: "splash/content.html",
                windowTemplateUrl: "splash/index.html",
                openedClass: "splash-opened"
            });
            return $uibModal.open(opts);
        }
    }
}

/* ngInject */
function loadTemplateCache($templateCache, config) {
    $templateCache.put('splash/index.html',
        '<section modal-render="{{$isRendered}}" class="splash" ng-style="{\'z-index\': 1000, display: \'block\'}" ng-click="close($event)">' +
        '  <div class="splash-inner" ng-transclude></div>' +
        '</section>'
    );
    $templateCache.put('splash/content.html',
        '<div class="splash-content text-center">' +
        '  <h1 ng-bind="title"></h1>' +
        '  <p class="lead" ng-bind="message"></p>' +
        '  <img src="' + config.imageSrc + '/loading-gears-alt-lg.gif"></img>' +
        '</div>'
    );
}

export default angular.module("layout.splash", ["app.core", "ui.bootstrap"])
    .service("$splash", splash)
    .run(loadTemplateCache);