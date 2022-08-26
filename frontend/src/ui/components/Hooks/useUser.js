import { useContext, useCallback } from 'react';
import loginService from '../../utils/LoginService';
import AuthContext from '../Context/AuthContext';
import jwtDecode from 'jwt-decode';

export default function useUser(setIsLogged, redirectToLogin) {
  const { token , setToken  } = useContext(AuthContext);
  const login = useCallback(
    (state) => {
      loginService(state)
        .then(data => {
          const token = jwtDecode(data.access);
          if (Boolean(token.jti)){
            setIsLogged(true)
            window.localStorage.setItem('token', token.jti);
            setToken(token.jti)
          }
          else{
            setIsLogged(false)
          }
          console.log(Boolean(token.jti))

          
        })
        .catch(e => {
          console.log(Boolean(token.jti))
          throw new Error(e);
        });
    },
    [setToken],
  );

  const logout = useCallback(() => {
    console.log(token)
    setToken(null);
    console.log(token)
    window.localStorage.clear();
    redirectToLogin()
    // window.localStorage.removeItem('token');

  }, [setToken]);

  return {
    // isLogged: Boolean(token.jti),
    login,
    logout,
  };
}
