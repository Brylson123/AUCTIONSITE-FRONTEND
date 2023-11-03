import {SearchContext} from "../../contexts/search.context";
import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';

import './Offers.css'
import {Grid} from "@mui/material";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    // flex: '0 0 22%',
    // margin: '1%',
}));

type OfferInterface = {
    id: string;
    name: string;
    description: string;
    price: number;
}

export const Offers = () => {
    const {search} = useContext(SearchContext);
    const [offers, setOffers] = useState<OfferInterface[]>([])

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3001/offers/${search}`)
            const data = await res.json()

            setOffers(data)
        })();
    }, [search]);

    return (
        <div className='offer-list'>
            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 2}} spacing={0.5} flexGrow={1}>
                {offers.length > 0 ? (
                    offers.map(offer =>

                        <Grid item xs={8} sm={5} xl={3}>
                            <Item className="single-item" key={offer.id} >
                                <Link to={`/offer/${offer.id}`}>

                                    <div className="offers-table">
                                        <img src={`http://localhost:3001/offers/photo/${offer.id}`} alt={offer.name}
                                             style={{maxWidth: '100%', maxHeight: '400px'}}/>
                                        <h1>{offer.name}</h1>
                                        <p>{offer.price}zł</p>
                                    </div>
                                </Link>
                            </Item>
                        </Grid>
                    )
                ) : (
                    <div className="noOffers">
                        <p>Brak Ofert</p>
                    </div>
                )}
            </Grid>
        </div>
    )
}
