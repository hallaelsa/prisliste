import React from 'react';
import { StyleSheet, Text, View, ListView } from 'react-native';
import Item from './item.js'

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            data: ds.cloneWithRows(['Vare, pris, butikk','Vare, pris, butikk','Vare, pris, butikk']),
        }
    }
    render() {
        return(
            <View>
                <Text>Prisliste</Text>
                <ListView
                    dataSource={this.state.data}
                    renderRow={ 
                        (rowData) => <Item/>
                    }
                />
            </View>
        );
    }
}