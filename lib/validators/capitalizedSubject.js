'use strict';

const log = require( 'npmlog' );
const error = require( '../message/error' );
const base = require( './base' );
const R = require( 'ramda' );
const utils = require( './util/util' );
const blackListDictionary = require( './util/blackListDictionary' );

const constants = {
  DEFAULT_VALUE: '',
  VALIDATOR_NAME: 'tense',
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
    error.addError( 'capitalizedSubject', 'You need to start the subject with an imperative verb' );
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
