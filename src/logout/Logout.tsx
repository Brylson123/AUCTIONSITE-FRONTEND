import React, {SyntheticEvent, useContext, useEffect, useState} from 'react';
import {Btn} from "../components/common/Btn";
import {AuthContext} from "../contexts/auth.context";




export const Logout = () => {
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const{auth, setAuth} = useContext(AuthContext)
    const logOut = async () => {

        setLoading(true);

        try {
            const res = await fetch(`http://localhost:3001/auth/logout`, {
                method: 'GET',
                credentials: 'include',
            });


            const data = await res.json()
            setMessage(data.message)
        } finally {
            setLoading(false);
            setAuth(false)
        }
    };

    useEffect(()=> {
        logOut();
    }, [])



    return (
        <>
            { <h1>Wylogowano!</h1>}
        </>
    )
}