const mercadopago = require('mercadopago')
const Order = require('../models/order');
const OrderHasProducts = require('../models/order_has_products')
const User = require('../models/user')
const env = require('../config/env')

mercadopago.configure({
    sandbox: true,
    access_token: env.access_token
});

module.exports = {

    async createPaymentCreditCard(req, res, next) {
        let payment = req.body;
        console.log(`ORDEN A PAGAR: ${JSON.stringify(payment)}`);

        const payment_data = {
            description: payment.description,
            transaction_amount: payment.transaction_amount,
            installments: payment.installments,
            payment_method_id: payment.payment_method_id,
            token: payment.card_token,
            issuer_id: payment.issuer_id,
            payer: {
                email: payment.payer.email,
                identification: {
                    type: payment.payer.identification.type,
                    number: payment.payer.identification.number
                }
            }
        };

        const data = await mercadopago.payment
        .create(payment_data)
        .catch((e) => {
            console.log(e);
            return res.status(501).json({
                success: false,
                message: 'Error al crear el pago',
                error: e
            });
        });

        if(data){
            console.log('Si hay datos correctos:', data);
            if(data  !== undefined){
                const payment_type_id = module.exports.validatePaymentMethod(
                    payment.payment_type_id
                );
                payment.id_payment_method = payment_type_id;

                let order = payment.order;
                order.status = 'PAGADO';
                console.log(`Orden recibida: ${JSON.stringify(order)}`);

                const dataOrder = await Order.create(order);

                // recorrer productos agregados a la orden
                for (const product of order.products) {
                    await OrderHasProducts.create(dataOrder.id, product.id, product.quantity);                
                }

                console.log(data.body);

                return res.status(201).json(data.body);
            }
        } else {
            return res.status(501).json({
                success: false,
                message: 'Error en la peticion a mercadopago',
            });
        }
    },

    validatePaymentMethod(status) {
        if(status == 'credit_cart'){
            status = 1;
        }
        if(status == 'bank_transfer'){
            status = 2;
        }
        if(status == 'ticket'){
            status = 3;
        }
        if(status == 'upon_delivery'){
            status = 4;
        }
        return status;
    }
}