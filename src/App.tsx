import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/LoginComponent';

import AuthRoute from './component/AuthRoute';
import HomePage from './pages/Home/HomeComponent';
import config from './utils/firebaseSetup';
import { initializeApp } from 'firebase/app';

initializeApp(config.firebaseConfig);

function App() {
  return (
    <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <AuthRoute>
                            <HomePage />
                        </AuthRoute>
                    }
                />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
  );
}

export default App;
