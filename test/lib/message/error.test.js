'use strict';

const assert = require( 'chai' ).assert;
const error = require( '../../../lib/message/error' );

suite( 'Message.Error | ', () => {
  setup( () => {
    error.clearErrorsMap();
  } );

  suiteTeardown( ( done ) => {
    error.clearErrorsMap();
    done();
  } );

  test( 'Should extend the error Map with validator, lines and messages', () => {
    error.addError( 'lineLength', 1, 'Subject should not be empty' );
    error.addError( 'lineLength', 1, 'Subject must be less than 50 chars' );

    const errorsMap = error.getErrorsMapEntry( 'lineLength' );
    assert.isDefined( errorsMap, `Errors map: ${error.errorsMap}` );
    assert.equal( errorsMap.length, 2, 'The errorsMap contains the two error messages sent' );
  } );

  test( 'Should return true if there are registered errors', () => {
    error.addError( 'lineLength', 1, 'Subject should not be empty' );
    const hasErrors = error.hasErrors();
    assert.equal( hasErrors, true, 'The errorsMap has errors' );
  } );

  test( 'Should return true if there are registered errors in a given validator', () => {
    error.addError( 'lineLength', 1, 'Subject should not be empty' );

    assert.equal( error.hasErrors( 'lineLength' ), true,
      'The errorsMap has errors in the given validator' );
    assert.equal( error.hasErrors( 'otherValidator' ), false,
      'In a not given validator there are no errors' );
  } );

  test( 'Should return false if there are no registered errors in a given validator', () => {
    assert.equal( error.hasErrors( 'lineLength' ), false,
      'The errorsMap has no registered errors for lineLength' );
  } );
} );
