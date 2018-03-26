import React from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight, StatusBar } from 'react-native';
import Item from './item.js';
import Search from './search.js'
import ItemExpanded from './itemExpanded.js';
import { connect } from 'react-redux';


// Next: Add completely new item
// search results lingers... should be removed after clicking
// Future: add settings button (define old entries,).

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.state = {
			data: ds.cloneWithRows(this.sortList()),
		}
	}

	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Prisliste',
			headerTitleStyle: {
				alignSelf: 'center',
				textAlign: 'center',
				color: 'black',
				fontSize: 30
			},
			headerStyle: {
				height: 56 + StatusBar.currentHeight,
				paddingTop: StatusBar.currentHeight
			},
			headerLeft: null
		};
	};

	deleteItem(item) {
		//alert("hei")
		const { navigate } = this.props.navigation;
		this.props.onDeleteItem(item);
		navigate('Home');
	}

	sortList() {
		let sortedList = this.props.items.sort((a, b,) => a.item < b.item ? -1 : 1);
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
					return( 
					<TouchableHighlight 
						onPress= {() => navigate('ItemExpanded', { 
							item: element, 
							deleteItem: this.deleteItem.bind(this, element) })}
						key={key++}
						style={styles.searchResults}
					>
							<Text style={styles.searchResultsText}>{element}</Text>
					</TouchableHighlight> )
				})}
				<ListView
					dataSource={this.state.data}
					renderRow={
						(rowData, sectionId, rowId) =>
							<TouchableHighlight
									onPress= {() => navigate('ItemExpanded', { 
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
	}
}

module.exports = connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)

const styles = StyleSheet.create({
	container: {
		margin: 10,
		flex: 1,
		flexDirection: 'column',
	},
	listView: {
		//flex: 1,
		marginLeft: 10,
	},
	items: {
		marginBottom: 2,
		paddingBottom: 2,
		marginTop: 2,
		borderBottomWidth: 1,
		borderBottomColor: 'ghostwhite'
	},
	searchResults: {
		borderWidth: 1,
		borderColor: 'white',
		padding: 10,
		backgroundColor: 'ghostwhite',
		marginBottom: 2,
	},
	searchResultsText: {
		fontSize: 16,
	},
});