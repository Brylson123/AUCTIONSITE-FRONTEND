import React, {SyntheticEvent, useState} from 'react';
import {Btn} from "../common/Btn";



export const Login = () => {
    const [user, setUser] = useState({
        email: '',
        pwd: ''
    });
    // const [cookies, removeCookies] = useCookies([])
    const [login, setLogin] = useState()
    const [loading, setLoading] = useState(false)
    const saveUser = async (e: SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await fetch(`http://localhost:3001/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Credentials": 'true',
                    'Access-Control-Allow-Origin': "http://localhost:3001",
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                },
                body: JSON.stringify({
                    ...user,
                }),

                // credentials: 'include'
            });


            const data = await res.json()
            // const cookie = data.headers.get('Set-Cookie')
            // Cookies.set("jwt", cookie)
            if (data.ok) {
                setLogin(data.ok);
            }
            if (data.message === 'login invalid') {
                setLogin(data.message);
            }


            // const jwtToken = Cookies.get('jwt')
            // if(jwtToken) {
            //     Cookies.set('jwt', jwtToken)
            // }
        } finally {
            setLoading(false);

        }
    };

    if (loading) {
        return <h2>Trwa dodawanie ogłoszenia...</h2>
    }
    if (login === true) {
        return <h2>Zalogowałeś się</h2>
    }

    if (login === 'login invalid') {
        return <h2>{login}</h2>
    }

    const updateUser = (key: string, value: any) => {
        setUser(form => ({
            ...form,
            [key]: value,
        }))
    }

    return (
        <form className='add-form' action="" onSubmit={saveUser}>
            <h1>Zaloguj się</h1>
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
                    Hasło <br/>
                    <input type="password"
                           name="pwd"
                           maxLength={999}
                           value={user.pwd}
                           onChange={e => updateUser('pwd', e.target.value)}
                    />
                </label>
            </p>

            <Btn text="Zaloguj"/>
        </form>
    )
}