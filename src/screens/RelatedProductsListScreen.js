import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, } from 'react-native';

import { SearchListScreen } from '@screens/';

/* Component ==================================================================== */
class RelatedProductsListScreen extends Component {
   static propTypes = {
      getABiRelatedProducts: PropTypes.func.isRequired,
   }

   constructor(props) {
      super(props)
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
                              records={this.props.relatedRecords}
                              detailsScreen='DetailsScreen'
                              searchingText='Searching for related products ...' />
         </View>
      )
   };
}

/* Export Component ==================================================================== */
export default RelatedProductsListScreen;
