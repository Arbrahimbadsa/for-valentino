import './firebase/config';
import React, { useEffect, useState } from 'react';
import GoalPage from './components/goalpage';
import ProfilePage from './components/profilepage';
import MyBookingPage from './components/mybookingpage';
import MyReviewPage from './components/myreviewpage';
import MyFavoritesPage from './components/myfavoritepage';



const App = () => {

  return (
    <div style={{padding: '0 20px'}} className="app">
      <p>By default we are only getting clinet 1 which has example1@gmail.com as email</p>
      <MyFavoritesPage />
      <GoalPage />
      <ProfilePage />
      <MyBookingPage />
      <MyReviewPage />
    </div>
  )
}

export default App;
