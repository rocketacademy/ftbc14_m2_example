import { UPDATE } from "./UserActionTypes";

export const initialState = { user: {} };

export function UserReducer(state, action) {
  switch (action.type) {
    case UPDATE:
      return action.payload;
    default:
      return state;
  }
}

export const updateUser = (user) => {
  return {
    type: UPDATE,
    payload: { user },
  };
};
