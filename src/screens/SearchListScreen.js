import React, { Component } from 'react';
import { View, FlatList, Platform, } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';

// Consts and Libs
import { AppStyles, AppSizes, AppColors } from '@theme/';

// Components
import { Spacer } from '@components/ui/';

import { AppConfig } from '@constants/';
import Loading from '@components/general/Loading';

/* Component ==================================================================== */
class SearchListScreen extends Component {
   static propTypes = {
      detailsScreen: PropTypes.string.isRequired,
   }

   constructor(props) {
      super(props)
   }

   renderSeparator = () => {
      return (
         <View style={AppStyles.listItemSeparator} />
      );
   };

   renderFooter = () => {
      if (!this.props.loading) return null;

      return (
         <Loading text={this.props.searchingText} />
      );
   };

   renderListItem = (rowData) => {
      if (!rowData.item) return null;


      let item = rowData.item;
      let subtitle = '';
      let slash = ' / ';
      // Subtitle
      // Manufacture
      (item.manufacturer) ? subtitle = subtitle + item.manufacturer : '';

      // Append NDC if it exists
      (item.manufacturer && item.ndc) ? subtitle = subtitle + slash : '';
      (item.ndc) ? subtitle = subtitle + item.ndc : '';

      // Append Manufacturer Catalog Number  if it exists
      ((item.manufacturer || item.ndc) && item.manufacturerCatalogNumber) ? subtitle = subtitle + slash : '';
      (item.manufacturerCatalogNumber) ? subtitle = subtitle + item.manufacturerCatalogNumber : '';

      return (
         <ListItem
            hideChevron={(Platform.OS === 'android') ? true : false}
            title={item.longItemDescription}
            subtitle={subtitle}
            containerStyle={AppStyles.viewlistItemContainer}
            onPress={() => this.props.navigation.navigate(this.props.detailsScreen, { item: item })}
         />
      );
   }

   render = () => (
      <View>
         {this.props.records.total > 0 ?
            <List containerStyle={AppStyles.viewContainer}>
               <FlatList
                  data={this.props.records.hits.fields}
                  renderItem={this.renderListItem}
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

SearchListScreen.defaultProps = {
   detailsScreen: 'DetailsScreen'
}

/* Export Component ==================================================================== */
export default SearchListScreen;
