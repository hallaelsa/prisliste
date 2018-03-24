import React from 'react';
import { StyleSheet, Text, View, ListView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import Item from './item';
import { NavigationActions } from 'react-navigation'

export default class ItemExpanded extends React.Component { 
    constructor(props) {
        super(props);
        let index = this.props.navigation.state.params.index;
        let item = this.props.items[index];
        this.state = {
            index,
            item: item.item,
            itemInfo: item.itemInfo,
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Oversikt',
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

        return (
            <View>
                <View style={styles.header}>
                    <Text>Butikk</Text>
                    <Text>Pris</Text>
                    <Text>Dato</Text>
                </View>
                {
                    this.state.itemInfo.map((info) => {
                        return(<Text key={info.storeName}>{info.storeName}, {info.price}kr, {info.date}</Text>);
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

module.exports = connect(
    mapStateToProps,
    //mapDispatchToProps
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
    }
});