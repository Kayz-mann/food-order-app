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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountScreen = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const react_redux_1 = require("react-redux");
const actions_1 = require("../redux/actions");
const utils_1 = require("../utils");
const LoginScreen_1 = require("./LoginScreen");
const _AccountScreen = (props) => {
    // const [isEditing, setIsEditing] = useState(false);
    const [keyword, setKeyword] = (0, react_1.useState)('');
    const [totalAmount, setTotalAmount] = (0, react_1.useState)(0);
    const { availableFoods } = props.shoppingReducer;
    const { navigate } = (0, utils_1.useNavigation)();
    const { Cart, user, location, orders } = props.userReducer;
    const popupRef = (0, react_1.createRef)();
    (0, react_1.useEffect)(() => {
        onCalculateAmount();
    }, [Cart]);
    const onCalculateAmount = () => {
        let total = 0;
        if (Array.isArray(Cart)) {
            Cart.map(food => {
                total += food.price * food.unit;
            });
        }
        setTotalAmount(total);
    };
    const options = [
        {
            title: 'Edit Profile',
            action: () => { alert('Edit Profile'); }
        },
        {
            title: 'View Orders',
            action: () => {
                navigate('AccountOrderPage');
            }
        },
        {
            title: 'Contact Support',
            action: () => { alert('Contact Support'); }
        },
        {
            title: 'Logout',
            action: () => {
                props.onUserLogout();
            }
        }
    ];
    const optionCard = (title, action) => {
        return (<react_native_gesture_handler_1.TouchableOpacity style={{
                backgroundColor: '#fff',
                height: 80,
                justifyContent: 'space-around',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                paddingLeft: 50,
                paddingRight: 20,
                borderTopColor: '#d3d3d3',
                borderBottomColor: '#d3d3d3',
                borderTopWidth: 0.5,
                borderBottomWidth: 0.5,
            }} key={title} onPress={() => action()}>
                <react_native_1.Text style={{ flex: 1, fontSize: 18, color: '#525252' }}>{title}</react_native_1.Text>
                    <react_native_1.Image source={require('../images/arrow_icon.png')} style={{ width: 40, height: 40 }}/>
            </react_native_gesture_handler_1.TouchableOpacity>);
    };
    if (user !== undefined) {
        return (<react_native_1.View style={styles.container}>
               <react_native_1.View style={styles.navigation}>
                    <react_native_1.View style={{ display: 'flex', height: 60, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', marginLeft: 4, paddingLeft: 20, paddingRight: 20 }}>
                        <react_native_1.Image source={require('../images/avatar.png')} style={{ width: 150, height: 150, marginRight: 20 }}/>
                        <react_native_1.View>
                            <react_native_1.Text style={{ fontSize: 22, fontWeight: '600' }}>{user.firstName || 'Guest'}</react_native_1.Text>
                            <react_native_1.Text style={{ fontSize: 18 }}>{user.email}</react_native_1.Text>
                        </react_native_1.View>
                    </react_native_1.View>
                </react_native_1.View>
                <react_native_1.View style={styles.body}>
                    <react_native_gesture_handler_1.ScrollView>
                        {options.map(({ title, action }) => {
                return optionCard(title, action);
            })}
                    </react_native_gesture_handler_1.ScrollView>
                </react_native_1.View>
          </react_native_1.View>);
    }
    else {
        return (<LoginScreen_1.LoginScreen />);
    }
};
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 3,
        marginTop: 44,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    navigation: {
        flex: 1,
        marginTop: 43,
    },
    body: {
        flex: 10,
        display: 'flex',
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
const AccountScreen = (0, react_redux_1.connect)(mapStateToProps, { onUpdateCart: actions_1.onUpdateCart, onCreateOrder: actions_1.onCreateOrder, onUserLogout: actions_1.onUserLogout })(_AccountScreen);
exports.AccountScreen = AccountScreen;
//# sourceMappingURL=AccountScreen.js.map