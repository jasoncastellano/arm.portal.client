'use strict';

var config = require("../config"),
    $ = require('./plugins');

module.exports = log;

function log(msg) {
  if (typeof (msg) === "object") {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.green(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.green(msg));
  }
}