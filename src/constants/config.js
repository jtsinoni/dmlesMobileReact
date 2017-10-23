import { AppColors, AppStyles, AppSizes } from '@theme/';

export default {
  // App Details
  appName: 'Ask ABi',

  // Build Configuration - eg. Debug or Release?
  DEV: __DEV__,

  // URLs
  urls: {
  },

  // Navbar Props
  navbarProps: {
    hideNavBar: false,
    titleStyle: AppStyles.navbarTitle,
    navigationBarStyle: AppStyles.navbar,
    leftButtonIconStyle: AppStyles.navbarButton,
    rightButtonIconStyle: AppStyles.navbarButton,
    sceneStyle: {
      backgroundColor: AppColors.background,
      paddingTop: AppSizes.navbarHeight,
    },
  },

  // TODO: Get from UtilService (need to convert first)
  host: 'http://192.168.1.13:8080/',
  clientLogFileName: 'client.log',
  clientDN: 'CN=TSINONIS.JOHN.NMN.1401922977,OU=CONTRACTOR,OU=PKI,OU=DoD,O=U.S. Government,C=US',
  apiHosts: {
    btBaseUrl: 'http://192.168.1.13:8080/'
  },
  OAuth: {
    userName: 'user.admin.123',
    password: 'password',
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
