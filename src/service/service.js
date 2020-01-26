'use strict';

const {Cli} = require(`./cli`);

const USER_ARGV_INDEX = 2;

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;

Cli[userCommand].run();
