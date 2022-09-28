import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBarComponent from './components/NavBar/NavBarComponent';
import HomePage from './pages/HomePages/HomePage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import Map from './components/Maps/Map';
import { createContext, useContext, useEffect, useState } from 'react';


function App() {

  return (
    <div>
      <Map />
      <NavBarComponent />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LogInPage />} />
        <Route path='/login' element={<LogInPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
