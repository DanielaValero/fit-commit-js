'use strict';

const log = require( 'npmlog' );
const R = require( 'ramda' );
const error = require( '../message/error' );

/*
   Private
   ========================================================================== */

function getSubjectMaxLineLength() {

}

function getContentMaxLineLength() {

}

function isEmpty( lineText ) {
  return ( lineText === '' );
}

/**
 * Validates the length of each line, and returns true/false if there was an error or not
 * @param  {Integer} lineNo   The line number
 * @param  {String} lineText  The text of the current lineNo
 */
function validateLine( lineNo, lineText ) {
  let errorMessage = '';
  const subjectLineLength = getSubjectMaxLineLength();
  const lineLength = getContentMaxLineLength();

  if ( lineNo === 0 && isEmpty( lineText ) ) {
    errorMessage = 'Subject can not be empty';
  } else if ( lineNo === 0 && lineText.length > subjectLineLength ) {
    errorMessage = `Subject line should be <= ${subjectLineLength} chars. Now: ${lineText.length}`;
  } else if ( lineNo === 1 && !isEmpty( lineText ) ) {
    errorMessage = 'Second line must be blank';
  } else if ( lineText.length > lineLength ) {
    errorMessage = `Content line should be <= ${lineLength} chars. Now: ${lineText.length}`;
  }

  if ( errorMessage !== '' ) {
    error.addError( 'lineLength', lineNo, errorMessage );
  }
}

/*
   Public
   ========================================================================== */

function validate( messageArray ) {
  log.verbose( 'Running lineLenth Validation' );

  for ( let lineNumber = 0; lineNumber < messageArray.length; lineNumber++ ) {
    validateLine( lineNumber, messageArray[ lineNumber ] );
  }

  return error.hasErrors( 'lineLength' );
}

module.exports = {
  validate: validate,
};
