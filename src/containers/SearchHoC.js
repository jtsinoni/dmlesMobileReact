import React, { Component } from 'react'
import { connect } from 'react-redux';

// Actions
import * as OAuthActions from '@redux/oauth/actions'
import * as ABiActions from '@redux/abi/actions';
import * as SystemActions from '@redux/system/actions';
import * as ScannerActions from '@redux/scanner/actions';

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

   // What data from the store shall we send to the components?
   const mapStateToProps = state => ({
      token: state.oauth.token,
      catalogRecords: state.abi.catalogRecords,
      siteCatalogRecords: state.abi.siteCatalogRecords,
      relatedRecords: state.abi.relatedRecords,
      loading: state.abi.loading,
      searchValue: state.abi.searchValue,
      equivalentRecords: state.abi.equivalentRecords,
      branch: state.system.branch,
      sites: state.system.sites,
      barcode: state.scanner.barcode,
   });

   // Any actions to map to the components?
   const mapDispatchToProps = {
      getTokenViaOAuth: OAuthActions.getTokenViaOAuth,
      getABiCatalogRecords: ABiActions.getABiCatalogRecords,
      getABiRelatedProducts: ABiActions.getABiRelatedProducts,
      getABiEquivalentProducts: ABiActions.getABiEquivalentProducts,
      getSiteCatalogRecords: ABiActions.getSiteCatalogRecords,
      getBranchServices: SystemActions.getBranchServices,
      setSiteNamesFromBranchServices: SystemActions.setSiteNamesFromBranchServices,
      setBarcode: ScannerActions.setBarcode,
   };

   //// The component we're mapping to
   const ConnectedSearchAware = connect(
      mapStateToProps,
      mapDispatchToProps
   )(SearchAware);

   return ConnectedSearchAware;

};
