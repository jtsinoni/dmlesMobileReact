import React, { Component } from 'react';
import { View, Text, FlatList, Platform, StyleSheet,
         TouchableHighlight, TouchableOpacity, Icon } from 'react-native';
import { List, ListItem, Badge } from 'react-native-elements';
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

   getSiteCatalogRecords = (item) => {
      this.props.navigation.navigate('SiteCatalogListScreen', {item: item})
   } 

   renderSeparator = () => {
      return (
         <View style={AppStyles.listItemSeparator} />
      );
   };

   renderListItemBadge = (item) => {
      return (
         <TouchableOpacity
            onPress={() => this.getSiteCatalogRecords(item)}
            style={AppStyles.listItemBadge} >
            <Text style={{ color: AppColors.colors.white }}>{item.siteCount}</Text>
         </TouchableOpacity>
      );
   }
   renderBadge = (value) => {
      return (
         <Badge
            value={value}
            containerStyle={{ backgroundColor: AppColors.colors.primaryBlue }} />
      );
   }

   renderHeader = () => {
      return (
         <View style={styles.header}>
            {this.renderBadge(this.props.records.total)}
            <Text> Items found </Text>
            <Text>(</Text>
            {this.renderBadge(this.props.records.took)}
            <Text>milliseconds)</Text>
         </View>

      );
   }

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
            hideChevron={true}
            title={item.longItemDescription}
            subtitle={subtitle}
            containerStyle={AppStyles.viewlistItemContainer}
            onPress={() => this.props.navigation.navigate(this.props.detailsScreen, { item: item })}
            badge={{ element: this.renderListItemBadge(item) }}
         />
      );
   }

   render = () => (
      <View style={AppStyles.viewContainer}>
         {this.props.records.total >= 0 ?
            <View>
               {this.renderHeader()}
               <List containerStyle={AppStyles.viewContainer}>
                  <FlatList
                     data={this.props.records.hits.fields}
                     renderItem={this.renderListItem}
                     keyExtractor={item => item.enterpriseProductIdentifier}
                     ItemSeparatorComponent={this.renderSeparator}
                  />
               </List>
            </View>
            : this.renderFooter()
         }
      </View>
   );
}

const styles = StyleSheet.create({
   header: {
      flexDirection: 'row',
      justifyContent: 'flex-start', padding: 15,
      paddingBottom: 0,
   },
 });

SearchListScreen.defaultProps = {
   detailsScreen: 'DetailsScreen'
}

/* Export Component ==================================================================== */
export default SearchListScreen;
