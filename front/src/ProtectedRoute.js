import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => { // children car sinon sa marche pas
  const authenticated = useSelector((state) => state.authenticated); // useSelector récupère seulement les donnée nécéssaires

  if (!authenticated) {
    return <Navigate to="/index" />; // Si pas authentifier, index
  }

  return children; 
};


export default ProtectedRoute;