import React, { Component } from 'react'
import { View, Text, Alert, ScrollView, Button, } from 'react-native'
import { Card } from '@ui/'
import { AppStyles, AppColors, } from '@theme/';
import DetailsScreen from './DetailsScreen';

class RelatedProductsScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
   const productGroup = this.props.navigation.state.params.productGroup || null;
   if (!productGroup) { return null }

   return (
      <View style={AppStyles.container}>
         <Text>productGroup => {productGroup}</Text>
      </View>
   );
  }
}

export default RelatedProductsScreen;
