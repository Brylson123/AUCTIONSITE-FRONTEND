import React, {SyntheticEvent, useEffect, useState} from 'react';
import {Btn} from "../common/Btn";

import './AddForm.css'

export const AddForm = () => {
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: 0,
        photo: ''
    });
    const [loading, setLoading] = useState(false)
    const [id, setId] = useState('')
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState(false)

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files && e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };
    const saveOffer = async (e: SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('description', form.description);
            formData.append('price', String(form.price));

            if (file) {
                formData.append('photo', file);
            }

            const res = await fetch(`http://localhost:3001/offers/add`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            const data = await res.json()

            if (data.message) {
                setMessage(true);
            }
            console.log(data.message)
            setId(data.id)


        } finally {
            setLoading(false);
        }
    };

    if (message) {
        return <h1>Musisz być zalogowany aby dodać oferte!</h1>
    }

    if (loading) {
        return <h2>Trwa dodawanie ogłoszenia...</h2>
    }

    if (id) {
        return <h2>Twoje ogłoszenie "{form.name}" zostało poprawnie dodane do serwisu pod id: {id}.</h2>
    }

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }))
    }

    return (
        <form className='add-form' action="" onSubmit={saveOffer}>
            <h1>Dodawanie oferty</h1>
            <p>
                <label>
                    Nazwa: <br/>
                    <input type="text"
                           name="name"
                           required
                           maxLength={99}
                           value={form.name}
                           onChange={e => updateForm('name', e.target.value)}
                    />
                </label>
            </p>
            <p>
                <label>
                    Opis: <br/>
                    <textarea name="description"
                              maxLength={999}
                              value={form.description}
                              onChange={e => updateForm('description', e.target.value)}
                    />
                </label>
            </p>
            <p>
                <label>
                    Cena: <br/>
                    <input type="number"
                           name="price"
                           required
                           value={form.price}
                           onChange={e => updateForm('price', Number(e.target.value))}
                    /> <br/>
                </label>
            </p>
            <p>
                <label>
                    Dodaj zdjecie <br/>
                    <input
                        name="file"
                        type="file"
                        required
                        onChange={onFileChange}
                    />
                </label>
            </p>
            <Btn text="Zapisz"/>
        </form>
    )
}