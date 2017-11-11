import * as types from '../types'

// Set initial state
const initialState = {
  branch: {
    records: [],
    loaded: false,
  },
  sites: {
    records: [],
    loaded: false,
  }
};

export default function systemReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_BRANCH_SERVICES_RECORDS: {
      return {
        ...state,
        branch: {
          records: action.records,
          loaded: action.loaded,
        },
      };
    }
    case types.SET_SITES_FROM_BRANCH_SERVICES: {
      return {
        ...state,
        sites: {
          records: action.records,
          loaded: action.loaded,
        },
      };
    }
    default:
      return state;
  }
}