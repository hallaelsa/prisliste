import React from 'react';
import { StyleSheet, Text, View, ListView } from 'react-native';
import Item from './item.js'
import { connect } from 'react-redux';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            data: ds.cloneWithRows(this.props.items),
        }
    }
    render() {
        return(
            <View>
                <Text>Prisliste</Text>
                <ListView
                    dataSource={this.state.data}
                    renderRow={ 
                        (rowData, sectionId, rowId) => 
                        <Item
                            data={rowData}
                        />
                    }
                />
            </View>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        items: state.items
    }
}


module.exports = connect(
    mapStateToProps,
    //mapDispatchToProps
)(Home)