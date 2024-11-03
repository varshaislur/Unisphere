import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';

// Define the Context
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Login function to call backend API
  const login = async (username, password) => {
    try {
      setLoading(true);
      // Replace with your backend API call
      const response = await fetch('https://your-backend-url.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setError(null);
      } else {
        setError(data.message);
        Alert.alert("Login failed", data.message);
      }
    } catch (err) {
      setError("Network error");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Signup function to call backend API
  const signup = async (username, password) => {
    try {
      setLoading(true);
      const response = await fetch('https://your-backend-url.com/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setError(null);
      } else {
        setError(data.message);
        Alert.alert("Signup failed", data.message);
      }
    } catch (err) {
      setError("Network error");
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider value={{ user, loading, error, login, signup, logout }}>
      {children}
    </AppContext.Provider>
  );
};
