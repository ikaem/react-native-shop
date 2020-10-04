import { AUTHENTICATE, LOGIN, LOGOUT, SIGNUP } from "../actions/auth.actions";

const initialState = {
  token: null,
  userId: null,
};


export default (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return initialState;
    case AUTHENTICATE:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case LOGIN:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
      };

    case SIGNUP:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
      };
    default:
      return state;
  }
};
