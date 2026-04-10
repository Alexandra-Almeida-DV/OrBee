import React, { useState, useCallback } from 'react';
import api from '../services/api';
import { AuthContext, User } from './AuthContext';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storageUser = localStorage.getItem('@OrBee:user');
    const storageToken = localStorage.getItem('@OrBee:token');
    if (storageUser && storageToken) {
      api.defaults.headers.Authorization = `Bearer ${storageToken}`;
      try { return JSON.parse(storageUser); } catch { return null; }
    }
    return null;
  });

const login = useCallback(async (token: string, userData: User) => {
  api.defaults.headers.Authorization = `Bearer ${token}`;
  localStorage.setItem('@OrBee:token', token);
  localStorage.setItem('@OrBee:user', JSON.stringify(userData));
  setUser(userData);
}, []);

  const logout = useCallback(() => {
    localStorage.removeItem('@OrBee:token');
    localStorage.removeItem('@OrBee:user');
    delete api.defaults.headers.Authorization;
    setUser(null);
    window.location.href = '/';
  }, []);

  return (
    <AuthContext.Provider value={{ signed: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};