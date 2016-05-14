[![Build Status](https://travis-ci.org/DanielaValero/fit-commit-js.svg)](https://travis-ci.org/DanielaValero/fit-commit-js)
[![Dependency Status](https://david-dm.org/DanielaValero/fit-commit-js.svg.svg)](https://david-dm.org/DanielaValero/fit-commit-js)
[![Code Climate](https://codeclimate.com/github/DanielaValero/fit-commit-js/badges/gpa.svg)](https://codeclimate.com/github/DanielaValero/fit-commit-js)

# Fit commit js

A node version of [fit-commit](https://github.com/m1foley/fit-commit) by [Mike Foley](https://github.com/m1foley)


# Validators
 - Line length
 - Empty lines
 - Tags: feature, chore, bugfix, etc.
 - Ticket code
 - Tense of the subject

 - WIP: No merge work in progress into specified branch
 - Capitalized subject
 - Subject with a period



# Guidelines
 - Use the ES2015 features [supported by node](https://nodejs.org/en/docs/es6/)
 - TDD with mocha, chai and sinon
 - Functional programming with ramda
 - Use javascript guidelines from [Airbnb](https://github.com/airbnb/javascript)
 - Allow spaces inside "(),{} and []"


# Supported config files:
 - .fitcommigjs.json
 - .fitcommitjs.{yml,yaml}
 - .package.json > fitcommitjsConfig
