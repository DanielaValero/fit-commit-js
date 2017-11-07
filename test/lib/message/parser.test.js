const { assert } = require( 'chai' );
const parser = require( '../../../lib/message/parser' );

suite( 'Message.Parser | ', () => {
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
