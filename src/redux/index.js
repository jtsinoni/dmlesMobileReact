/**
 * Combine All Reducers
 */
import { combineReducers } from 'redux';

// Our custom reducers
// We need to import each one here and add them to the combiner at the bottom
import oauth from '@redux/oauth/reducer';
import abi from '@redux/abi/reducer';
import nav from '@redux/nav/reducer';
import system from '@redux/system/reducer'

// Combine all
const rootReducer = combineReducers({
  oauth,
  abi,
  nav,
  system,
});

export default rootReducer;
