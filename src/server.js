const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const logger = require('morgan')
const cors = require('cors')
const multer = require('multer')
const admin = require('firebase-admin')
const passport = require('passport')
const expressSession = require('express-session')
const io = require('socket.io')(server);
const mercadopago = require('mercadopago')
const env = require('../config/env')

/*
MERCADO PAGO CONFIG
*/
mercadopago.configure(
    {
        access_token: env.access_token
    }
);

/*
SOCKETS
*/
const orderDeliverySocket = require('../sockets/orders_delivery_socket')

const serviceAccount = require('../serviceAccountKey.json')

/*
INICIALIZAR FIREBASE ADMIN
*/
admin.initializeApp({
    //credential: admin.credential.cert(JSON.parse(env.serviceAccount))
    credential: admin.credential.cert(serviceAccount)
});

const upload = multer({
    storage: multer.memoryStorage()
});

// routes
const users = require('../routes/usersRoutes')
const categories = require('../routes/categoriesRoutes')
const products = require('../routes/productsRoutes')
const address = require('../routes/addressRoutes')
const orders = require('../routes/ordersRoutes')
const mercadoPagoRoutes = require('../routes/mercadoPagoRoutes')
const epaycoRoutes = require('../routes/epaycoRoutes')

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

// call sockets
orderDeliverySocket(io)

// call the routes
users(app, upload)
categories(app)
products(app, upload)
address(app)
orders(app)
mercadoPagoRoutes(app)
epaycoRoutes(app)

server.listen(port, function() {
    var ip =  env.localhost;
    console.log('IP address: ' + ip)
    console.log('server running port: ' + port + " iniciado")
    console.log('http://' + ip + ":" + port + "/")
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