import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SearchListScreen } from '@screens/';
import { CatalogCard } from '@ui/'

/* Component ==================================================================== */
class RelatedProductsListScreen extends Component {
   static propTypes = {
      getABiRelatedProducts: PropTypes.func.isRequired,
   }

   constructor(props) {
      super(props)
   }


   item() {
      return this.props.navigation.state.params.item || null;
   }

   componentDidMount = () => {
      const productGroup = this.item().productGroup;
      if(productGroup) {
         this.props.getABiRelatedProducts(productGroup);
      }
   }

   render() {
      return (
         <SearchListScreen {...this.props} 
                           records={this.props.relatedRecords}
                           item={this.item()}
                           detailsScreen='DetailsScreen'
                           searchingText='Searching for related products ...' />
      )
   };
}

/* Export Component ==================================================================== */
export default RelatedProductsListScreen;
