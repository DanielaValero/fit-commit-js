const assert = require( 'assert' );
const parser = require( '../../lib/message/parser' );
const path = require( 'path' );
const R = require( 'Ramda' );

suite( 'Message.Parser | ', () => {
  const fixturesPath = path.resolve( __dirname, 'fixtures/message/parser/' );

  suiteTeardown( ( done ) => {
    done();
  } );
  test( 'Should load the message in a string', () => {
    parser.readMessage();
    // assert.equal(  );
  } );
} );
