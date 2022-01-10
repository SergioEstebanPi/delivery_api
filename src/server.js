const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const logger = require('morgan')
const cors = require('cors')

// routes
const users = require('../routes/usersRoutes')

const port = process.env.PORT || 3000

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.disable('x-powered-by')

app.set('port', port)

// call the routes
users(app)

server.listen(port, '192.168.127.41' || 'localhost', function() {
    console.log('server running ' + port + " iniciado")
})

app.get('/', (req, res) => {
    res.send('Ruta raiz del backend')
})

// error handler
app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).send(err.stack)
})

module.exports = {
    app: app,
    server: server
}