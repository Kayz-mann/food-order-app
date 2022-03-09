"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationScreen = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
const utils_1 = require("../utils");
const react_2 = __importDefault(require("react"));
const ButtonWithIcon_1 = __importDefault(require("../components/Button/ButtonWithIcon"));
const LocationPicker_1 = __importDefault(require("../components/LocationPicker"));
const ButtonWithTitle_1 = __importDefault(require("../components/Button/ButtonWithTitle"));
const LocationMapPicker_1 = __importDefault(require("../components/LocationMapPicker"));
const react_redux_1 = require("react-redux");
const userActions_1 = require("../redux/actions/userActions");
const _LocationScreen = (props) => {
    const [errorMsg, setErrorMsg] = (0, react_1.useState)('');
    const [displayAddress, setDisplayAddress] = (0, react_1.useState)('Waiting for current location');
    const { navigate } = (0, utils_1.useNavigation)();
    const [isMap, setIsMap] = (0, react_1.useState)(false);
    const { userReducer, onUpdateLocation } = props;
    const [currentAddress, setCurrentAddress] = (0, react_1.useState)('Pick a location from map');
    const [selectedAddress, setSelectedAddress] = (0, react_1.useState)();
    const { pickedAddress } = userReducer;
    const [region, setRegion] = (0, react_1.useState)({
        latitude: 26.90,
        longitude: 93.701,
        longitudeDelta: 0.0421,
        latitudeDelta: 0.0922
    });
    (0, react_1.useEffect)(() => {
        if (pickedAddress !== undefined) {
            const { address_components } = pickedAddress;
            if (Array.isArray(address_components)) {
                setCurrentAddress(pickedAddress.formatted_address);
                address_components.map(item => {
                    let city = "";
                    let country = "";
                    let postalCode = "";
                    if (item.types.filter(item => item === 'postal_code').length > 0) {
                        postalCode = item.short_name;
                    }
                    if (item.types.filter(item => item === 'country').length > 0) {
                        country = item.short_name;
                    }
                    if (item.types.filter(item => item === 'locality').length > 0) {
                        city = item.short_name;
                    }
                    setSelectedAddress({
                        displayAddress: pickedAddress.formatted_address,
                        city,
                        country,
                        postalCode
                    });
                });
            }
        }
    });
    // call when picked from auto complete
    const onChangeLocation = (location) => {
        console.log(location, 'Receiving Location from pick Location');
        setRegion({
            latitude: 26.90,
            longitude: 93.701,
            longitudeDelta: 0.0421,
            latitudeDelta: 0.0922
        });
        setIsMap(true);
    };
    const onTapConfirmLocation = () => {
        if ((selectedAddress === null || selectedAddress === void 0 ? void 0 : selectedAddress.postalCode) !== "") {
            onUpdateLocation(selectedAddress);
            navigate('HomePage');
        }
    };
    // call when location is picked from a map
    const onPickLocationFromMap = (newRegion) => {
        setRegion(newRegion);
        console.log(newRegion);
        // fetch physical address for reverse Geo Code and display in bottom section
    };
    const pickLocationView = () => {
        return (<react_native_1.View style={styles.container}>
                <react_native_1.View style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', flexDirection: 'row', marginTop: 44, marginLeft: 5 }}>
                    <ButtonWithIcon_1.default icon={require('../images/back_arrow.png')} onTap={() => navigate('HomePage')} width={40} height={50}/>
                    <react_native_1.View style={{ display: 'flex', flex: 1, marginRight: 5 }}>
                        <LocationPicker_1.default onChangeLocation={onChangeLocation}/>
                    </react_native_1.View>
                </react_native_1.View>
                <react_native_1.View style={styles.centerMsg}>
                    <react_native_1.Image source={require(`../images/delivery_icon.png`)} style={styles.deliveryIcon}/>
                    <react_native_1.Text style={styles.addressTitle}>Pick your Location</react_native_1.Text>
                </react_native_1.View>
            </react_native_1.View>);
    };
    const mapView = () => {
        return (<react_native_1.View style={styles.container}>
                    <react_native_1.View style={styles.navigation}>
                        <react_native_1.View style={{ display: 'flex', height: 60, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', marginTop: 4, paddingLeft: 10 }}>
                            <ButtonWithIcon_1.default icon={require('../images/back_arrow.png')} onTap={() => navigate('Homepage')} width={30} height={30}/>
                            <react_native_1.View style={{ flex: 1, marginLeft: 20 }}>
                                <react_native_1.Text style={{ fontSize: 18, fontWeight: '500', color: '#656565' }}>Pick your Location from Map</react_native_1.Text>
                            </react_native_1.View>
                        </react_native_1.View>
                    </react_native_1.View>
                    <react_native_1.View style={styles.body}>
                        <LocationMapPicker_1.default lastLocation={region} onMarkerChanged={onPickLocationFromMap}/>
                    </react_native_1.View>
                    <react_native_1.View style={styles.footer}>
                        <react_native_1.View style={{ flex: 1, backgroundColor: 'white', padding: 10, paddingLeft: 20, paddingRight: 20 }}>
                            <react_native_1.Text style={{ fontSize: 18, fontWeight: '500', color: '#545454' }}>
                                {currentAddress}
                            </react_native_1.Text>
                            <ButtonWithTitle_1.default title="Confirm" onTap={onTapConfirmLocation} width={320} height={50}/>
                        </react_native_1.View>
                    </react_native_1.View>
                    
                </react_native_1.View>);
    };
    if (isMap) {
        return mapView();
    }
    else {
        return pickLocationView();
    }
};
const mapStateToProps = (state) => ({
    userReducer: state.userReducer
});
const LocationScreen = (0, react_redux_1.connect)(mapStateToProps, { onUpdateLocation: userActions_1.onUpdateLocation })(_LocationScreen);
exports.LocationScreen = LocationScreen;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(242,242,242,17)'
    },
    navigation: {
        flex: 1,
        marginTop: 44
    },
    body: {
        flex: 7.5,
    },
    footer: {
        flex: 2.0,
        backgroundColor: 'cyan'
    },
    centerMsg: {
        left: '50%',
        top: '50%',
        position: 'absolute',
        marginLeft: -80,
        marginTop: -50
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
// 16:53
//# sourceMappingURL=LocationScreen.js.map