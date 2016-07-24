const assert = require( 'chai' ).assert;
const path = require( 'path' );
const ticketCode = require( '../../../lib/validators/ticketCode' );
const error = require( '../../../lib/message/error' );
const validatorsConfig = require( '../../../lib/config/validatorsConfig' );

suite( 'Validators.ticketCode | ', () => {
  const fixturesPath = path.resolve( __dirname, '../../fixtures/validators/' );
  const fixturesPathOneTicket = path.resolve( __dirname, '../../fixtures/validators/ticketCode' );

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

  test( 'Only one ticket was used', () => {
    const validLines = [ 'Handle error', '', 'FITCOMMITJS-123', 'Create a map commit.', '' ];
    const hasErrors = ticketCode.validate( validLines );
    assert.equal( hasErrors, false, 'A ticket code was used. Valid' );
  } );

  test( 'More than one ticket code per commit are allowed', () => {
    const validLines = [ 'feature: first line',
      'FITCOMMITJS-123, FITCOMMITJS-124',
      'Fourth line',
      'fifth line',
    ];
    const hasErrors = ticketCode.validate( validLines );

    assert.equal( hasErrors, false, 'More than one tickets can be used. Valid' );
  } );

  test( 'Should be errors if one of defined ticketCode was not used', () => {
    const validLines = [ 'Handle', 'asdas', 'Create at.', 'foo' ];
    const hasErrors = ticketCode.validate( validLines );

    assert.equal( hasErrors, true, 'None of the ticketCodes was used. Invalid' );
  } );

  test( 'Only one ticket per commit is allowed', () => {
    validatorsConfig.clearEnabledValidators();
    validatorsConfig.loadEnabledValidatorsObject( fixturesPathOneTicket );
    const validLines = [ 'feature: first line',
      'FITCOMMITJS-123, FITCOMMITJS-124',
      'Fourth line',
      'fifth line',
    ];
    const hasErrors = ticketCode.validate( validLines );

    assert.equal( hasErrors, true, 'More than one tickets can not be used. Invalid' );
    validatorsConfig.clearEnabledValidators();
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
    const hasErrors = ticketCode.validate( validLines );
    assert.equal( hasErrors, false, 'There is no error' );
  } );
} );
