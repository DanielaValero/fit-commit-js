// ==========================================================================
// Source adapted from: https://github.com/eslint/eslint/blob/master/lib/config/config-file.js
// ==========================================================================
'use strict';

const path = require( 'path' );
const R = require( 'ramda' );
const fileUtils = require( './fileUtils' );
const jsonValidator = require( 'is-my-json-valid' );
const debug = require( 'debug' )( 'fit-commit-js:configLoader' );
const schema = require( './schema' );
const validate = jsonValidator( schema );
const fileFinder = require( './fileFinder' );

/*
   Private
   ========================================================================== */

/**
 * Loads a YAML configuration from a file.
 * @param {string} filePath The filename to load.
 * @returns {Object} The configuration object from the file.
 * @throws {Error} If the file cannot be read.
 * @private
 */
function loadYAMLConfigFile( filePath ) {
  debug( 'Loading YAML config file: ' + filePath );

  // lazy load YAML to improve performance when not used
  const yaml = require( 'js-yaml' );

  try {
    // empty YAML file can be null, so always use
    return yaml.safeLoad( fileUtils.readFile( filePath ) ) || {};
  } catch ( e ) {
    fileUtils.throwError( e, filePath, 'YAML' );
  }
}

/**
 * Loads a JSON configuration from a file.
 * @param {string} filePath The filename to load.
 * @returns {Object} The configuration object from the file.
 * @throws {Error} If the file cannot be read.
 * @private
 */
function loadJSONConfigFile( filePath ) {
  debug( 'Loading JSON config file: ' + filePath );

  try {
    return JSON.parse( fileUtils.readFile( filePath ) );
  } catch ( e ) {
    fileUtils.throwError( e, filePath, 'JSON' );
  }
}

/**
 * Loads a configuration from a package.json file.
 * @param {string} filePath The filename to load.
 * @returns {Object} The configuration object from the file.
 * @throws {Error} If the file cannot be read.
 * @private
 */
function loadPackageJSONConfigFile( filePath ) {
  debug( 'Loading package.json config file: ' + filePath );
  try {
    return loadJSONConfigFile( filePath ).fitcommitjsConfig || null;
  } catch ( e ) {
    fileUtils.throwError( e, filePath, 'package.json' );
  }
}

/**
 * Loads a configuration file regardless of the source. Inspects the file path
 * to determine the correctly way to load the config file.
 * @param {string} filePath The path to the configuration.
 * @returns {Object} The configuration information.
 * @private
 */
function loadConfigFile( filePath ) {
  let config;
  switch ( path.extname( filePath ) ) {
    case '.yaml':
    case '.yml':
      config = loadYAMLConfigFile( filePath );
      break;
    case '.json':
      if ( path.basename( filePath ) === 'package.json' ) {
        config = loadPackageJSONConfigFile( filePath );
        if ( config === null ) {
          return null;
        }
      } else {
        config = loadJSONConfigFile( filePath );
      }

      break;
    default:
      config = loadYAMLConfigFile( filePath );
  }
  return config;
}

/**
 * Loads a configuration file from the given file path.
 * @param {string} filePath The filename or package name to load the configuration
 *      information from.
 * @returns {Object} The configuration information.
 * @private
 */
function load( filePath ) {
  const resolvedPath = fileUtils.resolve( filePath );
  const config = loadConfigFile( resolvedPath );

  if ( config ) {
    // validate the configuration before continuing
    validate( config );
  }

  return config;
}

/*
   Public
   ========================================================================== */

/**
 * Gets the configuration file defined by the user.
 * @param  {String} directory Path to the directory. If not defined, starts searching from the current directory.
 * @return {Object}           An object containing all the defined attributes by the user
 */
function findAndLoad( directory ) {
  // Currying the call to findFileInDirectory because it is recursive and we dont have yet the tail call optimization
  const configFilePathFn = R.partial( fileFinder.findFileInDirectory, [ directory ] );
  const config = load( configFilePathFn() );
  return config;
}

module.exports = {
  findAndLoad,
  // Exposed for testing
  load,
};
