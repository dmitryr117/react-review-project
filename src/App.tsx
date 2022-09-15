import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { Home, AboutPage, LoginPage, ProfilePage, CountPage } from './pages';
import { ProfileMenu } from './components';
import { ProtectedRoutes } from './hooks/ProtectedRoutes';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav>
        <h1>PTC Testing Site</h1>
        <Link to="/">Home</Link>
        <Link to="/count">Count</Link>
        <Link to="/about">About</Link>
        <ProfileMenu />
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/count" element={<CountPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
