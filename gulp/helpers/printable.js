'use strict';

var args = require('./args');
var $ = require('./plugins');
var noop = require('through2').obj;

module.exports = args.verbose ? $.print : noop;
