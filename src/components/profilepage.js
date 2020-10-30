import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import getUser from '../firebase/getUser';

const ProfilePage = () => {

    const [profileData, setProfileData] = useState('example1@gmail.com');
    const [email, setEmail] = useState('example1@gmail.com'); 


    useEffect(() => {
        handlClick();
    }, []);


    const handlClick = () => {
        getUser(email).then(data => {
            setProfileData(data);
            console.log(data);
        });
    }

    return (
        <div className="profile-page">
            <h3>Profile Page</h3>
            <p>
                <input value='example1@gmail.com' onChange={e => setEmail(e.target.value)} style={{margin: '0 10px'}} type="text" placeholder="Enter client email." />
                <button onClick={handlClick}>Get</button>
            </p>
            <b>Profile Data</b>
            <div>
                <p>FirstName: {profileData && profileData.FirstName} </p>
                <p>LastName: {profileData && profileData.LastName} </p>
                <p>Points : {profileData && profileData.Points} </p>
                <p>ID_Type: Client reference  </p>
                <p>SignUpDate: data object </p>
            </div>
        </div>
    );
}

export default ProfilePage;