const assert = require( 'chai' ).assert;
const path = require( 'path' );
const configLoader = require( '../../lib/config/configLoader' );

suite( 'configLoader | ', () => {
  const fixturesPath = path.resolve( __dirname, '../fixtures/configLoader/' );
  const expected = {
    validators: {
      lineLength: {
        enabled: true,
        maxLineLength: 72,
        subjectMaxLength: 50,
        allowLongUrls: true,
      },
    },
  };

  suiteTeardown( ( done ) => {
    done();
  } );

  test( 'should load the yml config file', () => {
    const config = configLoader.load( 'test/fixtures/configLoader/.fitcommitjsrc.yml' );
    assert.equal( config.validators.lineLength.enabled, expected.validators.lineLength.enabled );
  } );

  test( 'should load the json config file', () => {
    const config = configLoader.load( 'test/fixtures/configLoader/.fitcommitjsrc.json' );
    assert.equal( config.validators.lineLength.enabled, expected.validators.lineLength.enabled );
  } );

  test( 'should load the config options written in the package.json file', () => {
    const config = configLoader.load( 'test/fixtures/configLoader/package.json' );
    assert.equal( config.validators.lineLength.enabled, expected.validators.lineLength.enabled );
  } );

  test( 'If no config file found, nothing is retrieved', () => {
    const config = configLoader.load( 'test/fixtures/configLoader/.fitcommitjsrc-wrong.json' );
    assert.equal( config.validators, undefined );
  } );

  test( 'Should get the configuration file into an object', () => {
    const config = configLoader.findAndLoad( fixturesPath );
    assert.isObject( config, true );
  } );
} );
