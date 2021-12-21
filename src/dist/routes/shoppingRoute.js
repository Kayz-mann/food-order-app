"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shoppingRoute = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.shoppingRoute = router;
// Food Availability
router.get('/:pincode');
// Top Restaurants
router.get('top-restaurants/:pincode');
// Food Available in 30 Minutes
router.get('/foods-in-30-min/:pincode');
// Search Foods
router.get('/search/:pincode');
// Find Restaurant By ID
router.get('restaurant/:id');
//# sourceMappingURL=shoppingRoute.js.map