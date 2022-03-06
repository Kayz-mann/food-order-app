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
exports.OrderDetailScreen = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_redux_1 = require("react-redux");
const ButtonWithIcon_1 = __importDefault(require("../components/Button/ButtonWithIcon"));
const actions_1 = require("../redux/actions");
const FoodCard_1 = __importDefault(require("../components/FoodCard"));
const moment_1 = __importDefault(require("moment"));
const ButtonWithTitle_1 = __importDefault(require("../components/Button/ButtonWithTitle"));
const _OrderDetailScreen = (props) => {
    const { goBack, getParam } = props.navigation;
    const { user, orders } = props.userReducer;
    const order = getParam('order');
    console.log(`Available Orders ${JSON.stringify(orders)}`);
    (0, react_1.useEffect)(() => {
        (0, actions_1.onGetOrders)(user);
    }, []);
    const onTapCancelOrder = () => {
        react_native_1.Alert.alert('Do you want to cancel this Order?', 'Cancellation charge may be applicable as per terms and conditions! \n We will send you cancellation confirmation soon!', [
            { text: 'Cancel', onPress: () => { }, style: 'cancel' },
            {
                text: 'Yes', onPress: () => {
                    // we will execute cancel Order
                    props.onCancelOrder(order, user);
                    goBack();
                }
            }
        ]);
    };
    const headerCard = () => {
        return (<react_native_1.View style={{ padding: 10, alignItems: 'flex-start' }}>
                <react_native_1.Text style={styles.orderInfo}>Order Date: {(0, moment_1.default)(order.orderDate).format('Do MM YY, h:mm a')}</react_native_1.Text>
                <react_native_1.Text style={styles.orderInfo}>Order Amount: {(0, moment_1.default)(order.totalAmount).format('Do MM YY, h:mm a')}</react_native_1.Text>
                <react_native_1.Text style={styles.orderInfo}>Paid Through: {(0, moment_1.default)(order.paidThrough).format('Do MM YY, h:mm a')}</react_native_1.Text>
                <react_native_1.Text style={styles.orderInfo}>Status: {(0, moment_1.default)(order.orderStatus).format('Do MM YY, h:mm a')}</react_native_1.Text>
            </react_native_1.View>);
    };
    const footerCard = () => {
        if (order.orderStatus.toLocaleLowerCase() === 'cancelled') {
            return (<react_native_1.View style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: 300, backgroundColor: '#c5c5c5' }}>
                    <react_native_1.Text style={{ fontSize: 18 }}>Order is Cancelled with ID: XXXX</react_native_1.Text>
                </react_native_1.View>);
        }
        else {
            return (<>
                    <react_native_1.View style={{ display: 'flex', margin: 10, justifyContent: 'center', alignItems: 'center', height: 300, backgroundColor: '#c5c5c5' }}>
                        <react_native_1.Text style={{ fontSize: 18 }}>Map view will go here...</react_native_1.Text>
                    </react_native_1.View>
                    <react_native_1.View style={{ marginBottom: 10 }}>
                        <ButtonWithTitle_1.default title='Cancel Order' onTap={onTapCancelOrder} height={50} width={320}/>
                    </react_native_1.View>
                </>);
        }
    };
    return (<react_native_1.View style={styles.container}>
                <react_native_1.View style={styles.navigation}>
                    <react_native_1.View style={{ display: 'flex', height: 60, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', marginLeft: 4, paddingLeft: 20, paddingRight: 20 }}>
                        <ButtonWithIcon_1.default icon={require('../images/back_arrow.png')} onTap={() => goBack()} width={32} height={38}></ButtonWithIcon_1.default>
                        <react_native_1.Text style={{ fontSize: 22, fontWeight: '600' }}>Order ID: {order.orderID}</react_native_1.Text>
                    </react_native_1.View>
                </react_native_1.View>
                <react_native_1.View style={styles.body}>
                 
                    <react_native_1.FlatList showsVerticalScrollIndicator={false} data={order.items} renderItem={({ item }) => <FoodCard_1.default item={item.food} onTap={() => { }} onUpdateCart={() => { }}/>} keyExtractor={(item) => `${item._id}`} ListHeaderComponent={headerCard} ListFooterComponent={footerCard}/>
                   =
                </react_native_1.View>
                {/* <View style={styles.footer}>
            
        </View> */}
            </react_native_1.View>);
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
    orderInfo: {
        fontSize: 22,
        color: '#7c7c7c',
        fontWeight: '400',
        marginBottom: 10
    }
});
const mapStateToProps = (state) => ({
    userReducer: state.userReducer
});
const OrderDetailScreen = (0, react_redux_1.connect)(mapStateToProps, { onGetOrders: actions_1.onGetOrders, onCancelOrder: actions_1.onCancelOrder })(_OrderDetailScreen);
exports.OrderDetailScreen = OrderDetailScreen;
// 17:45
//# sourceMappingURL=OrderDetailScreen.js.map