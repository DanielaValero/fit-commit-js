const assert = require( 'chai' ).assert;
const path = require( 'path' );
const capitalizedSubject = require( '../../../lib/validators/capitalizedSubject' );
const error = require( '../../../lib/message/error' );
const validatorsConfig = require( '../../../lib/config/validatorsConfig' );

suite( 'Validators.capitalizedSubject | ', () => {
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

  test( 'Does not throw error if the first word is capitalized', () => {
    const commitLines = [ 'Allow to do a nice validation', '', 'Create a map commit.', '' ];
    const hasErrors = capitalizedSubject.validate( commitLines );
    assert.equal( hasErrors, false );
  } );

  test( 'Throws an error if the first word  is not capitalized', () => {
    const validLines = [ 'handles something', 'asdas', 'Create at.', 'foo' ];
    const hasErrors = capitalizedSubject.validate( validLines );

    assert.equal( hasErrors, true, 'The first word is not capitalized' );
  } );

  test( 'Should not be errors if the validator is not enabled or not config object', () => {
    validatorsConfig.clearEnabledValidators();
    validatorsConfig.loadEnabledValidatorsObject( path.resolve( __dirname, '../' ) );
    error.clearErrorsMap();

    const validLines = [ 'Handle error messages of a given commit longer than 50 chars',
      'asdas',
      'Create a map to contain all the error messages of a given commit.',
    ];
    const hasErrors = capitalizedSubject.validate( validLines );
    assert.equal( hasErrors, false, 'There is no error' );
  } );
} );
