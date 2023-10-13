const db = require('../config/config');

const Category = {};

Category.getAll = (category) => {
    const sql = `
        SELECT
            id,
            id_user,
            name,
            description
        FROM categories
        ORDER BY name
    `;
    return db.manyOrNone(sql);
}

Category.create = (category) => {
    const sql = `
        INSERT INTO
            categories(
                id_user,
                name,
                description,
                created_at,
                updated_at
            )
        VALUES (
            $1,
            $2,
            $3,
            $4,
            $5
        ) RETURNING id
    `;
    return db.oneOrNone(
        sql,
        [
            category.user_id,
            category.name,
            category.description,
            new Date(),
            new Date()
        ]
    );
}

module.exports = Category;