#!/usr/bin/env node

'use strict';

const validate = require( './validate' );

const isNotTestEnv = ( !process.env.NODE_ENV && process.env.NODE_ENV !== 'test' );

/*
   This section is to be executed by the git hook
   ========================================================================== */

function execHook() {
  validate.run();
}

if ( isNotTestEnv ) {
  execHook();
}
