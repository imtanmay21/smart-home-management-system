import { UserActionTypes } from "./UserActionTypes";

const initialState = {
  user: null,
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.SET_USER_DATA: {
      const { user } = action.payload;

      return {
        user: user,
      };
    }

    default: {
      return state;
    }
  }
};
