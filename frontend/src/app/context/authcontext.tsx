import React, { createContext, useContext, useState, ReactNode, FC } from 'react';
import api from '@/app/api/client';

interface User {
  id: number;
  name: string;
  email: string;
  phonenumber: string;
  isadmin: boolean;
  modules: any;
  createdAt: string;
  updatedAt: string;
}

interface ApiContextProps {
  user: User | null;
  login: (username: string, password: string) => Promise<any>;
  createUser: (userData: any) => Promise<any>;
  deleteUser: (identifier: string | number) => Promise<any>;
  getUsers: () => Promise<User[]>;
  updateUser: (userId: number, userData: any) => Promise<any>;
}

const ApiContext = createContext<ApiContextProps | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const createUser = async (userData: any) => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  const deleteUser = async (identifier: string | number) => {
    try {
      const response = await api.delete(`/users/${identifier}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  const getUsers = async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };

  const updateUser = async (userId: number, userData: any) => {
    try {
      const response = await api.patch(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  return (
    <ApiContext.Provider value={{ user, login, createUser, deleteUser, getUsers, updateUser }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
