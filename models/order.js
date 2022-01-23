const db = require('../config/config')

const Order = {};

Order.findByStatus = (status) => {
    const sql = `
    SELECT
        o.id,
        o.id_client,
        o.id_delivery,
        o.id_address,
        o.status,
        o.timestamp,
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'id', p.id,
                'name', p.name,
                'description', p.description,
                'price', p.price,
                'image1', p.image1,
                'image2', p.image2,
                'image3', p.image3,
                'quantity', ohp.quantity
            )
        ) AS products,
        JSON_BUILD_OBJECT(
            'id', u.id,
            'name', u.name,
            'lastname', u.lastname,
            'image', u.image
        ) AS client,
        JSON_BUILD_OBJECT(
            'id', d.id,
            'name', d.name,
            'lastname', d.lastname,
            'image', d.image
        ) AS delivery,
        JSON_BUILD_OBJECT(
            'id', a.id,
            'address', a.address,
            'neighborhood', a.neighborhood,
            'lat', a.lat,
            'lng', a.lng
        ) AS address
    FROM
        orders AS o
    INNER JOIN 
        users AS u
    ON o.id_client = u.id
    LEFT JOIN 
        users AS d
    ON o.id_client = d.id
    INNER JOIN
        address AS a
    ON o.id_address = a.id
    INNER JOIN
        order_has_products as ohp
    ON o.id = ohp.id_order
    INNER JOIN
        products AS p
    ON ohp.id_product = p.id
    WHERE
        o.status = $1
    GROUP BY
        o.id,
        u.id,
        a.id,
        d.id
    `;

    return db.manyOrNone(sql, [status]);
}

Order.findByClientId = (id_client) => {
    const sql = `
        SELECT
            id_client,
            id_address,
            status,
            timestamp
        FROM
            orders
        WHERE
            id_client = $1
    `;

    return db.manyOrNone(sql, [id_client]);
}

Order.create = (order) => {
    const sql = `
        INSERT INTO
            orders(
                id_client,
                id_address,
                status,
                timestamp,
                created_at,
                updated_at
            )
        VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6
        ) RETURNING id
    `;
    return db.oneOrNone(sql, [
        order.id_client,
        order.id_address,
        order.status,
        Date.now(),
        new Date(),
        new Date()
    ]);
}

Order.update = (order) => {
    const sql = `
        UPDATE orders
        SET  
            id_client = $2,
            id_address = $3,
            id_delivery = $4,
            status = $5,
            updated_at = $6
        WHERE
            id = $1
    `;
    return db.none(sql, [
        order.id,
        order.id_client,
        order.id_address,
        order.id_delivery,
        order.status,
        new Date()
    ]);
}

module.exports = Order;