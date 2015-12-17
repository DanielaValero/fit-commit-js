const exec = require( 'child_process' ).exec;
const process = require( 'process' );
const fs = require( 'fs' );
const log = require( 'npmlog' );
const fileUtils = require( './config/fileUtils' );
const path = require( 'path' );

/*
   Private
   ========================================================================== */

// The context of execution is the place where the package.json is
const HOOK_PATH = './.git/hooks/commit-msg';

function callbackError( stdout, stderr ) {
  if ( stdout ) {
    log.error( 'fit-commit-js', stdout );
  }
  if ( stderr ) {
    log.error( 'fit-commit-js', stderr );
  }
}

function notInGitRepo() {
  log.error( 'fit-commit-js', `.git directory not found in ${process.cwd()}.
    Please run from your Git repository root.` );
  process.exit( 1 );
}

function inGitRepo() {
  return fs.existsSync( '.git' ) ? true : notInGitRepo();
}

function deleteHook() {
  exec( `rm -f ${HOOK_PATH}` );
}

function posthook() {
  exec( `chmod +x ${HOOK_PATH}`,
    function callback( error, stdout, stderr ) {
      callbackError( stdout, stderr );
      if ( error !== null ) {
        log.info( 'fit-commit-js', 'Removing symlink' );
        deleteHook();
      }
    }
  );
  log.info( `Installed hook in ${HOOK_PATH}` );
}

/*
   Public
   ========================================================================== */

function install() {
  inGitRepo();
  deleteHook();
  const currentDirectory = fileUtils.getCurrentDirectory();
  const hookFile = path.resolve( currentDirectory, 'lib/hook.js' );

  if ( fileUtils.isFile( hookFile ) ) {
    exec( `ln -s  ${hookFile} ${HOOK_PATH}`, callbackError );
    posthook();
  } else {
    log.error( 'fit-commit-js', 'Could not find the hook file' );
  }
}


function uninstall() {
  deleteHook();
  log.info( `Uninstalled hook in ${HOOK_PATH}` );
}

module.exports = {
  install: install,
  uninstall: uninstall,
};
