import { createReducer } from '@reduxjs/toolkit';
import { handleLogin, fetchUserProfile, updateUserProfile } from "./Utility"
const data  = {
  token: null, // JWT
  authenticated: false, // bool vrai faux
  user: null, 
  error: null, // error ajouter car souhaitable dans un redux
};

export const Redux = createReducer(data , (builder) => {
  builder
    // fulfilled donc succès dans le hangleLogin
    .addCase(handleLogin.fulfilled, (state, action) => {
      state.token = action.payload;  //On récupère le token
      state.authenticated = true; //Bool vrai pour ProtectedRoute
      state.error = null;  // Pas d'erreur
    })
    // rejected donc echouer
    .addCase(handleLogin.rejected, (state, action) => {
      state.error = action.payload;  // Message d'erreur
      state.authenticated = false; // Bool faux pour protected route
    })
    .addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.user = action.payload; // on récupère l'utilisateur
      state.error = null;
    })
    .addCase(fetchUserProfile.rejected, (state, action) => {
      state.error = action.payload; // Message d'erreur
    })
    .addCase(updateUserProfile.fulfilled, (state, action) => {
      state.user = action.payload; // Màj de user
      state.error = null;
    })
    .addCase(updateUserProfile.rejected, (state, action) => {
      state.error = action.payload;
    })
    .addCase('LOGOUT', (state) => {
      state.token = null;
      state.authenticated = false; // On vide tout
      state.user = null;
      state.error = null;
    })
});

export default Redux;

export const logout = () => ({
  type: "LOGOUT",
});
