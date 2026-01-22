import { createContext, useState, useContext, ReactNode, useMemo } from 'react';

interface RefreshContextType {
  refreshKey: number;
  refresh: () => void;
}

const RefreshContext = createContext<RefreshContextType | undefined>(undefined);

export const useRefresh = () => {
  const context = useContext(RefreshContext);
  if (!context) {
    throw new Error('useRefresh must be used within a RefreshProvider');
  }
  return context;
};

export const RefreshProvider = ({ children }: { children: ReactNode }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  const value = useMemo(() => ({ refreshKey, refresh }), [refreshKey]);

  return (
    <RefreshContext.Provider value={value}>
      {children}
    </RefreshContext.Provider>
  );
};
