import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';

// Next: fix so I can display all search matches in a touchable list. 
// Navigate to itemExpanded if toutched.

export default class Search extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      input: '',
      value: '',
    }
  }

  search() {

  }

  autocomplete(text) {
    if(text.length < 3) {
      return;
    }
    let items = this.props.items.slice(0);
    items.forEach(element => {
      if(element.item.toLowerCase().indexOf(text) > -1) {
        this.setState({value: element.item});
      }
    });

  }

  render() {
    return(
      <View style={styles.outer}>
        <View style={styles.container}>
          <TextInput
            placeholder="..."
            style={styles.input}
            onChangeText={(text) => this.autocomplete(text.toLowerCase())}
          />
          <Button title="Search" style={styles.btn} onPress={() => this.search()}/>
        </View>
        <Text>{this.state.value}</Text>
      </View>
    );
  }
  
}

const mapStateToProps = (state, props) => {
	return {
		items: state.items
	}
}

module.exports = connect(
	mapStateToProps,
	//mapDispatchToProps
)(Search)

const styles = {
  outer: {
    maxHeight: 60,
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    maxHeight: 35,
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 3,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 1,
    backgroundColor: 'white',
    marginRight: 5,
  },
  btn: {
    flex: 1,
    marginLeft: 5,

  },
}