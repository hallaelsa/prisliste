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
							<View key={key}  style={styles.textContainer}>
								<Text key={key++} style={styles.text}>{info.price} kr </Text>
								<Text  key={key++} style={styles.text2} > - {info.storeName} </Text>
								<Text key={key++} style={styles.text2} > - {info.date}</Text>
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
		fontSize: 18,
	},
	textContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	text: {
		fontSize: 14,
	},
	text2: {
		color: 'dimgrey',
		fontSize: 14,
	},
}