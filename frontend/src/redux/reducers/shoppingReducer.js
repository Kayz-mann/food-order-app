"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shoppingReducer = void 0;
const initialState = {
    availability: {},
    availableFoods: {},
    offers: {}
};
const shoppingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ON_AVAILABILITY':
            return Object.assign(Object.assign({}, state), { availability: action.payload });
        case 'ON_FOOD_SEARCH':
            return Object.assign(Object.assign({}, state), { availableFoods: action.payload });
        case 'ON_OFFER_SEARCH':
            return Object.assign(Object.assign({}, state), { availableFoods: action.payload });
        default:
            return state;
    }
};
exports.shoppingReducer = shoppingReducer;
//# sourceMappingURL=shoppingReducer.js.map