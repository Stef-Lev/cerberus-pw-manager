import { createContext } from 'react';
export const UserContext = createContext(null);
export const UserContextProvider = props => {
  return (
    <UserContext.Provider value={props.value}>
      {props.children}
    </UserContext.Provider>
  );
};
