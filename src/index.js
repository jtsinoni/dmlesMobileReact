import React from 'react';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

// Consts and Libs
import { AppStyles, AppConfig } from '@theme/';

// All redux reducers (rolled into one mega-reducer)
import rootReducer from '@redux/index';

import { AppWithNavigationState } from '@navigators/';


// middleware that logs actions
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware,
    ),
  );
  return createStore(rootReducer, initialState, enhancer);
}

const store = configureStore({});

/* Component ==================================================================== */
// Wrap App in Redux provider (makes Redux available to all sub-components)
export default function AppContainer() {
  return (
    <Provider store={store}>
      <AppWithNavigationState />
    </Provider>    
  );
}


