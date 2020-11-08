import firebase from 'firebase';

const db = firebase.firestore();

export const detectRealtimeData = (collectionName, do_stuffs) => {
    db.collection(collectionName).onSnapshot(snapshot => {
        do_stuffs(snapshot);
    });
}