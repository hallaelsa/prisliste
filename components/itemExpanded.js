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
			invalid: false,
			dateValid: true,
			dateToutched: false,
			storeToutched: false,
			priceToutched: false,
		}
	}

	static navigationOptions = ({ navigation }) => {
		return {
			title: `${navigation.state.params.item}`,
			headerTitleStyle: {
				flex: 1,
				alignSelf: 'center',
				textAlign: 'center',
				justifyContent: 'space-between',
				color: 'black',
				fontSize: 24,
			},
			headerStyle: {
				height: 56 + StatusBar.currentHeight,
				paddingTop: StatusBar.currentHeight
			},
			headerLeft:
				<Icon name="arrow-left" style={{ padding: 16, color: '#00897B' }} size={24} onPress={() => navigation.navigate('Home')} />
			,
			headerRight:
				<Icon name="trash" style={{ padding: 16, color: '#E53935' }} size={24} onPress={() => navigation.state.params.deleteItem()} />
			,
		};
	};

	delete(info) {
		// kan jeg hente inn denne et annet sted så jeg kun trenger å hente den en gang?
		const { navigate } = this.props.navigation;
		this.props.onDeleteInfo(info, this.state.item);
		navigate('ItemExpanded', { item: this.state.item, deleteItem: this.props.navigation.state.params.deleteItem });
	}

	addItem() {
		const { navigate } = this.props.navigation;
		if (!this.state.newStore || !this.state.newPrice || !this.state.newDate) {
			return;
		}

		let regex = new RegExp("^[0-9]{2}.[0-9]{2}.[0-9]{4}$");
		if (!regex.test(this.state.newDate)) {
			this.setState({ invalid: true });
			return;
		}
		this.setState({ invalid: false });

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
		const thisItem = this.props.items.find(items => items.item === this.state.item);

		return (
			<View style={styles.container}>
				<View style={styles.inputContainer}>
					<View style={styles.innerInputContainerStore}>
						<Text style={this.state.storeToutched ? styles.headerTextActive : styles.headerText}>Butikknavn</Text>
						<TextInput
							onChangeText={(newStore) => this.setState({ newStore: newStore })}
							onFocus={() => this.setState({ storeToutched: true })}
							onBlur={() => this.setState({ storeToutched: false })}
							underlineColorAndroid="transparent"
							value={this.state.newStore}
							style={this.state.storeToutched == true ? styles.textInputToutched : styles.textInput}
						/>
					</View>
					<View style={styles.innerInputContainerPrice}>
						<Text style={this.state.priceToutched ? styles.headerTextActive : styles.headerText}>Pris</Text>
						<TextInput
							onChangeText={(newPrice) => this.setState({ newPrice: newPrice })}
							onFocus={() => this.setState({ priceToutched: true })}
							onBlur={() => this.setState({ priceToutched: false })}
							underlineColorAndroid="transparent"
							value={this.state.newPrice}
							keyboardType="numeric"
							style={this.state.priceToutched == true ? styles.textInputToutched : styles.textInput}
						/>
					</View>
					<View style={styles.innerInputContainerDate}>
						<Text style={this.state.dateToutched ? styles.headerTextActive : styles.headerText}>Dato</Text>
						<TextInput
							placeholder="dd.mm.yyyy"
							onChangeText={(newDate) => this.setState({ newDate: newDate })}
							onFocus={() => this.setState({ dateToutched: true })}
							onBlur={() => this.setState({ dateToutched: false })}
							underlineColorAndroid="transparent"
							value={this.state.newDate}
							keyboardType="numbers-and-punctuation"
							keyboardType="numeric"
							style={this.state.dateToutched == true ? styles.textInputToutched : this.state.dateValid == true ? styles.textInput : styles.invalidTextInput}
							onSubmitEditing={(event) => this.addItem()}
						/>
					</View>
				</View>
				<View style={styles.infoContainer}>
					{
						//alert(thisItem.itemInfo[0].price)
						thisItem.itemInfo.sort((a, b) => a.price < b.price ? -1 : 1).map((info) => {
							return (
								<View key={info.storeName + info.date} style={styles.contentText}>
									<Text style={styles.text}>{info.storeName}</Text>
									<Text style={styles.text}>{info.price} kr</Text>
									<Text style={styles.text}>{info.date}</Text>
									<TouchableOpacity onPress={() => this.delete(info)} style={styles.deleteBtn}>
										<Icon name='trash-o' style={{ padding: 8, margin: 8, color: '#E53935' }} size={20} />
									</TouchableOpacity>

								</View>);
						})
					}
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
		onAddItemInfo: (itemInfo, item) => dispatch({ type: 'ADD_ITEMINFO', itemInfo, item }),
		onDeleteInfo: (itemInfo, item) => dispatch({ type: 'DELETE_ITEMINFO', itemInfo, item }),
		//onDeleteItem: (item) => dispatch({ type: 'DELETE_ITEM', item }),
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
		margin: 16,
	},
	headerContainer: {
		flexDirection: 'row',
		alignSelf: 'stretch',
	},
	headerText: {
		fontSize: 14,
		marginBottom: 8,
		marginTop: 8,
		color: '#00897B',
		opacity: 0.54,
	},
	headerTextActive: {
		fontSize: 14,
		marginBottom: 8,
		marginTop: 8,
		color: '#00897B',
	},
	headerTextInvalid: {
		fontSize: 14,
		marginBottom: 8,
		marginTop: 8,
		color: '#E64A19',
	},
	inputContainer: {
		flexDirection: 'row',
		alignSelf: 'stretch',
	},
	innerInputContainerStore: {
		flex: 2,
		flexDirection: 'column',
		margin: 8,
	},
	innerInputContainerPrice: {
		flex: 1,
		flexDirection: 'column',
		margin: 8,
	},
	innerInputContainerDate: {
		flex: 2,
		flexDirection: 'column',
		margin: 8,
	},
	contentText: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		borderBottomColor: '#BDBDBD',
		borderBottomWidth: 1,
	},
	text: {
		flex: 1,
		alignSelf: 'stretch',
		marginTop: 16,
		marginLeft: 8,
	},
	textInput: {
		borderBottomWidth: 1,
		borderBottomColor: '#00897B',
		opacity: 0.54,
	},
	textInputToutched: {
		borderBottomWidth: 1,
		borderBottomColor: '#00897B',
	},
	invalidTextInput: {
		borderBottomWidth: 1,
		borderBottomColor: '#E64A19',
	},
	infoContainer: {
		marginTop: 16,
	},
	space: {
		width: 40,
	},
	deleteBig: {
		position: 'absolute',
		top: 0,
		right: 10,
		marginRight: 10,
		padding: 15
	},
	deleteBtn: {
	},

});