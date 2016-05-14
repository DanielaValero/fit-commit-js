'use strict';

const log = require( 'npmlog' );

/*
   Private
   ========================================================================== */

/**
 * Error map with shape:
 * {lineLenght: ['error message 1', 'error message 2']}
 * @private
 */
const errorsMap = new Map();

/**
 * Prints an error message
 * @param  {String} errorMessage A single error message
 * @private
 */
function printSingleError( errorMessage ) {
  log.error( errorMessage );
}

/**
 * Empties the error map
 * @private
 */
function clearErrorsMap() {
  errorsMap.clear();
}

/*
   Public
   ========================================================================== */

/**
 * Retrieves the array of messages of a given validator
 * @param  {String} validator Validator key name
 * @return {Array}            The array of messages of a given validator
 */
function getErrorsMapEntry( validator ) {
  return errorsMap.get( validator );
}

/**
 * Checks if the errorsMap contains errors
 * @param  {String} validator  Optional parameter. If defined will check if a
 *                             given validator has an error
 * @return {Boolean} Returns true if the errors Map contains errors
 */
function hasErrors( validator ) {
  let errors;

  if ( validator ) {
    errors = getErrorsMapEntry( validator );
  } else {
    const mapIter = errorsMap.keys();
    errors = mapIter.next().value;
  }

  return ( errors !== undefined );
}

/**
 * Prints all the errors registered in the errorsMap
 */
function printErrors() {
  log.error( 'Error', 'Commit message invalid' );
  if ( hasErrors() ) {
    errorsMap.forEach( printSingleError );
  }
}

/**
 * Adds the error message to the errorsMapMap.
 * @param {String}  validator  The name of the validator
 * @param {Integer} lineNo     The line number of the error
 * @param {String}  message    The error message
 */
function addError( validator, lineNo, message ) {
  const tmpMsg = `LineNo. ${lineNo}: ${message}`;
  let msg = [];

  if ( errorsMap.has( validator ) ) {
    msg = getErrorsMapEntry( validator );
  }

  msg.push( tmpMsg );
  errorsMap.set( validator, msg );
}

module.exports = {
  addError,
  printErrors,
  hasErrors,

  // For testing
  clearErrorsMap,
  getErrorsMapEntry,
};
