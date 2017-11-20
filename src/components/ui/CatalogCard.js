import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Badge } from 'react-native-elements';
import { View, Text, StyleSheet } from 'react-native';
import { AppStyles, AppColors } from '@theme/';
import * as Utils from '@utils/'

class CatalogCard extends Component {
    constructor(props) {
        super(props)
    }

    cardProps = () => {
        // Defaults
        const props = {
            ...this.props,
            ...AppStyles.catalogCard,
        };

        return props;
    }

    item() {
        return this.props.item || null;
    }

    render() {
        const item = this.item();
        const subtitle = Utils.valueJoinerWithDelimiter([item.manufacturer, item.ndc, item.manufacturerCatalogNumber], ' / ');
        return (
            <Card {...this.cardProps() }>
                <View style={AppStyles.catalogCard.view}>
                    <Text>{Utils.adornItem(item)}</Text>
                    <Badge
                        value={item.siteCount}
                        containerStyle={AppStyles.catalogCard.badge} />
                </View>
                <Text style={AppStyles.note}>{subtitle}</Text>
            </Card>
        );
    }
}

export default CatalogCard;