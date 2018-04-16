import React, { Component } from 'react';
// import Intl from 'react-native-intl';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ListItem,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import firebase from 'firebase';
import Item from './Item';
import FirebaseClient from './FirebaseClient';


const searchingFor = (term) => {
  String.prototype.turkishToLower = function () {
    var string = this;
    var items = { "İ": "i", "I": "ı", "Ş": "ş", "Ğ": "ğ", "Ü": "ü", "Ö": "ö", "Ç": "ç" };
    string = string.replace(/(([İIŞĞÜÇÖ]))/g, (item) => items[item])
    return string.toLowerCase();
  }
  return (x) => {
    return x.title.turkishToLower().includes(term.turkishToLower()) || !term;
  }
}

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      list: [],
      searchTerm: ''
    };

    this.itemsRef = this.getRef().child('items');

  }

  getRef() {
    return FirebaseClient.database().ref();
  }

  setItemsFromFirebase(itemsRef) {
    itemsRef.on('value', (snap) => {

      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          age: child.val().age,
          _key: child.key
        });
      });

      // burada sırala
      // items = items.reverse().sort((a, b) => Intl.Collator("tr").compare(b.title, a.title));

      this.setState({
        loading: false,
        list: items.reverse()
      });
    });
  }
  componentDidMount() {
    this.setItemsFromFirebase(this.itemsRef);
  }

  detailsPress = (item) => {
    this.props.navigation.navigate('details', { item });
  }

  renderItem = ({ item }) => {
    return (
      <TouchableHighlight delayLongPress={900} key={item._key} onPress={() => this.detailsPress(item)}>
        <View style={styless.container}>
          <Text style={styless.listItem} key={item._key}>{item.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const filteredList = this.state.list.filter(searchingFor(this.state.searchTerm))
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <TextInput
          placeholder="Search"
          onChangeText={(searchTerm => this.setState({ searchTerm }))}
          value={this.state.searchTerm}
        />
        {this.state.loading ? <ActivityIndicator /> : <FlatList data={filteredList} renderItem={this.renderItem} />}
      </View>
    )
  };
}

const styless = StyleSheet.create({
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
  }
})
