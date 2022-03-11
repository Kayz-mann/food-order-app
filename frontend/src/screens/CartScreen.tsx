import React, { createRef, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, Alert } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import ButtonWithIcon from '../components/Button/ButtonWithIcon';
import ButtonWithTitle from '../components/Button/ButtonWithTitle';
import ButtonWithTitleIcon from '../components/Button/ButtonWithTitle';
import FoodCard from '../components/FoodCard';
import SearchBar from '../components/SearchBar';
import { onUpdateCart, onCreateOrder, onApplyOffer } from '../redux/actions';
import { FoodModel, ShoppingState, UserState } from '../redux/model';
import { ApplicationState } from '../redux/reducers';
import { checkExistence, useNavigation } from '../utils';
import PaymentTypePopup from 'react-native-raw-bottom-sheet';
import { shoppingReducer } from '../redux/reducers/shoppingReducer';
import CardPayment from '../components/CardPayment';
import { PaymentIntent } from '@stripe/stripe-react-native';


interface CartScreenProps{
    shoppingReducer: ShoppingState
    userReducer: UserState
    onUpdateCart: Function
    onCreateOrder: Function
    onApplyOffer: Function
}


const _CartScreen: React.FC<CartScreenProps> = (props) => {
    // const [isEditing, setIsEditing] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [totalAmount, setTotalAmount] = useState(0)

    const [totalTax, setTotalTax] = useState(0);
    const [payableAmount, setPayableAmount] = useState(0)
    const [discount, setDiscount] = useState(0)

    const { availableFoods } = props.shoppingReducer;
    const { navigate } = useNavigation();
    const { Cart, user, location, appliedOffer } = props.userReducer;
    const popupRef = createRef<PaymentTypePopup>();

    const [isPayment, setIsPayment] = useState(false)

    const onTapFood = (item: FoodModel) => {
        navigate('FoodDetailPage', { food: item })
    };

    useEffect(() => {
        onCalculateAmount();
    }, [Cart])

    const showAlert = (title: string, msg: string) => {
        Alert.alert(
            title,
            msg,
            [
                {
                    text: 'OK', onPress: () => {
                        props.onApplyOffer(appliedOffer, true)
                    }
                }
            ]
        )
    }

    const onCalculateAmount = () => {
        let total = 0;

        if (Array.isArray(Cart)) {
            Cart.map(food => {
                total += food.price * food.unit
            })
        }

        const tax = (total / 100 * 0.9) + 40;

        if (total > 0) {
            setTotalTax(tax)
        }
       
        setTotalAmount(total)
        setPayableAmount((total + tax))
        setDiscount(0)

        if (appliedOffer._id !== undefined) {
            if (total >= appliedOffer.minValue) {
                const discount = (total / 100) * appliedOffer.offerPercentage;
                setDiscount(discount);
                const afterDiscount = (total - discount);
                setPayableAmount(afterDiscount);
                
            } else {
                showAlert('The Applied Offer is not Applicable!',
                    `This offer is applicable with minimum ${appliedOffer.minValue} Only! Please select another Offer!`)
            }
        }
    }

    const onValidateOrder = () => {
        if (user !== undefined) {
            if (!user.verfied) {
                // navigate to login page
                navigate('LoginPage')
            } else {
                // place order
                console.log('Now we can order')
                popupRef.current?.open();
            }
        } else {
            navigate('LoginPage');
        }
    }

    // after the payment operation call place order
    const onTapPlaceOrder = (paymentResponse: string) => {
        props.onCreateOrder(Cart, user, paymentResponse);
        popupRef.current?.close();
        props.onApplyOffer(appliedOffer, true)
    }


    const footerContent = () => {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    onPress={() => {
                        navigate('CartOfferPage')
                    }}
                    style={[styles.row, { height: 80 }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 10, fontWeight: '600', color: '#525252' }}>Offers & Deals</Text>
                        {appliedOffer._id !== undefined ?
                            <View>
                                <Text style={{ fontSize: 14, fontWeight: '500', color: '#3d933f' }}>Applied {appliedOffer.offerPercentage}% of Discount</Text>
                            </View>
                            :
                            <View>
                                <Text style={{ color: '#336840', fontSize: 16 }}>
                                    You can apply available Offers. *TnC Apply.
                                </Text>
                            </View>
                        }
                    </View>
                    <Image source={require('../images/arrow_icon.png')} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
                <View style={[styles.row, { height: 250, justifyContent: 'flex-start', alignItems: 'flex-start' }]}>
                    <Text style={{ flex: 1, fontSize: 18, fontWeight: '600', color: '#525252', marginBottom: 10 }}>
                        Bill Details
                    </Text>
                    <View style={{ flex: 1, display: 'flex', flexDirection: 'row', marginTop: 10, justifyContent: 'space-around' }}>
                        <Text style={{ flex: 1, fontSize: 14 }}>Total</Text>
                        <Text style={{ fontSize: 16 }}>{totalAmount.toFixed(0)}</Text>
                    </View>
                    <View style={{ flex: 1, display: 'flex', flexDirection: 'row', marginTop: 10, justifyContent: 'space-around' }}>
                        <Text style={{ flex: 1, fontSize: 14 }}>Tax and Delivery Charge</Text>
                        <Text style={{ fontSize: 16 }}>{totalTax.toFixed(0)}</Text>
                    </View>
                    {appliedOffer._id !== undefined &&
                        <View style={{ flex: 1, display: 'flex', flexDirection: 'row', marginTop: 10, justifyContent: 'space-around' }}>
                            <Text style={{ flex: 1, fontSize: 14 }}>Discount Applied {appliedOffer.offerPercentage}%</Text>
                            <Text style={{ fontSize: 16 }}>{discount.toFixed(0)}</Text>
                        </View>
                    }
                    <View style={{ flex: 1, display: 'flex', flexDirection: 'row', marginTop: 10, justifyContent: 'space-around' }}>
                        <Text style={{ flex: 1, fontSize: 14 }}>Not Payable</Text>
                        <Text style={{ fontSize: 16 }}>{payableAmount.toFixed(2)}</Text>
                    </View>
                </View>
                
            </View>
        )
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
                        <Text>NGN{payableAmount.toFixed(2)}</Text>
                    </View>
                    <View style={{ display: 'flex', height: 100, padding: 20, flexDirection: 'row' }}>
                        <Image source={require('../images/delivery_icon.png')}
                            style={{ width: 50, height: 50 }}
                        />
                        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 5 }}>Address Used to Delivery</Text>
                        {/* <Text style={{ fontSize: 16, color: '#666666', marginBottom: 5, width: Dimensions.get('screen').width - 60 }}>{`${location.name}, ${location.street}, ${location.postalCode}, ${location.city}`}</Text> */}
                        {/* <Text style={{ fontSize: 16, color: '#666666', marginBottom: 5, width: Dimensions.get('screen').width - 60 }}>{`${location.displayAddress}`}</Text> */}
                    </View>
                    <ScrollView horizontal={true}>
                        <View style={styles.paymentOptions}>
                            <TouchableOpacity
                                onPress={() => onTapPlaceOrder('COD')}
                                style={styles.options}
                            >
                                <Image source={require('../images/call_icon.png')} style={styles.icon} />
                                {/* COD */}
                                <Text style={{ fontSize: 16, fontWeight: '600', color: '#545252' }}>
                                    Call On Delivery
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setIsPayment(true)}
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

     
    const cartView = () => {
        return (
            <View style={styles.container}>
                <View style={styles.navigation}>
                    <View style={{ display: 'flex', height: 60, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', marginLeft: 4, paddingLeft: 20, paddingRight: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: '600' }}>My Cart</Text>
                        {user.token !== undefined &&
                            <TouchableOpacity
                                style={{ alignItems: 'center' }}
                                onPress={() => {
                                    // go to the order details page
                                    navigate('OrderPage')
                                }}
                            >
                                <Image source={require('../images/orders.png')} style={{ width: 50, height: 50 }} />
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                <View style={styles.body}>
                    <FlatList
                        showsHorizontalScrollIndicator={true}
                        data={Cart}
                        renderItem={({ item }) => <FoodCard
                            onTap={onTapFood}
                            item={checkExistence(item, Cart)}
                            onUpdateCart={props.onUpdateCart}
                            
                        />
                        }
                        keyExtractor={(item) => `${item._id}`}
                        ListFooterComponent={footerContent}
                    />
                </View>
                <View style={styles.footer}>
                    <View style={styles.amountView}>
                        <Text style={{ fontSize: 10 }}>
                            Total
                        </Text>
                        <Text style={{ fontSize: 10 }}>{payableAmount}</Text>
                    </View>
                    <ButtonWithTitle title={'Make Payment'} onTap={onValidateOrder} height={50} width={320} />
                </View>
                {popupView()}
            </View>
        );
    }

    const onPaymentSuccess = (paymentResponse: PaymentIntent) => {
        if (paymentResponse.status === "Succeeded") {
            const responseString = JSON.stringify(paymentResponse);
            onTapPlaceOrder(responseString);
            console.log(responseString);  
        } else {
            setIsPayment(false)
            showAlert('Payment Failed', 'Payment has Failed!')
        }
     
    }

    const onPaymentFailed = (failedResponse: string) => {
        setIsPayment(false)
        showAlert('Payment Failed', 'Payment has Failed!' + failedResponse)
    }

    const onPaymentCancel = () => {
        setIsPayment(false)
        showAlert('Payment Cancelled', 'Payment has Failed! due to user cancellation')
    }

    if (Cart.length > 0) {
        if (isPayment) {
            // navigate to card payment page
            return <CardPayment
                onPaymentSuccess={onPaymentSuccess}
                onPaymentFailed={onPaymentFailed}
                onPaymentCancel={onPaymentCancel}
                amount={payableAmount}
            />
        } else {
            return cartView(); 
        }
    } else {
        
        return (
            <View style={styles.container}>
                <View style={styles.navigation}>
                    <View style={{ display: 'flex', height: 60, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', marginLeft: 4, paddingLeft: 20, paddingRight: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: '600' }}>My Cart</Text>
                        {user !== undefined &&
                            <TouchableOpacity
                                style={{ alignItems: 'center' }}
                                onPress={() => {
                                    // go to the order details page
                                    navigate('OrderPage')
                                }}
                            >
                                <Image source={require('../images/orders.png')} style={{ width: 50, height: 50 }} />
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                <View style={styles.body}>
                    <Text style={{ fontSize: 25, fontWeight: '600' }}>Your Cart is Empty</Text>
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
        backgroundColor: '#f2f2f2'
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
    row: {
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderColor: '#d3d3d3',
        borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        marginBottom: 15
    }

})



const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
}) 

const CartScreen = connect(mapStateToProps, { onUpdateCart, onCreateOrder, onApplyOffer })(_CartScreen)

export { CartScreen };
    



// 8:23 

