import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, } from 'react-native';
import { FormInput, Button, List, ListItem } from 'react-native-elements';

// Consts and Libs
import { AppColors } from '@theme/';

// Components
import { Spacer } from '@components/ui/';

import { AppConfig } from '@constants/';
import { SearchListScreen } from '@screens/';

/* Component ==================================================================== */
class SearchScreen extends Component {
  static propTypes = {
    getTokenViaOAuth: PropTypes.func.isRequired,
    getABiCatalogRecords: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = { 
      searchValue: '',
    }  
  }

  searchPressed() {
    this.props.getABiCatalogRecords(this.state.searchValue)
  }  

  componentDidMount = () => {
    // Do not show status bar on app launch
    StatusBar.setHidden(true, true);
    this.props.getTokenViaOAuth(AppConfig.OAuth.userName);
  }


  render = () => (
    <View>
        <FormInput 
            returnKeyType="search"
            placeholder="Search"
            onChangeText={(searchValue) => this.setState({searchValue})}
            value={this.state.searchValue}
        />
        <Spacer />
        <Button
            raised
            backgroundColor={AppColors.colors.primary}
            onPress={() => this.searchPressed()}
            icon={{name: 'search'}}
            accessibilityLabel="Search ABi catalog"/>  

        <SearchListScreen {...this.props} 
                          detailsScreen='ProductDetailsScreen'
                          searchingText='Searching ABi Catalog ...'/>    

    </View>    
  );
}

/* Export Component ==================================================================== */
export default SearchScreen;
