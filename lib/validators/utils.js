'use strict';

const R = require( 'ramda' );
const base = require( './base' );


const normalizeString = R.compose( R.toLower, R.trim );

const comaStringToArray = R.split( ',' );

/**
 * Gets the defined empty lines from the config
 * @param VALIDATOR_NAME
 * @param Validator_property_to_extract
 * @return {array} Array with the empty lines
 */
const getDefinedValues = R.compose( comaStringToArray, base.getValidatorProperty );



module.exports = {
  normalizeString,
  comaStringToArray,
  getDefinedValues,
};
