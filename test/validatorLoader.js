const assert = require( 'assert' );
const validatorLoader = require( '../lib/validatorLoader' );
const path = require( 'path' );
const R = require( 'Ramda' );

suite( 'validatorLoader | ', () => {
  const fixturesPath = path.resolve( __dirname, 'fixtures/validatorLoader/' );

  suiteTeardown( ( done ) => {
    done();
  } );

  test( 'Should get the configuration file into an object', () => {
    const config = validatorLoader.getConfigurationFile( fixturesPath );
    assert.equal( R.is( Object, config ), true );
  } );

  test( 'Should load all the validator files into an array', () => {
    const validators = validatorLoader.getValidatorFiles();
    assert.equal( R.isArrayLike( validators ), true );
  } );

  test( 'Should get an object with the configured enabled validators', () => {
    const validators = validatorLoader.getEnabledValidatorsObject( fixturesPath );
    assert.equal( R.is( Object, validators ), true );
    assert.equal( R.is( Object, validators.lineLength ), true );
    assert.equal( validators.lineLength.enabled, true );
  } );

  test( 'Should get an array with the filenames of the enabled validators', () => {
    const validatorFiles = validatorLoader.getEnabledValidatorsFiles( fixturesPath );
    assert.equal( R.isArrayLike( validatorFiles ), true );
    assert.equal( R.contains( 'lineLength', validatorFiles ), true );
  } );

  test( 'Should load the enabled validators', () => {
    const validators = validatorLoader.loadValidators( fixturesPath );
    assert.equal( typeof( validators.lineLength.validateLineLegth ), 'function' );
  } );
} );
