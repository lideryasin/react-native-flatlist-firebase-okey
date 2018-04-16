import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ListItem,
  ListView,
} from 'react-native';
import firebase from 'firebase';

export default class Details extends Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    const { item } = this.props.navigation.state.params
    return (
      <View>
        <Text>{item.title}</Text>
        <Text>{item.age}</Text>
      </View>
    )
  }
}