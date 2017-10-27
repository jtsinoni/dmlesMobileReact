import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import LoginStatusMessage from './LoginStatusMessage';
import AuthButton from './AuthButton';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const MainScreen = ({ logout, profileScreen }) => (
  <View style={styles.container}>
    <Text>MainScreen</Text>

    <Button
      title={'Profile Screen'}
      onPress={profileScreen}
    />

    {/* <LoginStatusMessage />
    <AuthButton /> */}
  </View>
);

MainScreen.navigationOptions = {
  title: 'Home Screen',
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: 'Logout' }),
  profileScreen: () =>
    dispatch(NavigationActions.navigate({ routeName: 'Profile' })),
});

const mapStateToProps = state => ({
  isLoggedIn: false,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
