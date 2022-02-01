"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const TextField = ({ placeholder, isSecure = true, onTextChange, isOTP = false }) => {
    if (isOTP) {
        return (<react_native_1.View style={styles.container}>
                <react_native_1.TextInput maxLength={6} placeholder={placeholder} autoCapitalize='none' secureTextEntry={isSecure} onChangeText={(text) => onTextChange(text)} style={styles.otpTextField}/>
            </react_native_1.View>);
    }
    else {
        return (<react_native_1.View style={styles.container}>
                <react_native_1.TextInput placeholder={placeholder} autoCapitalize='none' secureTextEntry={isSecure} onChangeText={(text) => onTextChange(text)} style={styles.textField}/>
          </react_native_1.View>);
    }
};
const styles = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#080808',
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingRight: 10,
        paddingLeft: 20
    },
    textField: {
        flex: 1,
        width: '100%',
        height: 50,
        fontSize: 20,
        color: '#000'
    },
    otpTextField: {
        flex: 1,
        width: 320,
        height: 50,
        fontSize: 30,
        color: '#000',
        textAlign: 'center'
    }
});
exports.default = TextField;
//# sourceMappingURL=TextField.js.map