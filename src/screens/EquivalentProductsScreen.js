import React, { Component } from 'react'
import { View, Text, Alert, ScrollView, Button, } from 'react-native'
import { Card } from '@ui/'
import { AppStyles, AppColors, } from '@theme/';
import DetailsScreen from './DetailsScreen';

class EquivalentProductsScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
   const productSubstituteGroup = this.props.navigation.state.params.productSubstituteGroup || null;
   if (!productSubstituteGroup) { return null }

   /*
{
  "queryString": "",
  "filters": [
    {
      "operator": "or",
      "fieldValues": [
        {
          "field": "productSubstituteGroup",
          "value": "2720"
        }
      ]
    }
  ]
}   
   */
   return (
      <View style={AppStyles.container}>
         <Text>productSubstituteGroup => {productSubstituteGroup}</Text>
      </View>
      );
  }
}

export default EquivalentProductsScreen;
