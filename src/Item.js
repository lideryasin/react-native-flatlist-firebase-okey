import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableHighlight
} from 'react-native';
import FirebaseClient from './FirebaseClient'
import firebase from 'firebase';

class Item extends Component {
  static navigationOptions = {
    title: 'Home',
headerStyle: {
  backgroundColor: '#f4511e',
},
headerTintColor: '#fff',
headerTitleStyle: {
  fontWeight: 'bold',
},}
  constructor(props) {
    super(props);
    this.onPress2 = this.onPress2.bind(this)
  }

  onPress2() {
 
  
    this.props.navigation.navigate('details');
 /*   var key = this.props.item._key
    Alert.alert(
      'Remove Grocery',
      'Are you sure?',
      [
        { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Yes', onPress: () => FirebaseClient.database().ref('items/').child(key).remove() }
      ],
      { cancelable: true }
    )*/
  }

  render() {
    return (
      <TouchableHighlight delayLongPress={900} onPress={() => this.props.navigation.navigate('details')}>
        <View style={styles.container}>
          <Text style={styles.listItem}>{this.props.item.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 70,
    backgroundColor: '#E9E9EF',
    justifyContent: 'center',
    borderBottomColor: '#9E9E9E',
    borderBottomWidth: 1,
  },
  listItem: {
    fontSize: 22,
    color: '#393e42',
    textAlign: 'center',
    margin: 10,
  },
});

export default Item
