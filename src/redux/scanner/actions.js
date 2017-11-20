import * as types from '../types'

export function setBarcode(barcode) {
   return (dispatch) => {
      dispatch({type: types.SET_BARCODE, barcode});
   }
}
