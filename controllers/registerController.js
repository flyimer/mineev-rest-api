const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../dbConnection').promise();

exports.register = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const [existingUser] = await conn.execute(
            "SELECT `email` FROM `users` WHERE `email` = ?",
            [req.body.email]
        );

        if (existingUser.length > 0) {
            return res.status(409).json({ // <-- код 409: конфликт
                message: "The E-mail is already in use",
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        const [result] = await conn.execute(
            'INSERT INTO `users`(`name`, `email`, `password`) VALUES (?, ?, ?)',
            [
                req.body.name,
                req.body.email,
                hashedPassword
            ]
        );

        if (result.affectedRows === 1) {
            return res.status(201).json({
                message: "The user has been successfully inserted.",
            });
        }

    } catch (err) {
        next(err);
    }
};