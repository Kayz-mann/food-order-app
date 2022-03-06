"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReducer = void 0;
const initialState = {
    user: {},
    location: {},
    error: undefined,
    Cart: {},
    orders: {},
    appliedOffer: {}
};
const UserReducer = (state = initialState, action) => {
    // const { type, payload } = action;
    switch (action.type) {
        case 'ON_UPDATE_LOCATION':
            return Object.assign(Object.assign({}, state), { location: action.payload });
        case 'ON_UPDATE_CART':
            if (!Array.isArray(state.Cart)) {
                return Object.assign(Object.assign({}, state), { Cart: [action.payload] });
            }
            const existingFoods = state.Cart.filter;
            //Check for Existing Product to update unit
            if (existingFoods.length > 0) {
                let updatedCart = state.Cart.map((food) => {
                    if (food._id == action.payload._id) {
                        food.unit = action.payload.unit;
                    }
                    return food;
                });
                return Object.assign(Object.assign({}, state), { Cart: updatedCart.filter((item) => item.unit > 0) });
            }
            else { // Add to cart if not added
                return Object.assign(Object.assign({}, state), { Cart: [...state.Cart, action.payload] });
            }
        case 'ON_USER_LOGIN':
            return Object.assign(Object.assign({}, state), { user: action.payload });
        case 'ON_USER_LOGOUT':
            return Object.assign(Object.assign({}, state), { user: {} });
        case 'ON_CREATE_ORDER':
            if (!Array.isArray(state.orders)) {
                return Object.assign(Object.assign({}, state), { Cart: [], orders: [action.payload] });
            }
            else {
                return Object.assign(Object.assign({}, state), { Cart: [], orders: [...state.orders, action.payload] });
            }
        case 'ON_VIEW_ORDER':
        case 'ON_CANCEL_ORDER':
            return Object.assign(Object.assign({}, state), { orders: action.payload });
        case 'ON_ADD_OFFER':
            return Object.assign(Object.assign({}, state), { appliedOffer: action.payload });
        case 'ON_REMOVE_OFFER':
            return Object.assign(Object.assign({}, state), { appliedOffer: {} });
        default:
            return state;
    }
};
exports.UserReducer = UserReducer;
//# sourceMappingURL=userReducer.js.map