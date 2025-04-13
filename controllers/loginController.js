const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const conn = require('../dbConnection').promise();

exports.login = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const [row] = await conn.execute(
            "SELECT * FROM `users` WHERE `email` = ?",
            [req.body.email]
        );

        if (row.length === 0) {
            return res.status(404).json({
                message: "Email not found",
            });
        }

        const passMatch = await bcrypt.compare(req.body.password, row[0].password);
        if (!passMatch) {
            return res.status(401).json({
                message: "Incorrect password",
            });
        }

        // Используй секрет из переменных окружения для безопасности
        const theToken = jwt.sign(
            { id: row[0].id },
            process.env.JWT_SECRET || 'the-superstrong-secret', // для тестирования можно оставить здесь
            { expiresIn: '1h' }
        );

        return res.json({
            token: theToken
        });
    } catch (err) {
        next(err);
    }
};