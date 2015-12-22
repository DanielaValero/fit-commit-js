const validatorLoader = require( '../lib/validatorLoader' );
const path = require( 'path' );
const assert = require( 'chai' ).assert;
const validatorsConfig = require( '../lib/config/validatorsConfig' );

suite( 'validatorLoader | ', () => {
  const fixturesPath = path.resolve( __dirname, 'fixtures/validatorLoader/' );

  suiteTeardown( ( done ) => {
    validatorsConfig.clearEnabledValidators();
    done();
  } );

  test( 'Should load all the validator files into an array', () => {
    const validators = validatorLoader.getValidatorFiles();
    assert.typeOf( validators, 'array' );
  } );

  test( 'Should get an array with the filenames of the enabled validators', () => {
    const validatorFiles = validatorLoader.getEnabledValidatorsFiles( fixturesPath );
    assert.typeOf( validatorFiles, 'array', 'validatorLoader.getEnabledValidatorsFiles: Retrieves array' );
    assert.include( validatorFiles, 'lineLength', 'One of the enabled validators is lineLength' );
  } );

  test( 'Should load the enabled validators', () => {
    const validators = validatorLoader.loadValidators( fixturesPath );
    assert.typeOf( validators.lineLength.validate, 'function' );
  } );
} );
