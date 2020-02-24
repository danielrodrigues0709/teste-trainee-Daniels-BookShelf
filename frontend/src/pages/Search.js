import React, { useEffect, useState } from 'react';
import './Book.css';
import api from '../services/api';

export default function Search({ history, match }) {

  //Inicia estados
  const [book, setBook] = useState([]);

  //Seleciona o livro no BD pelo Título
  useEffect(() => {
    async function loadBook(Title) {
      const response = await api.get(`/search/${Title}`, {
        Title: match.params.title, //Recebe o parâmetro da URL
      });

      //Atualiza estado
      setBook(response.data[0]);
      console.log(response.data[0]);
      console.log("Passou parametro");
    }
    loadBook(`${match.params.title}`);
  }, [match.params.title]);

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
      <h1>Daniel's BookShelf</h1>
      
      <ul className="container">
        <li className="book-container">
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