'use strict';

const fs = require( 'fs' );
const path = require( 'path' );
const fileUtils = require( './fileUtils' );
const debug = require( 'debug' )( 'fit-commit-js:fileFinder' );

/*
   Private
   ========================================================================== */

const CONFIG_FILES = [
  'fitcommitjsrc.yaml',
  'fitcommitjsrc.yml',
  'fitcommitjsrc.json',
  'package.json',
];


/**
 * Create a hash of filenames from a directory listing
 * @param {string[]} entries Array of directory entries.
 * @param {string} directory Path to a current directory.
 * @param {string[]} supportedConfigs List of support filenames.
 * @returns {Object} Hashmap of filenames
 */
function getSupportedConfigFiles( entries, directory, supportedConfigs ) {
  const fileHash = {};
  let resolvedEntry;
  for ( let i = 0; i < entries.length; i++ ) {
    let entry = entries[ i ];
    if ( supportedConfigs.indexOf( entry ) >= 0 ) {
      resolvedEntry = path.resolve( directory, entry );
      if ( fileUtils.isFile( resolvedEntry ) ) {
        fileHash[ entry ] = resolvedEntry;
      }
    }
  }

  return fileHash;
}


/*
   Public
   ========================================================================== */


/**
 * Recursive function which search for a valid config file from the current directory
 * until the root. It returns either an empty string or the filePath of the config file.
 *
 * @param  {String} directory Path to the current directory
 * @return {String}           Path to the config file
 */
function findFileInDirectory( directory ) {
  let currentDirectory = ( directory !== undefined ) ? directory : fileUtils.getCurrentDirectory();
  let filePath;
  let childDirectory;
  const filesInDirectory = fileUtils.getDirectoryFiles( currentDirectory );
  const fileHash = getSupportedConfigFiles( filesInDirectory, currentDirectory, CONFIG_FILES );

  debug( `currentDir: ${currentDirectory}` );


  if ( Object.keys( fileHash ).length ) {
    for ( let i = 0; i < CONFIG_FILES.length; i++ ) {
      const supportedConfigFile = CONFIG_FILES[ i ];
      const supportedConfigFileThere = fileHash[ supportedConfigFile ];

      if ( supportedConfigFileThere ) {
        filePath = supportedConfigFileThere;
      }
    }
  }

  debug( `configFilePath: ${filePath}` );

  childDirectory = currentDirectory;
  currentDirectory = fileUtils.getParentDirectory( currentDirectory );

  /* eslint-disable no-else-return, consistent-return */
  if ( currentDirectory !== childDirectory && !filePath ) {
    return findFileInDirectory( currentDirectory );
  } else if ( filePath ){
    return filePath;
  }
  /* eslint-enable no-else-return, consistent-return */
}



module.exports = {
  findFileInDirectory: findFileInDirectory,
  /**
   * Retrieves the configuration filename for a given directory. It loops over all
   * of the valid configuration filenames in order to find the first one that exists.
   * @param {string} directory The directory to check for a config file.
   * @returns {?string} The filename of the configuration file for the directory
   *      or null if there is no configuration file in the directory.
   */
  getFilenameForDirectory: function getFilenameForDirectory( directory ) {
    let filename;
    let i;
    const len = CONFIG_FILES.length;
    for ( i = 0, len; i < len; i++ ) {
      filename = path.join( directory, CONFIG_FILES[ i ] );
      if ( fs.existsSync( filename ) ) {
        return filename;
      }
    }

    return null;
  },
};
