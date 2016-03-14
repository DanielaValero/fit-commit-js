'use strict';

const log = require( 'npmlog' );
const error = require( '../message/error' );
const base = require( './base' );
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
function validateTenseSubject( firstLineText ) {
  const firstWordInSubject = new Array( utils.normalizeString( firstLineText ).split( ' ' )[ 0 ] );
  const found = utils.overlaps( firstWordInSubject, blackListDictionary.blackListVerbs );

  if ( found ) {
    error.addError( 'tenseSubject', 'You need to start the subject with an imperative verb' );
  }
}

/*
   Public
   ========================================================================== */

function validate( messageArray ) {
  log.verbose( 'Running tenseSubject Validation' );
  if ( base.isValidatorEnabled( constants.VALIDATOR_NAME ) ) {
    validateTenseSubject( messageArray[ 0 ] );
  }

  return error.hasErrors( 'tenseSubject' );
}

module.exports = {
  validate,
};
