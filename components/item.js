import React from 'react';
import { StyleSheet, Text, View, ListView } from 'react-native';

export default class Item extends React.Component { 
    constructor(props) {
        super(props);
        // props: item, itemInfo[{storeName, price, date}]

    }

    render() {
        return (
            <View>
                <Text style={styles.header}>{this.props.data.item}</Text>
                {
                    this.props.data.itemInfo.map((info) => {
                        return(<Text key={info.storeName}>{info.storeName}, {info.price}kr, {info.date}</Text>);
                    })
                }
            </View>
        );
    }
    
}

const styles = {
    header: {
        fontSize: 20,
    },
}