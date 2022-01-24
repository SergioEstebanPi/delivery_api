const OrderController = require('../controllers/ordersController')
const passport = require('passport')

module.exports = (app) => {
    // TRAER DATOS
    app.get('/api/orders/findByStatus/:status', passport.authenticate('jwt', {session: false}), OrderController.findByStatus)
    app.get('/api/orders/findByDeliveryIdAndStatus/:id_delivery/:status', passport.authenticate('jwt', {session: false}), OrderController.findByDeliveryIdAndStatus)
    app.get('/api/orders/findByClientIdAndStatus/:id_client/:status', passport.authenticate('jwt', {session: false}), OrderController.findByClientIdAndStatus)
    
    // GUARDAR DATOS
    app.post('/api/orders/create', passport.authenticate('jwt', {session: false}), OrderController.create)

    //ACTUALIZAR DATOS
    app.put('/api/orders/updateToDispatched', passport.authenticate('jwt', {session: false}), OrderController.updateToDispatched)
    app.put('/api/orders/updateToOnTheWay', passport.authenticate('jwt', {session: false}), OrderController.updateToOnTheWay)
    app.put('/api/orders/updateToDelivered', passport.authenticate('jwt', {session: false}), OrderController.updateToDelivered)

}