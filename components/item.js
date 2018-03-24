import React from 'react';
import { StyleSheet, Text, View, ListView } from 'react-native';

export default class Item extends React.Component { 
    constructor(props) {
        super(props);
        // props som trengs: item, itemInfo[{storeName, price, date}]

    }

    render() {
        return (
            <View>
                <Text>{this.props.data.item}</Text>
                {
                    this.props.data.itemInfo.map((info) => {
                        return(<Text key={info.storeName}>{info.storeName}, {info.price}, {info.date}</Text>);
                    })
                }
            </View>
        );
    }
    
}