import React, { useEffect, useState } from 'react';
import firebase from 'firebase';

const db = firebase.firestore();


const RealtimeData = () => {

    const [favourites, setFavourites] = useState([]); 

    useEffect(() => {
        query();
    }, []);

    const query = () => {
        const id = 1;
        const documentRef = db.doc('Clients/' + id);
        documentRef.onSnapshot({includeMetadataChanges: true}, (updatedDoc) => {
            setFavourites(updatedDoc.data().Favourites); // sets the favourites (strings from /Clients/{doc}/Favourites)
        });
    }

    return (
        <div>
            <b>Realtime update</b>
            <div>
                {favourites && favourites.map(link => <p> {link} </p>)}
            </div>
        </div>
    );
}

export default RealtimeData;