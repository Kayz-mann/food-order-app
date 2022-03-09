"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_maps_1 = __importDefault(require("react-native-maps"));
const LocationMapPicker = ({ lastLocation, onMarkerChanged }) => {
    const onRegionChange = (newRegion) => {
        onMarkerChanged(newRegion);
    };
    return (<react_native_1.View style={styles.container}>
            <react_native_maps_1.default style={{ flex: 1 }} initialRegion={lastLocation} onRegionChangeComplete={onRegionChange}/>
            <react_native_1.View style={{ left: '50%', top: '50%', position: 'absolute', marginLeft: -24, marginTop: -48 }}>
                <react_native_1.Image source={require('../images/delivery_icon.png')} style={{ width: 50, height: 50 }}/>
            </react_native_1.View>
        </react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex'
    }
});
exports.default = LocationMapPicker;
//# sourceMappingURL=LocationMapPicker.js.map