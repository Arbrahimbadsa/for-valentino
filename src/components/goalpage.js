import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import getMissions from '../firebase/getMissions';
import getIdByEmail from '../firebase/getIdByEmail';
const db = firebase.firestore();



const GoalPage = () => {

    const [email, setEmail] = useState(null);
    const [missions, setMissions] = useState([]);

    useEffect(() => {
        getMissions().then(missions => {
            setMissions(missions);
        });
    }, []);

    const handlClick = () => {
        getIdByEmail(email).then(id => {
            setMissions([]);
            db.collection('Clients/' + id + '/Missions').get().then(data => {
                data.docs.map(doc => {
                    doc.data().ID_Mission.get().then(missionsData => {
                        setMissions(msns => [...msns, missionsData.data()]);
                    });
                });
            });
        });
    }

    return (
        <div className="goal-page">
            <h3>Goal Page</h3>
            <p>
                <input value='example1@gmail.com' onChange={e => setEmail(e.target.value)} style={{margin: '0 10px'}} type="text" placeholder="Enter client email." />
                <button onClick={handlClick}>Get</button>
            </p>
            <b>Missions</b>

            <div className="missions">
                {missions && missions.map((mission, i) => {
                    return (
                        <p key={i}> {mission.Name} </p>
                    )
                })}
            </div>
        </div>
    );
}

export default GoalPage;