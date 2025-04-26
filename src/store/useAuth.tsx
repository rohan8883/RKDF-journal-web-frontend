import toast from 'react-hot-toast';
import { axios, setSession, authApi } from '@/lib';
import { create } from 'zustand';

export type IUser = {
  _id: string;
  fullName: string;
  gymName: string;
  roleId: string;
  mobile: string;
  email: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  role: string;
  imageUrl?: string;
  imgFullPath?: string;
  address?: string;
  country?: string;
  state?: string;
  city?: string;
  zipCode?: string;
  isVerified?: boolean;
  permission: [
    {
      path: string;
      create: boolean;
      read: boolean;
      update: boolean;
      delete: boolean;
    }
  ];
  student: {
    _id: string;
    rollNo: string;
    classId: string;
    sectionId: string;
    userId: string;
    sessionId: string;
    session: string;
  };
  faculty: {
    _id: string;
    facultyCode: string;
    facultyFullName: string;
    facultyEmail: string;
    facultyPhone: string;
    sessionId: string;
  };
};

export type ILoginResponse = {
  data: {
    message: string;
    token: string;
    success: boolean;
    userDetails: {};
  };
};

export type AuthStore = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: IUser | null;
  setIsAuthenticated: (value: boolean) => void;
  setIsInitialized: (value: boolean) => void;
  login: (
    response: ILoginResponse
  ) => Promise<ILoginResponse['data'] | undefined>;
  logout: () => void;
  initialize: () => Promise<void>;
};

export const useAuth = create<AuthStore>((set, get) => ({
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setIsInitialized: (value) => set({ isInitialized: value }),
  initialize: async () => {
    try {
      const accessToken = localStorage.getItem('token');
      if (accessToken) {
        setSession(accessToken);
        const response = await axios.get(authApi.getUser);
        if (response?.data?.success) {
          set({
            isAuthenticated: true,
            isInitialized: true,
            user: response?.data?.userDetails
          });
        } else {
          set({ isAuthenticated: false, isInitialized: true, user: null });
          // toast.error('You are not authorized to access this page');
        }
      } else {
        set({ isAuthenticated: false, isInitialized: true, user: null });
      }
    } catch (error) {
      set({ isAuthenticated: false, isInitialized: true, user: null });
    }
  },
  login: async (response) => {
    try {
      const result = response?.data;
      setSession(result?.token);
      set({ user: result?.userDetails as IUser });
      get().initialize();
      return result;
    } catch (error) {
      toast.error('Login Failed');
    }
  },
  logout: () => {
    setSession(null);
    set({ isAuthenticated: false, user: null });
    localStorage.removeItem('token');
    get().initialize();
  }
}));
