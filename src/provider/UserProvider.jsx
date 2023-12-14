import { createContext, useReducer } from "react";

import { UserReducer, initialState } from "../reducer/UserReducer";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, UserDispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider value={{ UserDispatch, user }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
