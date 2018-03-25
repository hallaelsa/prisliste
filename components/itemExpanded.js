import React from 'react';
import { Platform, StyleSheet, Text, View, ListView, Button, StatusBar, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Item from './item';
import Home from './home';
import { NavigationActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ItemExpanded extends React.Component {
	constructor(props) {
		super(props);
		let index = this.props.navigation.state.params.index;
		let item = this.props.items[index];
		this.state = {
			index,
			item: item.item,
			itemInfo: item.itemInfo,
			newStore: '',
			newPrice: '',
			newDate: '',
		}
	}

	static navigationOptions = ({ navigation }) => {
		return {
			title: `${navigation.state.params.myTitle}`,
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
				<Icon name="arrow-left" style={{ marginLeft: 10 }} size={20} onPress={() => navigation.navigate('Home')} title='Home' />
			,
		};
	};

	addItem() {
		const { navigate } = this.props.navigation;
		if (!this.state.newStore || !this.state.newPrice || !this.state.newDate) {
			return;
		}

		let item = {
			storeName: this.state.newStore,
			price: this.state.newPrice,
			date: this.state.newDate
		}

		this.props.onAddItemInfo(this.state.index, item);
		navigate('ItemExpanded', { index: this.state.index, myTitle: this.state.item });
	}

	render() {
		const { navigate } = this.props.navigation;

		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.headerText}>Butikk</Text>
					<Text style={styles.headerText}>Pris</Text>
					<Text style={styles.headerText}>Dato</Text>
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
						style={styles.textInput}
						onSubmitEditing={(event) => this.addItem()}
					/>
				</View>
				{
					this.state.itemInfo.map((info) => {
						return (
							<View key={info.storeName} style={styles.content}>

								<Text style={styles.text}>{info.storeName}</Text>
								<Text style={styles.text}>{info.price} kr</Text>
								<Text style={styles.text}>{info.date}</Text>
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
		onAddItemInfo: (index, item) => dispatch({ type: 'ADD_ITEMINFO', index, item }),
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
	},
	text: {
		flex: 1,
		alignSelf: 'stretch',
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
});