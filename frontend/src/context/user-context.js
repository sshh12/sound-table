'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '@/lib/api';

const UserContext = createContext({
  user: null,
  refreshUser: async () => {},
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // if (localStorage.getItem('sound-table-token')) {
    //   api
    //     .getCurrentUser()
    //     .then(setUser)
    //     .then(fetchData)
    //     .catch((e) => {
    //       if (e.message.includes('token')) {
    //         localStorage.removeItem('sound-table-token');
    //         window.location.href = '/';
    //       }
    //     });
    // } else {
    //   api.createAccount().then(setUser).then(fetchData);
    // }
  }, []);

  const refreshUser = async () => {
    const user = await api.getCurrentUser();
    setUser(user);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
