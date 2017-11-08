import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, } from 'react-native';

import { SearchListScreen } from '@screens/';

/* Component ==================================================================== */
class EquivalentProductsListScreen extends Component {
   static propTypes = {
      getABiEquivalentProducts: PropTypes.func.isRequired,
   }

   constructor(props) {
      super(props)
   }

   productSubstituteGroup() {
      return this.props.navigation.state.params.productSubstituteGroup || null;
   }

   componentDidMount = () => {
      const productSubstituteGroup = this.productSubstituteGroup();
      if(productSubstituteGroup) {
         this.props.getABiEquivalentProducts(productSubstituteGroup);
      }
   }

   render() {
      if (!this.productSubstituteGroup()) { return null }

      return (
         <View>
            <SearchListScreen {...this.props} 
                              records={this.props.equivalentRecords}
                              detailsScreen='DetailsScreen'
                              searchingText='Searching for equivalent products ...' />
         </View>
      )
   };
}

/* Export Component ==================================================================== */
export default EquivalentProductsListScreen;
