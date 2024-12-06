const data = {
  token: null, // JWT
  authenticated: false, // SECURITER
  user: null, // Donnée utilisateur(rajouter pour avoir accès aux donnée sur tout le site)
};

export const Redux = (state = data, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.payload.token,
        authenticated: true, // Utilisateeur authentifier
      };
    case "SET_PROFILE":
      return {
        ...state,
        user: action.payload, // Ajoute l'utilisateur dans le store
      };
    case "LOGOUT":
      return {
        ...state,
        token: null, // Nul pour déconnexion
        authenticated: false,
        user: null, // Nul car déconnexion
      };
    default:
      return state;
  }
};



export const setProfile = (profile) => ({
  type: "SET_PROFILE",
  payload: profile,
});


