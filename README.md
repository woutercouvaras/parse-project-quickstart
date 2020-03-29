# Quickstart template for a Parse Platform project

[![GitHub Release][ico-release]][link-github-release]
[![License][ico-license]](LICENSE)

A base scaffolding from which to quickly start a Parse project <https://parseplatform.org/>.

The scaffolding is mostly useful for getting a Parse server environment up and running with
minumal fuss, but an optional, minimally configured, Vue application setup is also provided.

## Usage - Parse Server

The only external requirement for running the provided Parse server, is a connection to MongoDB.
To run the Parse server, copy the `.example.env` file to `.env` and update it's values
appropriately. Pick anything for `PARSE_SERVER_APPLICATION_ID` and `PARSE_SERVER_MASTER_KEY`.
Ensure that `PARSE_SERVER_DATABASE_URI` points to your MongoDB instance, and optionally that
`PARSE_SERVER_CLOUD` contains the relative path to your cloud functions file (if empty, it will
default to the one already provided). <br/>

From the `packages/api` folder, run `yarn develop` to start the server.

MOAR TODO

## Usage - Parse App

TODO

## Usage - Parse Models

TODO

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
