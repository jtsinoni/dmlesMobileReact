import * as types from '../types'

// Set initial state
const initialState = {
  barcode: null,  
};

export default function barcodeReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_BARCODE : {
      return {
        ...state,
        barcode: action.barcode,
      };
    }    

    default :
      return state;
  }
}