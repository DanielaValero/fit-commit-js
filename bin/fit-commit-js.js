#!/usr/bin/env node

// Code from validate-commit-message

const exec = require('child_process').exec;

function stdExecCallback(error, stdout, stderr) {
  if (stdout) {
    console.log(stdout);
  }
  if (stderr) {
    console.log(stderr);
  }
  if (error !== null) {
    //console.log(error);
  }
}

function prehook() {
  exec('rm -f ./.git/hooks/commit-msg');
}

function posthook() {
  exec('chmod +x ./.git/hooks/commit-msg',
    function callback(error, stdout, stderr) {
      if (stdout) {
        console.log(stdout);
      }
      if (stderr) {
        console.log(stderr);
      }
      if (error !== null) {
        console.log('Removing symlink');
        prehook();
      }
    }
  );
}

function hook() {
  prehook();
  exec('ln -s ../../node_modules/fit-commit-js/lib/fit-commit-js.js' +
    ' ./.git/hooks/commit-msg', stdExecCallback);
  posthook();
}

hook();
