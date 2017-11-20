import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SearchListScreen } from '@screens/';
import { CatalogCard } from '@ui/'

/* Component ==================================================================== */
class EquivalentProductsListScreen extends Component {
   static propTypes = {
      getABiEquivalentProducts: PropTypes.func.isRequired,
   }

   constructor(props) {
      super(props)
   }

   item() {
      return this.props.navigation.state.params.item || null;
   }   

   componentDidMount = () => {
      const productSubstituteGroup = this.item().productSubstituteGroup;
      if(productSubstituteGroup) {
         this.props.getABiEquivalentProducts(productSubstituteGroup);
      }
   }

   render() {
      return (
         <SearchListScreen {...this.props} 
                           records={this.props.equivalentRecords}
                           item={this.item()}
                           detailsScreen='DetailsScreen'
                           searchingText='Searching for equivalent products ...' />
      )
   };
}

/* Export Component ==================================================================== */
export default EquivalentProductsListScreen;
