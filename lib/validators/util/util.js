'use strict';

const R = require( 'ramda' );
const base = require( '../base' );

const normalizeString = R.compose( R.toLower, R.trim );

function comaStringToArray( stringToArray ) {
  let newArray = [];

  if ( stringToArray !== undefined ) {
    if ( R.is( String, stringToArray ) ) {
      newArray = ( stringToArray.indexOf( ',' ) === -1 ) ?
      newArray = [ stringToArray ] : stringToArray.split( ',' );
    } else {
      // If it is a number then parse it.
      const tempInt = parseInt( stringToArray, 10 );
      if ( !isNaN( tempInt ) ) {
        newArray = [ tempInt ];
      }
    }
  }
  return newArray;
}

const overlaps = R.pipe( R.intersection, R.complement( R.isEmpty ) );

/**
 * Gets the defined empty lines from the config
 * @param VALIDATOR_NAME
 * @param Validator_property_to_extract
 * @return {array} Array with the empty lines
 */
const getDefinedValues = R.compose( comaStringToArray, base.getValidatorProperty );

function countStringInCommitMessage( validatorName, validatorProperty, messageArray ) {
  const valuesToFind = getDefinedValues( validatorName, validatorProperty );
  let count = 0;
  const countValues = ( lineValue ) => {
    const normalizedLineText = normalizeString( lineValue );
    R.forEach( ( valueToFind ) => {
      const normalizedValue = normalizeString( valueToFind );
      const regexp = new RegExp( normalizedValue, 'g' );
      const matchedValues = normalizedLineText.match( regexp );

      if ( matchedValues ) {
        if ( R.isArrayLike( matchedValues ) ) {
          count = count + matchedValues.length;
        } else {
          count++;
        }
      }
    }, valuesToFind );
  };

  R.forEach( countValues, messageArray );

  return count;
}

module.exports = {
  normalizeString,
  comaStringToArray,
  getDefinedValues,
  countStringInCommitMessage,
  overlaps,
};
