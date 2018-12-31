(function() {
'use strict';

    angular
        .module('app.market-config')
        .controller('MarketConfigController', marketConfigController);

    /* @ngInject */
    function marketConfigController(storedDataService, $q, logger, $state, $stateParams, $scope, config) {
        var vm = angular.extend(this, {
            $onInit: onInit,
            fileTypes: [],
            isActive: isActive,
            imageSrc: config.imageSrc
        });
        

        
        function onInit() { 
            $scope.$watch(() => vm.fileType, () => {
                if(vm.fileType) {
                    $state.transitionTo("marketconfig", {fileTypeId: vm.fileType.fileTypeId}, {
                        location: true,
                        inherit: true,
                        relative: $state.$current,
                        notify: false
                    });
                }
            });

            getFileTypes().then(() => {
                if(vm.fileTypeId) {
                    let fileType = _.find(vm.fileTypes, (f) => f.fileTypeId === vm.fileTypeId);
                    if(!fileType) {
                        logger.error("The product you've entered (" + vm.fileTypeId + ") does not exist.");
                    } else {
                        vm.fileType = fileType;
                    }
                } else {
                    vm.fileType = vm.fileTypes[0];
                }
            });
        }

        function isActive(fileTypeId) {
            return fileTypeId === vm.fileType.fileTypeId;
        }

        function getFileTypes() {
            return $q
                .when(storedDataService.getMarkets(true))
                .then((markets) => {
                    let filteredMarkets = _.filter(markets, (m) => m.groupId === vm.groupId);
                        
                    
                    vm.fileTypes = _.map(filteredMarkets, function (m) {
                        return {
                            'stateAbbreviation': m.stateAbbreviation,
                            'fileTypeId': m.armMarketName,
                            'marketId': m.id
                        }
                    });
                    
                    if(filteredMarkets.length === 0) {
                        logger.error("The market you've entered (" + vm.groupId + ") does not exist.");
                        return;
                    }

                    return vm.fileTypes;
                });
        }
    }
})();