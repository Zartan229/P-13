import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import Sign from "./components/Sign/Sign.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import { BrowserRouter as Router, Routes, Route,Navigate  } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./Store.js";
import { PersistGate } from 'redux-persist/integration/react'
import ProtectedRoute from "./ProtectedRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <Header />
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/index" />} />
        <Route path="/index" element={<Main />} />
        <Route path="/login" element={<Sign />} />
        <Route path="/profile" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
    <footer>
      <hr />
      <p>Copyright 2020 Argent Bank</p>
    </footer>
    </PersistGate>
  </Provider>
</React.StrictMode>

);
