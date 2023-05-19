const db = require('../config/config');

const Product = {};

Product.getAll = () => {
    const sql = `
        SELECT
            id,
            name,
            description
        FROM products
        ORDER BY name
    `;

    return db.manyOrNone(sql);
}

Product.findByCategoryId = (id_category) => {
    const sql = `
        SELECT
            p.id,
            p.id_user,
            p.name,
            p.description,
            p.price,
            p.image1,
            p.image2,
            p.image3,
            p.id_category
        FROM
            products AS p
        INNER JOIN
            categories AS c
        ON
            p.id_category = c.id
        WHERE
            c.id = $1
    `;
    return db.manyOrNone(sql, [
        id_category
    ]);
}

Product.findByCategoryAndProductName = (id_category, product_name) => {
    const sql = `
        SELECT
            p.id,
            p.id_user,
            p.name,
            p.description,
            p.price,
            p.image1,
            p.image2,
            p.image3,
            p.id_category
        FROM
            products AS p
        INNER JOIN
            categories AS c
        ON
            p.id_category = c.id
        WHERE
            c.id = $1
        AND p.name ilike $2
    `;
    return db.manyOrNone(sql, [
        id_category,
        `%${product_name}`
    ]);
}

Product.create = (product) => {
    const sql = `
        INSERT INTO
            products (
                name,
                description,
                price,
                image1,
                image2,
                image3,
                id_category,
                created_at,
                updated_at
            )
        VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9
        ) RETURNING id
    `;

    return db.oneOrNone(sql, [
        product.name,
        product.description,
        product.price,
        product.image1,
        product.image2,
        product.image3,
        product.id_category,
        new Date(),
        new Date()
    ]);
}

Product.update = (product) => {
    const sql = `
        UPDATE products
        SET 
            name = $2,
            description = $3,
            price = $4,
            image1 = $5,
            image2 = $6,
            image3 = $7,
            id_category = $8,
            updated_at = $9
        WHERE id = $1
    `;

    return db.none(sql, [
        product.id,
        product.name,
        product.description,
        product.price,
        product.image1,
        product.image2,
        product.image3,
        product.id_category,
        new Date()
    ]);
}


module.exports = Product;