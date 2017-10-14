/**
 * App Theme - Colors
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

const app = {
  background: '#E9EBEE',
  cardBackground: '#FFFFFF',
  listItemBackground: '#FFFFFF',
};

const brand = {
  brand: {
    primary: '#0E4EF8',
    secondary: '#17233D',
  },
};

const colors = {
  colors: {
    primary:    '#F3A847',
    secondary:  '#32db64',
    danger:     '#f53d3d',
    light:      '#f4f4f4', 
    dark:       '#222',
    primaryBlue:      '#387ef5',
    logiColeBlue: '#183559',
  }
}

const text = {
  textPrimary: '#222222',
  textSecondary: '#777777',
  headingPrimary: brand.brand.primary,
  headingSecondary: brand.brand.primary,
};

const borders = {
  border: '#D0D1D5',
};

const tabbar = {
  tabbar: {
    background: '#ffffff',
    iconDefault: '#BABDC2',
    iconSelected: brand.brand.primary,
  },
};

export default {
  ...app,
  ...brand,
  ...colors,
  ...text,
  ...borders,
  ...tabbar,
};
