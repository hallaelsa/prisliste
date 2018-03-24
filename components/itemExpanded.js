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
        };
    };

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <Text style={styles.headerTitle}>{this.state.item}</Text>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Butikk</Text>
                    <Text style={styles.headerText}>Pris</Text>
                    <Text style={styles.headerText}>Dato</Text>
                </View>
                {
                    this.state.itemInfo.map((info) => {
                        return(
                        <View key={info.storeName} style={styles.content}>
                            <Text style={styles.text}>{info.storeName}</Text>
                            <Text style={styles.text}>{info.price}kr</Text> 
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
    }
});