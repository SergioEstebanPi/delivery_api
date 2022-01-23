const OrderController = require('../controllers/ordersController')
const passport = require('passport')

module.exports = (app) => {
    // TRAER DATOS
    app.get('/api/orders/findByStatus/:status', passport.authenticate('jwt', {session: false}), OrderController.findByStatus)
    app.get('/api/orders/findByClientId/:id_client', passport.authenticate('jwt', {session: false}), OrderController.findByClientId)

    // GUARDAR DATOS
    app.post('/api/orders/create', passport.authenticate('jwt', {session: false}), OrderController.create)

    //ACTUALIZAR DATOS
    app.put('/api/orders/updateToDispatched', passport.authenticate('jwt', {session: false}), OrderController.updateToDispatched)

}