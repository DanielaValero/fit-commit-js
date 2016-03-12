'use strict';

const log = require( 'npmlog' );
const error = require( '../message/error' );
const base = require( './base' );
const constants = {
  DEFAULT_VALUE: 150,
  VALIDATOR_NAME: 'lineLength',
  SUBJECT_PROPERTY: 'subjectMaxLength',
  LINE_PROPERTY: 'maxLineLength',
};

/*
   Private
   ========================================================================== */

function getSubjectMaxLineLength() {
  return base.getValidatorProperty( constants.VALIDATOR_NAME, constants.SUBJECT_PROPERTY ) || constants.DEFAULT_VALUE;
}

function getContentMaxLineLength() {
  return base.getValidatorProperty( constants.VALIDATOR_NAME, constants.LINE_PROPERTY ) || constants.DEFAULT_VALUE;
}

function isEmpty( lineText ) {
  return ( lineText === '' );
}

/**
 * Validates the length of each line, and returns true/false if there was an error or not
 * @param  {Integer} lineNo   The line number
 * @param  {String} lineText  The text of the current lineNo
 * @private
 */
function validateLine( lineNo, lineText ) {
  let errorMessage = '';
  const subjectLineLength = getSubjectMaxLineLength();
  const contentLineLength = getContentMaxLineLength();

  if ( lineNo === 0 && isEmpty( lineText ) ) {
    errorMessage = 'Subject can not be empty';
  } else if ( lineNo === 0 && lineText.length > subjectLineLength ) {
    errorMessage = `Subject line should be <= ${subjectLineLength} chars. Now: ${lineText.length}`;
  } else if ( lineNo === 1 && !isEmpty( lineText ) ) {
    errorMessage = 'Second line must be blank';
  } else if ( lineText.length > contentLineLength ) {
    errorMessage = `Content line should be <= ${contentLineLength} chars. Now: ${lineText.length}`;
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

  if ( base.isValidatorEnabled( constants.VALIDATOR_NAME ) ) {
    for ( let lineNumber = 0; lineNumber < messageArray.length; lineNumber++ ) {
      validateLine( lineNumber, messageArray[ lineNumber ] );
    }
  }

  return error.hasErrors( 'lineLength' );
}

module.exports = {
  validate,
};
