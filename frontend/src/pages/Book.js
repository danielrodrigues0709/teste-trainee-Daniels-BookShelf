import React, { useEffect, useState } from 'react';
import './Book.css';
import api from '../services/api';

export default function Book({ history, match }) {
  const [book, setBook] = useState([]);

  useEffect(() => {
    async function loadBook(ID) {
      const response = await api.get(`/books/${ID}`, {
        headers: {
          ID: match.params.id
        }
      })

      setBook(response.data[0]);
      console.log(response.data[0]);
      console.log("Passou parametro");
    }
    loadBook(`${match.params.id}`);
  }, [match.params.id]);

  async function handleBack() {
    history.push('/');
  }

  async function handlePatch(e) {
    const response = await api.get('/books');

    history.push(`/atualiza/${e}`)
    console.log(response.data, e)
    console.log("Abre tela para arteração de ", e)
  }

  return (
    <div className="home">
      <h1>Daniel's BookShelf</h1>
      
      <ul className="container">
        <li className="book-container">
          <div className="book-img">
            <img src={book.data} alt={book.Title} />
          </div>
          <strong>{book.Title}</strong>
          <p id="description">{book.Description}</p>
          <p>ISBN: {book.ISBN}</p>


          <datalist id="aut">
            <option value="Autor 1"></option>
            <option value="Autor 1"></option>
          </datalist>


          <p>Editora: {book.Publisher}</p>
          <p>Valor: R$ {book.Amount}</p>
          <p>Número de páginas: {book.PageCount}</p>
          <p>Data de publicação: {book.PublishedDate}</p>
        </li>
        <li className="buttons-container">
          <button type="button" id="patch" onClick={(e) => handlePatch(book.ID, e)}>Alterar</button>
          <button type="button" id="back" onClick={handleBack}>Voltar</button>
        </li>
      </ul>
    </div>
  )
}