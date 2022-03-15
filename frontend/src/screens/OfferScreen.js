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
exports.OfferScreen = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const react_redux_1 = require("react-redux");
const OfferCard_1 = __importDefault(require("../components/OfferCard"));
const actions_1 = require("../redux/actions");
const shoppingActions_1 = require("../redux/actions/shoppingActions");
const _OfferScreen = ({ userReducer, shoppingReducer, onGetOffers, onApplyOffer }) => {
    const { location, Cart, appliedOffer } = userReducer;
    const { offers } = shoppingReducer;
    (0, react_1.useEffect)(() => {
        onGetOffers(location.postalCode);
    });
    if (Array.isArray(offers)) {
        alert(offers.length);
    }
    const onTapApplyOffer = (item) => {
        let total = 0;
        if (Array.isArray(Cart)) {
            Cart.map(food => {
                total += food.price * food.unit;
            });
        }
        const taxAmount = (total / 100 * 0.9) + 40;
        const orderAmount = taxAmount + total;
        if (orderAmount >= item.minValue) {
            onApplyOffer(item, false);
            showAlert('Offer Applied!', `Offer Applied with discount of ${item.offerPercentage}%`);
        }
        else {
            showAlert('This Offer is not applicable!', `This offer is appicable with minimum order amount ${item.minValue} only`);
        }
    };
    const showAlert = (title, msg) => {
        react_native_1.Alert.alert(title, msg, [
            { text: 'OK', onPress: () => { } }
        ]);
    };
    const onTapRemoveOffer = (item) => {
        onApplyOffer(item, true);
    };
    const checkOfferExistence = (item) => {
        if (appliedOffer._id !== undefined) {
            return item._id.toString() === appliedOffer._id.toString();
        }
        return false;
    };
    return (<react_native_1.View style={styles.container}>
            <react_native_1.View style={styles.navigation}>
                <react_native_1.View style={{ display: 'flex', height: 60, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginLeft: 4, paddingLeft: 20, paddingRight: 20 }}>
                    <react_native_1.Text style={{ fontSize: 22, fontWeight: '600' }}>Offers & Deals</react_native_1.Text>
               </react_native_1.View>
            </react_native_1.View>
            <react_native_1.View style={styles.body}>
               {Array.isArray(offers) &&
            <react_native_gesture_handler_1.FlatList showsVerticalScrollIndicator={false} data={offers} renderItem={({ item }) => <OfferCard_1.default onTapApply={onTapApplyOffer} onTapRemove={onTapRemoveOffer} item={item} isApplied={checkOfferExistence(item)}/>} keyExtractor={(item) => `${item._id}`}/>}
            </react_native_1.View>
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
        flex: 1,
        // backgroundColor: 'cyan'
    }
});
const mapStateToProps = (state) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
});
const OfferScreen = (0, react_redux_1.connect)(mapStateToProps, { onGetOffers: shoppingActions_1.onGetOffers, onApplyOffer: actions_1.onApplyOffer })(_OfferScreen);
exports.OfferScreen = OfferScreen;
// 9:29
//# sourceMappingURL=OfferScreen.js.map