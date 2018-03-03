const assert = require( 'chai' ).assert;
const parser = require( '../../../lib/message/parser' );

suite( 'Message.Parser | ', () => {
  suiteTeardown( ( done ) => {
    done();
  } );

  test( 'Should get the relevant lines out of the message', () => {
    const message = `This is a relevant line

  # Please enter the commit message for your changes. Lines starting
  # with '#' will be ignored, and an empty message aborts the commit.
  # On branch feature/create-executable-git-hook`;

    const parsedMessage = parser.getRelevantLines( message );
    assert.equal( parsedMessage[ 0 ], 'This is a relevant line' );
  } );

  test( 'Should ignore everything below the verbose commit line', () => {
    const message =
`Some commit message
# Blah
# ------------------------ >8 ------------------------
# Something
All
the
sometimes extra-long lines of diff stuff that get picked up even though they're below the verbose line`;

    const lines = parser.getRelevantLines( message );
    assert.deepEqual( lines, [
      'Some commit message',
    ] );
  } );
} );
