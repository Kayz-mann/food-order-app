"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const ButtonWithIcon = ({ onTap, icon, width, height }) => {
    return (<react_native_gesture_handler_1.TouchableOpacity style={[styles.btn, { width, height }]} onPress={() => onTap()}>
           <react_native_1.Image style={{ width: (width - 2), height: (height - 2) }} source={icon}/>
      </react_native_gesture_handler_1.TouchableOpacity>);
};
exports.default = ButtonWithIcon;
const styles = react_native_1.StyleSheet.create({
    btn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f14b5d',
        width: 40,
        height: 50,
        marginTop: 20,
        borderRadius: 30,
        alignSelf: 'center'
    }
});
//# sourceMappingURL=ButtonWithIcon.js.map