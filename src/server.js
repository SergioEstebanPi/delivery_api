const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const logger = require('morgan')
const cors = require('cors')
const multer = require('multer')
const admin = require('firebase-admin')
const serviceAccount = require('../serviceAccountKey.json')
const passport = require('passport')
const expressSession = require('express-session')

/*
INICIALIZAR FIREBASE ADMIN
*/
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const upload = multer({
    storage: multer.memoryStorage()
});

// routes
const users = require('../routes/usersRoutes')
const categories = require('../routes/categoriesRoutes')

const port = process.env.PORT || 3000

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(expressSession({
    secret: 'SECRET',
    resave: true,
    saveUninitialized: true 
})); // session secret
app.use(passport.initialize())
app.use(passport.session())

require('../config/passport')(passport)

app.disable('x-powered-by')

app.set('port', port)

// call the routes
users(app, upload)
categories(app)

const ip = '192.168.211.41'
server.listen(port, ip || 'localhost', function() {
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