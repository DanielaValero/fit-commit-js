'use strict';

const R = require( 'ramda' );
const log = require( 'npmlog' );

/*
   Private
   ========================================================================== */

/**
 * Gets a string with the commit message and delivers
 * an array containing each line of it.
 * @param  {String} message Commit Message
 * @return {Array}          An array with the lines of the commit message
 * @private
 */
function getLinesArray( message ) {
  const lines = R.split( /\n/, message );
  return lines;
}

/**
 * Asks if the line being parsed is relevant. Meaning
 * is the commit Message
 * @param  {String}  line A string with the current line being parsed
 * @return {Boolean}      True if the current line is relevant
 * @private
 */
function isLineRelevant( line ) {
  const GIT_VERBOSE_MARKER = '# ------------------------ >8 ------------------------';
  const COMMENT_REGEX = /(#)/;
  const isComment = ( R.match( COMMENT_REGEX, line ).length > 0 );
  return ( line !== GIT_VERBOSE_MARKER && !isComment );
}

/*
   Public
   ========================================================================== */

/**
 * Gets the message as a string and returns the
 * relevant lines in an array
 * @param  {String} message The commit Message
 * @return {Array}          The relevant lines of the commit message in an array
 */
function getRelevantLines( message ) {
  let relevantLines = [];
  if ( message ) {
    const lines = getLinesArray( message );
    relevantLines = R.values( R.pickBy( isLineRelevant, lines ) );
  } else {
    log.error( 'message/parser', 'Tried to parse the commit message but none found' );
  }

  return relevantLines;
}

module.exports = {
  getRelevantLines,
};
