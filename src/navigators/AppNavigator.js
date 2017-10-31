import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import AppLaunch from '@containers/LaunchContainer';
import { ProductDetailsScreen }  from '@screens/';
import { AppConfig } from '@constants/';

const navigationConfig = {
  navigationOptions: AppConfig.navbarProps
}

export const AppNavigator = StackNavigator({
    AppLaunch: { 
      screen: AppLaunch,
      navigationOptions: {
        headerTitle: AppConfig.appName,
      },
    }, 
    DetailScreen: { 
      screen: ProductDetailsScreen,
      navigationOptions: {
        headerTitle: AppConfig.productDetailsScreenTitleName,
      },
    }, 
}, navigationConfig );

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
