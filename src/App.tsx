import React, {useState} from 'react';
import {Route, Routes,} from "react-router-dom";
import {Offers} from "./components/offers/Offers";
import {Header} from "./components/layout/Header";
import {SearchContext} from './contexts/search.context';
import './App.css';
import {AddForm} from "./components/AddForm/AddForm";
import {SingleOffer} from "./components/offers/singleOffer";
import {Login} from "./components/Login/Login";
import {Register} from "./components/Register/Register";


export const App = () => {
    const [search, setSearch] = useState('')

    return (
        <SearchContext.Provider value={{search, setSearch}}>
            <Header/>
            <Routes>
                <Route path='/' element={<Offers/>}/>
                <Route path='/add' element={<AddForm/>}/>
                <Route path='/offer/:id' element={<SingleOffer/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
            </Routes>
        </SearchContext.Provider>
    );
}


