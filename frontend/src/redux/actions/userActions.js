"use strict";
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
exports.onApplyOffer = exports.onUserLogout = exports.onCancelOrder = exports.onGetOrders = exports.onCreateOrder = exports.onOTPRequest = exports.onVerifyOTP = exports.onUserSignup = exports.onUserLogin = exports.onUpdateCart = exports.onUpdateLocation = void 0;
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("../../utils");
const async_storage_1 = __importDefault(require("@react-native-community/async-storage"));
// User Actions trigger from Components
const onUpdateLocation = (location) => {
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const locationString = JSON.stringify(location);
            yield async_storage_1.default.setItem('user_location', locationString);
            // save our location in local storage
            dispatch({
                type: 'ON_UPDATE_LOCATION',
                payload: location
            });
        }
        catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            });
        }
    });
};
exports.onUpdateLocation = onUpdateLocation;
const onUpdateCart = (item) => {
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        dispatch({
            type: 'ON_UPDATE_CART',
            payload: item
        });
    });
};
exports.onUpdateCart = onUpdateCart;
const onUserLogin = (email, password) => {
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.post(`${utils_1.BASE_URL}/user/login`, {
                email,
                password
            });
            console.log(response);
            if (!response) {
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Login error'
                });
            }
            else {
                // save location in local storage
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                });
            }
        }
        catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            });
        }
    });
};
exports.onUserLogin = onUserLogin;
const onUserSignup = (email, password, phone) => {
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.post(`${utils_1.BASE_URL}/user/signup`, {
                email,
                password,
                phone
            });
            console.log(response);
            if (!response) {
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Login error'
                });
            }
            else {
                // save location in local storage
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                });
            }
        }
        catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            });
        }
    });
};
exports.onUserSignup = onUserSignup;
const onVerifyOTP = (otp, user) => {
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            axios_1.default.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            const response = yield axios_1.default.patch(`${utils_1.BASE_URL}/user/verify`, {
                otp
            });
            console.log(response);
            if (!response) {
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Verification error'
                });
            }
            else {
                // save location in local storage
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                });
            }
        }
        catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            });
        }
    });
};
exports.onVerifyOTP = onVerifyOTP;
const onOTPRequest = (user) => {
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            axios_1.default.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            const response = yield axios_1.default.get(`${utils_1.BASE_URL}/user/otp`);
            console.log(response);
            if (!response) {
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Verification error'
                });
            }
            else {
                // save location in local storage
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                });
            }
        }
        catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            });
        }
    });
};
exports.onOTPRequest = onOTPRequest;
const onCreateOrder = (cartItems, user) => {
    let cart = new Array();
    cartItems.map(item => {
        cart.push({ _id: item._id, unit: item.unit });
    });
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            axios_1.default.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            const response = yield axios_1.default.post(`${utils_1.BASE_URL}/user/create-order`, {
                cart: cart
            });
            console.log(response);
            if (!response) {
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Verification error'
                });
            }
            else {
                // save location in local storage
                dispatch({
                    type: 'ON_CREATE_ORDER',
                    payload: response.data
                });
            }
        }
        catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            });
        }
    });
};
exports.onCreateOrder = onCreateOrder;
const onGetOrders = (user) => {
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            axios_1.default.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            const response = yield axios_1.default.get(`${utils_1.BASE_URL}/user/order`);
            console.log(response);
            if (!response) {
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'Create Order Failed'
                });
            }
            else {
                // save location in local storage
                dispatch({
                    type: 'ON_VIEW_ORDER',
                    payload: response.data
                });
            }
        }
        catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            });
        }
    });
};
exports.onGetOrders = onGetOrders;
const onCancelOrder = (order, user) => {
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            axios_1.default.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            const response = yield axios_1.default.get(`${utils_1.BASE_URL}/user/order`);
            console.log(response);
            if (!response) {
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'Create Order Failed'
                });
            }
            else {
                // save location in local storage
                dispatch({
                    type: 'ON_CANCEL_ORDER',
                    payload: response.data
                });
            }
        }
        catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            });
        }
    });
};
exports.onCancelOrder = onCancelOrder;
const onUserLogout = () => {
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            dispatch({
                type: 'ON_USER_LOGOUT'
            });
        }
        catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            });
        }
    });
};
exports.onUserLogout = onUserLogout;
const onApplyOffer = (offer, isRemove) => {
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        if (isRemove) {
            dispatch({
                type: 'ON_REMOVE_OFFER',
                payload: offer
            });
        }
        else {
            dispatch({
                type: 'ON_ADD_OFFER',
                payload: offer
            });
        }
    });
};
exports.onApplyOffer = onApplyOffer;
//# sourceMappingURL=userActions.js.map