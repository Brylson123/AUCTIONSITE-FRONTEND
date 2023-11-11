import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Container} from "@mui/material";
import {Btn} from "../common/Btn";


type OfferInterface = {
    id: string;
    name: string;
    description: string;
    price: number;
    user: string;
}
export const SingleOffer = () => {
    const [offer, setOffer] = useState<OfferInterface | null>(null)
    let {id} = useParams()


    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`http://localhost:3001/offers/offer/${id}`);
                const data = await res.json();
                setOffer(data);

                console.log(data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        })();
    }, []);


    if (offer === null) {
        return <p>Wczytywanie...</p>
    }


    return <>
        <Container maxWidth='lg' style={{
            display: 'flex',
            flexDirection: 'row',

        }} key={offer.id}>
            <Container maxWidth="lg" style={{
                marginTop: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh'
            }}>
                <img src={`http://localhost:3001/offers/photo/${id}`} alt={offer.name}
                     style={{maxWidth: '100%', maxHeight: '400px'}}/>
                <h1>{offer.name}</h1>
                <h2>Opis:</h2><p>{offer.description}</p>
                <hr/>

            </Container>
            <Container style={{
                marginTop: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh'
            }}>
                {!!offer.price && <p><b>{offer.price} zł</b></p>}
                <Link to={`/offer/buy/${id}`}><Btn text={'Kup teraz!'}/></Link>
            </Container>
        </Container>
    </>
}