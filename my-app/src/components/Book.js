import React, { useEffect, useState } from "react";
import {useLocation, Link} from 'react-router-dom';

const Book = () => {
    const { state } = useLocation();
    const [booked, setBooked] = useState([]);
    var tab = []
    for(var p = 0; p < state.length; p++){
        for(var q = 0; q < state[0].length; q++){
            if(state[p][q].added === true) {
                tab.push(state[p][q]);
            }
        }
    }
    useEffect(() => {
        setBooked(tab)
        console.log(booked)
    });

     return (
        <div className="book">
            <h2>Rezerwacja przebiegła pomyślnie!</h2>
            <ul> 
                <li>Wybrano miejsca: </li>
                {booked.map((item) =>
                    <li key={item.id}>{"Rząd " + item.cords.x + ", Miejsce " + item.cords.y + ", ID Miejsca: " + item.id}</li>
                )}
            </ul>
            <h3>Dziękujemy! W razie problemów prosimy o kontakt z działem administracji</h3>
        </div>
        
    );
}

export default Book