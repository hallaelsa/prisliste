import React from 'react';
import { Platform, StyleSheet, Text, View, ListView, Button, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Item from './item';
import Home from './home';
import { NavigationActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';

// Next: add delete button so entries can be deleted.
// Maybe press and hold to display delete button?
// Add some regex to secure the date format.
// Sort on price and new.
// Fade out old entries.

export default class ItemExpanded extends React.Component {
	constructor(props) {
		super(props);
		//let index = this.props.navigation.state.params.index;
		let itemName = this.props.navigation.state.params.item;
		this.state = {
			item: itemName,
			newStore: '',
			newPrice: '',
			newDate: '',
			invalid: false
		}
	}

	static navigationOptions = ({ navigation }) => {
		return {
			title: `${navigation.state.params.item}`,
			headerTitleStyle: {
				alignSelf: 'center',
				color: 'black',
				fontSize: 30
			},
			headerStyle: {
				height: 56 + StatusBar.currentHeight,
				paddingTop: StatusBar.currentHeight
			},
			headerLeft:
				<Icon name="arrow-left" style={{ marginLeft: 10, padding: 15 }} size={30} onPress={() => navigation.navigate('Home')}/>
			,
		};
	};

	delete(info) {
		// kan jeg hente inn denne et annet sted så jeg kun trenger å hente den en gang?
		const { navigate } = this.props.navigation;
		this.props.onDeleteInfo(info, this.state.item);
		navigate('ItemExpanded', { item: this.state.item });
	}

	addItem() {
		const { navigate } = this.props.navigation;
		if (!this.state.newStore || !this.state.newPrice || !this.state.newDate) {
			return;
		}

		let regex = new RegExp("^[0-9]{2}.[0-9]{2}.[0-9]{4}$");
		if(!regex.test(this.state.newDate)){
			this.setState({invalid: true});
			return;
		}
		this.setState({invalid: false});

		let newItemInfo = {
			storeName: this.state.newStore,
			price: this.state.newPrice,
			date: this.state.newDate
		}

		this.props.onAddItemInfo(newItemInfo, this.state.item);

		navigate('ItemExpanded', { item: this.state.item });
	}

	render() {
		const { navigate } = this.props.navigation;
		const thisItem = this.props.items.find( items => items.item === this.state.item);

		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.headerText}>Butikk</Text>
					<Text style={styles.headerText}>Pris</Text>
					<Text style={styles.headerText}>Dato</Text>
					<View style={styles.space}></View>
				</View>
				<View style={styles.content}>
					<TextInput
						placeholder="Butikknavn"
						onChangeText={(newStore) => this.setState({ newStore: newStore })}
						underlineColorAndroid="transparent"
						value={this.state.newStore}
						style={styles.textInput}
					/>
					<TextInput
						placeholder="Pris"
						onChangeText={(newPrice) => this.setState({ newPrice: newPrice })}
						underlineColorAndroid="transparent"
						value={this.state.newPrice}
						keyboardType="numeric"
						style={styles.textInput}
					/>
					<TextInput
						placeholder="dd.mm.yyyy"
						onChangeText={(newDate) => this.setState({ newDate: newDate })}
						underlineColorAndroid="transparent"
						value={this.state.newDate}
						keyboardType="numbers-and-punctuation"
						keyboardType="numeric"
						style={this.state.invalid == false? styles.textInput : styles.invalidTextInput}
						onSubmitEditing={(event) => this.addItem()}
					/>
					<View style={styles.space}></View>
				</View>
				{
					thisItem.itemInfo.sort((a, b) => a.price < b.price ? -1 : 1).map((info) => {
						return (
							<View key={info.storeName+info.date} style={styles.content}>
								<Text style={styles.text}>{info.storeName}</Text>
								<Text style={styles.text}>{info.price} kr</Text>
								<Text style={styles.text}>{info.date}</Text>
								<TouchableOpacity onPress={() => this.delete(info)}>
									<Icon name='trash-o' style={{ padding: 15 }} size={20}/>
								</TouchableOpacity>
								
							</View>);
					})
				}
				
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
		onAddItemInfo: (itemInfo, item) => dispatch({ type: 'ADD_ITEMINFO', itemInfo, item }),
		onDeleteInfo: (itemInfo, item) => dispatch({ type: 'DELETE_ITEMINFO', itemInfo, item }),
	}
}

module.exports = connect(
	mapStateToProps,
	mapDispatchToProps
)(ItemExpanded)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		margin: 10,
	},
	header: {
		flexDirection: 'row',
		alignSelf: 'stretch',
	},
	headerTitle: {
		fontSize: 30,
	},
	headerText: {
		flex: 1,
		alignSelf: 'stretch',
		fontSize: 20,
	},
	content: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		borderBottomColor: 'grey',
		borderBottomWidth: 1,
	},
	text: {
		flex: 1,
		alignSelf: 'stretch',
		marginTop: 15,
		marginLeft: 10,
	},
	textInput: {
		flex: 1,
		alignSelf: 'stretch',
		borderWidth: 1,
		borderColor: 'grey',
		borderRadius: 2,
		padding: 2,
		marginRight: 2,
	},
	invalidTextInput: {
		flex: 1,
		alignSelf: 'stretch',
		borderWidth: 1,
		borderColor: 'red',
		borderRadius: 2,
		padding: 2,
		marginRight: 2,
	},
	space: {
		width: 40,
	},

});