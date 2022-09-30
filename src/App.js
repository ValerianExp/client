import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBarComponent from './components/NavBar/NavBarComponent';
import HomePage from './pages/HomePages/HomePage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import OnTripPage from './pages/OnTripPage';



function App() {

  return (
    <div>
      <NavBarComponent />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LogInPage />} />
        <Route path='/login' element={<LogInPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/trip/:id' element={<OnTripPage />} />
      </Routes>
    </div>
  );
}

export default App;
