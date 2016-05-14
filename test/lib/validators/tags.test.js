const assert = require( 'chai' ).assert;
const path = require( 'path' );
const tags = require( '../../../lib/validators/tags' );
const error = require( '../../../lib/message/error' );
const validatorsConfig = require( '../../../lib/config/validatorsConfig' );

suite( 'Validators.tags | ', () => {
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

  test( 'Only one tag was used', () => {
    const validLines = [ 'chore: Handle error', '', 'Create a map commit.', '' ];
    const hasErrors = tags.validate( validLines );
    assert.equal( hasErrors, false, 'Only one tag was used. Valid' );
  } );

  test( 'Should be errors if more than one tag was used', () => {
    const validLines = [ 'feature: first line',
      'bugfix: second line',
      'Fourth line',
      'fifth line',
    ];
    const hasErrors = tags.validate( validLines );

    assert.equal( hasErrors, true, 'More than one tag was used. Invalid' );
  } );

  test( 'Should be errors if one of defined tags was not used', () => {
    const validLines = [ 'Handle', 'asdas', 'Create at.', 'foo' ];
    const hasErrors = tags.validate( validLines );

    assert.equal( hasErrors, true, 'None of the tags was used. Invalid' );
  } );

  test( 'Should not be errors if the validator is not enabled or not config object', () => {
    validatorsConfig.clearEnabledValidators();
    validatorsConfig.loadEnabledValidatorsObject( path.resolve( __dirname, '../' ) );
    error.clearErrorsMap();

    const validLines = [ 'Handle error messages of a given commit longer than 50 chars',
      'asdas',
      'Create a map to contain all the error messages of a given commit.',
    ];
    const hasErrors = tags.validate( validLines );
    assert.equal( hasErrors, false, 'There is no error' );
  } );
} );
