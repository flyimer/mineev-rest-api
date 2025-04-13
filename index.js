const express = require('express');
const routes = require('./routes');
const app = express();

app.use(express.json());  // Для парсинга JSON в теле запроса
app.use(routes);  // Подключение всех маршрутов

// Обработка ошибок
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
        message: err.message,
    });
});

app.listen(3000, () => console.log('Server is running on port 3000'));