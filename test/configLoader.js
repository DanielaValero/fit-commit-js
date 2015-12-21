const assert = require( 'chai' ).assert;
const configLoader = require( '../lib/config/configLoader' );


suite( 'configLoader | ', () => {
  const expected = {
    validators: {
      lineLength: {
        enabled: true,
        maxLineLength: 72,
        subjectWarnLength: 50,
        allowLongUrls: true,
      },
    },
  };

  suiteTeardown( ( done ) => {
    done();
  } );

  test( 'should load the yml config file', () => {
    const config = configLoader.load( 'test/fixtures/configLoader/fitcommitjsrc.yml' );
    assert.equal( config.validators.lineLength.enabled, expected.validators.lineLength.enabled );
  } );

  test( 'should load the json config file', () => {
    const config = configLoader.load( 'test/fixtures/configLoader/fitcommitjsrc.json' );
    assert.equal( config.validators.lineLength.enabled, expected.validators.lineLength.enabled );
  } );

  test( 'should load the config options written in the package.json file', () => {
    const config = configLoader.load( 'test/fixtures/configLoader/package.json' );
    assert.equal( config.validators.lineLength.enabled, expected.validators.lineLength.enabled );
  } );

  test( 'should validators should be undefined when wrongly specified', () => {
    const config = configLoader.load( 'test/fixtures/configLoader/fitcommitjsrc-wrong.json' );
    assert.equal( config.validators, undefined );
  } );
} );
