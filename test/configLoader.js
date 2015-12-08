'use strict';

const assert = require('assert');
const configLoader = require('../lib/configLoader');
const pkg = require('../package.json');

suite('configLoader | ', () => {

  const expected = {
    Validators: {
      lineLength: {
        Enabled: true,
        MaxLineLength: 72,
        SubjectWarnLength: 50,
        AllowLongUrls: true,
      },
    },
  };

  test('should load the default config file', () => {
    let config = configLoader.load('../config/config.default.yml');
    assert.equal(config.Validators.lineLength.Enabled, extexted.Validators.lineLength.Enabled);
  });

  test('should load a given config file if file specified in package.json', () => {
    let configFile = pkg.fitCommitJs.configFile;
    let config = configLoader.load(configFile);
    assert.equal(config.Validators.lineLength.Enabled, extexted.Validators.lineLength.Enabled);
  });
});
