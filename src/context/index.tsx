import { useContext, createContext, useMemo } from 'react';
import TitleContext from './titleContext';
import AuthContext from './AuthContext';

type CONTEXT_TYPE = ReturnType<typeof TitleContext> &
  ReturnType<typeof AuthContext>;

export const AppContext = createContext({} as CONTEXT_TYPE);
export function useAppContext() {
  return useContext(AppContext);
}

export default function AppProvider({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const titleContext = TitleContext();
  const authContext = AuthContext();
  const contextValue = useMemo(
    () => ({ ...titleContext, ...authContext }),
    [titleContext, authContext]
  );
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
