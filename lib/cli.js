'use strict';

const process = require( 'process' );
const pgk = require( '../package.json' );
const installer = require( './installer' );
const log = require( 'npmlog' );
const process = require( 'process' );

/*
   Private
   ========================================================================== */

function version() {
  log.info( 'fit-commit-js', `fit-commit-js v-${pgk.version}` );
  process.exit( 0 );
}

function help() {
  log.info( 'fit-commit-js', `v-${pgk.version}` );
  log.info( 'fit-commit-js', `Usage: fit-commit-js install || fit-commit-js -i` );
  log.info( 'fit-commit-js', `Usage: fit-commit-js uninstall || fit-commit-js -u` );
  process.exit( 0 );
}

function install() {
  installer.install();
}

function uninstall() {
  installer.uninstall();
}


/*
   Public
   ========================================================================== */

function execute() {
  const action = process.argv[ 2 ];

  switch ( action ) {
    case '-h':
    case 'help':
      help();

      break;

    case '-i':
    case 'install':
      install();

      break;

    case '-u':
    case 'uninstall':
      uninstall();

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
  execute: execute,
};
