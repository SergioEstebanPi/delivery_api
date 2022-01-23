const db = require('../config/config')

const Order = {};

Order.findByStatus = (status) => {
    const sql = `
        SELECT
            o.id_client,
            o.id_delivery,
            o.id_address,
            o.status,
            o.timestamp,
            JSON_BUILD_OBJECT(
                'id', u.id,
                'name', u.name,
                'lastname', u.lastname,
                'image', u.image
            ) AS client,
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
        INNER JOIN
            address AS a
        ON o.id_address = a.id
        WHERE
            status = $1
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

module.exports = Order;