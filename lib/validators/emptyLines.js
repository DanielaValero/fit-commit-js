'use strict';

const log = require( 'npmlog' );
const error = require( '../message/error' );
const base = require( './base' );
const utils = require( './util/util' );

const constants = {
  DEFAULT_VALUE: 1,
  VALIDATOR_NAME: 'emptyLines',
  EMPTY_LINES_PROPERTY: 'emptyLines',
};

/*
   Private
   ========================================================================== */

function isEmpty( lineText ) {
  return ( lineText === '' );
}

const getEmptyLines = utils.getDefinedValues;

/**
 * Checks if the defined lines are empty or not
 * @param  {Integer} lineNo   The line number
 * @param  {String} lineText  The text of the current lineNo
 * @private
 */
function validateLine( lineNo, lineText ) {
  let errorMessage = '';
  const emptyLines = getEmptyLines(
    constants.VALIDATOR_NAME,
    constants.EMPTY_LINES_PROPERTY || constants.DEFAULT_VALUE,
  );

  for ( let i = 0; i < emptyLines.length; i += 1 ) {
    const emptyLineNo = parseInt( emptyLines[ i ], 10 );
    if ( lineNo === emptyLineNo && !isEmpty( lineText ) ) {
      errorMessage = `Line No. ${lineNo + 1} must be empty`;
    }
  }

  if ( errorMessage !== '' ) {
    error.addError( 'emptyLines', errorMessage );
  }
}

/*
   Public
   ========================================================================== */

function validate( messageArray ) {
  log.verbose( 'Running emptyLines Validation' );

  if ( base.isValidatorEnabled( constants.VALIDATOR_NAME ) ) {
    for ( let lineNumber = 0; lineNumber < messageArray.length; lineNumber += 1 ) {
      validateLine( lineNumber, messageArray[ lineNumber ] );
    }
  }

  return error.hasErrors( 'emptyLines' );
}

module.exports = {
  validate,
};
