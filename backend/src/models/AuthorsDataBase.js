const express = require('express');

const tableAuthors = function createTable(authors) {
    const sql = "CREATE TABLE IF NOT EXISTS Authors (\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "Name varchar(50) NOT NULL,\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

        authors.query(sql, function (err, results, fields) {
        if (err) return console.log(err);
        console.log('Tabela de autores criada');
    });
};

module.exports = tableAuthors;