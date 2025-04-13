const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.getUser = async (req, res, next) => {
    try {
        // Проверка на наличие токена в заголовках
        if (
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ) {
            return res.status(401).json({
                message: "Please provide the token",
            });
        }

        // Получаем сам токен из заголовков
        const theToken = req.headers.authorization.split(' ')[1];
        
        // Проверка токена
        const decoded = jwt.verify(theToken, 'the-superstrong-secret');  // Убедись, что секрет правильный

        // Получаем данные о пользователе по ID
        const [row] = await conn.execute(
            "SELECT `id`, `name`, `email` FROM `users` WHERE `id` = ?",
            [decoded.id]
        );

        if (row.length > 0) {
            return res.json({
                user: row[0]
            });
        }

        return res.status(404).json({
            message: "No user found"
        });
    } catch (err) {
        next(err);
    }
};