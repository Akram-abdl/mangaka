import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthRoute from "./component/AuthRoute";
import config from "./utils/firebaseSetup";
import { initializeApp } from "firebase/app";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import { RouteUrls } from "./config";
import HomePage from "./pages/Home/Home";
import LoginPage from "./pages/Login/Login";
import MangaDetails from "./pages/MangaDetails/MangaDetails";
import ReadChapter from "./pages/ReadChapter/ReadChapter";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import AppBarComponent from "./component/AppBar/AppBarComponent";
import Profile from "./pages/Profile/Profile";

initializeApp(config.firebaseConfig);
const theme = createTheme();
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AppBarComponent />
          <Routes>
            <Route
              path={RouteUrls.Root}
              element={
                <AuthRoute>
                  <HomePage />
                </AuthRoute>
              }
            />
            <Route
              path={`${RouteUrls.MangaDetails}/:mangaId`}
              element={
                <AuthRoute>
                  <MangaDetails />
                </AuthRoute>
              }
            />
            <Route
              path={`${RouteUrls.MangaDetails}/:mangaId/:chapterId`}
              element={
                <AuthRoute>
                  <ReadChapter />
                </AuthRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
