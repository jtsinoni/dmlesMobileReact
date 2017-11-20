import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { View, Text, ScrollView, } from 'react-native'

import { SearchHoC } from '@containers/';
import { RelatedProductsListScreen, EquivalentProductsListScreen, 
         EquivalentProductsScreen, SiteCatalogListScreen,
         SearchScreen, ProductDetailsScreen, DetailsScreen, }  from '@screens/';
import { AppConfig } from '@constants/';
import { BarcodeScannerService } from '@lib/'

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
    SiteCatalogListScreen: { 
      screen: SearchHoC(SiteCatalogListScreen),
      navigationOptions: {
        headerTitle: AppConfig.siteCatalogScreenTitleName,
      },
    }, 
    BarcodeScannerService: { 
      screen: SearchHoC(BarcodeScannerService),
      navigationOptions: {
        headerTitle: 'Scan Barcode',
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
