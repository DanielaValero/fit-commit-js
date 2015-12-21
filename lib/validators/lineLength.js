const log = require( 'npmlog' );

function validate() {
  log.verbose( 'Running lineLenth Validation' );

  return true;
}


module.exports = {
  validate: validate,
};
