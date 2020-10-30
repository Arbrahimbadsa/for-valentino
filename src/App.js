import './firebase/config';
import React, { useEffect, useState } from 'react';
import GoalPage from './components/goalpage';
import ProfilePage from './components/profilepage';
import MyBookingPage from './components/mybookingpage';
import MyReviewPage from './components/myreviewpage';



const App = () => {

  const [email, setEmail] = useState('')


  return (
    <div style={{padding: '0 20px'}} className="app">
      <GoalPage />
      <ProfilePage />
      <MyBookingPage />
      <MyReviewPage />
    </div>
  )
}

export default App;
