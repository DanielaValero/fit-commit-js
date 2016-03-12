'use strict';

const log = require( 'npmlog' );
const error = require( '../message/error' );
const base = require( './base' );
const utils = require( './utils' );

const constants = {
  TICKET_CODE_DEFAULT_VALUE: '',
  VALIDATOR_NAME: 'ticketCode',
  TICKET_CODE_PROPERTY: 'ticketCodeText',
  ONLY_ONE_TICKET_PROPERTY: 'oneTicketPerCommit',
  ONLY_ONE_TICKET_DEFAULT_VALUE: false,
};

/*
   Private
   ========================================================================== */
function isOnlyOneAllowed() {
  return base.getValidatorProperty( constants.VALIDATOR_NAME, constants.ONLY_ONE_TICKET_PROPERTY ) || constants.ONLY_ONE_TICKET_DEFAULT_VALUE;
}

/**
 * @private
 */
function validateticketCode( messageArray ) {
  const count = utils.countStringInCommitMessage( constants.VALIDATOR_NAME, constants.TICKET_CODE_PROPERTY || constants.TICKET_CODE_DEFAULT_VALUE, messageArray );

  if ( count === 0 ) {
    error.addError( 'ticketCode', 'You did not used a ticked code in your commit message' );
  }

  if ( isOnlyOneAllowed() && count > 1 ) {
    error.addError( 'ticketCode', 'Use only one ticket per commit' );
  }
}

/*
   Public
   ========================================================================== */

function validate( messageArray ) {
  log.verbose( 'Running ticketCode Validation' );

  if ( base.isValidatorEnabled( constants.VALIDATOR_NAME ) ) {
    validateticketCode( messageArray );
  }

  return error.hasErrors( 'ticketCode' );
}

module.exports = {
  validate,
};
