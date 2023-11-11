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
import {Logout} from "./logout/Logout";
import {AuthContext} from "./contexts/auth.context";
import {UserContext} from "./contexts/user.context";
import {Dashboard} from "./components/dashboard/Dashboard";




export const App = () => {
    const [search, setSearch] = useState('')
    const [userName, setUserName] = useState('')
    const [auth, setAuth] = useState(false)

    return (
        <UserContext.Provider value={{userName, setUserName}}>
        <AuthContext.Provider value={{auth, setAuth}}>
        <SearchContext.Provider value={{search, setSearch}}>
            <Header/>
            <Routes>
                <Route path='/' element={<Offers/>}/>
                <Route path='/add' element={<AddForm/>}/>
                <Route path='/offer/:id' element={<SingleOffer/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/logout' element={<Logout/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
            </Routes>
        </SearchContext.Provider>
        </AuthContext.Provider>
        </UserContext.Provider>
    );
}


