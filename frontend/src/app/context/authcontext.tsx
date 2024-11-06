"use client";
import React, { createContext, useContext, useState, ReactNode, FC } from 'react';
import api from '@/app/api/client';

interface User {
  id: number;
  name: string;
  email: string;
  phonenumber: string;
  isadmin: boolean;
  modules: [];
  createdAt: string;
  updatedAt: string;
}

interface ApiContextProps {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  createUser: (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => Promise<User>;
  deleteUser: (identifier: string | number) => Promise<void>;
  getUsers: () => Promise<User[]>;
  updateUser: (userId: number, userData: Partial<User>) => Promise<User>;
}

const ApiContext = createContext<ApiContextProps | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setUser(response.data.user);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const createUser = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  const deleteUser = async (identifier: string | number): Promise<void> => {
    try {
      await api.delete(`/users/${identifier}`);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  const getUsers = async (): Promise<User[]> => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };

  const updateUser = async (userId: number, userData: Partial<User>): Promise<User> => {
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
