'use strict';

const assert = require( 'assert' );
const hook = require( '../lib/hook' );
const process = require( 'process' );
const path = require( 'path' );
// const R = require( 'Ramda' );
const sinon = require( 'sinon' );



suite( 'Hook | ', () => {
  const fixturesPath = path.resolve( __dirname, 'fixtures/hook/' );
  const commitMessageMock = path.join( fixturesPath, 'commitMessage' );
  let sandbox;

  suiteSetup( () => {
    sandbox = sinon.sandbox.create();


    sandbox.stub( process, 'argv', [ '/path/to/node', '/path/to/gitHook', commitMessageMock ] );
  } );

  suiteTeardown( ( done ) => {
    done();
    sandbox.restore();
  } );

  test( 'Should extract the message from the commit', () => {
    hook.extractCommitMessage();
  } );
} );
