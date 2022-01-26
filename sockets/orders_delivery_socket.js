module.exports = (io) => {

    const orderDeliveryNamespace = io.of('/orders/delivery');
    orderDeliveryNamespace.on('connection', function(socket){
        
        //console.log('Usuario conectado');
        socket.on('position', function(data){
            if(data){
                console.log(`delivery emitio ${JSON.stringify(data)}`);
                orderDeliveryNamespace.emit(`position/${data.id_order}`, {lat: data.lat, lng: data.lng});
            } else {
                console.log('No se recibe posicion');
            }
        });

        socket.on('disconnect', function(data){
            console.log('Usuario desconectado');
        });

    });

}