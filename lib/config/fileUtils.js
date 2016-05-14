'use strict';

const fs = require( 'fs' );
const path = require( 'path' );
const debug = require( 'debug' )( 'fit-commit-js:file-utils' );

function isFile( resolvedEntry ) {
  return fs.statSync( resolvedEntry ).isFile();
}

function getParentDirectory( directory ) {
  return path.dirname( directory );
}

function getCurrentDirectory() {
  return process.cwd();
}

/**
 * Reads the files inside a directory. Retrieves them in an array
 * @param  {String} directory directory path
 * @return {Array}            Array of the the filenames in the directory
 */
function getDirectoryFiles( directory ) {
  return fs.readdirSync( directory );
}

/**
 * Convenience wrapper for synchronously reading file contents.
 * @param {string} filePath The filename to read.
 * @returns {string} The file contents.
 * @private
 */
function readFile( filePath ) {
  return fs.readFileSync( filePath, 'utf8' );
}

/**
 * Convenience wrapper for asynchronously reading file contents.
 * @param {string} filePath The filename to read.
 * @param {function} callback The callback to execute once the file is read
 * @returns {string} The file contents.
 * @private
 */
function readFileAsync( filePath, callback ) {
  return fs.readFile( filePath, 'utf8', callback );
}

/**
 * Resolves a configuration file path into the fully-formed path.
 * @param {string} filePath The filepath to resolve.
 * @returns {string} A path that can be used directly to load the configuration.
 * @private
 */
function resolve( filePath ) {
  return path.resolve( filePath );
}

/**
 * Throws an error message which might happen while reading a file
 * @param  {Object} error    The error object
 * @param  {string} filePath The string we tried to read
 * @param  {string} what     A string telling what type of file we tried to read
 */
function throwError( error, filePath, what ) {
  debug( `Error reading ${what} file: ${filePath}` );
  const errorMessage = `Cannot read config file: ${filePath} Error: ${error.message}`;
  const customError = new Error( errorMessage );
  throw Object.assign( customError, error );
}

module.exports = {
  readFile,
  readFileAsync,
  resolve,
  throwError,
  getCurrentDirectory,
  isFile,
  getDirectoryFiles,
  getParentDirectory,
};
