"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deliveryRoute = void 0;
const express_1 = __importDefault(require("express"));
const deliveryController_1 = require("../controllers/deliveryController");
const commonAuth_1 = require("../middlewares/commonAuth");
const router = express_1.default.Router();
exports.deliveryRoute = router;
// Signup/Create customer
router.post('/signup', deliveryController_1.deliveryUserSignUp);
// Login
router.post('/login', deliveryController_1.deliveryUserLogin);
// authentication
router.use(commonAuth_1.authenticate);
// Change Service Status
router.put('/change-status', deliveryController_1.updateDeliveryUserStatus);
// Profile
router.get('/profile', deliveryController_1.getDeliveryUserProfile);
router.patch('/profile', deliveryController_1.editDeliveryUserProfile);
//# sourceMappingURL=deliveryRoute.js.map