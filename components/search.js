import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import ItemExpanded from './itemExpanded.js'

export default class Search extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      input: '',
    }
  }

  autocomplete(text) { 
    let newMatches = [];
    if(text.length < 3) {
      this.props.onSearch(newMatches);
      return;
    }

    let items = this.props.items.slice(0);
   
    items.forEach(element => {
      if(element.item.toLowerCase().indexOf(text) > -1) {
        newMatches.push(element.item);
      }
    });
    //alert(newMatches)
    this.props.onSearch(newMatches);
  }

  blur() {
    let empty = [];
    this.props.onSearch(empty);
  }

  render() {
    return(
      <View style={styles.outer}>
        <View style={styles.container}>
        {/* <Text style={styles.header}>Søk etter vare</Text> */}
          <TextInput
            placeholder="Søk etter vare"
            underlineColorAndroid="transparent"
            style={styles.input}
            onChangeText={(text) => this.autocomplete(text.toLowerCase())}
            onBlur={()=> this.blur()}
          />
        </View>
      </View>
    );
  }
  
}

const mapStateToProps = (state, props) => {
	return {
		items: state.items
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearch: (searchHits) => dispatch({ type: 'GET_SEARCH', searchHits }),
	}
}

module.exports = connect(
	mapStateToProps,
	mapDispatchToProps
)(Search)

const styles = {
  outer: {
    maxHeight: 56,
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    fontSize: 12,
    color: '#00897B',
  },
  container: {
    //maxHeight: 35,
    //flex: 1,
    //flexDirection: 'row',
    //margin: 8,
  },
  input: {
    height: 40,
    borderColor: '#00897B',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 8,
    //elevation: 2,
  },
}