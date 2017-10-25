import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppConfig } from '@constants/';
import {
  View,
  Text,
  TextInput,
  Image,
  Alert,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FormLabel, FormInput, Button, List, ListItem } from 'react-native-elements';

// Consts and Libs
import { AppStyles, AppSizes, AppColors } from '@theme/';

// Components
import { Spacer } from '@components/ui/';


/* Component ==================================================================== */
class AskABiSearch extends Component {
  static componentName = 'LaunchView';

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
    // Show status bar on app launch
    StatusBar.setHidden(false, true);
    this.props.getTokenViaOAuth(AppConfig.OAuth.userName);
    
  }

  renderSeparator = () => {
    return (
      <View style={AppStyles.listItemSeparator} />
    );
  };  

  renderFooter = () => {
    if (!this.props.loading) return null;

    return (
      <View style={AppStyles.activityIndicator}>
        <ActivityIndicator 
          animating size={'large'} />
      </View>
    );
  };  

  renderListItem = (rowData) => {
    if(!rowData.item) return null;

    let item = rowData.item;
    let subtitle = '';
    let slash = ' / ';
    // Subtitle
    // Manufacture
    (item.manufacturer)?subtitle = subtitle + item.manufacturer:'';

    // Append NDC if it exists
    (item.manufacturer && item.ndc)?subtitle = subtitle+slash:'';
    (item.ndc)?subtitle = subtitle + item.ndc:'';

    // Append Manufacturer Catalog Number  if it exists
    ( (item.manufacturer || item.ndc) && item.manufacturerCatalogNumber)?subtitle = subtitle+slash:'';
    (item.manufacturerCatalogNumber)?subtitle = subtitle+item.manufacturerCatalogNumber:'';
    
    return (
      <ListItem
        title={item.longItemDescription}
        subtitle={subtitle}
        containerStyle={AppStyles.viewlistItemContainer}
        onPress={Actions.askABiDetails}
      />
    );  
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

        { this.props.records.total > 0 ? 
          <List containerStyle={AppStyles.viewContainer}>
            <FlatList
              data={this.props.records.hits.fields}
              renderItem={this.renderListItem}
              keyExtractor={item => item.enterpriseProductIdentifier}
              ItemSeparatorComponent={this.renderSeparator}
              ListFooterComponent={this.renderFooter}
            />
          </List>
          : this.renderFooter()
        }
    </View>    
  );
}

/* Export Component ==================================================================== */
export default AskABiSearch;
