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
exports.onGetOffers = exports.onSearchFoods = exports.onAvailability = void 0;
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("../../utils");
// Trigger actions from components
const onAvailability = (postCode) => {
    console.log(`Post Code with Request ${postCode}`);
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`${utils_1.BASE_URL}/food/availability/${postCode}`);
            if (!response) {
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Availability error'
                });
            }
            else {
                //  save our location in local storage
                dispatch({
                    type: 'ON_AVAILABILITY',
                    payload: response.data
                });
            }
        }
        catch (error) {
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            });
        }
    });
};
exports.onAvailability = onAvailability;
const onSearchFoods = (postCode) => {
    console.log(`Post Code with Request ${postCode}`);
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`${utils_1.BASE_URL}/food/search/${postCode}`);
            if (!response) {
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Availability error'
                });
            }
            else {
                //  save our location in local storage
                dispatch({
                    type: 'ON_FOOD_SEARCH',
                    payload: response.data
                });
            }
        }
        catch (error) {
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            });
        }
    });
};
exports.onSearchFoods = onSearchFoods;
const onGetOffers = (postCode) => {
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`${utils_1.BASE_URL}food/offers/${postCode}`);
            console.log(response);
            if (!response) {
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Offer Availability Error'
                });
            }
            else {
                // save location in loacl storage
                dispatch({
                    type: 'ON_OFFER_SEARCH',
                    payload: response.data
                });
            }
        }
        catch (error) {
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            });
        }
    });
};
exports.onGetOffers = onGetOffers;
//# sourceMappingURL=shoppingActions.js.map