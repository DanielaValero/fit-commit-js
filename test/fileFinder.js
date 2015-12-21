const assert = require( 'chai' ).assert;
const fileFinder = require( '../lib/config/fileFinder' );
const path = require( 'path' );

suite( 'fileFinder | ', () => {
  const fixturesPath = path.resolve( __dirname, 'fixtures/fileFinder/' );
  const subdir = path.join( fixturesPath, '/subdir/subdir' );

  suiteTeardown( ( done ) => {
    done();
  } );

  test( 'should find the a config file in the directory structure', () => {
    const foundPath = fileFinder.findFileInDirectory( subdir );
    const expectedPath = path.join( fixturesPath, '.fitcommitjsrc.json' );
    assert.equal( foundPath, expectedPath );
  } );
} );
