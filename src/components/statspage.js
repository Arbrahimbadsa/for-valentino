import React, { useState } from 'react';
import firebase from 'firebase';

const db = firebase.firestore();

const StatsPage = () => {

    const [branchesByPriceOrder, setBranchesByPriceOrder] = useState([]);
    const [branchesByRate, setBranchesByRate] = useState([]);
    const [branches, setBranches] = useState([]);
    const [price, setPrice] = useState(null);
    const [rate, setRate] = useState(null);

    const orderByPriceHandleClick = () => {
        db.collection('Restaurants').get().then(data => {
            data.docs.map(doc => {
                const restaurantId = doc.id; // restaurant id
                db.collection('Restaurants/' + restaurantId + '/Branch').get().then(branchData => {
                    branchData.docs.map(branchDoc => {
                        const branchData = branchDoc.data();
                        const branchPrice = branchData.price;
                        const branchRate = branchData.rate;

                        // filter the branches.
                        if (price && rate) {
                            // if both price and rate are used to filter
                            if (branchPrice <= price && branchRate <= rate && branchData) setBranches(bcs => [...bcs, branchData]); 
                        } else if (price && !rate) {
                            if (branchPrice <= price && branchData) setBranches(bcs => [...bcs, branchData]);
                        } else if (!price && rate) {
                            if (branchRate <= rate && branchData) setBranches(bcs => [...bcs, branchData]);
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


            <p>
                <input type='number' placeholder='Enter rate' style={{margin: '0 10px'}} onChange={e => setRate(e.target.value)} />
                <button onClick={orderByPriceHandleClick}>Filter</button>
            </p>
            <b>Branches Filtered By Rate</b>
            <div>
                {branchesByRate && branchesByRate.map((branch, i) => <p key={i}> {branch.rate} </p>)}
            </div>
        </div>
    );
}

export default StatsPage;