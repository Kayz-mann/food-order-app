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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_native_1 = require("react-native");
const Location = __importStar(require("expo-location"));
const utils_1 = require("../utils");
const react_2 = __importDefault(require("react"));
const LandingScreen = () => {
    const [errorMsg, setErrorMsg] = (0, react_1.useState)('');
    const [address, setAddress] = (0, react_1.useState)();
    const [displayAddress, setDisplayAddress] = (0, react_1.useState)('Waiting for current location');
    const { navigate } = (0, utils_1.useNavigation)();
    // const { userReducer, onUpdateLocation }  = props;
    (0, react_1.useEffect)(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            let { status } = yield Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location is not granted');
            }
            let location = yield Location.getCurrentPositionAsync();
            const { coords } = location;
            if (coords) {
                const { latitude, longitude } = coords;
                let addressResponse = yield Location.reverseGeocodeAsync({ latitude, longitude });
                for (let item of addressResponse) {
                    setAddress(item);
                    let currentAddress = `${item.name}, ${item.street}, ${item.postalCode}, ${item.country}`;
                    setDisplayAddress(currentAddress);
                    if (currentAddress.length > 0) {
                        setTimeout(() => {
                            navigate('homeStack');
                        }, 3000);
                    }
                    return;
                }
            }
            else {
                // notify something went wrong with location
            }
        }))();
    });
    return (<react_native_1.View style={styles.container}>
            <react_native_1.View style={styles.navigation}>
                <react_native_1.View style={styles.body}>
                    <react_native_1.Image source={require('../images/delivery_icon.png')} style={styles.deliveryIcon}/>
                    <react_native_1.View style={styles.addressContainer}>
                        <react_native_1.Text style={styles.addressTitle}> Your Delivery Address</react_native_1.Text>
                    </react_native_1.View>
                    <react_native_1.Text style={styles.addressTitle}>{displayAddress}</react_native_1.Text>
                </react_native_1.View>
            </react_native_1.View>
           <react_native_1.View style={styles.footer}/>
        </react_native_1.View>);
};
exports.default = LandingScreen;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(242,242,242,17)'
    },
    navigation: {
        flex: 2,
        backgroundColor: 'red'
    },
    body: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        backgroundColor: 'cyan'
    },
    deliveryIcon: {
        width: 120,
        height: 120
    },
    addressContainer: {
        width: '100%',
        borderBottomColor: 'red',
        borderBottomWidth: 0.5,
        padding: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    addressTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#707070'
    },
    addressText: {
        fontSize: 20,
        fontWeight: '200',
        colors: '#474747'
    }
});
// const { addressContainer } = styles/// addressContainer
// 20:26
//# sourceMappingURL=LandingScreen.js.map