const User = require('../models/user')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const Rol = require('../models/Rol')
const cloud_storage = require('../utils/cloud_storage')
const { findDeliveryMen, updateNotificationToken } = require('../models/user')

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

    async findDeliveryMen(req, res, next){
        try{
            const data = await User.findDeliveryMen();
            console.log(`Repartidor: ${JSON.stringify(data)}`)
            return res.status(200).json(data);
        } catch(err){
            console.log(`Error: ${err}`)
            return res.status(500).json({
                success: false,
                message: 'Error al obtener repartidores'
            });
        }
    },

    async findById(req, res, next){
        try{
            const id = req.params.id;
            const data = await User.findByUserId(id);
            console.log(`Usuario: ${JSON.stringify(data)}`)
            return res.status(200).json(data);
        } catch(err){
            console.log(`Error: ${err}`)
            return res.status(500).json({
                success: false,
                message: 'Error al obtener usuario por id'
            });
        }
    },

    async updateNotificationToken(req, res, next){
        try{
            const body = req.body;

            await User.updateNotificationToken(body.id, body.notification_token);
            console.log(`Usuario: ${JSON.stringify(body)}`)

            return res.status(201).json({
                success: true,
                message: 'El token de notificacion se almaceno correctamente'
            });
        } catch(err){
            console.log(`Error: ${err}`)
            return res.status(500).json({
                success: false,
                message: 'Error al actualiar token de notificaciones del usuario',
                error: err
            });
        }
    },

    async register(req, res, next){
        try{
            const user = req.body;
            const data = await User.create(user);
            console.log(`Usuario: ${JSON.stringify(data)}`)

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

    async registerWithImage(req, res, next){
        try{
            const user = JSON.parse(req.body.user);
            console.log(`Datos enviados del usuario: ${JSON.stringify(user)}`);

            const files = req.files;

            if(files.length > 0){
                const pathImage = `image_${Date.now()}`; // name of the file to store
                const storage = cloud_storage;
                const url = await storage(files[0], pathImage);

                if(url != undefined && url != null){
                    user.image = url;
                }
            }
            
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

    async update(req, res, next){
        try{
            const user = JSON.parse(req.body.user);
            console.log(`Datos enviados del usuario: ${JSON.stringify(user)}`);

            const files = req.files;

            if(files != null && files.length > 0){
                const pathImage = `image_${Date.now()}`; // name of the file to store
                const storage = cloud_storage;
                const url = await storage(files[0], pathImage);

                if(url != undefined && url != null){
                    user.image = url;
                }
            }
            
            await User.update(user);

            return res.status(201).json({
                success: true,
                message: 'Los datos se actualizaron correctamente'
            });
        } catch(err){
            console.log(`Error: ${err}`)
            return res.status(500).json({
                success: false,
                message: 'Error al actualizar el usuario',
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
                        //expiresIn:  (60 * 2) // 2 minutos
                        expiresIn:  (60 * 24) // 10 minutos
                    }
                );
                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token: `JWT ${token}`,
                    roles: myUser.roles
                }

                await User.updateToken(myUser.id, `JWT ${token}`);

                console.log(`Usuario enviado ${JSON.stringify(data)}`)

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
    },

    async logout(req, res, next){
        try {
            const id = req.body.id;
            await User.updateToken(id, null);
            return res.status(200).json({
                success: true,
                message: 'La sesion se ha cerrado correctamente'
            });
        } catch (e) {
            console.log(`Error: ${e}`)
            return res.status(501).json({
                success: false,
                message: 'Error al momento de cerrar sesion',
                error: e
            })
        }
    }
}