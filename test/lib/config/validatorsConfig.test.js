const assert = require( 'chai' ).assert;
const path = require( 'path' );
const validatorsConfig = require( '../../../lib/config/validatorsConfig' );

suite( 'validatorsConfig | ', () => {
  const fixturesPath = path.resolve( __dirname, '../../fixtures/configLoader/' );

  setup( () => {
    validatorsConfig.clearEnabledValidators();
  } );

  suiteTeardown( ( done ) => {
    validatorsConfig.clearEnabledValidators();
    done();
  } );

  test( 'Enabled validators object should be empty if no config file found', () => {
    const pathWithoutConfig = path.resolve( __dirname, '../../../../' );
    validatorsConfig.loadEnabledValidatorsObject( pathWithoutConfig );
    const validators = validatorsConfig.getEnabledValidators();
    assert.isObject( validators, true );
    assert.equal( Object.keys( validators ).length, 0, 'The length of the validators object is 0' );
  } );

  test( 'Should get an object with the configured enabled validators', () => {
    validatorsConfig.loadEnabledValidatorsObject( fixturesPath );
    const validators = validatorsConfig.getEnabledValidators();
    assert.isObject( validators, true );
    assert.isObject( validators.lineLength, true );
    assert.equal( validators.lineLength.enabled, true );
  } );
} );
