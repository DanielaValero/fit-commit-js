const assert = require( 'chai' ).assert;
const path = require( 'path' );
const tenseSubject = require( '../../../lib/validators/tenseSubject' );
const error = require( '../../../lib/message/error' );
const validatorsConfig = require( '../../../lib/config/validatorsConfig' );

suite( 'Validators.tenseSubject | ', () => {
  const fixturesPath = path.resolve( __dirname, '../../fixtures/validators/' );

  setup( () => {
    error.clearErrorsMap();
  } );

  suiteSetup( () => {
    validatorsConfig.clearEnabledValidators();
    validatorsConfig.loadEnabledValidatorsObject( fixturesPath );
  } );

  suiteTeardown( ( done ) => {
    validatorsConfig.clearEnabledValidators();
    done();
  } );

  test( 'Does not throw error if the first word is an imperative verb', () => {
    const commitLines = [ 'allow to do a nice validation', '', `Create a map commit.`, '' ];
    const hasErrors = tenseSubject.validate( commitLines );
    assert.equal( hasErrors, false, 'None of the words was used in the commit message' );
  } );

  test( 'Throws an error if the first word is an imperative verb', () => {
    const validLines = [ 'Handles something', 'asdas', `Create at.`, 'foo' ];
    const hasErrors = tenseSubject.validate( validLines );

    assert.equal( hasErrors, true, 'The first word is not an imperative verb' );
  } );

  test( 'Should not be errors if the validator is not enabled or not config object', () => {
    validatorsConfig.clearEnabledValidators();
    validatorsConfig.loadEnabledValidatorsObject( path.resolve( __dirname, '../' ) );
    error.clearErrorsMap();

    const validLines = [ 'Handle error messages of a given commit longer than 50 chars', 'asdas', `Create a map to contain all the error messages of
    a given commit.` ];
    const hasErrors = tenseSubject.validate( validLines );
    assert.equal( hasErrors, false, 'There is no error' );
  } );
} );
