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
const react_redux_1 = require("react-redux");
const ButtonWithIcon_1 = __importDefault(require("../components/Button/ButtonWithIcon"));
const actions_1 = require("../redux/actions");
const utils_1 = require("../utils");
const OrderCard_1 = __importDefault(require("../components/OrderCard"));
const _OrderScreen = (props) => {
    const { goBack } = props.navigation;
    const { user, orders } = props.userReducer;
    const { navigate } = (0, utils_1.useNavigation)();
    console.log(`Available Orders ${JSON.stringify(orders)}`);
    (0, react_1.useEffect)(() => {
        (0, actions_1.onGetOrders)(user);
    }, []);
    const onTapOrder = (order) => {
        navigate('OrderDetailPage', { order });
    };
    const orderView = () => {
        return (<react_native_1.View style={styles.container}>
                <react_native_1.View style={styles.navigation}>
                    <react_native_1.View style={{ display: 'flex', height: 60, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', marginLeft: 4, paddingLeft: 20, paddingRight: 20 }}>
                        <ButtonWithIcon_1.default icon={require('../images/back_arrow.png')} onTap={() => goBack()} width={32} height={38}></ButtonWithIcon_1.default>
                        <react_native_1.Text style={{ fontSize: 22, fontWeight: '600' }}>Orders</react_native_1.Text>
                    </react_native_1.View>
                </react_native_1.View>
                <react_native_1.View style={styles.body}>
                    <react_native_1.FlatList showsVerticalScrollIndicator={false} data={orders} renderItem={({ item }) => <OrderCard_1.default item={item} onTap={() => onTapOrder(item)}/>} keyExtractor={(item) => `${item._id}`}/>
                </react_native_1.View>
                <react_native_1.View style={styles.footer}>
                    
                </react_native_1.View>
            </react_native_1.View>);
    };
    if (orders.length > 0) {
        return orderView();
    }
    else {
        return (<react_native_1.View style={styles.container}>
                <react_native_1.View style={styles.navigation}>
                    <react_native_1.View style={{ display: 'flex', height: 60, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', marginLeft: 4, paddingLeft: 20, paddingRight: 20 }}>

                        <ButtonWithIcon_1.default icon={require('../images/back_arrow.png')} onTap={() => goBack()} width={32} height={38}></ButtonWithIcon_1.default>
                        <react_native_1.Text style={{ fontSize: 22, fontWeight: '600' }}>Orders</react_native_1.Text>

                    </react_native_1.View>
                </react_native_1.View>
                <react_native_1.View style={styles.body}>
                    <react_native_1.Text style={{ fontSize: 25, fontWeight: '600' }}>Your Order is Empty</react_native_1.Text>
                </react_native_1.View>

            </react_native_1.View>);
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
    userReducer: state.userReducer
});
const OrderScreen = (0, react_redux_1.connect)(mapStateToProps, { onGetOrders: actions_1.onGetOrders })(_OrderScreen);
exports.OrderScreen = OrderScreen;
// 8:23
//# sourceMappingURL=OrderScreen.js.map