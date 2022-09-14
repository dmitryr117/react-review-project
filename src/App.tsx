import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Home, AboutPage, LoginPage, ProfilePage, CountPage } from './pages';
import { ProfileMenu } from './components';
import { ProtectedRoutes } from './hooks/ProtectedRoutes';
import { AuthContextProvider } from './services';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
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
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
