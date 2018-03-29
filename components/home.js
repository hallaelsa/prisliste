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
} from 'react-native';
import Item from './item.js';
import Search from './search.js'
import ItemExpanded from './itemExpanded.js';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';


// Next: Add completely new item
// search results lingers... should be removed after clicking
// Future: add settings button (define old entries,).

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.state = {
			data: ds.cloneWithRows(this.sortList()),
			modalVisible: false,
			newItem: '',
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
		//alert("hei")
		const { navigate } = this.props.navigation;
		this.props.onDeleteItem(item);
		navigate('Home');
	}

	sortList() {
		let sortedList = this.props.items.sort((a, b, ) => a.item.toLowerCase() < b.item.toLowerCase() ? -1 : 1);
		return sortedList;
	}

	render() {
		const { navigate } = this.props.navigation;
		let key = 1000;
		return (
			<View style={styles.container}>
				<Search
					style={styles.search}
				/>
				{this.props.search.map(element => {
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
				})}
				<ListView
					dataSource={this.state.data}
					renderRow={
						(rowData, sectionId, rowId) =>
							<TouchableHighlight
								onPress={() => navigate('ItemExpanded', {
									item: this.props.items[rowId].item,
									deleteItem: this.deleteItem.bind(this, this.props.items[rowId].item)
								})}
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
					onRequestClose={() => { alert('closed'); }}
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
											onChangeText={(text) => this.setState({ newItem: text })}
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