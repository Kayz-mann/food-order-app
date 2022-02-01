"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const SearchBar = ({ onEndEditing, didTouch, autoFocus, onTextChange }) => {
    return (<react_native_1.View style={styles.container}>
            <react_native_1.View style={styles.searchBar}>
                <react_native_1.Image style={{ width: 25, height: 25 }} source={require('../images/search.png')}/>
                <react_native_gesture_handler_1.TextInput style={{ marginLeft: 5, flex: 9, fontSize: 20, height: 42 }} placeholder='Search Foods' autoFocus={autoFocus} onTouchStart={didTouch} onChangeText={(text) => onTextChange(text)} onEndEditing={onEndEditing}/>

              

            </react_native_1.View>
      </react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    searchBar: {
        height: 32,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ededed',
        alignItems: 'center',
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: '#e5e5e5',
        borderWidth: 2
    }
});
exports.default = SearchBar;
//# sourceMappingURL=SearchBar.js.map