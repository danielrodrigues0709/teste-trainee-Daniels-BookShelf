import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

//Importa os componentes das páginas
import Home from './pages/Home';
import Book from './pages/Book';
import Register from './pages/Registers'
import Update from './pages/Update'
import Search from './pages/Search'

//Define rotas para os componentes
export default function Routes() {
    return (
        <BrowserRouter>
            <Route path = "/" exact component={Home}/>
            <Route path = "/books/:id?" exact component={Book}/>
            <Route path = "/cadastro" exact component={Register}/>
            <Route path = "/atualiza/:id?" exact component={Update}/>
            <Route path = "/search/:title?" exact component={Search}/>
        </BrowserRouter>
    );
}