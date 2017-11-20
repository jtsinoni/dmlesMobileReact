import React, { Component } from 'react';
import {
  View, Text, FlatList, Platform, StyleSheet,
  TouchableHighlight, TouchableOpacity, Icon
} from 'react-native';
import { List, ListItem, Badge } from 'react-native-elements';
import PropTypes from 'prop-types';

// Consts and Libs
import { AppStyles, AppSizes, AppColors } from '@theme/';

// Components
import { CatalogCard } from '@ui/';

import { AppConfig } from '@constants/';
import Loading from '@components/general/Loading';
import * as Utils from '@utils/'

/* Component ==================================================================== */
class SearchListScreen extends Component {
  static propTypes = {
    detailsScreen: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
  }

  renderItemSelectedHeader = () => {
    if (!this.props.item) return null;

    return (
      <CatalogCard item={this.props.item} />
    )
  }

  getSiteCatalogRecords = (item) => {
    this.props.navigation.navigate('SiteCatalogListScreen', { item: item })
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
      <View>
        <Loading text={this.props.searchingText} />
      </View>
    );
  };

  renderListItem = (rowData) => {
    if (!rowData.item) return null;

    const item = rowData.item;
    const subtitle = Utils.valueJoinerWithDelimiter([item.manufacturer, item.ndc, item.manufacturerCatalogNumber], ' / ');

    return (
      <ListItem
        hideChevron={true}
        title={Utils.adornItem(item)}
        subtitle={subtitle}
        containerStyle={AppStyles.viewlistItemContainer}
        onPress={() => this.props.navigation.navigate(this.props.detailsScreen, { item: item })}
        badge={{ element: this.renderListItemBadge(item) }}
      />
    );
  }

  render = () => {
    if(this.props.records.total >= 0) {
      return (
        <View style={AppStyles.viewContainer}>
          {this.renderItemSelectedHeader()}
          {this.renderHeader()}
          <FlatList
            data={this.props.records.hits.fields}
            renderItem={this.renderListItem}
            keyExtractor={item => item.enterpriseProductIdentifier}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
      )
    } else {
      return this.renderFooter()
    }
  };
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start', padding: 15,
    paddingBottom: 20,
  },
});

SearchListScreen.defaultProps = {
  detailsScreen: 'DetailsScreen'
}

/* Export Component ==================================================================== */
export default SearchListScreen;
