const db = require('../config/config')
const crypto = require('crypto')

const User = {}

User.getAll = () => {
    const sql = `
        SELECT
            id,
            email,
            name,
            lastname,
            image,
            phone,
            password,
            session_token,
            notification_token
        FROM users;
    `;

    return db.manyOrNone(sql);
}

User.getAdminsNotificationTokens = () => {
    const sql = `
        SELECT
            u.notification_token
        FROM users u
        INNER JOIN user_has_roles AS uhr
        ON uhr.id_user = u.id
        INNER JOIN roles AS r
        ON r.id = uhr.id_rol
        WHERE r.id = 2
        ;
    `;

    return db.manyOrNone(sql);
}

User.findDeliveryMen = () => {
    const sql = `
        SELECT
            u.id,
            u.email,
            u.name,
            u.lastname,
            u.image,
            u.phone,
            u.password,
            u.session_token,
            u.notification_token
        FROM users u
        JOIN user_has_roles uhr
            ON uhr.id_user = u.id
        JOIN roles r
            ON r.id = uhr.id_rol
        WHERE 
            r.id = 3
        ;
    `;

    return db.manyOrNone(sql);
}

User.findByEmail = (email) => {
    const sql = `
        SELECT
            u.id,
            u.email,
            u.name,
            u.lastname,
            u.image,
            u.phone,
            u.password,
            u.session_token,
            u.notification_token,
            json_agg(
                json_build_object(
                    'id', r.id,
                    'name', r.name,
                    'image', r.image,
                    'route', r.route
                )
            ) roles
        FROM users u
        JOIN user_has_roles uhr
            ON uhr.id_user = u.id
        JOIN roles r
            ON r.id = uhr.id_rol
        WHERE u.email = $1
        GROUP BY u.id
        ;
    `;

    return db.oneOrNone(sql, [email]);
}

User.findByUserId = (id) => {
    const sql = `
        SELECT
            u.id,
            u.email,
            u.name,
            u.lastname,
            u.image,
            u.phone,
            u.password,
            u.session_token,
            u.notification_token,
            json_agg(
                json_build_object(
                    'id', r.id,
                    'name', r.name,
                    'image', r.image,
                    'route', r.route
                )
            ) roles
        FROM users u
        JOIN user_has_roles uhr
            ON uhr.id_user = u.id
        JOIN roles r
            ON r.id = uhr.id_rol
        WHERE u.id = $1
        GROUP BY u.id
        ;
    `;

    return db.oneOrNone(sql, [id]);
}

User.findById = (id, callback) => {
    const sql = `
        SELECT
            id,
            email,
            name,
            lastname,
            image,
            phone,
            password,
            session_token,
            notification_token
        FROM users
        WHERE id = $1;
    `;

    return db.oneOrNone(sql, [id]).then(user => {
        callback(null, user);
    });
}

User.create = (user) => {

    const myPasswordHashed = crypto.createHash('md5').update(user.password).digest('hex');

    const sql = `
        INSERT INTO users (
            email,
            name,
            lastname,
            phone,
            image,
            password,
            created_at,
            updated_at
        ) VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8
        ) RETURNING id;
    `
    return db.oneOrNone(sql, 
        [
            user.email,
            user.name,
            user.lastname,
            user.phone,
            user.image,
            myPasswordHashed,
            new Date(),
            new Date()
        ]
    );
}

User.updateToken = (id, token) => {
    const sql = `
        UPDATE
            users
        SET
            session_token = $2,
            updated_at = $3
        WHERE
            id = $1
    `
    return db.none(sql, [
        id,
        token,
        new Date()
    ]);
}

User.updateNotificationToken = (id, token) => {
    const sql = `
        UPDATE
            users
        SET
            notification_token = $2,
            updated_at = $3
        WHERE
            id = $1
    `
    return db.none(sql, [
        id,
        token,
        new Date()
    ]);
}

User.update = (user) => {
    const sql = `
        UPDATE
            users
        SET
            name = $2,
            lastname = $3,
            phone = $4,
            image = $5,
            updated_at = $6
        WHERE
            id = $1
    `
    return db.none(sql, [
        user.id,
        user.name,
        user.lastname,
        user.phone,
        user.image,
        new Date()
    ]);
}

User.isPasswordMatched = (userPassword, hash) => {
    const myPasswordHashed = crypto.createHash('md5').update(userPassword).digest('hex');
    if(myPasswordHashed === hash){
        return true;
    }
    return false;
}

module.exports = User;