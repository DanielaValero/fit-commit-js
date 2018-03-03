const path = require( 'path' );
const { assert } = require( 'chai' );
const validatorsConfig = require( '../../lib/config/validatorsConfig' );
const validatorLoader = require( '../../lib/validatorLoader' );

suite( 'validatorLoader | ', () => {
  const fixturesPath = path.resolve( __dirname, '../fixtures/validatorLoader/' );

  suiteTeardown( ( done ) => {
    validatorsConfig.clearEnabledValidators();
    done();
  } );

  test( 'Should load all the validator files into an array', () => {
    const validators = validatorLoader.getValidatorFiles();
    assert.typeOf( validators, 'array' );
  } );

  test( 'Should get an array with the filenames of the enabled validators', () => {
    const validatorFiles = validatorLoader.getEnabledValidatorsFiles( fixturesPath );
    assert.typeOf( validatorFiles, 'array', `validatorLoader.getEnabledValidatorsFiles:
                                              Retrieves array` );
    assert.include( validatorFiles, 'emptyLines', 'One of the enabled validators is emptyLines' );
  } );

  test( 'Should load the enabled validators', () => {
    const validators = validatorLoader.loadValidators( fixturesPath );
    const emptyLinesValidator = validators[ 0 ];
    assert.isArray( validators, 'Gets an array of validators' );
    assert.lengthOf( validators, 3, 'Loads 3 enabled validators' );
    assert.nestedProperty( validators[ 1 ], 'lineLength', 'Contains lineLength validator' );
    assert.typeOf( emptyLinesValidator.emptyLines.validate, 'function' );
  } );
} );
