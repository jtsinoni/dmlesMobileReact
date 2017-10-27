import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

// import LoginScreen from '../components/scenes/LoginScreen';
import MainScreen from '../components/scenes/MainScreen';
import ProfileScreen from '../components/scenes/ProfileScreen';

import AppLaunch from '@containers/launch/LaunchContainer';
import ABiDetailScreen from '../components/scenes/ABiDetailScreen';


export const AppNavigator = StackNavigator({
  AppLaunch: { screen: AppLaunch }, 
  ABiDetailScreen: { screen: ABiDetailScreen }, 

  // Login: { screen: LoginScreen },
  // Main: { screen: MainScreen },
  // Profile: { screen: ProfileScreen },
});


const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
