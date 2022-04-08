module.exports = {
    production: false,
    id_developer: 0,
    access_token: process.env.access_token,
    localhost: process.env.IP || '192.168.20.31',
    database: process.env.database,
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    serviceAccount: process.env.serviceAccount
}