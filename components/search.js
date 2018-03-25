import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';

export default class Search extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      input: '',
    }
  }

  search() {

  }

  render() {
    return(
      <View style={styles.container}>
        <TextInput
          placeholder="..."
          style={styles.input}
        />
        <Button title="Search" style={styles.btn} onPress={() => search()}/>
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