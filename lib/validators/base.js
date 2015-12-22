'use strict';

const validatorsConfig = require( '../config/validatorsConfig' );

/*
   Public
   ========================================================================== */

function isValidatorEnabled( validator ) {
  const validators = validatorsConfig.getEnabledValidators();
  return ( validators && validators[ validator ] !== undefined );
}

function getValidatorProperty( validator, property ) {
  const validators = validatorsConfig.getEnabledValidators();
  return isValidatorEnabled( validator ) ? validators[ validator ][ property ] : false;
}

module.exports = {
  isValidatorEnabled: isValidatorEnabled,
  getValidatorProperty: getValidatorProperty,
};
