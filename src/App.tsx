import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/LoginComponent';

import AuthRoute from './component/AuthRoute';
import HomePage from './pages/Home/HomeComponent';
import config from './utils/firebaseSetup';
import { initializeApp } from 'firebase/app';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';




initializeApp(config.firebaseConfig);
const theme = createTheme()
function App() {
  return (
    <ThemeProvider theme={theme}>
              <CssBaseline />
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
    </ThemeProvider>
  );
}

export default App;
