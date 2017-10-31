import React, { Component } from 'react'
import { View, Text, Alert, ScrollView, StyleSheet, Button, } from 'react-native'
// import { Button, } from 'react-native-elements';
import { Card } from '@ui/'
import { AppStyles, AppColors, } from '@theme/';

class ProductDetailsScreen extends Component {
  constructor(props) {
    super(props)
  }

  item() {
    return this.props.navigation.state.params.item || null;
  }

  renderText = (item, title, checkLength = false) => {
    if (!item) return null;
    if(checkLength && !(item.length > 0)) return null;

    return (
      <Text>
        <Text style={AppStyles.strong}>{title}: </Text>
          {item}
      </Text> 
    );
  }; 
  
  renderTextAsList = (items, title) => {
    if (!items) return null;
    if(items && !(items.length > 0)) return null;

    return (
      <View>
        <Text style={AppStyles.strong}>{title}: </Text>
        { items.map((item, i) => 
          <Text key={i}>{item}</Text>
        )}
      </View>  
    );
  };   

  getRelatedProducts = () => {
    Alert.alert(
      'Alert Title',
      'Not Implemented',
    )
  } 

  getEquivalentProducts = () => {
    Alert.alert(
      'Alert Title',
      'Not Implemented',
    )
  } 
  
  render() {
    const item = this.item();
    if (!item) { return null }

    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        style={[AppStyles.container, AppStyles.paddingBottomSml]}> 

        {/* Top Card */}     
        <Card>
          { this.renderText(item.enterpriseProductIdentifier, 'ID') }
          <View style={AppStyles.paddingVertical}>
            <Text>{item.longItemDescription}</Text> 
            <Text style={AppStyles.note}>
              {item.manufacturer} {item.ndc} {item.manufacturerCatalogNumber}
            </Text>
          </View>
          { this.renderText(item.packagingDescription, 'Packaging Description') }
        </Card>

        {/* Locations */}
        { item.locations && item.locations.length > 0 ?
          <Card title={'Locations'}>
            <View>
              { item.locations.map((location, i) => 
                <Text key={i}>{location}</Text>
              )}
            </View>
          </Card>
        :null}        

        {/* About This Item */}
        <Card title={'About This Item'}>
          <View>
            { this.renderText(item.productStatus, 'Product Status') }
            { this.renderText(item.commodityType, 'Commodity Type') }
            { this.renderText(item.productComposition, 'Product Composition', true) }
            { this.renderText(item.trademarkBrandnames, 'Trademark/Brand Names', true) }
            { this.renderText(item.brandGeneric, 'Brand Type') }  
            { this.renderText(item.sizeShape, 'Size/Shape') } 
            { this.renderText(item.productProperties, 'Properties', true) }
            { this.renderText(item.locations, 'Locations', true) }
            { this.renderText(item.miscellaneous, 'Additional Information', true) }
            { this.renderText(item.age, 'Age') }  
            { this.renderText(item.gender, 'Gender') }  
            { this.renderText(item.color, 'Color') }  
            { this.renderText(item.flavor, 'Flavor') }  
            { this.renderText(item.fragrance, 'Fragrance') }  
            { this.renderText(item.disposableReusable, 'Disposable') }  
            { this.renderText(item.diameter, 'Diameter') }  
            { this.renderText(item.volume, 'Volume') }  
            { this.renderText(item.weight, 'Weight') }  
            { this.renderText(item.lengthWidthHeight, 'Dimensionsge') }  
            { this.renderText(item.lengthWidthHeight2, 'Secondary Dimensions') }  
            { this.renderText(item.sterileNonsterile, 'Sterile/Nonsterile') }  
            { this.renderText(item.hazardCode, 'Hazard Code') }
            { this.renderText(item.latexCode, 'Latex Code') }
          </View>
        </Card> 

        {/* Packaging */}
        { item.packaging && item.packaging.length > 0 && item.packaging[0].enterprisePackageIdentifier ?
          <Card title={'Packaging'}>
            <View>
              { item.packaging.map((pack, i) => 
                <Card style={styles.cardMargin} key={i}>
                  { this.renderText(pack.enterprisePackageIdentifier, 'Enterprise Package Identifier') }
                  <View>
                    { this.renderText(pack.packageUnitDescription, 'Description') } 
                    { this.renderText(pack.doseOrUseCount, 'Dose or Use Count') } 
                    { this.renderTextAsList(pack.nsn, 'National Stock Numbers (NSN)') }
                    { this.renderTextAsList(pack.barcodes, 'Barcodes') }
                    { this.renderTextAsList(pack.otherPackageIdentifiers, 'Other Package Information') }
                  </View>
                </Card>
              )}
            </View>
          </Card>
        :null}        

        {/* Additional Product Identifiers */}
        { item.secondaryProductIdentifiers && item.secondaryProductIdentifiers.length > 0 && item.secondaryProductIdentifiers[0].identifier ?
          <Card title={'Additional Product Identifiers'}>
            <View>
              { item.secondaryProductIdentifiers.map((spid, i) => 
                <Card style={styles.cardStyle} key={i}>
                  <View>
                    { this.renderText(spid.identifier, 'Product Identifier') } 
                    { this.renderText(spid.identifierType, 'Product Identifier Type') } 
                  </View>
                </Card>
              )}
            </View>
          </Card>
        :null} 

        {/* Product Documentation */}
        { item.productDocumentation && item.productDocumentation.length > 0 && item.productDocumentation[0].documentType ?
          <Card title={'Product Documentation'}>
            <View>
              { item.productDocumentation.map((doc, i) => 
                <Card style={styles.cardStyle} key={i}>
                  <View>
                    { this.renderText(doc.documentType, 'Document Type') } 
                    { this.renderText(doc.documentName, 'Document Name') } 
                    { doc.documentURL ? 
                      <View>
                        <Text style={AppStyles.strong}>Document Link:</Text>
                        <Text>N/A TODO: {doc.documentURL}</Text>
                      </View>
                    :null}
                  </View>
                </Card>
              )}
            </View>
          </Card>
        :null} 
        { item.productGroup || item.productSubstituteGroup ?
          <View style={[AppStyles.paddingVertical, styles.container]}>
            { item.productGroup ?
              <Button
                color={AppColors.colors.primary}
                onPress={() => this.getRelatedProducts()}
                title={'Related Products'}
                accessibilityLabel="Related Products"/> 
            :null}
            { item.productSubstituteGroup ?
              <Button
                color={AppColors.colors.primary}
                onPress={() => this.getEquivalentProducts()}
                title={'Equivalent Products'}
                accessibilityLabel="Equivalent Products"/> 
            :null}            
          </View>
        :null}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
  },
  cardStyle: {
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 4,
    borderWidth: 1,
    padding: 10,
    borderColor: '#d6d7da',    
  },
});

export default ProductDetailsScreen;
