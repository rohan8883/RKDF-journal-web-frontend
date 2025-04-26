import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { axios, setSession, authApi } from '@/lib';
import { useQueryClient } from '@tanstack/react-query';

export type IUser = {
  _id: string;
  fullName: string;
  roleId: string;
  mobile: string;
  email: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  role: string;
  permission: [];
  imgFullPath: string;
  googleId: string;
  imageUrl: string;
  userUlbId:string;
  ulbName: string;
};

const AuthContext = () => {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  const initialize = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem('token');
      if (accessToken) {
        setSession(accessToken);
        const response = await axios.get(authApi.getUser);
        console.log('response?.data?.userDetails', response?.data);
        if (response?.data?.success) {
          setIsAuthenticated(true);
          setIsInitialized(true);
          console.log('response?.data?.userDetails', response?.data);
          setUser(response?.data?.userDetails);
        } else {
          setIsAuthenticated(false);
          setIsInitialized(true);
          setUser(null);
          toast.error('You are not authorized to access this page');
        }
      } else {
        setIsAuthenticated(false);
        setIsInitialized(true);
        setUser(null);
      }
    } catch (error) {
      console.log('error', error);
      setIsAuthenticated(false);
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // // LOGIN
  type ILoginResponse = {
    data: {
      message: string;
      token: string;
      success: boolean;
      user: IUser;
    };
  };
  const login = async (response: ILoginResponse) => {
    try {
      const result = response?.data;
      console.log("result",result?.token)
      // setSession(response?.data?.data?.token);
      setSession(result?.token);
      setUser(result?.user);
      initialize();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    setSession(null);
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
    queryClient?.removeQueries();
  };

  return {
    isAuthenticated,
    isInitialized,
    user,
    setIsAuthenticated,
    setIsInitialized,
    login,
    logout,
    initialize
  };
};

export default AuthContext;
