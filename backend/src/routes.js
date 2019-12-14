const express = require('express');
const server = express();         
const bodyParser = require('body-parser');
const port = process.env.PORT || 3333;
const mysql = require('mysql');

//Configurando o body parser para pegar POSTS mais tarde
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//Definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Rota 3000 funcionando!' }));
server.use('/', router);

// const routerBooks = express.Router();
// router.get('/books', (req, res) => {
//     res.json({ message: 'Rota books funcionando!' });    
// });
// server.use('/', routerBooks);

//Inicia o servidor
server.listen(port);
console.log('API funcionando!');

// Criando a listagem de clientes
function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'teste-trainee-memory'
      });
  
    connection.query(sqlQry, function(error, results){
        if(error) 
          res.json(error);
        else
          res.json(results);
        connection.end();
        console.log('Requisição enviada');
    });
  }

// Listando livros
router.get('/books', (req, res) =>{
  execSQLQuery('SELECT DISTINCT b.*, p.Publisher FROM Books b \n' +
   'LEFT JOIN Writer w ON b.ID = w.BookID \n' +
   'LEFT JOIN Publishers p ON b.PublisherID = p.ID;', res);
})

// // Listando livros
// router.get('/books', (req, res) =>{
//   execSQLQuery('SELECT DISTINCT b.* FROM Books b;', res);
// })

// //Criando a pesquisa de um livro pelo id
// router.get('/books/:id?', (req, res) =>{
//     let filter = '';
//     if(req.params.id) filter = ' WHERE b.ID=' + parseInt(req.params.id);
//     execSQLQuery('SELECT b.*, p.Publisher FROM Books b \n' +
//     'LEFT JOIN Publishers p ON b.PublisherID = p.ID' + filter, res); //'LEFT JOIN Authors a ON a.ID = w.AuthorID'
// })

//Criando a pesquisa de um livro pelo id
router.get('/books/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE b.ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT b.* FROM Books b' + filter, res); //'LEFT JOIN Authors a ON a.ID = w.AuthorID'
})

// //Criando a pesquisa de um livro pelo titulo
// router.get('/search/:title?', (req, res) =>{
//     let filter = '';
//     if(req.params.title) filter = ' WHERE b.Title= "' + (req.params.title) + '"';
//     execSQLQuery('SELECT b.*, p.Publisher FROM Books b \n' +
//     'LEFT JOIN Publishers p ON b.PublisherID = p.ID' + filter, res); //'LEFT JOIN Authors a ON a.ID = w.AuthorID'
// })

//Criando a pesquisa de um livro pelo titulo
router.get('/search/:title?', (req, res) =>{
  let filter = '';
  if(req.params.title) filter = ' WHERE b.Title= "' + (req.params.title) + '"';
  execSQLQuery('SELECT b.* FROM Books b \n' + filter, res); //'LEFT JOIN Authors a ON a.ID = w.AuthorID'
})

// //Criando a pesquisa de um autor
// router.get('/authors/:id?', (req, res) =>{
//     let filter = '';
//     if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
//     execSQLQuery('SELECT * FROM Authors' + filter, res);
// })

//Criando a pesquisa de uma editora
router.get('/publishers/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM Publishers' + filter, res);
})

// Excluindo um livro
router.delete('/books/:id', (req, res) =>{
    execSQLQuery('DELETE FROM Books WHERE ID=' + parseInt(req.params.id), res);
})

// // Excluindo um autor
// router.delete('/authors/:id', (req, res) =>{
//     execSQLQuery('DELETE FROM Authors WHERE ID=' + parseInt(req.params.id), res);
// })

// Excluindo uma editora
router.delete('/publishers/:id', (req, res) =>{
    execSQLQuery('DELETE FROM Publishers WHERE ID=' + parseInt(req.params.id), res);
})

// // Excluindo uma relacionamento entre tabelas pelo id do relacionamento
// router.delete('/writer/:id', (req, res) =>{
//     execSQLQuery('DELETE FROM Writer WHERE ID=' + parseInt(req.params.id), res);
// })

