const { assert } = require( 'chai' );
const path = require( 'path' );
const emptyLines = require( '../../../lib/validators/emptyLines' );
const error = require( '../../../lib/message/error' );
const validatorsConfig = require( '../../../lib/config/validatorsConfig' );

suite( 'Validators.EmptyLines | ', () => {
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

  test( 'Should not be an error if defined empty lines are empty', () => {
    const validLines = [ 'Handle error', '', 'Create a map commit.', '' ];
    const hasErrors = emptyLines.validate( validLines );
    assert.equal( hasErrors, false, 'Lines 1 and 3 are empty. Valid' );
  } );

  test( 'Should be errors if defined empty lines are filled', () => {
    const validLines = [ 'Handle', 'asdas', 'Create at.', 'foo' ];
    const hasErrors = emptyLines.validate( validLines );

    assert.equal( hasErrors, true, 'Line 1 and 3 are filled. Invalid' );
  } );

  test( 'Should not be errors if the validator is not enabled or not config object', () => {
    validatorsConfig.clearEnabledValidators();
    const pathWithoutConfig = path.resolve( __dirname, '../../../../' );
    validatorsConfig.loadEnabledValidatorsObject( pathWithoutConfig );
    error.clearErrorsMap();

    const validLines = [ 'Handle error messages of a given commit longer than 50 chars',
      'asdas',
      'Create a map to contain all the error messages of a given commit.',
    ];
    const hasErrors = emptyLines.validate( validLines );
    assert.equal( hasErrors, false, 'There is no error' );
  } );
} );
