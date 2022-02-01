"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootReducer = void 0;
const redux_1 = require("redux");
const shoppingReducer_1 = require("./shoppingReducer");
const userReducer_1 = require("./userReducer");
const rootReducer = (0, redux_1.combineReducers)({
    userReducer: userReducer_1.UserReducer,
    shoppingReducer: shoppingReducer_1.shoppingReducer
});
exports.rootReducer = rootReducer;
//# sourceMappingURL=index.js.map