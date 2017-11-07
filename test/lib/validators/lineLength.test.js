const { assert } = require( 'chai' );
const path = require( 'path' );
const lineLength = require( '../../../lib/validators/lineLength' );
const error = require( '../../../lib/message/error' );
const validatorsConfig = require( '../../../lib/config/validatorsConfig' );

suite( 'Validators.LineLength | ', () => {
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

  test( 'Should not be an error if the line lengths are valid', () => {
    const validLines = [ 'Handle error messages of a given commit',
      '',
      'Create a map to contain all the error messages of a given commit.',
    ];
    const hasErrors = lineLength.validate( validLines );
    assert.equal( hasErrors, false, 'All the lines are valid' );
  } );

  test( 'Should be errors if the line lengths are invalid', () => {
    const validLines = [ 'Handle error messages of a given commit longer than 50 chars',
      'asdas',
      'Create a map to contain all the error messages of a given commit.',
    ];
    const hasErrors = lineLength.validate( validLines );

    assert.equal( hasErrors, true, 'The lines are invalid' );
  } );

  test( 'Should be errors if the line first line is invalid', () => {
    const validLines = [
      'First Line Error - Handle error messages of a given commit longer than 50 chars',
      '',
      'some text',
    ];
    const hasErrors = lineLength.validate( validLines );
    assert.equal( hasErrors, true, 'First line longer than specified length' );
  } );

  test( 'Should be errors if third line longer than specified', () => {
    const validLines = [
      'Handle error messages of a given commit',
      'not empty',
      `Third line: Create a map to contain all the error messages of a given commit.
      Create a map to contain all the error messages of a given commit.`,
    ];
    const hasErrors = lineLength.validate( validLines );

    assert.equal( hasErrors, true, 'Third line longer than specified' );
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
    const hasErrors = lineLength.validate( validLines );
    assert.equal( hasErrors, false, 'There is no error' );
  } );
} );
