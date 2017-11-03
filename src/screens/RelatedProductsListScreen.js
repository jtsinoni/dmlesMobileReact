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
class RelatedProductsListScreen extends Component {
   static propTypes = {
      getABiRelatedProducts: PropTypes.func.isRequired,
   }

   constructor(props) {
      super(props)
      this.state = {
         searchValue: '',
      }
   }

   productGroup() {
      return this.props.navigation.state.params.productGroup || null;
   }

   componentDidMount = () => {
      const productGroup = this.productGroup();
      if(productGroup) {
         this.props.getABiRelatedProducts(productGroup);
      }
   }

   render() {
      if (!this.productGroup()) { return null }

      return (
         <View>
            <SearchListScreen {...this.props} 
                              detailsScreen='DetailsScreen'
                              searchingText='Searching for related products ...' />
         </View>
      )
   };
}

/* Export Component ==================================================================== */
export default RelatedProductsListScreen;
