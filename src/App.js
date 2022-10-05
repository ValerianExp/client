import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBarComponent from './components/NavBar/NavBarComponent';
import HomePage from './pages/HomePages/HomePage';
import LogInPage from './pages/LogInPage/LogInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import OnTripPage from './pages/OnTripPage/OnTripPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import EditProfilePage from './pages/ProfilePage/EditProfile/EditProfilePage';


function App() {

  return (
    <div>
      <NavBarComponent />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LogInPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/profile/edit' element={<EditProfilePage />} />
        <Route path='/trip/:id' element={<OnTripPage />} />'
        <Route path='/error/:errorMessage' element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
