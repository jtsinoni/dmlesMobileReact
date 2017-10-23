import * as types from '../types'

// Set initial state
const initialState = {
  token: {},
};

export default function oauthReducer(state = initialState, action) {

  switch (action.type) {
    case types.SET_TOKEN_VIA_OAUTH : {
      return {
        ...state,
        token: action.token,
      };
    }
    // ...other actions

    default :
      return state;
  }
}
