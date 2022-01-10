const User = require('../models/user')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const Rol = require('../models/Rol')

module.exports = {
    async getAll(req, res, next){
        try{
            const data = await User.getAll();
            console.log(`Usuarios: ${data}`)
            return res.status(200).json(data);
        } catch(err){
            console.log(`Error: ${err}`)
            return res.status(500).json({
                success: false,
                message: 'Error al obtener los usuarios'
            });
        }
    },

    async register(req, res, next){
        try{
            const user = req.body;
            const data = await User.create(user);
            console.log(`Usuario: ${data}`)

            // rol cliente default
            await Rol.create(data.id, 1);

            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',
                data: data.id
            });
        } catch(err){
            console.log(`Error: ${err}`)
            return res.status(500).json({
                success: false,
                message: 'Error al registrar el usuario',
                error: err
            });
        }
    },

    async login(req, res, next){
        try{
            const email = req.body.email;
            const password = req.body.password;

            const myUser = await User.findByEmail(email);
            if(!myUser){
                return res.status(401).json({
                    success: false,
                    message: 'El correo no fue encontrado'
                });
            }

            if(User.isPasswordMatched(password, myUser.password)){
                const token = jwt.sign(
                    {
                        id: myUser.id,
                        email: myUser.email
                    },
                    keys.secretOrKey, 
                    {
                    //expiresIn: (60*60*24) // 1 hora
                    }
                );
                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token: `${token}`
                }

                return res.status(200).json({
                    success: true,
                    message: 'El usuario ha sido autenticado',
                    data: data
                });
            } else {
                return res.status(401).json({
                    success: true,
                    message: 'La contraseña es incorrecta',
                    data: data.id
                });
            }
        } catch(err){
            console.log(`Error: ${err}`)
            return res.status(500).json({
                success: false,
                message: 'Error al iniciar sesión',
                error: err
            });
        }
    }
}