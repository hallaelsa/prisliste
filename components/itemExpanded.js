import React from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	ListView,
	ScrollView,
	Button,
	StatusBar,
	TextInput,
	TouchableOpacity,
	Alert,
	BackHandler,
	DatePickerAndroid,
	DatePickerIOS,
} from 'react-native';
import { connect } from 'react-redux';
import Item from './item';
import Home from './home';
import { NavigationActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

export default class ItemExpanded extends React.Component {
	constructor(props) {
		super(props);
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
			old: false,
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
				color: 'white',
				fontSize: 24,
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
			headerRight:
				<Icon name="trash" style={{ padding: 16, color: 'white' }}
					size={24} onPress={() => navigation.state.params.deleteItem()} />
			,
		};
	};
	//Alert.alert('Slett', `Vil du slette "${info.storeName}  ${info.price}kr  ${info.date}"?`
	delete(info) {
		Alert.alert('Slett', `Vil du slette \n"${info.storeName}  ${info.price}kr  ${info.date}"?`,
			[{ text: "AVBRYT" },
			{
				text: "JA", onPress: () => {
					this.props.onDeleteInfo(info, this.state.item);
					const { navigate } = this.props.navigation;
					navigate('ItemExpanded', {
						item: this.state.item,
						deleteItem: this.props.navigation.state.params.deleteItem
					});
				}
			}]
		)

	}

	addItem() {
		const { navigate } = this.props.navigation;
		if (!this.state.newStore || !this.state.newPrice || !this.state.newDate) {
			return;
		}

		let newItemInfo = {
			storeName: this.state.newStore,
			price: this.state.newPrice,
			date: this.state.newDate
		}

		this.props.onAddItemInfo(newItemInfo, this.state.item);
		navigate('ItemExpanded', {
			item: this.state.item,
			deleteItem: this.props.navigation.state.params.deleteItem
		});
	}

	openDatePicker = async () => {
		try {
			const { action, year, month, day } = await DatePickerAndroid.open({
				date: new Date()
			});

			if (action !== DatePickerAndroid.dismissedAction) {
				const newDate = moment(new Date(year, month, day)).format('DD.MM.YYYY')
				this.setState({ newDate: newDate })
			}
		} catch ({ code, message }) {
			console.warn('Cannot open date picker', message);
		}
	}

	fixItems(result, thisItem) {
		let prices = thisItem.itemInfo.sort((a, b) => a.price < b.price ? -1 : 1);
		let today = moment();
		let dateLimit = this.props.dateLimit;
		let date;
		let diff

		prices.forEach(element => {
			date = moment(element.date, 'DD.MM.YYYY')
			diff = today.diff(date, 'months');
			if (diff <= dateLimit) {
				result.push(element);
			}
		});

		prices.forEach(element => {
			date = moment(element.date, 'DD.MM.YYYY')
			diff = today.diff(date, 'months');
			if (diff > dateLimit) {
				result.push(element);
			}
		});
	}

	render() {
		const { navigate } = this.props.navigation;
		const thisItem = this.props.items.find(items => items.item === this.state.item);
		const result = []
		this.fixItems(result, thisItem);

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
							onSubmitEditing={(event) => this.addItem()}
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
							onSubmitEditing={(event) => this.addItem()}
						/>
					</View>
					<View style={styles.innerInputContainerDate}>
						<Text style={this.state.dateToutched == true ?
							this.state.dateValid == true ?
								styles.headerTextActive :
								styles.headerTextInvalid :
							styles.headerText}>Dato</Text>
						
						{
							// not sure if this works.......................................................
							Platform.OS === 'ios' ?
							<DatePickerIOS
								date={this.state.newDate}
								onDateChange={(date) => { this.setState({ newDate: newDate }) }}
							/>
							:
							<TextInput
								placeholder="dd.mm.yyyy"
								onFocus={() => this.openDatePicker()}
								onSubmitEditing={(event) => this.addItem()}
								value={this.state.newDate}
								style={this.state.dateToutched == true ?
									this.state.dateValid == true ?
										styles.textInputToutched :
										styles.invalidTextInput :
									styles.textInput}
							/>
						}

					</View>
				</View>
				<ScrollView style={styles.infoScrollContainer}>
					<View style={styles.insideScrollView}>
						{
							result.map((info) => {
								let today = moment();
								let date = moment(info.date, 'DD.MM.YYYY')
								let diff = today.diff(date, 'months');
								let old = false;
								if (diff > this.props.dateLimit) {
									old = true;
								}
								return (
									<View key={info.storeName + info.date} style={styles.contentText}>
										<Text style={old == false ? styles.text : styles.old}>{info.storeName}</Text>
										<Text style={old == false ? styles.text : styles.old}>{info.price} kr</Text>
										<Text style={old == false ? styles.text : styles.old}>{info.date}</Text>
										<TouchableOpacity onPress={() => this.delete(info)}>
											<Icon name='trash-o' style={styles.deleteBtn} size={20} />
										</TouchableOpacity>
									</View>);
							})
						}
					</View>
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		items: state.items,
		dateLimit: state.dateLimit
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
		backgroundColor: 'white',
		//margin: 16,
	},
	headerContainer: {
		flexDirection: 'row',
		alignSelf: 'stretch',
	},
	headerText: {
		fontSize: 12,
		marginBottom: 4,
		color: '#00897B',
	},
	headerTextActive: {
		fontSize: 12,
		marginBottom: 4,
		color: '#00695C',
	},
	headerTextInvalid: {
		fontSize: 12,
		marginBottom: 4,
		color: '#E64A19',
	},
	inputContainer: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		padding: 16,
		backgroundColor: '#F5F5F5',
		elevation: 2,
		paddingBottom: 16,
	},
	innerInputContainerStore: {
		flex: 1.5,
		flexDirection: 'column',
		marginRight: 16,
	},
	innerInputContainerPrice: {
		flex: 1,
		flexDirection: 'column',
		marginRight: 16,
	},
	innerInputContainerDate: {
		flex: 1.5,
		flexDirection: 'column',
	},
	infoScrollContainer: {
		paddingLeft: 16,
		paddingRight: 16,
	},
	insideScrollView: {
		marginTop: 8,
		marginBottom: 8,
	},
	contentText: {
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomColor: '#EEEEEE',
		borderBottomWidth: 1,
	},
	text: {
		flex: 1,
		alignSelf: 'center',
	},
	old: {
		flex: 1,
		alignSelf: 'center',
		color: 'lightgrey',
	},
	deleteBtn: {
		padding: 16,
		alignSelf: 'center',
		color: '#E53935'
	},
	textInput: {
		borderBottomWidth: 1,
		borderBottomColor: '#00897B',
	},
	textInputToutched: {
		borderBottomWidth: 1,
		borderBottomColor: '#00695C',
	},
	invalidTextInput: {
		borderBottomWidth: 1,
		borderBottomColor: '#E64A19',
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

});