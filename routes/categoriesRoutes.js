const CategoriesController = require('../controllers/categoriesController')
const passport = require('passport')

module.exports = (app) => {
    // TRAER DATOS

    // GUARDAR DATOS
    app.post('/api/categories/create', passport.authenticate('jwt', {session: false}), CategoriesController.create)

    //ACTUALIZAR DATOS

}