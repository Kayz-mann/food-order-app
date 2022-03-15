"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const moment_1 = __importDefault(require("moment"));
const OrderCard = ({ item, onTap }) => {
    // decide order status
    const orderStatus = () => {
        const status = item.orderStatus.toLocaleLowerCase();
        let statusIcon = require('../images/order_process.png');
        let statusMessage = status;
        if (status === 'completed') {
            statusMessage = 'Delivered';
            statusIcon = require('../images/orders.png');
        }
        else if (status === 'cancelled') {
            statusMessage = 'Cancelled';
            statusIcon = require('../images/warning-icon.png');
        }
        return (<react_native_1.View style={{ display: 'flex', flex: 3, padding: 5, alignItems: 'center', justifyContent: 'space-around' }}>
                <react_native_1.Image source={statusIcon} style={{ width: 60, height: 60 }}/>
                <react_native_1.Text style={{ fontSize: 12, color: '#7c7c7c' }}>{statusMessage.toUpperCase()}</react_native_1.Text>
            </react_native_1.View>);
    };
    return (<react_native_1.TouchableOpacity style={styles.container} onPress={() => onTap()}>
            <react_native_1.View style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                <react_native_1.View style={{ display: 'flex', flex: 8, padding: 5, marginTop: 5, paddingLeft: 20, justifyContent: 'space-around', alignItems: 'flex-start' }}>
                    <react_native_1.Text style={{ fontSize: 22, fontWeight: '500' }}>Order ID: {item.orderID}</react_native_1.Text>
                    <react_native_1.Text style={{ fontSize: 22, fontWeight: '600', color: '#7c7c7c' }}>{(0, moment_1.default)(item.orderDate).format('Do MMM YY, h: mm a')}</react_native_1.Text>
                    <react_native_1.Text style={{ fontSize: 22, fontWeight: '500', color: '#FF5733' }}>NGN{item.totalAmount}</react_native_1.Text>

                </react_native_1.View>
                {orderStatus()}
            </react_native_1.View>
        </react_native_1.TouchableOpacity>);
};
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        borderColor: '#e5e5e5',
        width: react_native_1.Dimensions.get('screen').width - 20,
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
});
exports.default = OrderCard;
//# sourceMappingURL=OrderCard.js.map