import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { Provider } from 'react-redux';
import reducers from './components/redux/reducers';
import { createStore } from 'redux';
import Home from './components/home.js';
import Search from './components/search.js';
import ItemExpanded from './components/itemExpanded.js';
import Settings from './components/settings.js'
import { StackNavigator } from 'react-navigation';


// NOTES:
// colors: green '#00897B', grey '#BDBDBD', red invalid'#E64A19'
const store = createStore(reducers);
const AppNavigation = StackNavigator({
  Home: { screen: Home },
  ItemExpanded: { screen: ItemExpanded },
  Settings: { screen: Settings },
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
