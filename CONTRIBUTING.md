# Contributing

## Reporting issues

We would love to help if you are having a problem. Feel free to open an issue. We ask that you please provide as much detail as possible.

## Contributing code

Contributions are encouraged through GitHub Pull Requests.

Guidelines when adding new code:

* Create always tests.
* Ensure the entire test suite still passes by running `npm test`.
* Ensure that the code does not have lintin errors by running: `npm run lint`
* Install the commit validator by running: ./bin/fit-commit-js.js install

## Commands

### Running a validation manually
The command: `npm run fitcommitjs` is available.

To send arguments use: `--`. So, to run the plain validation:

`npm run fitcommitjs -- -c`

To run it verbose:

`npm run fitcommitjs -- -ddc`

Note: If you run this locally, to test the validation against a commit message, the validator will automatically take the last commit message.
