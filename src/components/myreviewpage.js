import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import getIdByEmail from '../firebase/getIdByEmail';

const db = firebase.firestore();


const MyReviewPage = () => {

    const [email, setEmail] = useState('example1@gmail.com');
    const [reviews, setReviews] = useState([]);


    useEffect(() => {
        handlClick();
    }, []);


    const handlClick = () => {
        
        // clear state every time the 'get' button is clicked
        setReviews([]);

        // get all restaurents
        db.collection('Restaurants').get().then(data => {
            data.docs.map(doc => {

                // 'doc' corresponds to each restaurant
                // find the restaurent id to make a ref to review
                const restaurantId = doc.id;

                // now let's get all the branches
                const branchRef = db.collection('Restaurants/' + restaurantId + '/Branch');
                // get all the branches
                branchRef.get().then(branchData => {
                    branchData.docs.map(branch => {

                        // branch id - we need it to make a ref to review
                        const branchId = branch.id;

                        // get the user id by email

                        getIdByEmail(email).then(clientId => {

                            // // now let's make our ref to review
                            // const reviewDocRef = db.doc('Restaurants/' + restaurantId + '/Branch/' + branchId + '/Reviews/' + clientId);
                            // reviewDocRef.get().then(review => {
                                
                            //     // reivew data
                            //     const reviewData = review.data();
                            //     console.log(reviewData); // test
                            //     if (reviewData) {
                            //         // if review exits
                            //         setReviews(rvs => [...rvs, reviewData]); // add to the state to render in the component
                            //     }
                                

                            // });


                            /**** Updated query ****/
                            
                            const reviewsRef = db.collection('Restaurants/' + restaurantId + '/Branch/' + branchId + '/Reviews');
                            reviewsRef.get().then(data => {
                                data.docs.map(doc => {
                                    const reviewData = doc.data();
                                    const reviewClientId = reviewData.ID_Client;
                                    if (clientId == reviewClientId) {
                                        // filtered review
                                        if(reviewData) setReviews(rvs => [...rvs, reviewData]);
                                    }
                                });
                            });
                            //////////-----------------------------////////


                        });



                    });

                });

            });
        });
    }

    return (
        <div className="my-booking-page">
            <h3>My Reviews</h3>
            <p>
                <input value='example1@gmail.com' onChange={e => setEmail(e.target.value)} style={{margin: '0 10px'}} type="text" placeholder="Enter client email." />
                <button onClick={handlClick}>Get</button>

            </p>
            <b>Reviews</b>
            <div>
                {reviews && reviews.map((review, i) => <p key={i}> {review.Description} </p>)}
            </div>

        </div>
    );
}

export default MyReviewPage;