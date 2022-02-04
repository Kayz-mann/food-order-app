import React, { createRef, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, FlatList, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import ButtonWithIcon from '../components/Button/ButtonWithIcon';
import { onUpdateCart, onCreateOrder, onGetOrders, onCancelOrder } from '../redux/actions';
import { OrderModel, ShoppingState, UserState } from '../redux/model';
import { ApplicationState } from '../redux/reducers';
import { useNavigation } from '../utils';
import PaymentTypePopup from 'react-native-raw-bottom-sheet';
import OrderCard from '../components/OrderCard';
import FoodCard from '../components/FoodCard';
import moment from 'moment';
import ButtonWithTitle from '../components/Button/ButtonWithTitle';


interface OrderDetailScreenProps{
    onGetOrders: Function
    onCancelOrder: Function
    userReducer: UserState,
    navigation: { getParam: Function, goBack: Function}

}


const _OrderDetailScreen: React.FC<OrderDetailScreenProps> = (props) => {
    const { goBack, getParam } = props.navigation;
    const { user, orders } = props.userReducer;

    const order = getParam('order') as OrderModel;

    console.log(`Available Orders ${JSON.stringify(orders)}`)

    useEffect(() => {
        onGetOrders(user);
    }, [])

    const onTapCancelOrder = () => {
        Alert.alert(
            'Do you want to cancel this Order?',
            'Cancellation charge may be applicable as per terms and conditions! \n We will send you cancellation confirmation soon!',
            [
                { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                {
                    text: 'Yes', onPress: () => {
                    // we will execute cancel Order
                        props.onCancelOrder(order, user);
                        goBack();
                }}
            ]
        )
    }

    const headerCard = () => {
        return (
            <View style={{ padding: 10, alignItems: 'flex-start' }}>
                <Text style={styles.orderInfo}>Order Date: {moment(order.orderDate).format('Do MM YY, h:mm a')}</Text>
                <Text style={styles.orderInfo}>Order Amount: {moment(order.totalAmount).format('Do MM YY, h:mm a')}</Text>
                <Text style={styles.orderInfo}>Paid Through: {moment(order.paidThrough).format('Do MM YY, h:mm a')}</Text>
                <Text style={styles.orderInfo}>Status: {moment(order.orderStatus).format('Do MM YY, h:mm a')}</Text>
            </View>
        )
    }

    const footerCard = () => {
        if (order.orderStatus.toLocaleLowerCase() === 'cancelled') {
            return (
                <View style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: 300, backgroundColor: '#c5c5c5'  }}>
                    <Text style={{ fontSize: 18 }}>Order is Cancelled with ID: XXXX</Text>
                </View>
            )
        } else {
            return (
                <>
                    <View style={{ display: 'flex', margin: 10, justifyContent: 'center', alignItems: 'center', height: 300, backgroundColor: '#c5c5c5' }}>
                        <Text style={{ fontSize: 18 }}>Map view will go here...</Text>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <ButtonWithTitle title='Cancel Order' onTap={onTapCancelOrder} height={50} width={320} />
                    </View>
                </>
            )
        }
    }


 
        return (
            <View style={styles.container}>
                <View style={styles.navigation}>
                    <View style={{ display: 'flex', height: 60, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', marginLeft: 4, paddingLeft: 20, paddingRight: 20 }}>
                        <ButtonWithIcon icon={require('../images/back_arrow.png')}
                            onTap={() => goBack()}
                            width={32} height={38}
                        ></ButtonWithIcon>
                        <Text style={{ fontSize: 22, fontWeight: '600' }}>Order ID: {order.orderID}</Text>
                    </View>
                </View>
                <View style={styles.body}>
                 
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={order.items}
                        renderItem={({ item }) => <FoodCard
                            item={item.food}
                            onTap={() => { }}
                            onUpdateCart={() => {}} />
                        }
                        keyExtractor={(item) => `${item._id}`}
                        ListHeaderComponent={headerCard}
                        ListFooterComponent={footerCard}
                    />
                   =
                </View>
                {/* <View style={styles.footer}>
                    
                </View> */}
            </View>
        )
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
    },
    orderInfo: {
        fontSize: 22,
        color: '#7c7c7c',
        fontWeight: '400',
        marginBottom: 10
    }



})

const mapStateToProps = (state: ApplicationState) => ({
    userReducer: state.userReducer
})

const OrderDetailScreen = connect(mapStateToProps, { onGetOrders, onCancelOrder })(_OrderDetailScreen)

export { OrderDetailScreen };


// 17:45