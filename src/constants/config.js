import { AppColors, AppStyles, AppSizes } from '@theme/';

export default {
  // App Details
  appName: 'Ask ABi',
  productDetailsScreenTitleName: 'Product Details',

  // Build Configuration - eg. Debug or Release?
  DEV: __DEV__,

  // URLs
  urls: {
  },

  // Navbar Props
  navbarProps: {
    headerStyle: AppStyles.navbar,
    headerTitleStyle: AppStyles.navbarTitle,
    headerBackTitleStyle: AppColors.colors.white,
    headerTintColor: AppColors.colors.white,
    headerBackTitle: null,
  },

  // TODO: Get from UtilService (need to convert first)
  host: 'http://localhost:8080/',
  clientLogFileName: 'client.log',
  clientDN: 'CN=TSINONIS.JOHN.NMN.1401922977,OU=CONTRACTOR,OU=PKI,OU=DoD,O=U.S. Government,C=US',
  apiHosts: {
    btBaseUrl: 'http://localhost:8080/'
  },
  OAuth: {
    userName: '@',
    password: '',
  },
  notifications: {
    enabled: true
  },
  timeout: {
    value: 15000,
    login:  {
        value: 30000
    }
  }   
};
