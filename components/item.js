import React from 'react';
import { StyleSheet, Text, View, ListView } from 'react-native';

export default class Item extends React.Component { 
    constructor(props) {
        super(props);
        // props som trengs: itemName, entryArray[{storeName, price, date}]

    }

    render() {
        const itemArray = [
            { storeName: "Rimi", price: 100 },
            { storeName: "Kiwi", price: 102 }, 
            { storeName: "Rema", price: 99 }
        ];
        return (
            <View>
                {
                    itemArray.map( (item) => <Text>{item.storeName}, {item.price}</Text> )
                }
            </View>
        );
    }
    
}