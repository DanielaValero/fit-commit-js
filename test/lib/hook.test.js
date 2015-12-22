'use strict';

const assert = require( 'chai' ).assert;
const process = require( 'process' );
const path = require( 'path' );
const sinon = require( 'sinon' );
const proxyquire = require( 'proxyquire' );
const hook = require( '../../lib/hook' );
const validatorsConfig = require( '../../lib/config/validatorsConfig' );
const lineLenth = proxyquire( '../../lib/validators/lineLength', {
  validate: function validate() {
    return true;
  },
} );

suite( 'Hook | ', () => {
  const fixturesPath = path.resolve( __dirname, '../fixtures/hook/' );
  const commitMessageMock = path.join( fixturesPath, 'commitMessage' );
  let sandbox;

  suiteSetup( () => {
    sandbox = sinon.sandbox.create();
    sandbox.stub( process, 'argv', [ '/path/to/node', '/path/to/gitHook', commitMessageMock ] );
  } );

  suiteTeardown( ( done ) => {
    validatorsConfig.clearEnabledValidators();
    sandbox.restore();
    done();
  } );

  test( 'Should extract the message from the commit and delivers a string', () => {
    const message = hook.extractCommitMessage();
    assert.notEqual( message, '' );
  } );

  test( 'Should send the commit messate string to the message parser and get an array out of it', () => {
    const parsedMessage = hook.getParsedMessage();
    assert.typeOf( parsedMessage, 'array', 'ParsedMessage is an array' );
    assert.include( parsedMessage, 'This is a relevant line' );
  } );

  test( 'Should run the defined validators', () => {
    const validatorSpy = sandbox.spy( lineLenth, 'validate' );
    hook.runValidators( fixturesPath );
    assert.equal( validatorSpy.called, true, 'The lineLenth.validate function was called' );
  } );
} );
