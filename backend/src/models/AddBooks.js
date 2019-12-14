const addBooks = function addRow(book) {
    const sql = "INSERT INTO Books(Title, Description, ISBN, Publisher, PublishedDate, PageCount, Thumbnail, Amount) VALUES ?";
    const values = [
          ['Pense simples',
          'Você só precisa dar o primeiro passo para ter um negócio ágil e inovador',
          9788545201472,
          'Editora Gente Liv e Edit Ltd',
          2017-02-28,
          184,
          'http://books.google.com/books/content?id=AY00DgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
          20.9]
        ];

        book.query(sql, [values],function (err, results, fields) {
        if (err) return console.log(err);
        console.log('Registro inserido');
        book.end();
    });
};

module.exports = addBooks;