import React from 'react';
import { Actions, Scene, ActionConst } from 'react-native-router-flux';
import {
  StyleSheet,
} from 'react-native';

// Consts and Libs
import { AppConfig } from '@constants/';

// Components
// import Drawer from '@containers/ui/DrawerContainer';

// Scenes
import AppLaunch from '@containers/launch/LaunchContainer';
import Placeholder from '@components/general/Placeholder';

const popToRoot = () => {
  Actions.popTo("home");
};


const styles = StyleSheet.create({
  shadowWithWarning: {
    backgroundColor: 'transparent',
    shadowColor: '#555',
    shadowOpacity: 0,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 1
    }
  }
});

/* Routes ==================================================================== */
export default Actions.create(
  <Scene key={'root'} {...AppConfig.navbarProps} 
         title={AppConfig.appName} 
         hideNavBar={false} 
         type={ActionConst.RESET}
         sceneStyle={styles.shadowWithWarning}>
    <Scene key={'home'} component={AppLaunch} initial>
    </Scene>

    <Scene
        key={'askABiDetails'}
        title={'ABi Details Item Description'}
        component={Placeholder}
        back
        onLeft={popToRoot}        
      />     

  </Scene>,  
  // <Scene key={'root'} {...AppConfig.navbarProps}>

  //        <Scene key={'app'} {...AppConfig.navbarProps} title={AppConfig.appName} hideNavBar={false} type={ActionConst.RESET}>
  //        />    

  //     <Scene key={'home'} 
  //            component={AppLaunch} 
  //            initial>
  //     </Scene> 

      // <Scene
      //   key={'askABiDetails'}
      //   title={'ABi Details Item Description'}
      //   component={Placeholder}
      //   back
      //   onLeft={popToRoot}        
      // />      

  // </Scene>,
);

