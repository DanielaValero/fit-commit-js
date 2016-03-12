'use strict';

const log = require( 'npmlog' );
const error = require( '../message/error' );
const base = require( './base' );
const utils = require( './utils' );
const R = require( 'ramda' );

const constants = {
  DEFAULT_VALUE: 1,
  VALIDATOR_NAME: 'tags',
  TAGS_PROPERTY: 'tags',
};

/*
   Private
   ========================================================================== */

const getTags = utils.getDefinedValues;


/**
 * @private
 */
function validateTags( messageArray ) {
  const tags = getTags( constants.VALIDATOR_NAME, constants.TAGS_PROPERTY || constants.DEFAULT_VALUE );

  let count = 0;
  const countTags = ( lineValue ) => {
    const normalizedLineText = utils.normalizeString( lineValue );
    R.forEach( ( tagValue ) => {
      const normalizedTag = utils.normalizeString( tagValue );
      if ( normalizedLineText.indexOf( normalizedTag ) > -1 ) {
        count++;
      }
    }, tags );
  };

  R.forEach( countTags, messageArray );

  if ( count >= 2 || count === 0 ) {
    error.addError( 'tags', 'You used 0 or more than one tag in your commit message' );
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
