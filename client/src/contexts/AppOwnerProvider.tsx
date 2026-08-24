import React, { createContext, useContext, useState } from 'react';
import { useAuth } from '@rhino-dev/rhino-react';

export const BaseOwnerContext = createContext<any>(null);

export const useUser = () => {
  const auth = useAuth();
  return auth?.token ? { email: 'user@snap.app', id: 1 } : null;
};

export const useBaseOwnerId = () => {
  const ctx = useContext(BaseOwnerContext);
  return ctx?.baseOwnerId ?? 1;
};

export const AppOwnerProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const [baseOwner] = useState({ id: 1, name: 'Default Organization' });

  return (
    <BaseOwnerContext.Provider
      value={{
        baseOwner,
        baseOwnerId: baseOwner.id,
        auth,
      }}
    >
      {children}
    </BaseOwnerContext.Provider>
  );
};
