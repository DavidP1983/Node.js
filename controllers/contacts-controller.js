// Модель
const Contacts = require('../models/contacts');
//Путь к файлу
const createPath = require('../helpers/create-path');

const getContacts = (req, res) => {
    const title = 'Contacts'
    Contacts
        .find()
        .then((contacts) => res.render(createPath("contacts"), { contacts, title }))
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), { title: "Error" })
        })
}

module.exports = { getContacts };