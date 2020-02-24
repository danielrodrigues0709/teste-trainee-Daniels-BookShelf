import React, { Component } from 'react';
import './Registers.css';
// import handlePublishers from './publishersMap'

import api from '../services/api';

class Update extends Component {

    // Inicia o construtor
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            description: '',
            isbn: '',
            publisher: '',
            authors: '',
            publishedDate: '',
            pageCount: '',
            amount: ''
        }
    }

    // Insere as editoras no dropdown
    async loadPublishers() {
        const publishers = await api.get('/publishers');
        let publishersList = [];

        for (let i = 0, max = publishers.data.length; i < max; i += 1) {
            publishersList.push(publishers.data[i].Publisher)


            let list = document.getElementById('pdList');
            let option = document.createElement('option');
            let textnode = document.createTextNode(publishers.data[i].Publisher)
            option.appendChild(textnode);
            list.appendChild(option);
        }

        console.log(publishersList)
    }

    //Insere os autores no dropdown
    async loadAuthors() {
        const authors = await api.get('/authors');
        let authorsList = [];

        for (let i = 0, max = authors.data.length; i < max; i += 1) {
            authorsList.push(authors.data[i].Name)

            let list = document.getElementById('adList');
            let option = document.createElement('option');
            let textnode2 = document.createTextNode(authors.data[i].Name)
            option.appendChild(textnode2);
            list.appendChild(option);
        }

        console.log(authorsList)
    }

    //Limpa o input de autores para que possa ser escolhido outro
    clearState = e => {
        e.target.value = ''
    }

    //Inicia as funções quando a página é carregada
    componentDidMount() {
        this.loadPublishers();
        this.loadAuthors();
    }

    //Recebe os valores digitados nos campos
    registerBook = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    //Envia os dados para o BD
    sendData = e => {
        e.preventDefault();

        api.put('/books/:id', function (req, res) {
            res.status(200).send({
                ID: req.params.id,
                Title: req.params.title,
                Description: req.params,
                ISBN: req.params.isbn,
                Publisher: req.params.publisher,
                Authors: req.params.authors,
                PublishedDate: req.params.publishedDate,
                PageCount: req.params.pageCount,
                Amount: req.params.amount
            });
        }, this.state)
            .then(response => {
                console.log(this.state)
                window.location.href = '/'
            })
            .catch(error => {
                console.log(error)
            })
    }

    //Volta à página inicial
    cancel() {
        window.location.href = '/'
    }

    //Renderiza a página
    render() {
        const {
            title,
            description,
            isbn,
            publisher,
            selectedAuthors,
            publishedDate,
            pageCount,
            amount
        } = this.state

        return (
            <div className="home" >
                <h1>Daniel's BookStore</h1>
                <div className="form-container">
                    <form id="form" onSubmit={this.sendData}>
                        <label>Título do livro: </label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={this.registerBook}
                            placeholder="Título do livro"
                        />
                        <br></br>
                        <br></br>
                        <label>Descrição: </label>
                        <input
                            type="text"
                            name="description"
                            value={description}
                            onChange={this.registerBook}
                            placeholder="Descrição"
                        />
                        <br></br>
                        <br></br>
                        <label>Editora: </label>
                        <input
                            className="smallInputs"
                            list="pdList"
                            name="publisher"
                            value={publisher}
                            onChange={this.registerBook}
                            placeholder="Clique para selecionar a editora"
                            formMethod="get"
                        />
                        <datalist id="pdList"></datalist>

                        <label className="label">Autores: </label>
                        <input
                            className="smallInputs"
                            list="adList"
                            name="selectAuthor"
                            value={selectedAuthors}
                            onChange={this.registerBook}
                            onClick={this.clearState}
                            placeholder="Clique para selecionar o autor"
                            formMethod="get"
                        />
                        <datalist id="adList"></datalist>

                        <br></br>
                        <br></br>
                        <label>ISBN: </label>
                        <input
                            className="smallInputs"
                            type="number"
                            name="isbn"
                            value={isbn}
                            onChange={this.registerBook}
                            placeholder="ISBN"
                        />
                        <label className="label">Data de publicação: </label>
                        <input
                            className="smallInputs"
                            type="text"
                            name="publishedDate"
                            value={publishedDate}
                            onChange={this.registerBook}
                            placeholder="Data de publicação"
                        />
                        <br></br>
                        <br></br>
                        <label>Nº de páginas: </label>
                        <input
                            className="smallInputs"
                            type="number"
                            name="pageCount"
                            value={pageCount}
                            onChange={this.registerBook}
                            placeholder="Nº de páginas"
                        />
                        <label className="label">Valor: </label>
                        <input
                            className="smallInputs"
                            type="float"
                            name="amount"
                            value={amount}
                            onChange={this.registerBook}
                            placeholder="Valor"
                        />
                    </form>
                    <div className="buttons-container">
                        <button type="submit" id="submit" form="form">Cadastrar</button>
                        <button type="button" id="cancel" onClick={this.cancel}>Cancelar</button>

                    </div>
                </div>
            </div>
        )
    }

}

export default Update;