import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native';
import { List, ListItem, } from 'react-native-elements';

import { Card } from '@ui/'
import * as Utils from '@utils/'

// Consts and Libs
import { AppStyles, AppSizes, AppColors } from '@theme/';
import Loading from '@components/general/Loading';

/* Component ==================================================================== */
class SiteCatalogListScreen extends Component {
   static propTypes = {
      getSiteCatalogRecords: PropTypes.func.isRequired,
      getBranchServices: PropTypes.func.isRequired,
      setSiteNamesFromBranchServices: PropTypes.func.isRequired,
   }

   constructor(props) {
      super(props)
   }

   getSiteCatalogRecords(item) {
      this.props.getBranchServices()
         .then(() => {
            this.props.setSiteNamesFromBranchServices();
         })  
         .then(() => {
            this.props.getSiteCatalogRecords(item);
         })
   }

   item() {
      return this.props.navigation.state.params.item || null;
   }

   componentDidMount = () => {
      const item = this.item();
      if (item) {
         this.getSiteCatalogRecords(item);
      }
   }

   renderFooter = () => {
      if (!this.props.loading) return null;

      return (
         <Loading text={'Searching Site Catalog Records ...'} />
      );
   };

   renderText = (item, title, checkLength = false, dodaac = false) => {
      if (!item && !dodaac) return null;
      if (checkLength && !(item.length > 0)) return null;

      return (
         <Text>
            <Text style={AppStyles.strong}>{title}: </Text>
            {item}
         </Text>
      );
   };   

   renderListItem = (rowData) => {
      if (!rowData.item) return null;

      let item = rowData.item;
      return (
         <Card>
            <View style={AppStyles.paddingVertical}>
               {this.renderText(item.siteName, item.siteDodaac, false, true)}
               {this.renderText(item.itemId, 'Item')}
               {this.renderText(item.primarySupplier, 'Primary Supplier')}
               {this.renderText((item.orderCost)?Utils.currency(item.orderCost):null, 'Order Cost')}
               {this.renderText(item.orderCount, 'Orders')}
               {this.renderText((item.primarySourcePrice)?Utils.currency(item.primarySourcePrice):null, 'Price')}
               {this.renderText(`${item.primarySourcePackCode} / ${item.primarySourcePackQuantity}`, 'Packaging')}
            </View>
         </Card>
      );
   }

   render() {
      return (
         <View style={AppStyles.viewContainer}>
            {this.renderFooter()}
            {this.props.siteCatalogRecords.length >=0 ?
               <View>
                  <List containerStyle={AppStyles.viewContainer}>
                     <FlatList
                        data={this.props.siteCatalogRecords}
                        renderItem={this.renderListItem}
                        keyExtractor={item => item.id}
                        ItemSeparatorComponent={this.renderSeparator}
                     />
                  </List>
               </View>
               : null
            }
         </View>
      )
   };
}

/* Export Component ==================================================================== */
export default SiteCatalogListScreen;
