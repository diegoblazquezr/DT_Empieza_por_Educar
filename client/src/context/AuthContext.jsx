import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [rol, setRol] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    const token = Cookies.get('token') || Cookies.get('token2');
    console.log(token);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setLogged(true);
        console.log(decoded);
        setRol(decoded.rol);
        setId(decoded.id);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    } else {
      console.log('no token');
    }
  }, [logged, rol, id]);

  return (
    <AuthContext.Provider value={{ logged, setLogged, rol, setRol, id, setId }}>
      {children}
    </AuthContext.Provider>
  );
};
