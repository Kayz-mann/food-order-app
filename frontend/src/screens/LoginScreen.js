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
exports.LoginScreen = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_redux_1 = require("react-redux");
const ButtonWithTitle_1 = __importDefault(require("../components/Button/ButtonWithTitle"));
const TextField_1 = __importDefault(require("../components/TextField"));
const actions_1 = require("../redux/actions");
const utils_1 = require("../utils");
const _LoginScreen = ({ onUserLogin, onUserSignup, userReducer, onOTPRequest, onVerifyOTP }) => {
    const [email, setEmail] = (0, react_1.useState)('');
    const [phone, setPhone] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [title, setTitle] = (0, react_1.useState)('');
    const [isSignup, setIsSignup] = (0, react_1.useState)(false);
    const [otp, setOtp] = (0, react_1.useState)('');
    const [verified, setVerified] = (0, react_1.useState)(true);
    const [requestOtpTitle, setRequestOtpTitle] = (0, react_1.useState)('Requesst a New OTP in');
    const [canRequestOtp, setCanRequestOtp] = (0, react_1.useState)(false);
    const onTapOptions = () => {
        setIsSignup(!isSignup);
        setTitle(!isSignup ? 'Signup' : 'Login');
    };
    const onTapAuthenticate = () => {
        if (isSignup) {
            onUserSignup(email, phone, password);
        }
        else {
            onUserLogin(email, password);
        }
    };
    let countDown;
    const { user } = userReducer;
    const { navigate } = (0, utils_1.useNavigation)();
    (0, react_1.useEffect)(() => {
        if (user.verfied !== undefined) {
            if (user.verfied === true) {
                // navigate to cart page
                navigate('CartPage');
            }
            else {
                setVerified(user.verfied);
                // check for start timer
                onEnableOtpRequest();
            }
        }
        return () => {
            clearInterval(countDown);
        };
    });
    const onEnableOtpRequest = () => {
        // wait after 2 minutes to generate another OTP
        const otpDate = new Date();
        otpDate.setTime(new Date().getTime() + (2 * 60 * 1000));
        const otpTime = otpDate.getTime();
        countDown = window.setInterval(function () {
            const currentTime = new Date().getTime();
            const totalTime = otpTime - currentTime;
            let minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((totalTime % (1000 * 60)) / (1000));
            setRequestOtpTitle(`Request a new OTP in ${minutes}: ${seconds}`);
            if (minutes < 1 && seconds < 1) {
                setRequestOtpTitle(`Request a new OTP`);
                setCanRequestOtp(true);
                clearInterval(countDown);
            }
        }, 1000);
    };
    const onTapVerify = () => {
        onVerifyOTP(otp, user);
    };
    const onTapRequestNewOTP = () => {
        setCanRequestOtp(false);
        onOTPRequest(user);
    };
    if (!verified) {
        // show OTP page
        return (<react_native_1.View style={styles.container}>
          <react_native_1.View style={styles.body}>
              <react_native_1.Image source={require('../images/verify_otp.png')} style={{ width: 120, height: 120, margin: 20 }}/>
              <react_native_1.Text style={{ fontSize: 22, fontWeight: '500', margin: 10 }}>Verification</react_native_1.Text>
              <react_native_1.Text style={{ fontSize: 16, padding: 10, marginBottom: 20, color: '#716f6f' }}>
                    Enter your OTP
              </react_native_1.Text>
              <TextField_1.default isOTP={true} placeholder="OTP" onTextChange={() => { }}/>
              <ButtonWithTitle_1.default title="Verify OTP" onTap={onTapVerify} width={340} height={50}/>
              <ButtonWithTitle_1.default onTap={onTapRequestNewOTP} disable={!canRequestOtp} title={requestOtpTitle} isNoBg={true} width={430} height={50}/>
           </react_native_1.View>
          <react_native_1.View style={styles.footer}></react_native_1.View>
      </react_native_1.View>);
    }
    else {
        return (<react_native_1.View style={styles.container}>
      <react_native_1.View style={styles.navigation}>
        <react_native_1.Text style={{ fontSize: 30 }}>Login</react_native_1.Text>
        <react_native_1.View style={styles.body}>
          <TextField_1.default placeholder='Email' onTextChange={setEmail}/>
          {isSignup &&
                <TextField_1.default placeholder='Phone' onTextChange={setPhone}/>}
          <TextField_1.default placeholder='Password' onTextChange={setPassword}/>
          <ButtonWithTitle_1.default title={title} onTap={onTapAuthenticate} width={340} height={50}/>
          <ButtonWithTitle_1.default title={!isSignup ? "No Account? Signup Here" : "Have an Account? Login Here"} onTap={() => onTapOptions()} width={340} height={50} isNoBg={true}/>
        </react_native_1.View>
        <react_native_1.View style={styles.footer}></react_native_1.View>
      </react_native_1.View>
    </react_native_1.View>);
    }
};
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1
    },
    navigation: {
        flex: 1,
        paddingLeft: 50,
        paddingTop: 50
    },
    body: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1
    }
});
const mapStateToProps = (state) => ({
    userReducer: state.userReducer
});
const LoginScreen = (0, react_redux_1.connect)(mapStateToProps, { onUserLogin: actions_1.onUserLogin, onUserSignup: actions_1.onUserSignup, onVerifyOTP: actions_1.onVerifyOTP, onOTPRequest: actions_1.onOTPRequest })(_LoginScreen);
exports.LoginScreen = LoginScreen;
// 14:12
//# sourceMappingURL=LoginScreen.js.map