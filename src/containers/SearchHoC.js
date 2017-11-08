import React, { Component } from 'react'
import { connect } from 'react-redux';

// Actions
import * as OAuthActions from '@redux/oauth/actions'
import * as ABiActions from '@redux/abi/actions';

export default (Comp) => {
   class SearchAware extends Component {
      constructor(props) {
         super(props)
      }

      render() {
         return (
            <Comp {... this.props} />
         );
      }
   };

   // What data from the store shall we send to the component?
   const mapStateToProps = state => ({
      token: state.oauth.token,
      catalogRecords: state.abi.catalogRecords,
      siteCatalogRecords: state.abi.siteCatalogRecords,
      relatedRecords: state.abi.relatedRecords,
      equivalentRecords: state.abi.equivalentRecords,
      loading: state.abi.loading,
   });

   // Any actions to map to the component?
   const mapDispatchToProps = {
      getTokenViaOAuth: OAuthActions.getTokenViaOAuth,
      getABiCatalogRecords: ABiActions.getABiCatalogRecords,
      getABiRelatedProducts: ABiActions.getABiRelatedProducts,
      getABiEquivalentProducts: ABiActions.getABiEquivalentProducts,
      getSiteCatalogRecords: ABiActions.getSiteCatalogRecords,
   };

   //// The component we're mapping to
   const ConnectedSearchAware = connect(
      mapStateToProps,
      mapDispatchToProps
   )(SearchAware);

   return ConnectedSearchAware;

};
