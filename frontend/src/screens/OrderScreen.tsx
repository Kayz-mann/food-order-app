import React, { createRef, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import ButtonWithIcon from '../components/Button/ButtonWithIcon';
import { onUpdateCart, onCreateOrder } from '../redux/actions';
import { ShoppingState, UserState } from '../redux/model';
import { ApplicationState } from '../redux/reducers';
import { useNavigation } from '../utils';
import PaymentTypePopup from 'react-native-raw-bottom-sheet';


interface OrderScreenProps{
    shoppingReducer: ShoppingState,
    userReducer: UserState,
    onUpdateCart: Function,
    onCreateOrder: Function,
    navigation: { getParam: Function, goBack: Function}

}


const _OrderScreen: React.FC<OrderScreenProps> = (props) => {
    // const [isEditing, setIsEditing] = useState(false);
    // const [keyword, setKeyword] = useState('');
    const [totalAmount, setTotalAmount] = useState(0)
    const { goBack } = props.navigation;

    // const { availableFoods } = props.shoppingReducer;
    const { navigate } = useNavigation();
    const { Cart, user, location, orders } = props.userReducer;
    const popupRef = createRef<PaymentTypePopup>();

    // const onTapFood = (item: FoodModel) => {
    //     navigate('FoodDetailPage', { food: item })
    // };

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

    // const onValidateOrder = () => {
    //     if (user !== undefined) {
    //         if(!user.verfied){
    //             // navigate to login page
    //             navigate('LoginPage')
    //             } else {
    //                 // place order
    //                 console.log('Now we can order')
    //                 popupRef.current?.open();
    //             }
    //         } else {
    //             navigate('LoginPage');
    //         }
    // }
    
    // after the payment operation call place order
    const onTapPlaceOrder = () => {
        props.onCreateOrder(Cart, user);
        popupRef.current?.close();
    }

    const popupView = () => {
        return (
            <PaymentTypePopup
                height={400}
                ref={popupRef}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'transparent'
                    },
                    draggableIcon: {
                        backgroundColor: '#000'
                    },
                    container: {
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }
                }}
            >
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        width: '100%',
                        backgroundColor: 'gray'
                    }}
                >
                    <View style={styles.paymentView}>
                    <Text style={{ fontSize: 20, fontWeight: '700' }}>
                        Payable Amount
                    </Text>
                        <Text>NGN{totalAmount.toFixed(2) }</Text>
                    </View>
                    <View style={{ display: 'flex', height: 100, padding: 20, flexDirection: 'row' }}>
                        <Image source={require('../images/delivery_icon.png')}
                            style={{ width: 50, height: 50}}
                        />
                        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 5}}>Address Used to Delivery</Text>
                        <Text style={{ fontSize: 16, color: '#666666', marginBottom: 5, width: Dimensions.get('screen').width - 60 }}>{`${location.name}, ${location.street}, ${location.postalCode}, ${location.city}`}</Text>
                    </View>
                    <ScrollView horizontal={true}>
                        <View style={styles.paymentOptions}>
                            <TouchableOpacity
                                onPress={() => { }}
                                style={styles.options}
                            >
                                <Image source={require('../images/call_icon.png')} style={styles.icon} />
                                {/* COD */}
                                <Text style={{ fontSize: 16, fontWeight: '600', color: '#545252' }}>
                                    Call On Delivery
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => onTapPlaceOrder()}
                                style={styles.options}
                            >
                                <Image source={require('../images/cart_icon.png')} style={styles.icon} />
                                {/* Card */}
                                <Text style={{ fontSize: 16, fontWeight: '600', color: '#545252' }}>Card Payment</Text>
                            </TouchableOpacity>
                         </View>
                    </ScrollView>

                </View>

            </PaymentTypePopup>
        )
    }

    if (orders.length > 0) {
    
        return (
            <View style={styles.container}>
                <View style={styles.navigation}>
                    <View style={{ display: 'flex', height: 60, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', marginLeft: 4, paddingLeft: 20, paddingRight: 20 }}>
                        <ButtonWithIcon icon={require('../images/back_arrow.png')}
                            onTap={() => goBack()}
                            width={32} height={38}
                        ></ButtonWithIcon>
                        <Text style={{ fontSize: 22, fontWeight: '600'}}>Orders</Text>
                    </View>
                </View>
                <View style={styles.body}>
                </View>
                <View style={styles.footer}>
                    
                </View>
          </View>
      );
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.navigation}>
                    <View style={{ display: 'flex', height: 60, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', marginLeft: 4,paddingLeft: 20, paddingRight: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: '600'}}>Orders</Text>
                        {user !== undefined && 
                              <TouchableOpacity
                              style={{ alignItems: 'center' }}
                              onPress={() => {
                                  // go to the order details page
                              }}
                          >
                              <Image source={require('../images/orders.png')} style={{ width: 50, height: 50}} />
                          </TouchableOpacity>
                      }
                    </View>
                </View>
                <View style={styles.body}>
                    <Text style={{ fontSize: 25, fontWeight: '600'}}>Your Order is Empty</Text>
                </View>

            </View>
            // <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            //     <Text style={{ fontSize: 25, fontWeight: '700' }}>
            //         Your cart is empty!
            //     </Text>
            // </View>
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

const OrderScreen = connect(mapStateToProps, { onUpdateCart, onCreateOrder })(_OrderScreen)

export { OrderScreen };


// 8:23