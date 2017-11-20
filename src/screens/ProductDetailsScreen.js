import React, { Component } from 'react'
import { View, Text, Alert, ScrollView, Button, } from 'react-native'
import { Card } from '@ui/'
import { AppStyles, AppColors, } from '@theme/';
import DetailsScreen from './DetailsScreen';

class ProductDetailsScreen extends Component {
  constructor(props) {
    super(props)
  }

  item() {
    return this.props.navigation.state.params.item || null;
  }

  getRelatedProducts = (item) => {
    this.props.navigation.navigate('RelatedProductsListScreen', {item: item})
  } 

  getEquivalentProducts = (item) => {
    this.props.navigation.navigate('EquivalentProductsListScreen', {item: item})
  } 

  render() {
    const item = this.item();
    return (
      <View style={AppStyles.container}>
        <DetailsScreen item={item} />
        { item.productGroup || item.productSubstituteGroup ?
          <View style={[AppStyles.paddingVertical, AppStyles.buttonGroup]}>
            { item.productGroup ?
              <View style={{marginRight: 10}}>
                <Button
                  color={AppColors.colors.primary}
                  onPress={() => this.getRelatedProducts(item)}
                  title={'Related Products'}
                  accessibilityLabel="Related Products"/> 
              </View>  
            :null}
            { item.productSubstituteGroup ?
              <Button
                color={AppColors.colors.primary}
                onPress={() => this.getEquivalentProducts(item)}
                title={'Equivalent Products'}
                accessibilityLabel="Equivalent Products"/> 
            :null}            
          </View>
        :null}        
      </View>
    );
  }
}

export default ProductDetailsScreen;
