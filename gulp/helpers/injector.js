'use strict';

var $ = require('./plugins');
var orderSrc = require("./order-source");

module.exports = inject;


/**
 * Inject files in a sorted sequence at a specified inject label
 * @param   {Array} src   glob pattern for source files
 * @param   {String} label   The label name
 * @param   {Array} order   glob pattern for sort order of the files
 * @returns {Stream}   The stream
 */
function inject(src, label, addRootSlash, order) {
  var options = {
      addRootSlash: addRootSlash
    },
    srcOptions = {
      read: false
    };
  if (label) {
    options.name = "inject:" + label;
  }

  return $.inject(orderSrc(src, order, srcOptions), options);
}