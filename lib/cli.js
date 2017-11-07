#!/usr/bin/env node

const pgk = require( '../package.json' );
const installer = require( './installer' );
const validate = require( './validate' );
const log = require( 'npmlog' );

/*
   Private
   ========================================================================== */

function version() {
  log.info( 'fit-commit-js', `fit-commit-js v-${pgk.version}` );
  process.exit( 0 );
}

function help() {
  log.info( 'fit-commit-js', `v-${pgk.version}` );
  log.info( 'fit-commit-js', 'Usage: fit-commit-js install || fit-commit-js -i', 'Installs a precommit hook' );
  log.info( 'fit-commit-js', 'Usage: fit-commit-js uninstall || fit-commit-js -u', 'Uninstalls a precommit hook' );
  log.info( 'fit-commit-js', 'Usage: fit-commit-js validate || fit-commit-js -c', 'Runs the commit validation' );
  process.exit( 0 );
}

function install() {
  installer.install();
}

function uninstall() {
  installer.uninstall();
}

function validateFn() {
  validate.run();
}

/*
   Public
   ========================================================================== */

function execute() {
  const action = process.argv[ 2 ];

  if (action.indexOf('-dd') !== -1 ) {
    log.info('Running in verbose mode');
    log.level = 'verbose';
  }

  switch ( action ) {
    case '-h':
    case 'help':
      help();

      break;

    case '-i':
    case '-ddi':
    case 'install':
      install();

      break;
    case '-u':
    case '-ddu':
    case 'uninstall':
      uninstall();

      break;
    case '-c':
    case '-ddc':
    case 'validate':
      validateFn();

      break;
    case '-v':
    case 'version':
      version();

      break;

    default:
      help();
  }

  process.exit( 0 );
}

module.exports = {
  execute,
};
