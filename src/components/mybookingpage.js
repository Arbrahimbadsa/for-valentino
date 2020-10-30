import React, { useState } from 'react';
import firebase from 'firebase';
import getIdByEmail from '../firebase/getIdByEmail';

const db = firebase.firestore();


const MyBookingPage = () => {

    const [email, setEmail] = useState(null);
    const [booking, setBooking] = useState([]);

    const handlClick = () => {
        getIdByEmail(email).then(id => {
            
            // get the booking associated with this client
            db.collection('Bookings').doc(id.toString()).get().then(booking => {
                console.log(booking.data()); // this is out booking data
                setBooking(booking.data()); // set the data to the state
            });

        });
    }

    return (
        <div className="my-booking-page">
            <h3>My Bookings</h3>
            <p>
                <input onChange={e => setEmail(e.target.value)} style={{margin: '0 10px'}} type="text" placeholder="Enter client email." />
                <button onClick={handlClick}>Get</button>

            </p>
            <b>Booking</b>
            <p>Booking Data : booking date object</p>
            <p>Booking Branch: booking branch reference</p>
            <p>Booking Price :  {booking && booking.Price} </p>
            <p>Booking Status: {booking && booking.Status} </p>
        </div>
    );
}

export default MyBookingPage;