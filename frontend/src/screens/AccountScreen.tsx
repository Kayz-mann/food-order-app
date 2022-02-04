import React, { createRef, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import ButtonWithIcon from '../components/Button/ButtonWithIcon';
import ButtonWithTitle from '../components/Button/ButtonWithTitle';
import ButtonWithTitleIcon from '../components/Button/ButtonWithTitle';
import FoodCard from '../components/FoodCard';
import SearchBar from '../components/SearchBar';
import { onUpdateCart, onCreateOrder } from '../redux/actions';
import { FoodModel, ShoppingState, UserState } from '../redux/model';
import { ApplicationState } from '../redux/reducers';
import { checkExistence, useNavigation } from '../utils';
import PaymentTypePopup from 'react-native-raw-bottom-sheet';
import { LoginScreen } from './LoginScreen';


interface AccountScreenProps{
    shoppingReducer: ShoppingState
    userReducer: UserState
    onUpdateCart: Function
    onCreateOrder: Function
}


const _AccountScreen: React.FC<AccountScreenProps> = (props) => {
    // const [isEditing, setIsEditing] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [totalAmount, setTotalAmount] = useState(0)

    const { availableFoods } = props.shoppingReducer;
    const { navigate } = useNavigation();
    const { Cart, user, location, orders } = props.userReducer;
    const popupRef = createRef<PaymentTypePopup>();


    useEffect(() => {
        onCalculateAmount();
    }, [Cart])

    const onCalculateAmount = () => {
        let total = 0;

        if(Array.isArray(Cart)){
             Cart.map(food => {
                total += food.price + food.unit
            })
        }
       
        setTotalAmount(total)
    }

    if (user.token !== undefined) {
    
        return (
            <View style={styles.container}>
               <View style={styles.navigation}>
                    <View style={{ display: 'flex', height: 60, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', marginLeft: 4,paddingLeft: 20, paddingRight: 20 }}>
                        <Image source={require('../images/avatar.png')} style={{ width: 150, height: 150, marginRight: 20 }} />
                        <View>
                            <Text>{user.firstName || 'Guest'}</Text>
                            <Text>{user.email}</Text>
                        </View>
                    </View>
                </View>
          </View>
      );
    } else {
        return (
           <LoginScreen />
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
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
})

const AccountScreen = connect(mapStateToProps, { onUpdateCart, onCreateOrder })(_AccountScreen)

export { AccountScreen };


