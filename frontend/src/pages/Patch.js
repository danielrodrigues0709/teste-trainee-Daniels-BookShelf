import React, { useEffect, useState } from 'react';
import './Registers.css';

import api from '../services/api';

export default function Patch({ history, match }) {
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

    // useEffect(() => {
    //      api.patch(`/atualiza/${ID}`, function (req, res) {
    //             res.send("Title: " + req.body.title +
    //                 "Description: " + req.body.description +
    //                 "ISBN: " + req.body.isbn +
    //                 "Publisher: " + req.body.publisher +
    //                 "PublishedDate: " + req.body.publishedDate +
    //                 "PageCount: " + req.body.pageCount +
    //                 "Thumbnail: " + req.body[0].files[0] +
    //                 "Amount: " + req.body.amount
    //             )
        
    //             console.log('Registro atualizado');
    //             history.push('/')
    //         })
    //       })

    function cancel() {
        history.push('/');
    }

    return (
        <div className="home">
            <h1>Daniel's BookShelf</h1>
            <form method="PATCH" action="/books">
                <label>Título do livro: </label>
                <input
                    type="text"
                    name="title"
                    placeholder="Título do livro"
                />
                <br></br>
                <br></br>
                <label>Descrição: </label>
                <input
                    type="text"
                    name="description"
                    placeholder="Descrição"
                />
                <br></br>
                <br></br>
                <label>ISBN: </label>
                <input
                    type="number"
                    name="isbn"
                    placeholder="ISBN"
                />
                <br></br>
                <br></br>
                <label>Editora: </label>
                <input
                    type="text"
                    name="publisher"
                    placeholder="Editora"
                />
                <br></br>
                <br></br>
                <label>Data de publicação: </label>
                <input
                    type="text"
                    name="publishedDate"
                    placeholder="Data de publicação"
                />
                <br></br>
                <br></br>
                <label>Nº de páginas: </label>
                <input
                    type="number"
                    name="pageCount"
                    placeholder="Nº de páginas"
                />
                <br></br>
                <br></br>
                <label>Imagem de capa: </label>
                <input
                    type="file"
                    id = "upload"
                    name="thumbnail"
                />
                <br></br>
                <br></br>
                <img id="img"/>
                <br></br>
                <br></br>
                <label>Valor: </label>
                <input
                    type="float"
                    name="amount"
                    placeholder="Valor"
                />
                <br></br>
                <br></br>
                <input
                    className="submit"
                    type="submit" action="/"
                />
            </form>
            <br></br>
            <br></br>
            <button type="button" id="back" onClick={cancel}>Cancelar</button>
        </div>
    )
}