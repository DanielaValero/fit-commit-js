'use strict';

const log = require( 'npmlog' );
const error = require( '../message/error' );
const base = require( './base' );
const R = require( 'ramda' );

const constants = {
  DEFAULT_VALUE: '',
  VALIDATOR_NAME: 'subjectPeriod',
};

/*
   Private
   ========================================================================== */

/**
 * @private
 */
function validateSubjectPeriod( firstLineText ) {
  const words = firstLineText.split( ' ' );
  const lastLetter = R.last( R.last( words ) );

  const regexp = /\./;

  if ( regexp.test( lastLetter ) ) {
    error.addError( 'subjectPeriod', 'The Subject must not end with a period' );
  }
}

/*
   Public
   ========================================================================== */

function validate( messageArray ) {
  log.verbose( 'Running subjectPeriod Validation' );
  if ( base.isValidatorEnabled( constants.VALIDATOR_NAME ) ) {
    validateSubjectPeriod( messageArray[ 0 ] );
  }

  return error.hasErrors( 'subjectPeriod' );
}

module.exports = {
  validate,
};
