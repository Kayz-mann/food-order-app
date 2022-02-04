import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Image } from 'react-native';

import { FoodModel, OrderModel } from '../redux/model';
import AddRemove from '../components/Button/AddRemove';
import moment from 'moment';


interface OrderCardProps{
    item: OrderModel;
    onTap: Function;
}


const OrderCard: React.FC<OrderCardProps> = ({ item, onTap }) => {

// decide order status
    
    const orderStatus = () => {
        const status = item.orderStatus.toLocaleLowerCase();
        let statusIcon = require('../images/order_process.png');
        let statusMessage = status;

        if (status === 'completed') {
            statusMessage = 'Delivered'
            statusIcon = require('../images/orders.png')
        } else if (status === 'cancelled') {
            statusMessage = 'Cancelled'
            statusIcon = require('../images/warning-icon.png');
        }
        return (
            <View style={{ display: 'flex', flex: 3, padding: 5, alignItems: 'center', justifyContent: 'space-around' }}>
                <Image source={statusIcon} style={{ width: 60, height: 60 }} />
                <Text style={{ fontSize: 12, color: '#7c7c7c' }}>{statusMessage.toUpperCase()}</Text>
            </View>
        )
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => onTap()}>
            <View style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={{ display: 'flex', flex: 8, padding: 5, marginTop: 5, paddingLeft: 20, justifyContent: 'space-around', alignItems: 'flex-start' }}>
                    <Text style={{ fontSize: 22, fontWeight: '500' }}>Order ID: {item.orderID}</Text>
                    <Text style={{ fontSize: 22, fontWeight: '600', color: '#7c7c7c' }}>{moment(item.orderDate).format('Do MMM YY, h: mm a')}</Text>
                    <Text style={{ fontSize: 22, fontWeight: '500', color: '#FF5733' }}>NGN{item.totalAmount}</Text>

                </View>
                {orderStatus()}
            </View>
        </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: '#e5e5e5',
        width: Dimensions.get('screen').width - 20,
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#fff',
        height: 100,
        justifyContent: 'flex-start',
        borderWidth: 1,
        flexDirection: 'row'
    },
    navigation: {
        flex: 2,
        backgroundColor: 'red'
    },
    body: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
    footer: {
        flex: 1,
        backgroundColor: 'cyan'
    }
})

export default OrderCard;