const tableBooks = function createTable(books) {
    const sql = "CREATE TABLE IF NOT EXISTS Books (\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "Title varchar(50) NOT NULL,\n" +
        "Description varchar(2000) NOT NULL,\n" +
        "ISBN int NOT NULL,\n" +
        "Publisher varchar(50),\n" +
        //"PublisherID int,\n" +
        "Authors varchar(150),\n" +
        //"AuthorID int,\n" +
        "PublishedDate varchar(10) NOT NULL,\n" +
        "PageCount int NOT NULL,\n" +
        "Amount float NOT NULL,\n" +
        "PRIMARY KEY (ID) \n" +
        //"FOREIGN KEY (PublisherID) REFERENCES Publishers (ID) ON DELETE CASCADE ON UPDATE CASCADE \n" +
        //"FOREIGN KEY (AuthorID) REFERENCES Authors (ID) ON DELETE CASCADE ON UPDATE CASCADE \n" +
        ");";

        books.query(sql, (err, results, fields) => {
        if (err) return console.log(err);
        console.log('Tabela de livros criada');
    });
};

module.exports = tableBooks;