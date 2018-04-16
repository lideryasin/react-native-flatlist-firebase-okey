

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppRegistry,
  ListItem,
  ListView,
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import Home from './src/Home';
import Details from './src/Details';
import Item from './src/Item';



export default class App extends Component {
  render() {
    return (
      <AppNavigation />
    )
  };
}

const AppNavigation = StackNavigator({
  home: { screen: Home },
  details: { screen: Details },
  item: { screen: Item },
});



