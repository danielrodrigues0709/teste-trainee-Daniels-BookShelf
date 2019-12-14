const express = require('express');

const tablePublishers = function createTable(publishers) {
    const sql = "CREATE TABLE IF NOT EXISTS Publishers (\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "Publisher varchar(150) NOT NULL,\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

        publishers.query(sql, function (err, results, fields) {
        if (err) return console.log(err);
        console.log('Tabela de editoras criada');
    });
};

module.exports = tablePublishers;