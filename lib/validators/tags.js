'use strict';

const log = require( 'npmlog' );
const error = require( '../message/error' );
const base = require( './base' );
const utils = require( './util/util' );

const constants = {
  DEFAULT_VALUE: '',
  VALIDATOR_NAME: 'tags',
  TAGS_PROPERTY: 'tags',
};

/*
   Private
   ========================================================================== */

/**
 * @private
 */
function validateTags( messageArray ) {
  const count = utils.countStringInCommitMessage( constants.VALIDATOR_NAME,
                                                  constants.TAGS_PROPERTY ||
                                                  constants.DEFAULT_VALUE,
                                                  messageArray );
  if ( count >= 2 || count === 0 ) {
    error.addError( 'tags', `You used ${count} tag(s) in your commit message. Use only 1.` );
  }
}

/*
   Public
   ========================================================================== */

function validate( messageArray ) {
  log.verbose( 'Running Tags Validation' );

  if ( base.isValidatorEnabled( constants.VALIDATOR_NAME ) ) {
    validateTags( messageArray );
  }

  return error.hasErrors( 'tags' );
}

module.exports = {
  validate,
};
