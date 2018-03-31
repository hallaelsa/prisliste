import React from 'react';
import { StyleSheet, Text, View, ListView, StatusBar, TextInput, Picker, TouchableHighlight } from 'react-native';
import Home from './home.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateLimit: this.props.dateLimit,
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
            Grense for utdatert informasjon
          </Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={this.state.dateLimit}
              onValueChange={(itemValue, itemIndex) => this.setState({ dateLimit: itemValue })} >
              <Picker.Item label="1 måned" value={1} />
              <Picker.Item label="3 måneder" value={3} />
              <Picker.Item label="6 måneder" value={6} />
              <Picker.Item label="1 år" value={12} />
            </Picker>
          </View>
          {/* <TextInput
            placeholder="antall måneder"
            onChangeText={(dateLimit) => this.setState({ dateLimit: dateLimit })}
            onFocus={() => this.setState({ dateToutched: true })}
            onBlur={() => this.setState({ dateToutched: false })}
            underlineColorAndroid="transparent"
            onSubmitEditing={() => this.addChanges()}
            keyboardType="numeric"
            value={this.state.dateLimit}
            style={this.state.dateTouched == false ? styles.dateInput : styles.activeDateInput}
          /> */}

        </View>
        <TouchableHighlight
            onPress={() => this.addChanges()}
            style={styles.addBtn}>
            <Text style={styles.addBtnText}>Oppdater</Text>
          </TouchableHighlight>
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
    flex: 1,
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
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    //alignItems: 'center'
  },
  picker: {
    width: 176,
  },
  addBtn: {
    //width: 80,
    backgroundColor: '#00897B',
    borderRadius: 5,
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  addBtnText: {
    color: 'white',
    padding: 16,
  },
}