// // Excluindo uma relacionamento entre tabelas pelo id do livro
// router.delete('/books/:id', (req, res) =>{
//     execSQLQuery('DELETE FROM Writer WHERE BookID=' + parseInt(req.params.id), res);
// // })

// //Adicionando um livro
// router.post('/books', (req, res) =>{
//     const title = req.body.Title;
//     const description = req.body.Description;
//     const isbn = req.body.ISBN;
//     const publisher = req.body.PublisherID;
//     const publishedDate = req.body.PublishedDate;
//     const pageCount = req.body.PageCount;
//     const amount = req.body.Amount;
//     execSQLQuery(`INSERT INTO Books(Title, Description, ISBN, PublisherID, PublishedDate, PageCount, Amount)
//         VALUES('${title}', '${description}', '${isbn}', '${publisher}', '${publishedDate}', '${pageCount}', '${amount}')`, res);
// });

//Adicionando um livro
router.post('/books', (req, res) =>{
    execSQLQuery(`INSERT INTO Books(Title, Description, ISBN, PublisherID, PublishedDate, PageCount, Amount)
        VALUES('${req.body.title}', '${req.body.description}', '${req.body.isbn}', '${req.body.publisherID}', '${req.body.publishedDate}', '${req.body.pageCount}', '${req.body.amount}')`, res);
});

// //Adicionando um autor
// router.post('/authors', (req, res) =>{
//     const name = req.body.Name;
//     execSQLQuery(`INSERT INTO Authors(Name)
//         VALUES('${name}')`, res);
// });

// //Adicionando uma editora
// router.post('/publishers', (req, res) =>{
//     const publisher = req.body.Publisher;
//     execSQLQuery(`INSERT INTO Publishers(Publisher)
//         VALUES('${publisher}')`, res);
// });

// //Adicionando um relacionamento entre tabelas
// router.post('/writer', (req, res) =>{
//     const bookId = parseInt(req.body.BookID);
//     const authorId = parseInt(req.body.AuthorID);
//     execSQLQuery(`INSERT INTO Writer(BookID, AuthorID)
//         VALUES('${bookId}', '${authorId}')`, res);
// });

// // Atualizando um livro
// router.patch('/books/:id', (req, res) =>{
//     const title = req.body.Title;
//     const description = req.body.Description;
//     const isbn = req.body.ISBN;
//     const publisher = req.body.PublisherID;
//     const publishedDate = req.body.PublishedDate;
//     const pageCount = req.body.PageCount;
//     const amount = req.body.Amount;
//     execSQLQuery(`UPDATE Books SET Title='${title}', Description='${description}' , ISBN='${isbn}', PublisherID='${publisher}', PublishedDate='${publishedDate}', PageCount='${pageCount}', Amount='${amount}' WHERE ID=` + parseInt(req.params.id), res);
// })

// Atualizando um livro
router.patch('/books/:id', (req, res) =>{
    const title = req.body.Title;
    const description = req.body.Description;
    const isbn = req.body.ISBN;
    const publisherID = req.body.PublisherID;
    const publishedDate = req.body.PublishedDate;
    const pageCount = req.body.PageCount;
    const amount = req.body.Amount;
    execSQLQuery(`UPDATE Books SET Title='${req.body.title}', Description='${req.body.description}' , ISBN='${req.body.isbn}', PublisherID='${req.body.publisherID}', PublishedDate='${req.body.publishedDate}', PageCount='${req.body.pageCount}', Amount='${req.body.amount}' WHERE ID=` + parseInt(req.params.id), res);
})

// // Atualizando um autor
// router.patch('/authors/:id', (req, res) =>{
//     const name = req.body.Name;
//     execSQLQuery(`UPDATE Authors SET Name='${name}' WHERE ID=` + parseInt(req.params.id), res);
// })

// // Atualizando uma editora
// router.patch('/publishers/:id', (req, res) =>{
//     const publisher = req.body.Publisher;
//     execSQLQuery(`UPDATE Publishers SET Publisher='${publisher}' WHERE ID=` + parseInt(req.params.id), res);
// })

module.exports = router;