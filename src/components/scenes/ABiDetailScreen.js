import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const ABiDetailScreen = ({ item }) => (
  <View style={styles.container}>
    <Text>ABiDetailScreen</Text>

  </View>
);

ABiDetailScreen.navigationOptions = {
  title: 'ABiDetailScreen',
};

const mapStateToProps = state => ({
  item: state.abi.item,
});

export default connect(mapStateToProps)(ABiDetailScreen);
