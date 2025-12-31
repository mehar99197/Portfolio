import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const API_URL = useMemo(() => {
    if (process.env.NODE_ENV === 'production') {
      return 'https://your-backend-api-url.com/api'; // User will need to update this later
    }
    return window.location.hostname === 'localhost' 
      ? 'http://localhost:5000/api'
      : `http://${window.location.hostname}:5000/api`;
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${storedToken}`
            },
            credentials: 'include'
          });
          
          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            setToken(storedToken);
          } else {
            localStorage.removeItem('token');
            setToken(null);
          }
        } catch (error) {
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [API_URL]);

  const login = useCallback(async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'Login failed. Please try again.' };
    }
  }, [API_URL]);

  const logout = useCallback(async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
      });
    } catch (error) {
      
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
    }
  }, [API_URL, token]);

  const value = useMemo(() => ({
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  }), [user, token, loading, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
