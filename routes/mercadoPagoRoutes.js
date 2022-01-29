const MercadoPagoController = require('../controllers/mercadoPagoController')
const passport = require('passport')

module.exports = (app) => {
    // TRAER DATOS

    // GUARDAR DATOS
    app.post('/api/payments/createPay', passport.authenticate('jwt', {session: false}), MercadoPagoController.createPaymentCreditCard)

    //ACTUALIZAR DATOS

}