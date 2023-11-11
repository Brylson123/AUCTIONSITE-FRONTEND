import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Container} from "@mui/material";


type OfferInterface = {
    name: string;
}

export const BuyOffer = () => {
    const [offer, setOffer] = useState<OfferInterface | null>(null)
    let {id} = useParams()


    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`http://localhost:3001/offers/buy/${id}`, {
                    method: 'Delete'
                });
                const data = await res.json();
                setOffer(data);


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

        }}>
            <h1>Oferta {offer.name}została zakupiona</h1>
            </Container>
    </>
}