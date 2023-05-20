const Order = require('../models/order');
const OrderHasProducts = require('../models/order_has_products')

module.exports = {

    async findByDeliveryIdAndStatus(req, res, next) {
        try {
            const id_delivery = req.params.id_delivery;
            const status = req.params.status;
            const data = await Order.findByDeliveryIdAndStatus(id_delivery, status);
            console.log(`Estados: ${JSON.stringify(data)}`);
            return res.status(200).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al obtener las ordenes',
                error: error
            });
        }
    },

    async findByClientIdAndStatus(req, res, next) {
        try {
            const id_client = req.params.id_client;
            const status = req.params.status;
            const data = await Order.findByClientIdAndStatus(id_client, status);
            console.log(`Ordenes: ${JSON.stringify(data)}`);
            return res.status(200).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al obtener las ordenes',
                error: error
            });
        }
    },

    /*
    async findByStatus(req, res, next) {
        try {
            const status = req.params.status;
            const data = await Order.findByStatus(status);
            console.log(`Estados: ${JSON.stringify(data)}`);
            return res.status(200).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al obtener las ordenes',
                error: error
            });
        }
    },
    */

    async findByUserIdAndStatus(req, res, next) {
        try {
            const id_user = req.params.id_user;
            const status = req.params.status;
            const data = await Order.findByUserIdAndStatus(id_user, status);
            console.log(`Ordenes: ${JSON.stringify(data)}`);
            return res.status(200).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al obtener las ordenes',
                error: error
            });
        }
    },


    async findByClientId(req, res, next) {
        try {
            const id_client = req.params.id_client;
            const data = await Address.findByUserId(id_client);
            console.log(`Ordenes: ${JSON.stringify(data)}`);
            return res.status(200).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al obtener las ordenes',
                error: error
            });
        }
    },

    async create(req, res, next) {
        try {
            const order = req.body;
            order.status = 'PAGADO';
            console.log(`Orden recibida: ${JSON.stringify(order)}`);

            const data = await Order.create(order);
            //order.id_user = order.products[0].id_user;
            //Order.update(order);

            // recorrer productos agregados a la orden
            for (const product of order.products) {
                await OrderHasProducts.create(data.id, product.id, product.quantity);                
            }

            return res.status(201).json({
                success: true,
                message: 'Orden creada correctamente',
                data: data.id
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al crear la orden',
                error: error
            });
        }
    },

    async updateToDispatched(req, res, next) {
        try {
            const order = req.body;
            order.status = 'DESPACHADO';
            console.log(`Orden recibida: ${JSON.stringify(order)}`);

            await Order.update(order);

            return res.status(201).json({
                success: true,
                message: 'Orden actualizada correctamente'
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar la orden',
                error: error
            });
        }
    },

    async updateToDelivered(req, res, next) {
        try {
            const order = req.body;
            order.status = 'ENTREGADO';
            console.log(`Orden recibida: ${JSON.stringify(order)}`);

            await Order.update(order);

            return res.status(201).json({
                success: true,
                message: 'Orden actualizada correctamente'
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar la orden',
                error: error
            });
        }
    },

    async updateToOnTheWay(req, res, next) {
        try {
            const order = req.body;
            order.status = 'EN CAMINO';
            console.log(`Orden recibida: ${JSON.stringify(order)}`);

            await Order.update(order);

            return res.status(201).json({
                success: true,
                message: 'Orden actualizada correctamente'
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar la orden',
                error: error
            });
        }
    },

    async updateLatLng(req, res, next) {
        try {
            const order = req.body;
            console.log(`Orden recibida: ${JSON.stringify(order)}`);

            await Order.updateLatLng(order);

            return res.status(201).json({
                success: true,
                message: 'Orden actualizada correctamente'
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar la orden',
                error: error
            });
        }
    },
}