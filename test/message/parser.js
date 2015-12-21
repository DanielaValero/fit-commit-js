const assert = require( 'chai' ).assert;
const parser = require( '../../lib/message/parser' );
const path = require( 'path' );
const R = require( 'ramda' );

suite( 'Message.Parser | ', () => {
  const fixturesPath = path.resolve( __dirname, 'fixtures/message/parser/' );
  const message = `This is a relevant line

  # Please enter the commit message for your changes. Lines starting
  # with '#' will be ignored, and an empty message aborts the commit.
  # On branch feature/create-executable-git-hook`;

  suiteTeardown( ( done ) => {
    done();
  } );

  test( 'Should get the relevant lines out of the message', () => {
    const parsedMessage = parser.getRelevantLines( message );
    assert.equal( parsedMessage[ 0 ], 'This is a relevant line' );
  } );
} );
