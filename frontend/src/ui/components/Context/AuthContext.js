import { createContext, useState } from 'react';

const AuthContext = createContext();

export function UserContextProvider({ children }) {
  const [token, setToken] = useState(() => window.localStorage.getItem('token'));
  // const [loading, setLoading] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
