const assert = require('assert');
const R = require('ramda');


module.exports = function (actual, expected) {
  assert.strictEqual(arguments.length, 2);
  assert.strictEqual(R.toString(actual), R.toString(expected));
};
