import React, { createRef, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, FlatList } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import ButtonWithIcon from '../components/Button/ButtonWithIcon';
import { onUpdateCart, onCreateOrder, onGetOrders } from '../redux/actions';
import { OrderModel, ShoppingState, UserState } from '../redux/model';
import { ApplicationState } from '../redux/reducers';
import { useNavigation } from '../utils';
import PaymentTypePopup from 'react-native-raw-bottom-sheet';
import OrderCard from '../components/OrderCard';
import { NavigationEvents } from 'react-navigation';


interface OrderScreenProps{
    onGetOrders: Function
    userReducer: UserState,
    navigation: { getParam: Function, goBack: Function}

}


const _OrderScreen: React.FC<OrderScreenProps> = (props) => {
    const { goBack } = props.navigation;
    const { user, orders } = props.userReducer;
    const { navigate } = useNavigation();

    console.log(`Available Orders ${JSON.stringify(orders)}`)

    useEffect(() => {
        onGetOrders(user);
    }, [])

    const onTapOrder = (order: OrderModel) => {
        navigate('OrderDetailPage', { order })
    }


    const orderView = () => {
        return (
            <View style={styles.container}>
                <View style={styles.navigation}>
                    <View style={{ display: 'flex', height: 60, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', marginLeft: 4, paddingLeft: 20, paddingRight: 20 }}>
                        <ButtonWithIcon icon={require('../images/back_arrow.png')}
                            onTap={() => goBack()}
                            width={32} height={38}
                        ></ButtonWithIcon>
                        <Text style={{ fontSize: 22, fontWeight: '600' }}>Orders</Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={orders}
                        renderItem={({ item }) => <OrderCard
                            item={item}
                            onTap={() => onTapOrder(item)}
                        />
                        }
                        keyExtractor={(item) => `${item._id}`}
                    />
                </View>
                <View style={styles.footer}>
                    
                </View>
            </View>
        )
    }

    if (orders.length > 0) {
        return orderView();
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.navigation}>
                    <View style={{ display: 'flex', height: 60, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', marginLeft: 4, paddingLeft: 20, paddingRight: 20 }}>

                        <ButtonWithIcon icon={require('../images/back_arrow.png')}
                            onTap={() => goBack()}
                            width={32} height={38}
                        ></ButtonWithIcon>
                        <Text style={{ fontSize: 22, fontWeight: '600' }}>Orders</Text>

                    </View>
                </View>
                <View style={styles.body}>
                    <Text style={{ fontSize: 25, fontWeight: '600' }}>Your Order is Empty</Text>
                </View>

            </View>
        )
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2f2f2'
    },
    navigation: {
        flex: 1,
        marginTop: 43,
    },
    body: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    footer: {
        flex: 2,
        backgroundColor: 'cyan',
        padding: 10
    },
    amountView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20
    },
    paymentView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        margin: 5,
        backgroundColor: '#e3be74'
    },
    paymentOptions: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20
    },
    options: {
        display: 'flex',
        height: 120,
        width: 160,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 10,
        borderColor: '#a0a0a0',
        backgroundColor: '#f2f2f2',
        borderWidth: 0.2,
        borderRadius: 10,
        margin: 10
    },
    icon: {
        width: 115,
        height: 50
    }



})

const mapStateToProps = (state: ApplicationState) => ({
    userReducer: state.userReducer
})

const OrderScreen = connect(mapStateToProps, { onGetOrders })(_OrderScreen)

export { OrderScreen };


// 8:23