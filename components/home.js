import React from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight, StatusBar } from 'react-native';
import Item from './item.js';
import ItemExpanded from './itemExpanded.js';
import { connect } from 'react-redux';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            data: ds.cloneWithRows(this.props.items),
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

    render() {
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.data}
                    renderRow={ 
                        (rowData, sectionId, rowId) => 
                        <TouchableHighlight
                            onPress={() => navigate( 'ItemExpanded', {index : rowId} )}
                        >
                            <Item
                                data={rowData}
                            />
                        </TouchableHighlight>
                        
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

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
});