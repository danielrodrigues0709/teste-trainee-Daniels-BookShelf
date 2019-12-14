import React, { useEffect, Component} from 'react';
import './Registers.css';
import axios from 'axios'

import api from '../services/api';

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            description: '',            
            isbn: '',            
            publisher: '',            
            publishedDate: '',            
            pageCount: '',            
            amount: ''
        }
    }

    registerBook = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    sendData = e => {
        e.preventDefault();

        api.post('/books', this.state)
        .then(respose => {
            console.log("Livro cadastrado")
            window.location.href='/'
        })
        .catch(error => {
            console.log(error)
        })
    }

    cancel() {
        window.location.href='/'
    }

    render() {
        const {
            title,
        description,        
        isbn,        
        publisher,        
        publishedDate,        
        pageCount,        
        amount
    } = this.state

        return (
            <div className="home">
                <h1>Daniel's BookShelf</h1>
                <form id="form" onSubmit={this.sendData}>
                    <label>Título do livro: </label>
                    <input
                        type="text"
                        name="title"
                        value ={title}
                        onChange={this.registerBook}
                        placeholder="Título do livro"
                    />
                    <br></br>
                    <br></br>
                    <label>Descrição: </label>
                    <input
                        type="text"
                        name="description"
                        value ={description}
                        onChange={this.registerBook}
                        placeholder="Descrição"
                    />
                    <br></br>
                    <br></br>
                    <label>ISBN: </label>
                    <input
                        type="number"
                        name="isbn"
                        value ={isbn}
                        onChange={this.registerBook}
                        placeholder="ISBN"
                    />
                    <br></br>
                    <br></br>
                    <label>Editora: </label>
                    <input
                        type="text"
                        name="publisher"
                        value ={publisher}
                        onChange={this.registerBook}
                        placeholder="Editora"
                    />
                    <br></br>
                    <br></br>
                    <label>Data de publicação: </label>
                    <input
                        type="text"
                        name="publishedDate"
                        value ={publishedDate}
                        onChange={this.registerBook}
                        placeholder="Data de publicação"
                    />
                    <br></br>
                    <br></br>
                    <label>Nº de páginas: </label>
                    <input
                        type="number"
                        name="pageCount"
                        value ={pageCount}
                        onChange={this.registerBook}
                        placeholder="Nº de páginas"
                    />
                    <br></br>
                    <br></br>
                    <label>Valor: </label>
                    <input
                        type="float"
                        name="amount"
                        value ={amount}
                        onChange={this.registerBook}
                        placeholder="Valor"
                    />
                </form>
                <br></br>
                <br></br>                
                <button type="submit" id="submit" form="form">Cadastrar</button>
                <button type="button" id="back" onClick={this.cancel}>Cancelar</button>
            </div>
        )
    }
    
}

export default Register;