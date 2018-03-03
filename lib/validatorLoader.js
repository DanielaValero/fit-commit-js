'use strict';

const validatorsConfig = require( './config/validatorsConfig' );
const fileUtils = require( './config/fileUtils' );
const R = require( 'ramda' );
const path = require( 'path' );

const VALIDATORS_PATH = path.resolve( __dirname, './validators/' );

/*
   Private
   ========================================================================== */

/**
 * Imports a validator file.
 * @param  {String} fileName Filename of the validator to import.
 * @return {Object}          Returns an object of the imported validator pointing to its functions
 * @private
 */
function requireValidator( fileName ) {
  const newValidator = {};
  newValidator[ fileName ] = require( path.join( VALIDATORS_PATH, fileName ) ); //eslint-disable-line
  return newValidator;
}

/*
   Public
   ========================================================================== */

/**
 * Gets all the defined validator files, and loads them in an array
 * @return {Array} Array of validator files
 */
function getValidatorFiles() {
  const files = fileUtils.getDirectoryFiles( VALIDATORS_PATH );
  return R.map( R.replace( /.js/, '' ), files );
}

/**
 * Given the defined files, and the object with the enabled validators defined in the config.
 * This creates a new array containing all the defined validator files which
 * have been previously enabled
 * by the user
 * @param  {String} directory Path to the directory. If not defined, starts
 *                            searching from the current directory.
 * @return {Array}            New array of defined files which have been enabled by the user
 */
function getEnabledValidatorsFiles( directory ) {
  const validatorFiles = getValidatorFiles();
  const enabledValidators = validatorsConfig.getEnabledValidatorsArray( directory );
  const isEnabled = key => R.contains( key, enabledValidators );
  const enabledValidatorsFiles = R.compose( R.values, R.pickBy( isEnabled ), getValidatorFiles );
  return R.map( enabledValidatorsFiles, validatorFiles )[ 0 ];
}

/**
 * Loads into a validators object all the validators which have been implemented and
 * have been enabled by the user.
 * @param  {String} directory Path to the directory. If not defined, starts searching
 *                            from the current directory.
 * @return {Arrat of objects}           An array of objects of validators which
 *                                      contains all the validators and its public functions
 * ie:
 [ { emptyLines: { validate: [Function: validate] } },
   { lineLength: { validate: [Function: validate] } },
   { wip: { validate: [Function: validate] } } ]
 */
function loadValidators( directory ) {
  const enabledValidators = getEnabledValidatorsFiles( directory );
  const validators = R.map( requireValidator, enabledValidators );
  return ( validators !== undefined && validators.length > 0 ) ? validators : {};
}

module.exports = {
  getValidatorFiles,
  getEnabledValidatorsFiles,
  loadValidators,
};
