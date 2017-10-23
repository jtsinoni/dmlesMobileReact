import * as types from '../types'

// Set initial state
const initialState = {records: {total: 0, hits: { fields: [] }}};

export default function abiReducer(state = initialState, action) {

  switch (action.type) {
    case types.GET_ABI_CATALOG_RECORDS : {
      return {
        ...state,
        records: action.records,
        loading: action.loading,
      };
    }
    // ...other actions

    default :
      return state;
  }
}