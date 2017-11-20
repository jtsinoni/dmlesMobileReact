import React, { Component } from 'react';
import {
   Text,
   View,
   StyleSheet
} from 'react-native';

import Camera from 'react-native-camera';
import { NavigationActions } from 'react-navigation'
import PropTypes from 'prop-types';


export class BarcodeScannerService extends Component {
   static propTypes = {
      setBarcode: PropTypes.func.isRequired,
   }

   constructor(props) {
      super(props);
      this.state = {
         read: null,
      }
   }

   delay = (time) => {
      return new Promise(function (resolve, reject) {
         setTimeout(() => resolve(), time);
      });
   }
      
   // This get's called multiple times
   onBarCodeRead = async scanner => {
      // Workaround is to add a delay and check if that was already scanned
      await this.delay(500);
      if (this.state.read == scanner.data) return;
      this.setState({ read: scanner.data });

      // Whatever you wanna do with the scanned barcode
      this.props.setBarcode(scanner.data)
      this.props.navigation.dispatch(NavigationActions.back())
   };

   render() {
      return (
         <View style={styles.container}>
            <Camera
               style={styles.preview}
               onBarCodeRead={this.onBarCodeRead}
               ref={cam => this.camera = cam}
               aspect={Camera.constants.Aspect.fill}
               barcodeFinderVisible={true}
            >
               <Text style={{
                  backgroundColor: 'white'
               }}>{this.state.qrcode}</Text>
            </Camera>
         </View>
      )
   }

}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'row',
   },
   preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
   }
});