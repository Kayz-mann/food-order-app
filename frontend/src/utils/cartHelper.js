"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkExistence = void 0;
const checkExistence = (item, Cart) => {
    if (Array.isArray(Cart)) {
        let currentItem = Cart.filter((cartItem) => cartItem._id == item._id);
        if (currentItem.length > 0) {
            return currentItem[0];
        }
    }
    return item;
};
exports.checkExistence = checkExistence;
//# sourceMappingURL=cartHelper.js.map