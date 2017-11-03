import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { View, Text, ScrollView, } from 'react-native'

import { SearchHoC } from '@containers/';
import { RelatedProductsListScreen, EquivalentProductsListScreen, SearchScreen, 
         ProductDetailsScreen, DetailsScreen,
         EquivalentProductsScreen, RelatedProductsScreen }  from '@screens/';
import { AppConfig } from '@constants/';

const navigationConfig = {
  navigationOptions: AppConfig.navbarProps
}
const AppLaunch = SearchHoC(SearchScreen);

export const AppNavigator = StackNavigator({
    AppLaunch: { 
      screen: AppLaunch,
      navigationOptions: {
        headerTitle: AppConfig.appName,
      },
    }, 
    DetailsScreen: { 
      screen: DetailsScreen,
      navigationOptions: {
        headerTitle: AppConfig.productDetailsScreenTitleName,
      },
    },
    ProductDetailsScreen: { 
      screen: ProductDetailsScreen,
      navigationOptions: {
        headerTitle: AppConfig.productDetailsScreenTitleName,
      },
    },
    
    EquivalentProductsScreen: { 
      screen: EquivalentProductsScreen,
      navigationOptions: {
        headerTitle: AppConfig.equivalentProductsScreenTitleName,
      },
    },     
    RelatedProductsScreen: { 
      screen: RelatedProductsScreen,
      navigationOptions: {
        headerTitle: AppConfig.relatedProductsScreenTitleName,
      },
    }, 
    EquivalentProductsListScreen: { 
      screen: SearchHoC(EquivalentProductsListScreen),
      navigationOptions: {
        headerTitle: AppConfig.equivalentProductsScreenTitleName,
      },
    },     
    RelatedProductsListScreen: { 
      screen: SearchHoC(RelatedProductsListScreen),
      navigationOptions: {
        headerTitle: AppConfig.relatedProductsScreenTitleName,
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
