const express = require('express');

const routes = express.Router();

const selectBook = function select(book) {
    const sqlQry = 'SELECT * FROM Books';

    book.query(sqlQry, function (err, results) {
        if (err)
            console.log(err);
        else
            routes.get('/books', (req, res) => {
                return res.json(req.body);
            });
        console.log("Funcionou");
    });
}

module.exports = selectBook;