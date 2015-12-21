const validatorLoader = require( '../lib/validatorLoader' );
const path = require( 'path' );
const assert = require( 'chai' ).assert;

suite( 'validatorLoader | ', () => {
  const fixturesPath = path.resolve( __dirname, 'fixtures/validatorLoader/' );

  suiteTeardown( ( done ) => {
    done();
  } );

  test( 'Should get the configuration file into an object', () => {
    const config = validatorLoader.getConfigurationFile( fixturesPath );
    assert.isObject( config, true );
  } );

  test( 'Should load all the validator files into an array', () => {
    const validators = validatorLoader.getValidatorFiles();
    assert.typeOf( validators, 'array' );
  } );

  test( 'Should get an object with the configured enabled validators', () => {
    const validators = validatorLoader.getEnabledValidatorsObject( fixturesPath );
    assert.isObject( validators, true );
    assert.isObject( validators.lineLength, true );
    assert.equal( validators.lineLength.enabled, true );
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
