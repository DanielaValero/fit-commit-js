#!/usr/bin/env node

'use strict';


// const R = require( 'ramda' );
const parser = require( './message/parser' );
const process = require( 'process' );
const fileUtils = require( './config/fileUtils' );

// Runs the actual validation of the message
// loads the config File
// loads the validator
// gets the commit message and parses it
// Validates the commit message against the validators

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

function extractCommitMessage() {
  let message;
  fileUtils.readFileAsync( getCommitMessageFilePath(), ( data ) => {
    message = ( data ) ? data : '';
  } );
  return message;
}


module.exports = {
  extractCommitMessage: extractCommitMessage,
  getCommitMessageFilePath: getCommitMessageFilePath,
}


/*
   This section is to be executed by the git hook
   ========================================================================== */

function execHook() {
  extractCommitMessage();
  process.exit( EXIT_CODE.ERROR )
}

if ( process.env.NODE_ENV && ( process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development' ) ) {
  execHook();
}
