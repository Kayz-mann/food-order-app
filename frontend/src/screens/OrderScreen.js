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
exports.OrderScreen = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const react_redux_1 = require("react-redux");
const ButtonWithIcon_1 = __importDefault(require("../components/Button/ButtonWithIcon"));
const actions_1 = require("../redux/actions");
const utils_1 = require("../utils");
const react_native_raw_bottom_sheet_1 = __importDefault(require("react-native-raw-bottom-sheet"));
const _OrderScreen = (props) => {
    // const [isEditing, setIsEditing] = useState(false);
    // const [keyword, setKeyword] = useState('');
    const [totalAmount, setTotalAmount] = (0, react_1.useState)(0);
    const { goBack } = props.navigation;
    // const { availableFoods } = props.shoppingReducer;
    const { navigate } = (0, utils_1.useNavigation)();
    const { Cart, user, location, orders } = props.userReducer;
    const popupRef = (0, react_1.createRef)();
    // const onTapFood = (item: FoodModel) => {
    //     navigate('FoodDetailPage', { food: item })
    // };
    (0, react_1.useEffect)(() => {
        onCalculateAmount();
    }, [Cart]);
    const onCalculateAmount = () => {
        let total = 0;
        if (Array.isArray(Cart)) {
            Cart.map(food => {
                total += food.price + food.unit;
            });
        }
        setTotalAmount(total);
    };
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
        var _a;
        props.onCreateOrder(Cart, user);
        (_a = popupRef.current) === null || _a === void 0 ? void 0 : _a.close();
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
                        <react_native_1.Text>NGN{totalAmount.toFixed(2)}</react_native_1.Text>
                    </react_native_1.View>
                    <react_native_1.View style={{ display: 'flex', height: 100, padding: 20, flexDirection: 'row' }}>
                        <react_native_1.Image source={require('../images/delivery_icon.png')} style={{ width: 50, height: 50 }}/>
                        <react_native_1.Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 5 }}>Address Used to Delivery</react_native_1.Text>
                        <react_native_1.Text style={{ fontSize: 16, color: '#666666', marginBottom: 5, width: react_native_1.Dimensions.get('screen').width - 60 }}>{`${location.name}, ${location.street}, ${location.postalCode}, ${location.city}`}</react_native_1.Text>
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
    if (orders.length > 0) {
        return (<react_native_1.View style={styles.container}>
                <react_native_1.View style={styles.navigation}>
                    <react_native_1.View style={{ display: 'flex', height: 60, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', marginLeft: 4, paddingLeft: 20, paddingRight: 20 }}>
                        <ButtonWithIcon_1.default icon={require('../images/back_arrow.png')} onTap={() => goBack()} width={32} height={38}></ButtonWithIcon_1.default>
                        <react_native_1.Text style={{ fontSize: 22, fontWeight: '600' }}>Orders</react_native_1.Text>
                    </react_native_1.View>
                </react_native_1.View>
                <react_native_1.View style={styles.body}>
                    {/* <FlatList
                showsHorizontalScrollIndicator={true}
                data={Cart}
                renderItem={({ item }) => <FoodCard
                    onTap={onTapFood}
                    item={checkExistence(item, Cart)}
                    onUpdateCart={props.onUpdateCart}
                    
                />
                }
                keyExtractor={(item) => `${item._id}`}
            /> */}
                </react_native_1.View>
                <react_native_1.View style={styles.footer}>
                    
                </react_native_1.View>
          </react_native_1.View>);
    }
    else {
        return (<react_native_1.View style={styles.container}>
                <react_native_1.View style={styles.navigation}>
                    <react_native_1.View style={{ display: 'flex', height: 60, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', marginLeft: 4, paddingLeft: 20, paddingRight: 20 }}>
                        <react_native_1.Text style={{ fontSize: 18, fontWeight: '600' }}>Orders</react_native_1.Text>
                        {user !== undefined &&
                <react_native_gesture_handler_1.TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {
                        // go to the order details page
                    }}>
                              <react_native_1.Image source={require('../images/orders.png')} style={{ width: 50, height: 50 }}/>
                          </react_native_gesture_handler_1.TouchableOpacity>}
                    </react_native_1.View>
                </react_native_1.View>
                <react_native_1.View style={styles.body}>
                    <react_native_1.Text style={{ fontSize: 25, fontWeight: '600' }}>Your Order is Empty</react_native_1.Text>
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
    }
});
const mapStateToProps = (state) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
});
const OrderScreen = (0, react_redux_1.connect)(mapStateToProps, { onUpdateCart: actions_1.onUpdateCart, onCreateOrder: actions_1.onCreateOrder })(_OrderScreen);
exports.OrderScreen = OrderScreen;
// 8:23
//# sourceMappingURL=OrderScreen.js.map