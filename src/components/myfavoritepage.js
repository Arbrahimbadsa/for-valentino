import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import getIdByEmail from '../firebase/getIdByEmail';
const db = firebase.firestore();

const MyFavoritesPage = () => {

    const [email, setEmail] = useState('example1@gmail.com');
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {

        handlClick();

    }, []);

    const handlClick = () => {
        // clear state
        setFavorites([]);
        getIdByEmail(email).then(id => {
            const clientDoc = db.doc('Clients/' + id);
            clientDoc.get().then(client => {
                
                const favoritesRef = client.data().Favourites;
                favoritesRef.forEach(ref => {
                    ref.get().then(favorite => {
                        const favoriteData = favorite.data(); // this is our favorite data
                        console.log(favoriteData); // test
                        if (favoriteData) setFavorites(fts => [...fts, favoriteData]); // if favorite exits add to state
                    });
                });

            });
        });
    }

    return (
        <div className="my-favorite-page">
            <h3>My Favorites</h3>
            <p>
                <input value='example1@gmail.com' onChange={e => setEmail(e.target.value)} style={{margin: '0 10px'}} type="text" placeholder="Enter client email." />
                <button onClick={handlClick}>Get</button>
            </p>
            <b>Favorites List</b>
            <div>
                {favorites && favorites.map((fav, i) => <p key={i}>HSeats:  {fav.HSeats} <br/> Address: { fav.Address } </p>)}
            </div>
        </div>
    );
}

export default MyFavoritesPage;