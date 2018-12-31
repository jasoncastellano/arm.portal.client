'use strict';

var config = require("../config");
module.exports = wiredepOptions;

/**
 * Creates options for wiredep processing
 * @param {bool} Indicates the addition of a leading root slash to all injected paths
 * @param {bool} Identifies call as part of a distribution build
 */
function wiredepOptions() {
    var wiredepConfig = config.wiredep(),
        rootSlash = config.useIisExpress ? "/" : "",
        options = {
          bowerJson: config.bower.json,
          directory: config.bower.directory,
          ignorePath: config.bower.ignorePath,
          devDependencies: true,
          fileTypes: {
              html: {
                  replace: {
                      js: function (filePath) {
                        var dir = wiredepConfig.js,
                            filepath = filePath;

                        if(config.dist) {
                            filepath = filePath.replace(wiredepConfig.filepathRegex, '');
                        }
                        
                        return '<script src="' 
                            + rootSlash
                            + dir
                            + filepath
                            + '"></script>';
                      },
                      css: function (filePath) {
                        var dir = wiredepConfig.css,
                            filepath = filePath;

                        if(config.dist) {
                            filepath = filePath.replace(wiredepConfig.filepathRegex, '');
                        }
                        
                        return '<link rel="stylesheet" href="'
                            + rootSlash
                            + dir
                            + filepath
                            + '" />';
                      }
                  }
              }
          }
      };
      return options;
}