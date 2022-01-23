const Order = require('../models/order');
const OrderHasProducts = require('../models/order_has_products')

module.exports = {

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
}