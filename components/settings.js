import React from 'react';
import { StyleSheet, Text, View, ListView, StatusBar, TextInput } from 'react-native';
import Home from './home.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    let dateLimit = this.props.dateLimit;
    this.state = {
      dateLimit: dateLimit,
      dateToutched: false,
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Instillinger',
      headerTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        color: 'white',
        fontSize: 24
      },
      headerStyle: {
        height: 56 + StatusBar.currentHeight,
        paddingTop: StatusBar.currentHeight,
        elevation: null,
        backgroundColor: '#00897B',
      },
      headerLeft:
        <Icon name="arrow-left" style={{ padding: 16, color: 'white' }}
          size={20} onPress={() => navigation.navigate('Home')} />
      ,
    };
  };

  addChanges() {
    if (!this.state.dateLimit) {
      return;
    }

    this.props.onUpdateDateLimit(this.state.dateLimit);
    const { navigate } = this.props.navigation;
    navigate('Home');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Text style={this.state.dateTouched == false ?
            styles.dateText :
            styles.activeDateText}
          >
            Grense for utdatert entry
          </Text>
          <TextInput
            placeholder="antall måneder"
            onChangeText={(dateLimit) => this.setState({ dateLimit: dateLimit })}
            onFocus={() => this.setState({ dateToutched: true })}
            onBlur={() => this.setState({ dateToutched: false })}
            underlineColorAndroid="transparent"
            onSubmitEditing={() => this.addChanges()}
            keyboardType="numeric"
            value={this.state.dateLimit}
            style={this.state.dateTouched == false ? styles.dateInput : styles.activeDateInput}
          />

        </View>
      </View>
    );
  }


}

const mapStateToProps = (state, props) => {
  return {
    dateLimit: state.dateLimit
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateDateLimit: (dateLimit) => dispatch({ type: 'UPDATE_DATELIMIT', dateLimit }),
  }
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 16,
  },
  dateContainer: {
    flex: 0.5,
  },
  dateText: {
    fontSize: 12,
    marginBottom: 4,
    color: '#00897B',
  },
  activeDateText: {
    fontSize: 12,
    marginBottom: 4,
    color: '#00695C',
  },
  dateInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#00897B',
  },
  activeDateInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#00695C',
  },
}