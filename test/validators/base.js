const assert = require( 'chai' ).assert;
const validatorsConfig = require( '../../lib/config/validatorsConfig' );
const base = require( '../../lib/validators/base' );
const path = require( 'path' );

suite( 'Validators.Base | ', () => {
  const fixturesPath = path.resolve( __dirname, '../fixtures/validators/base' );

  setup( () => {
    validatorsConfig.clearEnabledValidators();
  } );

  suiteSetup( () => {
    validatorsConfig.loadEnabledValidatorsObject( fixturesPath );
  } )

  suiteTeardown( ( done ) => {
    validatorsConfig.clearEnabledValidators();
    done();
  } );

  test( 'Should return false if the validator is not enabled', () => {
    const isEnabled = base.isValidatorEnabled( 'subjectPeriod' );
    assert.equal( isEnabled, false, 'subjectPeriod Validator is not enabled' );
  } );

  test( 'Should return true if the validator is enabled', () => {
    const isEnabled = base.isValidatorEnabled( 'lineLength' );
    assert.equal( isEnabled, false, 'lineLength Validator is enabled' );
  } );
} );
