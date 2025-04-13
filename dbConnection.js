const mysql = require("mysql2");

const db_connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "schema",
    password: "157414",
});

db_connection.connect((err) => {
    if (err) {
        console.error("Ошибка подключения к базе данных:", err);
    } else {
        console.log("Успешное подключение к базе данных");
    }
});

module.exports = db_connection;