import * as types from '../types'

// Set initial state
const initialState = {
   branchRecords: [],
   loaded: false,
};

export default function systemReducer(state = initialState, action) {
   switch (action.type) {
      case types.GET_BRANCH_SERVICES_RECORDS: {
         return {
            ...state,
            branchRecords: action.branchRecords,
            loaded: action.loaded,
          };
      }

      default:
         return state;
   }
}