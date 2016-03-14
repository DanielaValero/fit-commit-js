'use strict';

const log = require( 'npmlog' );
const error = require( '../message/error' );
const base = require( './base' );
const R = require( 'ramda' );

const constants = {
  DEFAULT_VALUE: '',
  VALIDATOR_NAME: 'capitalizeSubject',
};

/*
   Private
   ========================================================================== */

/**
 * @private
 */
function validateCapitalizedSubject( firstLineText ) {
  const firstLetter = R.head( firstLineText.split( ' ' )[ 0 ] );
  const regexp = /[A-Z]/;

  if ( !regexp.test( firstLetter ) ) {
    error.addError( 'capitalizedSubject', 'The subject must be capitalized' );
  }
}

/*
   Public
   ========================================================================== */

function validate( messageArray ) {
  log.verbose( 'Running capitalizedSubject Validation' );
  if ( base.isValidatorEnabled( constants.VALIDATOR_NAME ) ) {
    validateCapitalizedSubject( messageArray[ 0 ] );
  }

  return error.hasErrors( 'capitalizedSubject' );
}

module.exports = {
  validate,
};
