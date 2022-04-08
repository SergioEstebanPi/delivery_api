const promise = require('bluebird')
const env = require('../config/env')

const options = {
    promiseLib: promise,
    query: (e) => {}
}

const pgp = require('pg-promise')(options)
const types = pgp.pg.types;
types.setTypeParser(1114, function(stringValue) {
    return stringValue;
})

let ssl = null;
if (process.env.NODE_ENV === 'development') {
   ssl = {rejectUnauthorized: false};
}

const databaseConfig = {
    'host': env.host,
    'port': env.port,
    'database': env.database,
    'user': env.user,
    'password': env.password,
    'ssl': ssl
}

const db = pgp(databaseConfig)

module.exports = db;