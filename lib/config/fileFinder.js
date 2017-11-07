'use strict';

const path = require( 'path' );
const fileUtils = require( './fileUtils' );
let debug = require( 'debug' );

debug = debug( 'fit-commit-js:fileFinder' );

/*
   Private
   ========================================================================== */

const CONFIG_FILES = [
  '.fitcommitjsrc.yaml',
  '.fitcommitjsrc.yml',
  '.fitcommitjsrc.json',
  'package.json',
];

/**
 * Create a hash of filenames from a directory listing
 * @param {string[]} entries Array of directory entries.
 * @param {string} directory Path to a current directory.
 * @param {string[]} supportedConfigs List of support filenames.
 * @returns {Object} Hashmap of filenames
 * @private
 */
function getSupportedConfigFiles( entries, directory, supportedConfigs ) {
  const fileHash = {};
  let resolvedEntry;
  for ( let i = 0; i < entries.length; i += 1 ) {
    const entry = entries[ i ];
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
  let currentDirectory = directory || fileUtils.getCurrentDirectory();
  let filePath;
  let pathToConfigFile;
  const filesInDirectory = fileUtils.getDirectoryFiles( currentDirectory );
  const fileHash = getSupportedConfigFiles( filesInDirectory, currentDirectory, CONFIG_FILES );

  debug( `currentDir: ${currentDirectory}` );

  if ( Object.keys( fileHash ).length ) {
    for ( let i = 0; i < CONFIG_FILES.length; i += 1 ) {
      const supportedConfigFile = CONFIG_FILES[ i ];
      const supportedConfigFileThere = fileHash[ supportedConfigFile ];

      if ( supportedConfigFileThere && !filePath ) {
        filePath = supportedConfigFileThere;
      }
    }
  }

  debug( `configFilePath: ${filePath}` );

  const childDirectory = currentDirectory;
  currentDirectory = fileUtils.getParentDirectory( currentDirectory );

  if ( currentDirectory !== childDirectory && !filePath ) {
    pathToConfigFile = findFileInDirectory( currentDirectory );
  } else if ( filePath ) {
    pathToConfigFile = filePath;
  } else {
    pathToConfigFile = '';
  }

  return pathToConfigFile;
}

module.exports = {
  findFileInDirectory,
};
