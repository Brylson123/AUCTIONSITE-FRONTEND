import React, {SyntheticEvent, useState} from 'react';
import {Btn} from "../common/Btn";

export const Register = () => {
    const [user, setUser] = useState({
        email: '',
        pwd: ''
    });
    const [id, setId] = useState('')
    const [loading, setLoading] = useState(false)
    const saveUser = async (e: SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await fetch(`http://localhost:3001/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...user,
                }),
            });

            const data = await res.json()

            setId(data.id);

        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h2>Trwa dodawanie uzytkownika...</h2>
    }

    if (id) {
        return <h2>Uzytkownik"{user.email}" został poprawnie dodane do serwisu pod id: {id}.</h2>
    }
    const updateUser = (key: string, value: any) => {
        setUser(form => ({
            ...form,
            [key]: value,
        }))
    }
    return (
        <form className='add-form' action="" onSubmit={saveUser}>
            <h1>Dodawanie uzytkownika</h1>
            <p>
                <label>
                    Email: <br/>
                    <input type="text"
                           name="email"
                           required
                           maxLength={99}
                           value={user.email}
                           onChange={e => updateUser('email', e.target.value)}
                    />
                </label>
            </p>
            <p>
                <label>
                    Haslo: <br/>
                    <input
                        type="password"
                        name="pwd"
                        maxLength={999}
                        value={user.pwd}
                        onChange={e => updateUser('pwd', e.target.value)}
                    />
                </label>
            </p>

            <Btn text="Zapisz"/>
        </form>
    )
}