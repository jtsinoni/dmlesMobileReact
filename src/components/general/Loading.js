import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';

// Consts and Libs
import { AppStyles } from '@theme/';

// Components
import { Spacer, Text } from '@ui/';

/* Component ==================================================================== */
const Loading = ({ text }) => (
  <View
    style={[
      AppStyles.activityIndicator,
      AppStyles.container,
      AppStyles.containerCentered,
    ]}
  >
    <ActivityIndicator
      animating
      size={'large'}
    />

    <Spacer size={20} />

    {text && <Text style={AppStyles.containerCentered}>{text}</Text>}
  </View>
);

Loading.propTypes = { text: PropTypes.string, transparent: PropTypes.bool };
Loading.defaultProps = { text: null, transparent: false };
Loading.componentName = 'Loading';

/* Export Component ==================================================================== */
export default Loading;
