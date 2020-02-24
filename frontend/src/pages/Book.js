import React, { useEffect, useState } from 'react';
import './Book.css';
import api from '../services/api';

export default function Book({ history, match }) {

  //Inicia estados
  const [book, setBook] = useState([]);

  //Seleciona o livro no BD pelo ID
  useEffect(() => {
    async function loadBook(ID) {
      const response = await api.get(`/books/${ID}`, {
        headers: {
          ID: match.params.id //Recebe o parâmetro da URL
        }
      })

      //Atualiza estado
      setBook(response.data[0]);
      console.log(response.data[0]);
      console.log("Passou parametro");
    }
    loadBook(`${match.params.id}`);
  }, [match.params.id]);

  //Volta à página inicial
  async function handleBack() {
    history.push('/');
  }

  //Direciona para a página de atualização dos dados
  async function handlePatch(e) {
    const response = await api.get('/books');

    history.push(`/atualiza/${e}`)
    console.log(response.data, e)
    console.log("Abre tela para arteração de ", e)
  }

  //Renderiza a página
  return (
    <div className="home">
      <h1>Daniel's BookStore</h1>
      
      <ul className="container">
        <li className="book-container">
          <strong>{book.Title}</strong>
          <p id="description">{book.Description}</p>
          <p>ISBN: {book.ISBN}</p>
          <p>Editora: {book.Publisher}</p>
          <p>Autores: {book.Authors}</p>
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