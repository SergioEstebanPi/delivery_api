const EpaycoController = require('../controllers/epaycoController')
const passport = require('passport')

module.exports = (app) => {
    // TRAER DATOS

    // GUARDAR DATOS
    app.post('/api/payments/createEpaycoPay', passport.authenticate('jwt', {session: false}), EpaycoController.createEpaycoPaymentCreditCard)

    //ACTUALIZAR DATOS

}