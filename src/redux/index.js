/**
 * Combine All Reducers
 */
import { combineReducers } from 'redux';

// Our custom reducers
// We need to import each one here and add them to the combiner at the bottom
import oauth from '@redux/oauth/reducer';
import abi from '@redux/abi/reducer';
import nav from '@redux/nav/reducer';

// Combine all
const appReducer = combineReducers({
  oauth,
  abi,
  nav,
});

// Setup root reducer
const rootReducer = (state, action) => {
  const newState = (action.type === 'RESET') ? undefined : state;
  return appReducer(newState, action);
};

export default rootReducer;
