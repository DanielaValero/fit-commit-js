#!/usr/bin/env node

'use strict';

// Runs the actual validation of the message
// loads the config File
// loads the validator
// gets the commit message and parses it
// Validates the commit message against the validators

const R = require( 'ramda' );
const log = require( 'npmlog' );
const parser = require( './message/parser' );
const error = require( './message/error' );
const validatorLoader = require( './validatorLoader' );
const fileUtils = require( './config/fileUtils' );

const EXIT_CODE = {
  SUCESS: 0,
  ERROR: 1,
};

const isNotTestEnv = ( !process.env.NODE_ENV && process.env.NODE_ENV !== 'test' );

// The the process.argv array for a git commit, contains the next in its indexes
// 0: the path to node
// 1: the path to the commit-msg hook
// 2: the path to the actual commit message in the git repo (.git/COMMIT_EDITMSG)
function getCommitMessageFilePath() {
  const terminalArgument = process.argv[ 2 ];
  const isFilePath = (
    terminalArgument !== '-ddc' &&
    terminalArgument !== '-c' &&
    terminalArgument !== 'validate' );
  return isFilePath ? terminalArgument : '.git/COMMIT_EDITMSG';
}

/**
 * Extracts the commit message and
 * parses it into an array
 * @return {String} The commit message in a string
 */
function extractCommitMessage() {
  return fileUtils.readFile( getCommitMessageFilePath() );
}

const getParsedMessage = R.compose( parser.getRelevantLines, extractCommitMessage );

function runValidator( validator, messageArray ) {
  if ( validator && R.propIs( Function, 'validate', validator ) ) {
    validator.validate.call( this, messageArray );
  }
}

function run( directory ) {
  const validators = validatorLoader.loadValidators( directory );
  const parsedMessage = getParsedMessage();
  log.verbose( `Validating: ${parsedMessage}` );
  error.clearErrorsMap();

  // loadValidators return an array of objects. Iterate over it
  for ( let i = 0; i < validators.length; i += 1 ) {
    const validatorsObject = validators[ i ];
    // Now iterate over the validator's properties to find
    // the validate function and execute it
    R.forEach( ( validator ) => {
      runValidator( validatorsObject[ validator ], parsedMessage );
    }, R.keys( validatorsObject ) );
  }

  if ( isNotTestEnv && error.hasErrors() ) {
    error.printErrors();
    process.exit( EXIT_CODE.ERROR );
  }

  if ( !error.hasErrors() ) {
    process.exit( EXIT_CODE.SUCESS );
  }
}

module.exports = {
  extractCommitMessage,
  getCommitMessageFilePath,
  getParsedMessage,
  run,
  runValidator,
};
