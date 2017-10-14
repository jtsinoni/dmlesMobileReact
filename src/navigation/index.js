import React from 'react';
import { Actions, Scene, ActionConst } from 'react-native-router-flux';

// Consts and Libs
import { AppConfig } from '@constants/';

// Components
// import Drawer from '@containers/ui/DrawerContainer';

// Scenes
import AppLaunch from '@containers/launch/LaunchContainer';
// import Placeholder from '@components/general/Placeholder';
// import AuthScenes from './auth';
// import TabsScenes from './tabs';

/* Routes ==================================================================== */
export default Actions.create(
  <Scene key={'root'} {...AppConfig.navbarProps} title={AppConfig.appName} hideNavBar={false} type={ActionConst.RESET}>

      {/* Drawer Side Menu */}
      <Scene key={'home'} component={AppLaunch} initial={true}>
        {/* Tabbar
        {TabsScenes} */}
      </Scene> 

  </Scene>,
);
