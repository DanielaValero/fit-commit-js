// develop_branch="develop"
// current_branch="$(git rev-parse --abbrev-ref HEAD)"
//
// # only check commit messages on main development branch
// [ "$current_branch" != "$develop_branch" ] && exit 0

const log = require( 'npmlog' );

function validate() {
  log.verbose('Running wip Validation');
}


module.exports = {
  validate: validate,
};
