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

initializeApp(config.firebaseConfig);
const theme = createTheme();
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
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
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
