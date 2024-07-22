const express = require('express');
const createPath = require('../helpers/create-path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// Импорт файла с Rout-ми
const postRoutes = require('../routes/post-route');
const contactsRoutes = require('../routes/contacts-route');
// Импорт Api
const postApiRoutes = require('../routes/api-post-route');

const chalk = require('chalk');
require('dotenv').config();

//Ошибки терминала
const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;


const app = express();

// Установка Шаблонизатора
app.set('view engine', 'ejs');

mongoose
    .connect(process.env.MONGO_URL)
    .then((res) => console.log(successMsg("Connect to DB")))
    .catch((error) => console.log(errorMsg(error)))


app.listen(process.env.PORT, (error) => {
    error ? console.log(errorMsg(error)) : console.log(successMsg(`listening port ${process.env.PORT}`));
});



// Middleware
app.use(morgan(':method :url :status :res[content-length] - :response-time ms')); //расширенная инфо в терминале
app.use(express.urlencoded({ extended: false })); //для парсинга входящего запроса
app.use(express.static("style")); // для получения браузером доступа в стилям
app.use(methodOverride('_method')); // для правильной отработки метода PUT


app.get('/', (req, res) => {
    const title = 'Home'
    res.render(createPath("index"), { title })
});

app.use(postRoutes);
app.use(contactsRoutes);
app.use(postApiRoutes);



app.get('/about-us', (req, res) => {

    res.redirect("/contacts")
});


app.use((req, res) => {
    const title = 'Error'

    res
        .status(404)
        .render(createPath('error'), { title });
});




