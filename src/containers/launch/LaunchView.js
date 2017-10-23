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
  StyleSheet,
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
class SearchView extends Component {
  static componentName = 'LaunchView';

  static propTypes = {
    getTokenViaOAuth: PropTypes.func.isRequired,
    getABiCatalogRecords: PropTypes.func.isRequired,
    // getMeals: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = { 
      searchValue: '',
    }  
  }

  searchPressed() {
    //console.log(`searchPressed => ${this.state.searchValue}`);  
    //this.setState({ searching: true })
    this.props.getTokenViaOAuth(AppConfig.OAuth.userName)
        .then(() => {
            this.props.getABiCatalogRecords(this.state.searchValue)
            .then((resp) => {
              // console.debug(`this.props => ${JSON.stringify(this.props.records.hits.fields[0].longItemDescription)}`)
              //  this.setState({searching: false, records:  this.props.records.hits.fields })
              //this.setState({ loading: false });
              console.debug(`loading=> ${this.props.loading}`)
            });            
        });
  }  

  componentDidMount = () => {
    // Show status bar on app launch
    StatusBar.setHidden(false, true);
    
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          // width: "86%",
          backgroundColor: "#CED0CE",
          // marginLeft: "14%"
        }}
      />
    );
  };  

  renderFooter = () => {
    if (!this.props.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 50,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator 
          animating size={'large'} />
      </View>
    );
  };  

  render = () => (
    // <View style={[AppStyles.containerCentered]}>
    //     <Text>Search View</Text>
    //   <Image
    //     source={require('../../images/launch.jpg')}
    //     style={[styles.launchImage, AppStyles.containerCentered]}
    //   >
    //     <ActivityIndicator
    //       animating
    //       size={'large'}
    //       color={'#C1C5C8'}
    //     />
    //   </Image>
    // </View>

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

        {/* <ActivityIndicator
          animating = {this.state.searching}
          color = '#bc2b78'
          size = "large"
          style = {styles.activityIndicator}/> */}

        { this.props.records.total > 0 ? 
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data={this.props.records.hits.fields}
              renderItem={({ item }) => (
                // <Text>{item.longItemDescription} {this.props.records.hits.fields[2].longItemDescription}</Text>
                <ListItem
                  title={item.longItemDescription}
                  subtitle={`${item.manufacturer} / ${item.ndc} / ${item.manufacturerCatalogNumber}`}
                  containerStyle={{ borderBottomWidth: 0 }}
                />
              )}
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

/* Styles ==================================================================== */
const styles = StyleSheet.create({
    launchImage: {
      width: AppSizes.screen.width,
      height: AppSizes.screen.height,
    },
    buttonColor: {
      backgroundColor: AppColors.colors.primary,
    },  
    scrollSection: {
      flex: 0.8
    },  
    activityIndicator: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   }      
  });

/* Export Component ==================================================================== */
export default SearchView;
