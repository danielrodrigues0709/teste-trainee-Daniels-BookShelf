import React, { useEffect, useState } from 'react';
import './Home.css';

import api from '../services/api';

export default function Home({ match, history }) {

  //Inicia os estados
  const [books, setBooks] = useState([]);
  const [bookTitle, setBookTitle] = useState('')

  //Carrega os livros cadastrados no BD
  useEffect(() => {
    async function loadBooks() {
      const response = await api.get('/books');

      //Atualiza estado
      setBooks(response.data);
      console.log(response.data)
    }
    loadBooks();
  }, []);

  //Filtra livro pelo título digitado pelo usuário
  async function handleSearch(e) {
    e.preventDefault()
    console.log(e.target.value)
    await api.get(`/search/${bookTitle}`, {
      title: bookTitle,
      });

    history.push(`/search/${bookTitle}`)
    console.log("Recarregou página");
  }

  //Abre detalhes do livro
  async function handleOpen(e) {
    const response = await api.get('/books');

    history.push(`/books/${e}`)
    console.log(response.data, e)
    console.log("Abre detalhes de ", e)
  }

  //Exclui um registro de um livro
  async function handleDelete(ID) {
    const response = await api.delete(`/books/${ID}`, {
      headers: {
        ID: match.params.id
      }
    })

    //Atualiza estado
    setBooks(books.filter(book => book.ID !== ID));
    console.log(response.data);
    console.log("Deleta", ID)
  }

  //Abre tela de cadastro de livro
  function handleInsert() {
    history.push('/cadastro');
  }

  //Renderiza a página
  return (
    <div className="home">
      <h1>Daniel's BookStore</h1>
      <div className="menu-bar">
        <form onSubmit={handleSearch}>
          <input 
            value={bookTitle}
            onChange={e => setBookTitle(e.target.value)}
            placeholder="Digite aqui o nome do livro"
          />
        </form>
        <button type="button" id="insert" onClick={handleInsert}>Cadastrar Livro</button>
      </div>

      <div className="home-container">
        <ul>
          {books.map(book => (
            <li key={book.ID}>
              <footer>
                <strong>{book.Title}</strong>
                <p>{book.Description}</p>
                <p>ISBN: {book.ISBN}</p>
                <p>Editora: {book.Publisher}</p>
                <p>Valor: R$ {book.Amount}</p>
              </footer>
              <div className="buttons">
                <button type="button" id="describe" onClick={(e) => handleOpen(book.ID, e)}>Detalhes</button>
                <button type="button" id="delete" onClick={(e) => handleDelete(book.ID, e)}>Excluir</button>
              </div>
            </li>
          ))}

        </ul>

      </div>
    </div>


  );
}