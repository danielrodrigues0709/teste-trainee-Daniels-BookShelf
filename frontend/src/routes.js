import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './pages/Home';
import Book from './pages/Book';
import Register from './pages/Registers'
import Patch from './pages/Patch'
import Search from './pages/Search'

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path = "/" exact component={Home}/>
            <Route path = "/books/:id?" exact component={Book}/>
            <Route path = "/cadastro" exact component={Register}/>
            <Route path = "/atualiza/:id?" exact component={Patch}/>
            <Route path = "/search/:title?" exact component={Search}/>
        </BrowserRouter>
    );
}