"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_google_places_autocomplete_1 = require("react-native-google-places-autocomplete");
const utils_1 = require("../utils");
const LocationPicker = ({ onChangeLocation }) => {
    return (<react_native_1.View>
            <react_native_google_places_autocomplete_1.GooglePlacesAutocomplete minLength={4} placeholder="Search Your Address" fetchDetails={true} onPress={(_, details = null) => {
            if (details === null || details === void 0 ? void 0 : details.geometry) {
                onChangeLocation(details.geometry.location);
            }
            console.log(JSON.stringify(details === null || details === void 0 ? void 0 : details.geometry.location));
        }} query={{
            key: utils_1.MAP_API_KEY,
            location: 'en'
        }} debounce={300}/>
        </react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex'
    }
});
exports.default = LocationPicker;
//# sourceMappingURL=LocationPicker.js.map