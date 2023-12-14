import { UPDATE_USER, UPDATE_IS_LOGGED_IN } from "./UserActionTypes";

export const initialState = { user: {}, isLoggedIn: false };

export function UserReducer(state, action) {
  switch (action.type) {
    case UPDATE_USER:
      return { user: action.payload.user, isLoggedIn: state.isLoggedIn };
    case UPDATE_IS_LOGGED_IN:
      return { user: state.user, isLoggedIn: !state.isLoggedIn };
    default:
      return state;
  }
}

export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    payload: { user },
  };
};

export const updateIsLoggedIn = () => {
  return {
    type: UPDATE_IS_LOGGED_IN,
  };
};
