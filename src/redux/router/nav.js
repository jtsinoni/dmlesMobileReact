import { NavigationActions } from "react-navigation";
// import { Navigator } from '../../navigation/routes';
import { AppNavigator } from '@navigators/';

let initialState = AppNavigator.router.getStateForAction(
  NavigationActions.init()
);

export default function routerReducer(state = initialState, action) {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
}

 