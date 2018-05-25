import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	ListView,
	TouchableHighlight,
	StatusBar,
	Modal,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
	Alert,
	AsyncStorage,
} from 'react-native';
import Item from './item.js';
import Search from './search.js'
import Settings from './settings.js'
import ItemExpanded from './itemExpanded.js';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';


// Next: Add completely new item
// search results lingers... should be removed after clicking
// Future: add settings button (define old entries,).
// after search only display searched items in list

export default class Home extends React.Component {
	async componentDidMount() {
		try {
			const data = JSON.parse(await AsyncStorage.getItem('@pl:items'));
			console.log(data);
			console.log(1);
				this.props.onSetItems(data);
		} catch (error) {
			
		}
    
	}
	
	constructor(props) {
		super(props);
		//const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.state = {
			//data: ds.cloneWithRows(this.sortList()),
			modalVisible: false,
			newItem: '',
			search: '',
		}
	}

	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Prisliste',
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
			headerLeft: null,
			headerRight: <Icon name='cog' style={{ padding: 16, color: 'white' }} size={24} onPress={() => navigation.navigate('Settings')} />
		};
	};

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}

	addItem() {
		if (!this.state.newItem) {
			return;
		}
		this.setModalVisible(false);
		let itemInfo = []
		let item = this.state.newItem;
		let items = { item, itemInfo }
		let addItem = true;

		const { navigate } = this.props.navigation;


		this.props.items.forEach(element => {
			if (element.item.toLowerCase() === item.toLowerCase()) {
				addItem = false;
				navigate('ItemExpanded', { item: element.item, deleteItem: this.deleteItem.bind(this, element) })
			}
		});

		if (addItem == true) {
			this.props.onAddItem(items);
			//alert(item.itemInfo[0].price);
			navigate('ItemExpanded', { item: item, deleteItem: this.deleteItem.bind(this, item) })
		}

	}

	deleteItem(item) {
		Alert.alert('Slett', `Vil du slette "${item}"?`,
			[{ text: "AVBRYT" },
			{
				text: "JA", onPress: () => {
					const { navigate } = this.props.navigation;
					this.props.onDeleteItem(item);
					setTimeout(() => navigate('Home'), 300);
				}
			}]
		)
	}

	sortList() {
		let sortedList;
		let search = this.props.search
		if (!search) {
			sortedList = this.props.items.sort((a, b, ) => a.item.toLowerCase() < b.item.toLowerCase() ? -1 : 1);
		} else {
			if(search.length > 0) {
				sortedList = this.props.items.slice(0).filter(element => this.props.search.includes(element.item));
			}else {
				sortedList = this.props.items.sort((a, b, ) => a.item.toLowerCase() < b.item.toLowerCase() ? -1 : 1);
			}
		}
		return sortedList;
	}

	emptySearch(navigate, rowData) {
		navigate('ItemExpanded', {
			item: rowData.item,
			deleteItem: this.deleteItem.bind(this, rowData.item)
		})

		if (this.props.search.length > 0) {
			let empty = [];
			this.props.onEmpty(empty);
		}

	}

	render() {
		const { navigate } = this.props.navigation;
		let key = 1000;
		return (
			<View style={styles.container}>
				<Search
					style={styles.search}
				/>
				{/* {this.props.search.map(element => {
					return (
						<TouchableHighlight
							onPress={() => navigate('ItemExpanded', {
								item: element,
								deleteItem: this.deleteItem.bind(this, element)
							})}
							key={key++}
							style={styles.searchResults}
						>
							<Text style={styles.searchResultsText}>{element}</Text>
						</TouchableHighlight>)
				})} */}
				<ListView
					dataSource={new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(this.sortList())}
					renderRow={
						(rowData, sectionId, rowId) =>
							<TouchableHighlight
								onPress={() => this.emptySearch(navigate, rowData)}
								style={styles.items}
								underlayColor={'white'}
							>
								<Item
									data={rowData}
								/>
							</TouchableHighlight>

					}
					style={styles.listView}
				/>
				<Modal
					animationType='slide'
					visible={this.state.modalVisible}
					transparent={true}
					onRequestClose={() => { }}
				>
					<View style={{ flex: 1 }}>
						<TouchableOpacity
							onPress={() => { this.setModalVisible(!this.state.modalVisible); }}
							style={styles.modalReturn}
						>
						</TouchableOpacity>
						<KeyboardAvoidingView style={{ flex: 2 }}>
							<View style={styles.modalContainer}>
								<TextInput
									underlineColorAndroid="transparent"
									style={styles.modalInput}
									onChangeText={(text) => this.setState({ newItem: text.trim() })}
									autoFocus={true}
									onSubmitEditing={() => this.addItem()}
								/>

							</View>
						</KeyboardAvoidingView>
					</View>
				</Modal>
				<TouchableHighlight
					onPress={() => { this.setModalVisible(!this.state.modalVisible); }}
					style={styles.addBtn}
				>
					<Icon name='plus' size={20} style={{ color: 'white' }} />
				</TouchableHighlight>
			</View>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		items: state.items,
		search: state.search,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		onDeleteItem: (item) => dispatch({ type: 'DELETE_ITEM', item }),
		onAddItem: (item) => dispatch({ type: 'ADD_ITEM', item }),
		onEmpty: (search) => dispatch({ type: 'GET_SEARCH', search }),
		onSetItems: (items) => dispatch({ type: 'SET_ITEMS', items }),
	}
}

module.exports = connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)

const styles = StyleSheet.create({
	container: {
		padding: 16,
		paddingBottom: 0,
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'white',
	},
	listView: {
	},
	items: {
		paddingBottom: 8,
		marginTop: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#EEEEEE'
	},
	searchResults: {
		borderWidth: 1,
		borderColor: '#BDBDBD',

		padding: 8,
		backgroundColor: 'ghostwhite',
	},
	searchResultsText: {
		fontSize: 14,
		fontStyle: 'italic',
	},
	addBtn: {
		backgroundColor: '#00897B',
		height: 56,
		width: 56,
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		bottom: 16,
		right: 16,
		elevation: 2,
	},
	addItemBtn: {
		backgroundColor: '#00897B',
		height: 48,
		width: 48,
		margin: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalReturn: {
		flex: 6,
		backgroundColor: 'rgba(60,60,60,0.4)',
	},
	modalContainer: {
		flex: 1,
		backgroundColor: 'white',
	},
	modalInput: {
		height: 35,
		flex: 1,
		margin: 16,
		padding: 8,
		alignSelf: 'stretch',
		backgroundColor: 'white',
		borderBottomColor: '#00897B',
		borderBottomWidth: 1,
	},
	modalText: {
		marginLeft: 20,
		fontSize: 16,
	},
});