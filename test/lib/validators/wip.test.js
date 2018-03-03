const { assert } = require( 'chai' );
const path = require( 'path' );
const wip = require( '../../../lib/validators/wip' );
const error = require( '../../../lib/message/error' );
const validatorsConfig = require( '../../../lib/config/validatorsConfig' );

suite( 'Validators.wip | ', () => {
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

  test( 'Does not throw an error if there is no work in progress to be merged', () => {
    const commitLines = [ 'allow to do a nice validation', '', 'Create a map commit.', '' ];
    const hasErrors = wip.validate( commitLines );
    assert.equal( hasErrors, false );
  } );

  test( 'Throws an error if there is work in progress is to be merged', () => {
    const validLines = [ 'WIP Handles something', 'asdas', 'Create at.', 'foo' ];
    const hasErrors = wip.validate( validLines );

    assert.equal( hasErrors, true, 'wip is going to be merged' );
  } );

  test( 'Should not be errors if the validator is not enabled or not config object', () => {
    validatorsConfig.clearEnabledValidators();
    validatorsConfig.loadEnabledValidatorsObject( path.resolve( __dirname, '../' ) );
    error.clearErrorsMap();

    const validLines = [ 'Handle error messages of a given commit longer than 50 chars',
      'asdas',
      'Create a map to contain all the error messages of a given commit.',
    ];
    const hasErrors = wip.validate( validLines );
    assert.equal( hasErrors, false, 'There is no error' );
  } );
} );
