const Product = require('../models/product');
const cloud_storage = require('../utils/cloud_storage');
const asyncForeach = require('../utils/async_foreach');
const { findByCategoryId } = require('../models/product');

module.exports = {

    async findByCategoryId(req, res, next){
        try{
            const id_category = req.params.id_category;
            const data = await Product.findByCategoryId(id_category);
            console.log(JSON.stringify(data));
            return res.status(201).json(
                data
            );
        } catch(error){
            console.log(`Error: ${error}`);
            return res.status(501).json(
                {
                    success: false,
                    message: `Error al listar los productos`,
                    error: error
                }
            )
        }
    },

    async create(req, res, next) {
        try {
            const product = JSON.parse(req.body.product);
            console.log(`Producto recibido: ${JSON.stringify(product)}`);

            const files = req.files;
            let inserts = 0;

            if(files  == undefined || files.length === 0){
                return res.status(501).json({
                    success: false,
                    message: 'Error al registrar el producto, no tiene imagen'
                });
            } else {
                try {
                    const data = await Product.create(product); // store product information
                    product.id = data.id;

                    const start = async () => {
                        await asyncForeach(files, async (file) => {
                            const pathImage = `image_${Date.now()}`; // name of the file to store
                            const storage = cloud_storage;
                            const url = await storage(file, pathImage);
            
                            if(url !== undefined && url !== null){
                                if(inserts == 0){ // image1
                                    product.image1 = url    
                                } else if(inserts == 1){
                                    product.image2 = url
                                } else if(inserts == 2){
                                    product.image3 = url
                                }   
                            }

                            await Product.update(product);
                            inserts = inserts + 1;
                        }).catch((err) => {
                            console.log(`Async foreach error: ${err}`);
                        });
                    }

                    await start();
                    
                    if(inserts == files.length){
                        return res.status(201).json({
                            success: true,
                            message: 'El producto se ha creado correctamente'
                        });
                    }

                } catch (error) {
                    console.log(`Error: ${error}`);
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error al crear el producto',
                        error: error
                    });
                }
            }

            const data = await Product.create(product);

            return res.status(201).json({
                success: true,
                message: 'Producto creado correctamente',
                data: data.id
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al crear el producto',
                error: error
            });
        }
    },
}