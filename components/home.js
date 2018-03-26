import React from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight, StatusBar } from 'react-native';
import Item from './item.js';
import Search from './search.js'
import ItemExpanded from './itemExpanded.js';
import { connect } from 'react-redux';


// Next: Add completely new item
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

	sortList() {
		let sortedList = this.props.items.sort((a, b,) => a.item < b.item ? -1 : 1);
		return sortedList;
	}

	render() {
		const { navigate } = this.props.navigation;
		let key = 0;
		return (
			<View style={styles.container}>
				<Search
					style={styles.search}
				/>
				{this.props.search.map(element => {
					return( 
					<TouchableHighlight 
						onPress= {() => navigate('ItemExpanded', { item: element })}
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
									onPress= {() => navigate('ItemExpanded', { item: this.props.items[rowId].item })}
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


module.exports = connect(
	mapStateToProps,
	//mapDispatchToProps
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
		marginBottom: 5,
		borderBottomWidth: 1,
		borderBottomColor: 'grey'
	},
	searchResults: {
		borderWidth: 1,
		borderColor: 'white',
		marginBottom: 2,
	},
	searchResultsText: {
		fontSize: 16,
	},
});