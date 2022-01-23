const AddressController = require('../controllers/addressController')
const passport = require('passport')

module.exports = (app) => {
    // TRAER DATOS
    //app.get('/api/address/getAll', passport.authenticate('jwt', {session: false}), AddressController.getAll)

    // GUARDAR DATOS
    app.post('/api/address/create', passport.authenticate('jwt', {session: false}), AddressController.create)

    //ACTUALIZAR DATOS

}