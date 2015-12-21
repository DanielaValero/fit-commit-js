#!/usr/bin/env node

'use strict';

// Runs the actual validation of the message
// loads the config File
// loads the validator
// gets the commit message and parses it
// Validates the commit message against the validators

const R = require( 'ramda' );
const parser = require( './message/parser' );
const process = require( 'process' );
const validatorLoader = require( './validatorLoader' );
const fileUtils = require( './config/fileUtils' );
const EXIT_CODE = {
  SUCESS: 0,
  ERROR: 1,
};

// The the process.argv array for a git commit, contains the next in its indexes
// 0: the path to node
// 1: the path to the commit-msg hook
// 2: the path to the actual commit message in the git repo (.git/COMMIT_EDITMSG)
function getCommitMessageFilePath() {
  return process.argv[ 2 ];
}

/**
 * Extracts the commit message and
 * parses it into an array
 * @return {String} The commit message in a string
 */
function extractCommitMessage() {
  let message;
  const data = fileUtils.readFile( getCommitMessageFilePath() );
  message = ( data ) ? data : '';
  return message;
}

const getParsedMessage = R.compose( parser.getRelevantLines, extractCommitMessage );

function runValidator( validator, messageArray ) {
  if ( validator && R.propIs( Function, 'validate', validator ) ) {
    validator.validate.call( this, messageArray );
  }
}

function runValidators( directory ) {
  const validators = validatorLoader.loadValidators( directory );
  const parsedMessage = getParsedMessage();

  for ( const validator in validators ) {
    if ( validators.hasOwnProperty( validator ) ) {
      runValidator( validators[ validator ], parsedMessage );
    }
  }
}

module.exports = {
  extractCommitMessage: extractCommitMessage,
  getCommitMessageFilePath: getCommitMessageFilePath,
  getParsedMessage: getParsedMessage,
  runValidators: runValidators,
};

/*
   This section is to be executed by the git hook
   ========================================================================== */

function execHook() {
  extractCommitMessage();
  process.exit( EXIT_CODE.ERROR );
}

if ( process.env.NODE_ENV && ( process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development' ) ) {
  execHook();
}
