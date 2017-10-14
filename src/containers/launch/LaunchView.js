import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput,
  Image,
  Alert,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FormLabel, FormInput, Button } from 'react-native-elements';

// Consts and Libs
import { AppStyles, AppSizes, AppColors } from '@theme/';

// Components
import { Spacer } from '@components/ui/';


/* Component ==================================================================== */
class SearchView extends Component {
  static componentName = 'LaunchView';

//   static propTypes = {
//     login: PropTypes.func.isRequired,
//     getRecipes: PropTypes.func.isRequired,
//     getMeals: PropTypes.func.isRequired,
//   }

  constructor(props) {
    super(props)
    this.state = { searching: false, searchValue: '' }    
  }

  searchPressed() {
    console.log(`searchPressed => ${this.state.searchValue}`);  
    this.setState({ searching: true })
    // this.props.fetchRecipes(this.state.ingredientsInput).then( (res) => {
    //   this.setState({searching: false })
    // });
  }  

  componentDidMount = () => {
    // Show status bar on app launch
    StatusBar.setHidden(false, true);
  }

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
  });
  

/* Export Component ==================================================================== */
export default SearchView;
