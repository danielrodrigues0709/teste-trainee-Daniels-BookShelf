const express = require('express');

const tableWrite = function createTable(write) {
    const sql = "CREATE TABLE IF NOT EXISTS Writer (\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "BookID int NOT NULL,\n" +
        "AuthorID int NOT NULL,\n" +
        "PRIMARY KEY (ID),\n" +
        "FOREIGN KEY (BookID) REFERENCES Books (ID),\n" +
        "FOREIGN KEY (AuthorID) REFERENCES Authors (ID)\n" +
        ");";

        write.query(sql, function (err, results, fields) {
        if (err) return console.log(err);
        console.log('Tabela de relacionamentos criada');
    });
};

module.exports = tableWrite;