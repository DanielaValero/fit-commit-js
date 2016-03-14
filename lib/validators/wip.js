'use strict';

const log = require( 'npmlog' );
const error = require( '../message/error' );
const base = require( './base' );
const utils = require( './util/util' );
const wipDictionary = require( './util/wipDictionary' );

const constants = {
  DEFAULT_VALUE: 'master',
  VALIDATOR_NAME: 'wip',
  BRANCH_PROPERTY: 'branch',
};

/*
   Private
   ========================================================================== */


/**
 * @private
 */
function validateWIP( firstLineText ) {
  const subjectLineWords = utils.normalizeString( firstLineText ).split( ' ' );
  const found = utils.overlaps( subjectLineWords, wipDictionary.blackListVerbs );
  if ( found ) {
    error.addError( 'wip', 'Do not commit work in progress' );
  }
}

/*
   Public
   ========================================================================== */

function validate( messageArray ) {
  log.verbose( 'Running wip Validation' );

  if ( base.isValidatorEnabled( constants.VALIDATOR_NAME ) ) {
    validateWIP( messageArray[ 0 ] );
  }

  return error.hasErrors( 'wip' );
}

module.exports = {
  validate,
};
