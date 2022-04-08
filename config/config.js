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

const databaseConfig = {
    'host': env.host,
    'port': env.port,
    'database': env.database,
    'user': env.user,
    'password': env.password,
    'ssl': true
}

const db = pgp(databaseConfig)

module.exports = db;