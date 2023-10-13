const Order = require('../models/order');
const OrderHasProducts = require('../models/order_has_products')
const User = require('../models/user')
const env = require('../config/env')


var epayco = require('epayco-sdk-node')({
    apiKey: env.epaycoApiKey,
    privateKey: env.epaycoPrivateKey,
    lang: 'ES',
    test: true
})

/*
var epayco = require('epayco-sdk-node')({
    apiKey: 'e0a24dfa4b8143c69e2cd68697e3af8f',
    privateKey: 'd00dd695caf1230cdacb7baa5ea481b7',
    lang: 'ES',
    test: true
})
*/

module.exports = {

    async createEpaycoPaymentCreditCard(req, res, next) {
        let payment = req.body;
        console.log(`ORDEN A PAGAR createEpaycoPaymentCreditCard: ${JSON.stringify(payment)}`);

        var credit_info = {
            "card[number]": payment.number,
            "card[exp_year]": payment.exp_year,
            "card[exp_month]": payment.exp_month,
            "card[cvc]": payment.cvc,
            "hasCvv": true //hasCvv: validar codigo de seguridad en la transacción 
        }

       /*
        console.log("PAGO PSE");

        epayco.bank.getBanks()
            .then(function(bank) {
                console.log("BANCOS PSE");
                console.log(bank);
            })
            .catch(function(err) {
                console.log("err:" + err);
            });


            var pse_info = {
                bank: "1022",
                invoice: "1472050780",
                description: "pay test",
                value: "10000",
                tax: "0",
                tax_base: "0",
                currency: "COP",
                type_person: "0",
                doc_type: "CC",
                doc_number: "10358519",
                name: "testing",
                last_name: "PAYCO",
                email: "serestpis4@gmail.com",
                country: "CO",
                cell_phone: "3222224578",
                ip:"190.000.000.000", //This is the client's IP, it is required
                url_response: "https://ejemplo.com/respuesta.html",
                url_confirmation: "https://ejemplo.com/confirmacion",
                metodoconfirmacion : "GET",
            
                //Los parámetros extras deben ser enviados tipo string, si se envía tipo array generara error.
                    extra1: "",
                    extra2: "",
                    extra3: "",
                    extra4: "",
                    extra5: "",
                    extra6: ""
                
            }
            epayco.bank.create(pse_info)
                .then(function(bank) {
                    console.log("RESULTADO PSE");
                    console.log(bank);
                })
                .catch(function(err) {
                    console.log("err: " + err);
                });

                */

        console.log("PAGO TARJETA");

        epayco.token.create(credit_info).then(function(token) {
            console.log("Se genera el card token Epayco: ");
            console.log(token);
            console.log('Datos recibidos Epayco:', token.success);

            
              var customer_test = {
                doc_type: "CC",
                doc_number: "10358519",
                name: "John",
                last_name: "Doe",
                email: "example@email.com",
                city: "Bogota",
                address: "Cr 4 # 55 36",
                phone: "3005234321",
                cell_phone: "3010000001",
              };

              var bill = {
                bill: "OR-1253", // CAMBIAR ESTE VALOR CADA TRASANCCION A PAGAR
                description: "Test Payment",
                value: "116000",
                tax: "16000",
                tax_base: "100000",
                currency: "COP",
                dues: "12",
                ip:"190.000.000.000", /*This is the client's IP, it is required */
              };

            if(token && token.status == true && token.data.status == 'exitoso' && token.card){
                tokenLocal = {
                    status: token.status,
                    id: token.id,
                    success: token.success,
                    type: token.type,
                    data: {
                      status: token.data.status,
                      id: token.data.id,
                      created: token.data.created,
                      livemode: token.data.livemode
                    },
                    card: {
                      exp_month: token.card.exp_month,
                      exp_year: token.card.exp_year,
                      name: token.card.name,
                      mask: token.card.mask
                    },
                    object: token.object
                  }
                console.log('Si hay datos correctos Epayco:', token.data.id);
                //if(data  !== undefined){
                console.log('Pagado correctamente');

                var customer_info = {
                    token_card: token.data.id,
                    name: "Joe",
                    last_name: "Doe", 
                    email: "joe@payco.co",
                    default: true,
                    //Optional parameters: These parameters are important when validating the credit card transaction
                    city: "Bogota",
                    address: "Cr 4 # 55 36",
                    phone: "3005234321",
                    cell_phone: "3010000001"
                }

                epayco.customers.create(customer_info).then(function(customer){
                    console.log('Si hay datos CUSTOMER correctos Epayco:', customer);

                    var payment_info = {
                        token_card: token.data.id,
                        customer_id: customer.data.customerId,
                        doc_type: customer_test.doc_type,
                        doc_number: customer_test.doc_number,
                        name: customer_test.name,
                        last_name: customer_test.last_name,
                        email: customer_test.email,
                        city: customer_test.city,
                        address: customer_test.address,
                        phone: customer_test.phone,
                        cell_phone: customer_test.cell_phone,
                        bill: bill.bill,
                        description: bill.description,
                        value: bill.value,
                        tax: bill.tax,
                        tax_base: bill.tax_base,
                        currency: bill.currency,
                        dues: bill.dues,
                        ip: bill.ip, /*This is the client's IP, it is required */
                        url_response: "https://ejemplo.com/respuesta.html",
                        url_confirmation: "https://ejemplo.com/confirmacion",
                        method_confirmation: "GET",
                    
                        //Los parámetros extras deben ser enviados tipo string, si se envía tipo array generara error.
                    
                        use_default_card_customer: true,/*if the user wants to be charged with the card that the customer currently has as default = true*/
                        
                        extras: {
                            extra1: "",
                            extra2: "",
                            extra3: "",
                            extra4: "",
                            extra5: "",
                            extra6: ""
                        }
                    }
                    epayco.charge.create(payment_info).then(async function(charge) {
                        console.log("RESPUESTA CHARGE");
                        console.log(charge);
                        if(charge.status == true && charge.success == true){
                            console.log("factura: " + charge.data.factura);
                            if(charge.data.estado =='Aceptada' && charge.data.respuesta == 'Aprobada'){
                                console.log("PAGO EPAYCO EXITOSO");

                                //var last4 = token.card.mask;
                                var last4 = '9808';

                                var response = {
                                    status: 'true',
                                    success: 'true',
                                    recibo: charge.data.recibo,
                                    brand: charge.data.banco,
                                    last4: last4
                                };
                                
                                let order = payment.order;
                                order.status = 'PAGADO';
                                console.log(`Orden recibida: ${JSON.stringify(order)}`);
                
                                const dataOrder = await Order.create(order);
                
                        
                                for (const product of order.products) {
                                    await OrderHasProducts.create(dataOrder.id, product.id, product.quantity);                
                                }
                
                                //console.log(data.body);
                
                                //return res.status(201).json(token);

                                return res.status(201).json(response);
                            }
                        } else {
                            return res.status(501).json({
                                success: false,
                                message: charge.status + " - " + charge.description,
                                error: err
                            });
                        }
                    }).catch(function(err) {
                        console.log(err);
                        return res.status(501).json({
                            success: false,
                            message: 'Error al crear CHARGE el pago Epayco',
                            error: err
                        });
                    });

                }).catch(function(err) {
                    console.log(err);
                    return res.status(501).json({
                        success: false,
                        message: 'Error al crear CUSTOMER el pago Epayco',
                        error: err
                    });
                });
            } else {
                return res.status(501).json({
                    success: false,
                    message: 'Error al crear el pago Epayco',
                    error: 'ERROR PAGO EPAYCO ESTADO NO EXITOSO'
                });
            }
        }).catch(function(err) {
            console.log(err);
            return res.status(501).json({
                success: false,
                message: 'Error al generar token Epayco',
                error: err
            });
        });
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