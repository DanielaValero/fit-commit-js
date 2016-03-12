'use strict';

const log = require( 'npmlog' );
const error = require( '../message/error' );
const base = require( './base' );
const R = require( 'ramda' );
const constants = {
  DEFAULT_VALUE: 1,
  VALIDATOR_NAME: 'emptyLines',
  EMPTY_LINES_PROPERTY: 'emptyLines',
};

/*
   Private
   ========================================================================== */

const stringToArray = R.split( ',' );

/**
 * Gets the defined empty lines from the config
 * @param VALIDATOR_NAME
 * @param Validator_property_to_extract
 * @return {array} Array with the empty lines
 */
const getEmptyLines = R.compose( stringToArray, base.getValidatorProperty );

function isEmpty( lineText ) {
  return ( lineText === '' );
}

/**
 * Checks if the defined lines are empty or not
 * @param  {Integer} lineNo   The line number
 * @param  {String} lineText  The text of the current lineNo
 * @private
 */
function validateLine( lineNo, lineText ) {
  let errorMessage = '';
  const emptyLines = getEmptyLines( constants.VALIDATOR_NAME, constants.EMPTY_LINES_PROPERTY || constants.DEFAULT_VALUE );

  for ( let i = 0; i < emptyLines.length; i++ ) {
    const emptyLineNo = parseInt( emptyLines[ i ], 10 );
    if ( lineNo === emptyLineNo && !isEmpty( lineText ) ) {
      errorMessage = `Line No. ${lineNo + 1} must be empty`;
    }
  }

  if ( errorMessage !== '' ) {
    error.addError( 'emptyLines', lineNo, errorMessage );
  }
}

/*
   Public
   ========================================================================== */

function validate( messageArray ) {
  log.verbose( 'Running lineLenth Validation' );

  if ( base.isValidatorEnabled( constants.VALIDATOR_NAME ) ) {
    for ( let lineNumber = 0; lineNumber < messageArray.length; lineNumber++ ) {
      validateLine( lineNumber, messageArray[ lineNumber ] );
    }
  }

  return error.hasErrors( 'emptyLines' );
}

module.exports = {
  validate,
};
