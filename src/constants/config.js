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
};
