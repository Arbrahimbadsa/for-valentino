import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import getIdByEmail from '../firebase/getIdByEmail';

const db = firebase.firestore();

const getDayMonth = (day, month) => {
    let d = '';
    let mon = '';

    /* Format Day */
    if (day == 1) {
        d = 'Sat';
    } else if (day == 2) {
        d = 'Sun';
    } else if (day == 3) {
        d = 'Mon';
    } else if (day == 4) {
        d = 'Tue';
    } else if (day == 5) {
        d = 'Wed';
    } else if (day == 6) {
        d = 'Thir';
    } else {
        d = 'Fri';
    }

    /* Formate Month */

    if (month == 1) {
        mon = 'Jan';
    } else if (month == 2) {
        mon = 'Feb';
    } else if (month == 3) {
        mon = 'Mar';
    } else if (month == 4) {
        mon = 'Apr';
    } else if (month == 5) {
        mon = 'May';
    } else if (month == 6) {
        mon = 'June';
    } else if (month == 7) {
        mon = 'July';
    } else if (month == 8) {
        mon = 'Aug';
    } else if (month == 9) {
        mon = 'Sep';
    } else if (month == 10) {
        mon = 'Oct';
    } else if (month == 11) {
        mon = 'Nov';
    } else {
        month = 'Dec';
    }

    return {
        day: d,
        month: mon
    };

}


const MyBookingPage = () => {

    const [email, setEmail] = useState('example2@gmail.com');
    const [booking, setBooking] = useState([]);


    useEffect(() => {
        handlClick();
    }, []);


    const handlClick = () => {
        getIdByEmail(email).then(id => {
            
            // get the booking associated with this client
            db.collection('Bookings').doc(id.toString()).get().then(booking => {
                let date = new Date(booking.data().BookingDate.seconds);
                let seconds = date.getSeconds();
                let minutes = date.getMinutes();
                let hours = date.getHours();
                let day = date.getDay();
                let month = date.getMonth();
                let year = date.getFullYear();

                //const bookingData = {...booking.data(), bookingDate: {seconds, minutes, hours, day, month, year}};
                
                const bookingData = {...booking.data(), bookingDate: {seconds, minutes, hours, ...getDayMonth(day, month), year}};

                console.log(bookingData.bookingDate.day); // day
                console.log(bookingData.bookingDate.month); // month
                console.log(bookingData.bookingDate.hours); // hours
                console.log(booking.data().BookingDate)
                setBooking(bookingData); // set the data to the state
            });

        });
    }

    return (
        <div className="my-booking-page">
            <h3>My Bookings</h3>
            <p>
                <input value='example1@gmail.com' onChange={e => setEmail(e.target.value)} style={{margin: '0 10px'}} type="text" placeholder="Enter client email." />
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