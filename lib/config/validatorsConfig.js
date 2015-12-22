// ==========================================================================
// Source adapted from: https://github.com/eslint/eslint/blob/master/lib/config/config-file.js
// ==========================================================================
'use strict';


const R = require( 'ramda' );
const configLoader = require( './configLoader' );


/*
   Private
   ========================================================================== */

/**
 * Config object with only enabled validator options.
 * @type {Object}
 * @private
 */
let enabledValidators = {};

/**
 * Gets the keys of the validators which have been enabled in the config file
 * @param  {Object} enabledValidators The object containing the enabled validators
 * @return {Array}                    An array of the enabled validators
 * @private
 */
function enabledValidatorsKeys() {
  return R.keys( enabledValidators );
}

/**
 * Given the config object, it creates a new object containing only the enabled validators.
 * @param  {String} directory Path to the directory. If not defined, starts searching from the current directory.
 * @return {Object}           An object containing all the enabled validators
 * @private
 */
function loadEnabledValidatorsObject( directory ) {
  if ( Object.keys( enabledValidators ).length === 0 ) {
    const isEnabled = ( val ) => val.enabled === true;
    const config = configLoader.findAndLoad( directory );
    const validators = ( config ) ? config.validators : {};
    enabledValidators = R.pickBy( isEnabled, validators );
  }
  return enabledValidators;
}

/*
   Public
   ========================================================================== */

/**
 * Gets the keys of the validators which have been enabled in the config file
 * @param  {Array}  enabledValidatorsKeys         An array of the enabled validators
 * @param  {Object} getEnabledValidatorsObject   An object containing all the enabled validators
 * @return {Array}                               An array of the keys of the enabled validators of the config object
 */
const getEnabledValidatorsArray = R.compose( enabledValidatorsKeys, loadEnabledValidatorsObject );

function getEnabledValidators() {
  return enabledValidators;
}

function clearEnabledValidators() {
  enabledValidators = {};
}

module.exports = {
  getEnabledValidatorsArray: getEnabledValidatorsArray,
  getEnabledValidators: getEnabledValidators,

  // Exposed for testing
  loadEnabledValidatorsObject: loadEnabledValidatorsObject,
  clearEnabledValidators: clearEnabledValidators,
};
