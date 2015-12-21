'use strict';
const R = require( 'ramda' );

/*
   Private
   ========================================================================== */


/**
 * Gets a string with the commit message and delivers
 * an array containing each line of it.
 * @param  {String} message Commit Message
 * @return {Array}          An array with the lines of the commit message
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
 */
function isLineRelevant( line ) {
  const GIT_VERBOSE_MARKER = '# ------------------------ >8 ------------------------';
  const COMMENT_REGEX = /(#)/;
  const isComment = ( R.match( COMMENT_REGEX, line ).length > 0 ) ? true : false;
  return ( line !== GIT_VERBOSE_MARKER && !isComment && line !== '' );
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
  const lines = getLinesArray( message );
  return R.values( R.pickBy( isLineRelevant, lines ) );
}


module.exports = {
  getRelevantLines: getRelevantLines,
};
