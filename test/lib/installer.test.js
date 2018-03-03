const { assert } = require( 'chai' );
const installer = require( '../../lib/installer' );
const fs = require( 'fs' );

suite( 'installer | ', () => {
  test( 'should create the symbolic link in the git/hooks folder', () => {
    installer.install();
    fs.exists( './.git/hooks/commit-msg', ( exists ) => {
      assert.equal( exists, true );
    } );
  } );

  test( 'should remove the symbolic link in the git/hooks folder', () => {
    installer.uninstall();
    fs.exists( './.git/hooks/commit-msg', ( exists ) => {
      assert.equal( exists, false );
    } );
  } );
} );
