import React, { createContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '@clerk/clerk-expo';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const { signOut } = useAuth();

  const saveItem = async (key, value) => {
    if (Platform.OS === 'web') {
      await AsyncStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  };

  const getItem = async (key) => {
    if (Platform.OS === 'web') {
      return await AsyncStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  };

  const deleteItem = async (key) => {
    if (Platform.OS === 'web') {
      await AsyncStorage.removeItem(key);      
    } else {
       console.log(`Entro ${Platform.OS}`);
      let response = await SecureStore.deleteItemAsync(key);
      console.log(response);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUser();
  }, []);

  const saveUser = async (userData) => {
    await saveItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    await signOut(); 
    await deleteItem('user');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, saveUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
