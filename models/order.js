const db = require('../config/config')

const Order = {};

/*
Order.findByStatus = (status) => {
    const sql = `
    SELECT
        o.id,
        o.id_user,
        o.id_client,
        o.id_delivery,
        o.id_address,
        o.id_store,
        o.status,
        o.timestamp,
        o.lat,
        o.lng,
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
            'phone', u.phone,
            'image', u.image
        ) AS client,
        JSON_BUILD_OBJECT(
            'id', d.id,
            'name', d.name,
            'lastname', d.lastname,
            'phone', d.phone,
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
    ON o.id_delivery = d.id
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
*/

Order.findByDeliveryIdAndStatus = (id_delivery, status) => {
    const sql = `
    SELECT
        o.id,
        o.id_user,
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
            'phone', u.phone,
            'image', u.image
        ) AS client,
        JSON_BUILD_OBJECT(
            'id', r.id,
            'name', r.name,
            'lastname', r.lastname,
            'phone', r.phone,
            'image', r.image
        ) AS restaurant,
        JSON_BUILD_OBJECT(
            'id', d.id,
            'name', d.name,
            'lastname', d.lastname,
            'phone', d.phone,
            'image', d.image
        ) AS delivery,
        JSON_BUILD_OBJECT(
            'id', a.id,
            'address', a.address,
            'neighborhood', a.neighborhood,
            'lat', a.lat,
            'lng', a.lng
        ) AS address,
        JSON_BUILD_OBJECT(
            'id', s.id,
            'address', s.address,
            'neighborhood', s.neighborhood,
            'lat', s.lat,
            'lng', s.lng
        ) AS store
    FROM
        orders AS o
    INNER JOIN 
        users AS u
    ON o.id_client = u.id
    INNER JOIN
        users AS r
    ON o.id_user = r.id
    LEFT JOIN 
        users AS d
    ON o.id_delivery = d.id
    INNER JOIN
        address AS a
    ON o.id_store = a.id
    INNER JOIN
        address AS s
    ON o.id_store = s.id
    INNER JOIN
        order_has_products as ohp
    ON o.id = ohp.id_order
    INNER JOIN
        products AS p
    ON ohp.id_product = p.id
    WHERE
        o.id_delivery = $1
        AND o.status = $2
    GROUP BY
        o.id,
        u.id,
        d.id,
        r.id,
        a.id,
        s.id
    `;

    return db.manyOrNone(sql, [id_delivery, status]);
}


Order.findByClientIdAndStatus = (id_client, status) => {
    const sql = `
    SELECT
        o.id,
        o.id_user,
        o.id_client,
        o.id_delivery,
        o.id_address,
        o.id_store,
        o.status,
        o.timestamp,
        o.lat,
        o.lng,
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
            'phone', u.phone,
            'image', u.image
        ) AS client,
        JSON_BUILD_OBJECT(
            'id', d.id,
            'name', d.name,
            'lastname', d.lastname,
            'phone', d.phone,
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
    ON o.id_delivery = d.id
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
        o.id_client = $1
        AND o.status = $2
    GROUP BY
        o.id,
        u.id,
        a.id,
        d.id
    `;

    return db.manyOrNone(sql, [id_client, status]);
}


Order.findByUserIdAndStatus = (user_id, status) => {
    const sql = `
    SELECT
        o.id,
        o.id_user,
        o.id_client,
        o.id_delivery,
        o.id_address,
        o.id_store,
        o.status,
        o.timestamp,
        o.lat,
        o.lng,
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
            'phone', u.phone,
            'image', u.image
        ) AS client,
        JSON_BUILD_OBJECT(
            'id', d.id,
            'name', d.name,
            'lastname', d.lastname,
            'phone', d.phone,
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
    ON o.id_delivery = d.id
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
        o.id_user = $1
        AND o.status = $2
    GROUP BY
        o.id,
        u.id,
        a.id,
        d.id
    `;

    return db.manyOrNone(sql, [user_id, status]);
}

Order.create = (order) => {
    const sql = `
        INSERT INTO
            orders(
                id_user,
                id_client,
                id_address,
                id_store,
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
            $6,
            $7,
            $8
        ) RETURNING id
    `;
    return db.oneOrNone(sql, [
        order.id_user,
        order.id_client,
        order.id_address,
        order.id_store,
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
            id_user = $2,
            id_client = $3,
            id_address = $4,
            id_store = $5,
            id_delivery = $6,
            status = $7,
            updated_at = $8
        WHERE
            id = $1
    `;
    return db.none(sql, [
        order.id,
        order.id_user,
        order.id_client,
        order.id_address,
        order.id_store,
        order.id_delivery,
        order.status,
        new Date()
    ]);
}

Order.updateLatLng = (order) => {
    const sql = `
        UPDATE orders
        SET  
            lat = $2,
            lng = $3
        WHERE
            id = $1
    `;
    return db.none(sql, [
        order.id,
        order.lat,
        order.lng
    ]);
}

module.exports = Order;