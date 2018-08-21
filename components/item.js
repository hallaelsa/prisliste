import React from 'react';
import { StyleSheet, Text, View, ListView } from 'react-native';

// Next: filter out old entries

export default class Item extends React.Component {
	constructor(props) {
		super(props);
		// props: item, itemInfo[{storeName, price, date}]

	}

	render() {
		const itemInfo = this.props.data.itemInfo;
		let key = 0;
		return (
			<View>
				<Text style={styles.header}>{this.props.data.item}</Text>
				{
					itemInfo.slice(0).sort((a, b) => a.price < b.price ? -1 : 1).splice(0, 2).map((info) => {
						return (
							<View key={key} style={styles.textContainer}>
								<Text numberOfLines={1} key={key++} style={styles.textStore}>{info.storeName} </Text>
								<Text numberOfLines={1} key={key++} style={styles.textPrice}>  {info.price} kr </Text>
								<Text numberOfLines={1} key={key++} style={styles.textDate} >  {info.date}</Text>
								<View style={styles.space}></View>
							</View>
						);
					})
				}
			</View>
		);
	}

	cheapest() {
		let cheapest = this.props.data.itemInfo.sort((a, b) => {
			if (a.price > b.price) {
				return 1;
			} else if (a.price < b.price) {
				return -1;
			} else {
				return 0;
			}
		});

		return cheapest;
	}

}

const styles = {
	header: {
		fontSize: 16,
		paddingBottom: 2,
	},
	textContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	textPrice: {
		flex: 1,
		fontSize: 14,
		color: 'black',
		opacity: 0.87,
	},
	textStore: {
		flex: 1,
		fontSize: 14,
		color: 'black',
		opacity: 0.87,
	},
	textDate: {
		flex: 1,
		color: 'black',
		opacity: 0.54,
		fontSize: 14,
	},
	space: {
		width: 56,
	},
}