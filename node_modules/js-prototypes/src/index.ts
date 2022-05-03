/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference path="./globals.d.ts" />
// members
import './Error';
import './Number';
import './Array';
import './Object';
import './String';
import './Function';
import './JSON';
//import '../packages/collections/collections.js';

//declare namespace prototype {}

if (typeof module != 'undefined' && module.exports) {
  module.exports = {
    prototype_array: require('./Array'),
  };
}
