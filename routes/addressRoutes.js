const AddressController = require('../controllers/addressController')
const passport = require('passport')

module.exports = (app) => {
    // TRAER DATOS
    app.get('/api/address/findByUserId/:id_user', passport.authenticate('jwt', {session: false}), AddressController.findByUserId)

    // GUARDAR DATOS
    app.post('/api/address/create', passport.authenticate('jwt', {session: false}), AddressController.create)

    //ACTUALIZAR DATOS

}