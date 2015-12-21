'use strict';

const fileFinder = require( './config/fileFinder' );
const configLoader = require( './config/configLoader' );
const fileUtils = require( './config/fileUtils' );
const R = require( 'Ramda' );
const path = require( 'path' );

const VALIDATORS_PATH = path.resolve( './lib/validators/' );

/*
   Private
   ========================================================================== */

/**
 * Imports a validator file.
 * @param  {String} fileName Filename of the validator to import.
 * @return {Object}          Returns an object of the imported validator pointing to its functions
 */
function requireValidator( fileName ) {
  const newValidator = {};
  newValidator[ fileName ] = require( path.join( VALIDATORS_PATH, fileName ) );
  return newValidator;
}

/**
 * Gets the keys of the validators which have been enabled in the config file
 * @param  {Object} enabledValidators The object containing the enabled validators
 * @return {Array}                   An array of the enabled validators
 */
function enabledValidatorsKeys( enabledValidators ) {
  return R.keys( enabledValidators );
}

/* eslint-disable no-use-before-define */
/**
 * Gets the keys of the validators which have been enabled in the config file
 * @param  {Array}  enabledValidatorsKeys         An array of the enabled validators
 * @param  {Object} getEnabledValidatorsObject  An object containing all the enabled validators
 * @return {Array}                               An array of the keys of the enabled validators of the config object
 */
const getEnabledValidatorsArray = R.compose( enabledValidatorsKeys, getEnabledValidatorsObject );
/* eslint-enable no-use-before-define */

/*
   Public
   ========================================================================== */

/**
 * Gets the configuration file defined by the user.
 * @param  {String} directory Path to the directory. If not defined, starts searching from the current directory.
 * @return {Object}           An object containing all the defined attributes by the user
 */
function getConfigurationFile( directory ) {
  // Currying the call to findFileInDirectory because it is recursive and we dont have yet the tail call optimization
  const configFilePathFn = R.partial( fileFinder.findFileInDirectory, [ directory ] );
  const config = configLoader.load( configFilePathFn() );

  return config;
}

/**
 * Given the config object, it creates a new object containing only the enabled validators.
 * @param  {String} directory Path to the directory. If not defined, starts searching from the current directory.
 * @return {Object}           An object containing all the enabled validators
 */
function getEnabledValidatorsObject( directory ) {
  const isEnabled = ( val ) => val.enabled === true;
  return R.pickBy( isEnabled, getConfigurationFile( directory ).validators );
}

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
 * This creates a new array containing all the defined validator files which have been previously enabled
 * by the user
 * @param  {String} directory Path to the directory. If not defined, starts searching from the current directory.
 * @return {Array}            New array of defined files which have been enabled by the user
 */
function getEnabledValidatorsFiles( directory ) {
  const validatorFiles = getValidatorFiles();
  const enabledValidators = getEnabledValidatorsArray( directory );
  const isEnabled = ( key ) => R.contains( key, enabledValidators );
  const enabledValidatorsFiles = R.compose( R.values, R.pickBy( isEnabled ), getValidatorFiles );

  return R.map( enabledValidatorsFiles, validatorFiles )[ 0 ];
}

/**
 * Loads into a validators object all the validators which have been implemented and
 * have been enabled by the user.
 * @param  {String} directory Path to the directory. If not defined, starts searching from the current directory.
 * @return {Object}           An object of validators which contains all the validators and its public functions
 */
function loadValidators( directory ) {
  const enabledValidators = getEnabledValidatorsFiles( directory );
  const validators = R.map( requireValidator, enabledValidators );
  return validators[ 0 ];
}

module.exports = {
  getConfigurationFile: getConfigurationFile,
  getValidatorFiles: getValidatorFiles,
  getEnabledValidatorsFiles: getEnabledValidatorsFiles,
  getEnabledValidatorsObject: getEnabledValidatorsObject,
  loadValidators: loadValidators,
};
