import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, Text } from 'react-native';
import { FormInput, Button, } from 'react-native-elements';

// Consts and Libs
import { AppColors } from '@theme/';

// Components
import { Spacer } from '@components/ui/';

import { AppConfig } from '@constants/';
import { SearchListScreen } from '@screens/';
import { BarcodeScannerService } from '@lib/'

/* Component ==================================================================== */
class SearchScreen extends Component {
  static propTypes = {
    getTokenViaOAuth: PropTypes.func.isRequired,
    getABiCatalogRecords: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      searchValue: null,
      isBarcodeSearch: true,
    }
  }

  scan = () => {
    console.log(`in scan method`)
    this.props.navigation.navigate('BarcodeScannerService')
  }

  searchPressed() {
    this.props.getABiCatalogRecords(this.state.searchValue)
  }

  componentWillReceiveProps = (nextProps) => {
    let value = nextProps.searchValue || nextProps.barcode
    if(value) {
      this.setState({ searchValue: value});
      console.log(`value => ${value}`)
      // console.log(`nextProps.barcode => ${nextProps.barcode}`)  
    }    
  }

  componentDidMount = () => {
    // Do not show status bar on app launch
    StatusBar.setHidden(true, true);
    this.props.getTokenViaOAuth(AppConfig.OAuth.userName);
  }

  render = () => {
    // console.log(`searchValue => ${this.state.searchValue}`)
    // console.log(`state => ${JSON.stringify(this.state)}`)

    return (
      <View>
        <FormInput
          returnKeyType="search"
          placeholder="Search"
          onChangeText={(searchValue) => this.setState({ searchValue, isBarcodeSearch: false })}
          value={this.state.searchValue}
        />
        <Spacer />
        <Button
          raised
          backgroundColor={AppColors.colors.primary}
          onPress={() => this.searchPressed()}
          icon={{ name: 'search' }}
          accessibilityLabel="Search ABi catalog" />

        <Spacer />
        <Button
          raised
          backgroundColor={AppColors.colors.primary}
          onPress={() => this.scan()}
          title={'Scan'}
          accessibilityLabel="Barcode Scan" />


        <SearchListScreen {...this.props}
          records={this.props.catalogRecords}
          detailsScreen='ProductDetailsScreen'
          searchingText='Searching ABi Catalog ...' />

      </View>
    )
  }
}

/* Export Component ==================================================================== */
export default SearchScreen;
