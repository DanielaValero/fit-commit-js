const { assert } = require( 'chai' );
const path = require( 'path' );
const fileFinder = require( '../../../lib/config/fileFinder' );
const validatorsConfig = require( '../../../lib/config/validatorsConfig' );

suite( 'fileFinder | ', () => {
  const fixturesPath = path.resolve( __dirname, '../../fixtures/fileFinder/' );
  const subdir = path.join( fixturesPath, '/subdir/subdir' );

  suiteTeardown( ( done ) => {
    validatorsConfig.clearEnabledValidators();
    done();
  } );

  test( 'should find the a config file in the directory structure', () => {
    const foundPath = fileFinder.findFileInDirectory( subdir );
    const expectedPath = path.join( fixturesPath, '.fitcommitjsrc.json' );
    assert.equal( foundPath, expectedPath );
  } );
} );
