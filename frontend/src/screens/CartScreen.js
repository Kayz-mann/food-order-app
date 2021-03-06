"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartScreen = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const react_redux_1 = require("react-redux");
const ButtonWithTitle_1 = __importDefault(require("../components/Button/ButtonWithTitle"));
const FoodCard_1 = __importDefault(require("../components/FoodCard"));
const actions_1 = require("../redux/actions");
const utils_1 = require("../utils");
const react_native_raw_bottom_sheet_1 = __importDefault(require("react-native-raw-bottom-sheet"));
const _CartScreen = (props) => {
    // const [isEditing, setIsEditing] = useState(false);
    const [keyword, setKeyword] = (0, react_1.useState)('');
    const [totalAmount, setTotalAmount] = (0, react_1.useState)(0);
    const [totalTax, setTotalTax] = (0, react_1.useState)(0);
    const [payableAmount, setPayableAmount] = (0, react_1.useState)(0);
    const [discount, setDiscount] = (0, react_1.useState)(0);
    const { availableFoods } = props.shoppingReducer;
    const { navigate } = (0, utils_1.useNavigation)();
    const { Cart, user, location, appliedOffer } = props.userReducer;
    const popupRef = (0, react_1.createRef)();
    const onTapFood = (item) => {
        navigate('FoodDetailPage', { food: item });
    };
    (0, react_1.useEffect)(() => {
        onCalculateAmount();
    }, [Cart]);
    const showAlert = (title, msg) => {
        react_native_1.Alert.alert(title, msg, [
            {
                text: 'OK', onPress: () => {
                    props.onApplyOffer(appliedOffer, true);
                }
            }
        ]);
    };
    const onCalculateAmount = () => {
        let total = 0;
        if (Array.isArray(Cart)) {
            Cart.map(food => {
                total += food.price * food.unit;
            });
        }
        const tax = (total / 100 * 0.9) + 40;
        if (total > 0) {
            setTotalTax(tax);
        }
        setTotalAmount(total);
        setPayableAmount(total);
        setDiscount(0);
        if (appliedOffer._id !== undefined) {
            if (total >= appliedOffer.minValue) {
                const discount = (total / 100) * appliedOffer.offerPercentage;
                setDiscount(discount);
                const afterDiscount = (total - discount);
                setPayableAmount(afterDiscount);
            }
            else {
                showAlert('The Applied Offer is not Applicable!', `This offer is applicable with minimum ${appliedOffer.minValue} Only! Please select another Offer!`);
            }
        }
    };
    const onValidateOrder = () => {
        var _a;
        if (user !== undefined) {
            if (!user.verfied) {
                // navigate to login page
                navigate('LoginPage');
            }
            else {
                // place order
                console.log('Now we can order');
                (_a = popupRef.current) === null || _a === void 0 ? void 0 : _a.open();
            }
        }
        else {
            navigate('LoginPage');
        }
    };
    const footerContent = () => {
        return (<react_native_1.View style={{ flex: 1 }}>
                <react_native_gesture_handler_1.TouchableOpacity onPress={() => {
                navigate('CartOfferPage');
            }} style={[styles.row, { height: 80 }]}>
                    <react_native_1.View style={{ flex: 1 }}>
                        <react_native_1.Text style={{ fontSize: 10, fontWeight: '600', color: '#525252' }}>Offers & Deals</react_native_1.Text>
                        {appliedOffer._id !== undefined ?
                <react_native_1.View>
                                <react_native_1.Text style={{ fontSize: 14, fontWeight: '500', color: '#3d933f' }}>Applied {appliedOffer.offerPercentage}% of Discount</react_native_1.Text>
                            </react_native_1.View>
                :
                    <react_native_1.View>
                                <react_native_1.Text style={{ color: '#336840', fontSize: 16 }}>
                                    You can apply available Offers. *TnC Apply.
                                </react_native_1.Text>
                            </react_native_1.View>}
                    </react_native_1.View>
                    <react_native_1.Image source={require('../images/arrow_icon.png')} style={{ width: 30, height: 30 }}/>
                </react_native_gesture_handler_1.TouchableOpacity>
                <react_native_1.View style={[styles.row, { height: 250, justifyContent: 'flex-start', alignItems: 'flex-start' }]}>
                    <react_native_1.Text style={{ flex: 1, fontSize: 18, fontWeight: '600', color: '#525252', marginBottom: 10 }}>
                         Bill Details
                    </react_native_1.Text>
                    <react_native_1.View style={{ flex: 1, display: 'flex', flexDirection: 'row', marginTop: 10, justifyContent: 'space-around' }}>
                        <react_native_1.Text style={{ flex: 1, fontSize: 14 }}>Total</react_native_1.Text>
                        <react_native_1.Text style={{ fontSize: 16 }}>{totalAmount.toFixed(0)}</react_native_1.Text>
                    </react_native_1.View>
                    <react_native_1.View style={{ flex: 1, display: 'flex', flexDirection: 'row', marginTop: 10, justifyContent: 'space-around' }}>
                        <react_native_1.Text style={{ flex: 1, fontSize: 14 }}>Tax and Delivery Charge</react_native_1.Text>
                        <react_native_1.Text style={{ fontSize: 16 }}>{totalTax.toFixed(0)}</react_native_1.Text>
                    </react_native_1.View>
                    {appliedOffer._id !== undefined &&
                <react_native_1.View style={{ flex: 1, display: 'flex', flexDirection: 'row', marginTop: 10, justifyContent: 'space-around' }}>
                            <react_native_1.Text style={{ flex: 1, fontSize: 14 }}>Discount Applied {appliedOffer.offerPercentage}%</react_native_1.Text>
                            <react_native_1.Text style={{ fontSize: 16 }}>{discount.toFixed(0)}</react_native_1.Text>
                        </react_native_1.View>}
                    <react_native_1.View style={{ flex: 1, display: 'flex', flexDirection: 'row', marginTop: 10, justifyContent: 'space-around' }}>
                        <react_native_1.Text style={{ flex: 1, fontSize: 14 }}>Not Payable</react_native_1.Text>
                        <react_native_1.Text style={{ fontSize: 16 }}>{payableAmount.toFixed(0)}</react_native_1.Text>
                    </react_native_1.View>
                </react_native_1.View>
                
            </react_native_1.View>);
    };
    // after the payment operation call place order
    const onTapPlaceOrder = () => {
        var _a;
        props.onCreateOrder(Cart, user);
        (_a = popupRef.current) === null || _a === void 0 ? void 0 : _a.close();
        props.onApplyOffer(appliedOffer, true);
    };
    const popupView = () => {
        return (<react_native_raw_bottom_sheet_1.default height={400} ref={popupRef} closeOnDragDown={true} closeOnPressMask={false} customStyles={{
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
            }}>
                <react_native_1.View style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                width: '100%',
                backgroundColor: 'gray'
            }}>
                    <react_native_1.View style={styles.paymentView}>
                        <react_native_1.Text style={{ fontSize: 20, fontWeight: '700' }}>
                            Payable Amount
                        </react_native_1.Text>
                        <react_native_1.Text>NGN{payableAmount.toFixed(2)}</react_native_1.Text>
                    </react_native_1.View>
                    <react_native_1.View style={{ display: 'flex', height: 100, padding: 20, flexDirection: 'row' }}>
                        <react_native_1.Image source={require('../images/delivery_icon.png')} style={{ width: 50, height: 50 }}/>
                        <react_native_1.Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 5 }}>Address Used to Delivery</react_native_1.Text>
                        {/* <Text style={{ fontSize: 16, color: '#666666', marginBottom: 5, width: Dimensions.get('screen').width - 60 }}>{`${location.name}, ${location.street}, ${location.postalCode}, ${location.city}`}</Text> */}
                        <react_native_1.Text style={{ fontSize: 16, color: '#666666', marginBottom: 5, width: react_native_1.Dimensions.get('screen').width - 60 }}>{`${location.displayAddress}`}</react_native_1.Text>
                    </react_native_1.View>
                    <react_native_gesture_handler_1.ScrollView horizontal={true}>
                        <react_native_1.View style={styles.paymentOptions}>
                            <react_native_gesture_handler_1.TouchableOpacity onPress={() => { }} style={styles.options}>
                                <react_native_1.Image source={require('../images/call_icon.png')} style={styles.icon}/>
                                {/* COD */}
                                <react_native_1.Text style={{ fontSize: 16, fontWeight: '600', color: '#545252' }}>
                                    Call On Delivery
                                </react_native_1.Text>
                            </react_native_gesture_handler_1.TouchableOpacity>
                            <react_native_gesture_handler_1.TouchableOpacity onPress={() => onTapPlaceOrder()} style={styles.options}>
                                <react_native_1.Image source={require('../images/cart_icon.png')} style={styles.icon}/>
                                {/* Card */}
                                <react_native_1.Text style={{ fontSize: 16, fontWeight: '600', color: '#545252' }}>Card Payment</react_native_1.Text>
                            </react_native_gesture_handler_1.TouchableOpacity>
                        </react_native_1.View>
                    </react_native_gesture_handler_1.ScrollView>

                </react_native_1.View>

            </react_native_raw_bottom_sheet_1.default>);
    };
    if (Cart.length > 0) {
        return (<react_native_1.View style={styles.container}>
                <react_native_1.View style={styles.navigation}>
                    <react_native_1.View style={{ display: 'flex', height: 60, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', marginLeft: 4, paddingLeft: 20, paddingRight: 20 }}>
                        <react_native_1.Text style={{ fontSize: 18, fontWeight: '600' }}>My Cart</react_native_1.Text>
                        {user.token !== undefined &&
                <react_native_gesture_handler_1.TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {
                        // go to the order details page
                        navigate('OrderPage');
                    }}>
                                <react_native_1.Image source={require('../images/orders.png')} style={{ width: 50, height: 50 }}/>
                            </react_native_gesture_handler_1.TouchableOpacity>}
                    </react_native_1.View>
                </react_native_1.View>
                <react_native_1.View style={styles.body}>
                    <react_native_gesture_handler_1.FlatList showsHorizontalScrollIndicator={true} data={Cart} renderItem={({ item }) => <FoodCard_1.default onTap={onTapFood} item={(0, utils_1.checkExistence)(item, Cart)} onUpdateCart={props.onUpdateCart}/>} keyExtractor={(item) => `${item._id}`} ListFooterComponent={footerContent}/>
                </react_native_1.View>
                <react_native_1.View style={styles.footer}>
                    <react_native_1.View style={styles.amountView}>
                        <react_native_1.Text style={{ fontSize: 10 }}>
                            Total
                        </react_native_1.Text>
                        <react_native_1.Text style={{ fontSize: 10 }}>{payableAmount}</react_native_1.Text>
                    </react_native_1.View>
                    <ButtonWithTitle_1.default title={'Make Payment'} onTap={onValidateOrder} height={50} width={320}/>
                </react_native_1.View>
                {popupView()}
            </react_native_1.View>);
    }
    else {
        return (<react_native_1.View style={styles.container}>
                <react_native_1.View style={styles.navigation}>
                    <react_native_1.View style={{ display: 'flex', height: 60, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', marginLeft: 4, paddingLeft: 20, paddingRight: 20 }}>
                        <react_native_1.Text style={{ fontSize: 18, fontWeight: '600' }}>My Cart</react_native_1.Text>
                        {user !== undefined &&
                <react_native_gesture_handler_1.TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {
                        // go to the order details page
                        navigate('OrderPage');
                    }}>
                                <react_native_1.Image source={require('../images/orders.png')} style={{ width: 50, height: 50 }}/>
                            </react_native_gesture_handler_1.TouchableOpacity>}
                    </react_native_1.View>
                </react_native_1.View>
                <react_native_1.View style={styles.body}>
                    <react_native_1.Text style={{ fontSize: 25, fontWeight: '600' }}>Your Cart is Empty</react_native_1.Text>
                </react_native_1.View>

            </react_native_1.View>
        // <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        //     <Text style={{ fontSize: 25, fontWeight: '700' }}>
        //         Your cart is empty!
        //     </Text>
        // </View>
        );
    }
};
const styles = react_native_1.StyleSheet.create({
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
});
const mapStateToProps = (state) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
});
const CartScreen = (0, react_redux_1.connect)(mapStateToProps, { onUpdateCart: actions_1.onUpdateCart, onCreateOrder: actions_1.onCreateOrder, onApplyOffer: actions_1.onApplyOffer })(_CartScreen);
exports.CartScreen = CartScreen;
// 8:23 
//# sourceMappingURL=CartScreen.js.map