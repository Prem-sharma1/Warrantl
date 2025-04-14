// /src/context/AuthProvider.jsx


import AuthContext from "./AuthContext";

// Define the AuthProvider component
const AuthProvider = ({ children }) => {


  

  return (
    <AuthContext.Provider>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
