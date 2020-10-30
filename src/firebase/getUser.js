import firebase from 'firebase';
const db = firebase.firestore();

const getUser = (email) => {
    return new Promise((resolve, reject) => {
        db.collection('Clients').where('email', '==', email).get().then(data => {
            data.docs.map(user => {
                resolve(user.data());
            })
        })
    });
}

export default getUser;