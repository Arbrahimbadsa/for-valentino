import React, { useState } from 'react';
import firebase from 'firebase';

const db = firebase.firestore();

const StatsPage = () => {

    const [branchesByPriceOrder, setBranchesByPriceOrder] = useState([]);
    const [price, setPrice] = useState(null);

    const orderByPriceHandleClick = () => {
        db.collection('Restaurants').get().then(data => {
            data.docs.map(doc => {
                const restaurantId = doc.id; // restaurant id
                db.collection('Restaurants/' + restaurantId + '/Branch').get().then(branchData => {
                    branchData.docs.map(branchDoc => {
                        const branchData = branchDoc.data();
                        const branchPrice = branchData.price;
                        // filter the branches.
                        // if the branch price is less than our inputed price then we are getting the right branches
                        if (branchPrice <= price) {
                            if (branchData) setBranchesByPriceOrder(vls => [...vls, branchData]);
                        }
                    });
                });
            });
        });
    } 

    return (
        <div className='stats-page'>
            <h3>Stats Page</h3>
            <p>
                <input type='number' placeholder='Enter price' style={{margin: '0 10px'}} onChange={e => setPrice(e.target.value)} />
                <button onClick={orderByPriceHandleClick}>Filter</button>
            </p>
            <b>Branches Filtered By Price</b>
            <div>
                {branchesByPriceOrder && branchesByPriceOrder.map((branch, i) => <p key={i}> {branch.price} </p>)}
            </div>
        </div>
    );
}

export default StatsPage;