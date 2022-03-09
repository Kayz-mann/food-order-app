"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRoute = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const commonAuth_1 = require("../middlewares/commonAuth");
const router = express_1.default.Router();
exports.customerRoute = router;
// Signup/Create customer
router.post('/signup', controllers_1.customerSignUp);
// Login
router.post('/login', controllers_1.customerLogin);
// authentication
router.use(commonAuth_1.authenticate);
// Verify Customer Account
router.patch('/verify', controllers_1.customerVerify);
// OTP / Requesting OTP
router.get('/otp', controllers_1.requestOtp);
// Profile
router.get('/profile', controllers_1.getCustomerProfile);
router.patch('/profile', controllers_1.editCustomerProfile);
// Cart
router.post('/cart', controllers_1.addToCart);
router.get('/cart', controllers_1.getCart);
router.delete('/cart', controllers_1.deleteCart);
// Apply Offers
router.get('/offer/verify/:id', controllers_1.verifyOffer);
// Order
router.post('/create-order', controllers_1.createOrder);
router.get('/orders', controllers_1.getOrder);
router.get('/order/:id', controllers_1.getOrderById);
// Offers
router.get('/offers', controllers_1.getOffers);
router.post('/offer', controllers_1.addOffer);
router.put('/offer/:id', controllers_1.editOffer);
// Payment
router.post('/create-payment', controllers_1.createPayment);
router.post('/create-payment-intent', controllers_1.makePayment);
//# sourceMappingURL=customerRoute.js.map