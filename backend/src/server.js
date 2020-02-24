const express = require('express');
const mysql = require('mysql');

const router = require('./routes')
const tableBooks = require('./models/BooksDataBase');
const tablePublishers = require('./models/PublishersDataBase');
const tableAuthors = require('./models/AuthorsDataBase');
//const tableWrite = require('./models/write');

const server = express();

server.use(express.json());
server.use('/', router);


// Criando conexão com o BD
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'teste-trainee-memory'
});

// Conectanndo
connection.connect((err) => {
    if (err) return console.log(err);
    console.log('BD conectado');
    tableBooks(connection);
    tablePublishers(connection);
    tableAuthors(connection);
    //tableWrite(connection);
});