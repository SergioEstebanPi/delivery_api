const db = require('../config/config')

const Order = {};

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