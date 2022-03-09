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
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePayment = exports.createPayment = exports.verifyOffer = exports.getOrderById = exports.getOrder = exports.createOrder = exports.deleteCart = exports.getCart = exports.addToCart = exports.editCustomerProfile = exports.getCustomerProfile = exports.requestOtp = exports.customerVerify = exports.customerLogin = exports.customerSignUp = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const customer_dto_1 = require("../dto/customer.dto");
const customer_1 = require("../models/customer");
const food_1 = require("../models/food");
const utility_1 = require("../utility");
const order_1 = require("../models/order");
const offer_1 = require("../models/offer");
const transaction_1 = require("../models/transaction");
const models_1 = require("../models");
// import { PUBLISHABLE_KEY, SECRET_KEY } from '../'
// var Publishable_Key = 
// var Secret_Key = 'sk_test_51IWT7zGcjbyIRuKVRAiPu2edR0o12frqzo7pkwPhSL0T39VhDiPeaSj4ESTQE5dTUv4Jg2BAmAVf3teSwvgSFIQU00eEGZsJN7'
// const stripe = require('stripe')(Secret_Key)
const customerSignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customerInputs = (0, class_transformer_1.plainToClass)(customer_dto_1.CreateCustomerInputs, req.body);
    const inputErrors = yield (0, class_validator_1.validate)(customerInputs, { validationError: { target: true } });
    if (inputErrors.length > 0) {
        return res.status(400).json(inputErrors);
    }
    const { email, phone, password } = customerInputs;
    const salt = yield (0, utility_1.GenerateSalt)();
    const userPassword = yield (0, utility_1.GeneratePassword)(password, salt);
    // const otp = 5698596;
    // const otp_expiry = new Date();
    const { otp, expiry } = (0, utility_1.GenerateOtp)();
    console.log(otp, expiry);
    const existCustomer = yield customer_1.Customer.findOne({ email: email });
    if (existCustomer !== null) {
        return res.status(400).json({ message: 'A user exists with this email' });
    }
    const result = yield customer_1.Customer.create({
        email: email,
        password: userPassword,
        salt: salt,
        phone: phone,
        otp: otp,
        otp_expiry: expiry,
        firstName: '',
        lastName: '',
        address: '',
        verified: false,
        lat: 0,
        lng: 0,
        orders: []
    });
    if (result) {
        // send the OTP to customer
        yield (0, utility_1.onRequestOtp)(otp, phone);
        // generate the signatutre
        const signature = (0, utility_1.GenerateSignature)({
            _id: result._id,
            email: result.email,
            verified: result.verified
        });
        // send the result to client
        return res.status(201).json({ signature: signature, verified: result.verified, email: result.email });
    }
    return res.status(400).json({ message: 'Error with Signup' });
});
exports.customerSignUp = customerSignUp;
const customerLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loginInputs = (0, class_transformer_1.plainToClass)(customer_dto_1.UserLoginInputs, req.body);
    const loginErrors = yield (0, class_validator_1.validate)(loginInputs, { validationError: { target: true } });
    if (loginErrors.length > 0) {
        return res.status(400).json(loginErrors);
    }
    ;
    const { email, password } = loginInputs;
    const customer = yield customer_1.Customer.findOne({ email: email });
    if (customer) {
        const validation = yield (0, utility_1.ValidatePassword)(password, customer.password, customer.salt);
        if (validation) {
            // generate the signatutre
            const signature = (0, utility_1.GenerateSignature)({
                _id: customer._id,
                email: customer.email,
                verified: customer.verified
            });
            // send the result to client
            return res.status(201).json({ signature: signature, verified: customer.verified, email: customer.email });
        }
        ;
    }
    ;
    return res.status(400).json({ message: 'Login Error' });
});
exports.customerLogin = customerLogin;
const customerVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp } = req.body;
    const customer = req.user;
    if (customer) {
        const profile = yield customer_1.Customer.findById(customer._id);
        if (profile) {
            if (profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()) {
                profile.verified = true;
                const updatedCustomerResponse = yield profile.save();
                // generate the signature
                const signature = (0, utility_1.GenerateSignature)({
                    _id: updatedCustomerResponse._id,
                    email: updatedCustomerResponse.email,
                    verified: updatedCustomerResponse.verified
                });
                return res.status(201).json({
                    signature: signature,
                    verified: updatedCustomerResponse.verified,
                    email: updatedCustomerResponse.email
                });
            }
        }
    }
    return res.status(400).json({ message: 'Error with OTP Validation' });
});
exports.customerVerify = customerVerify;
const requestOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    if (customer) {
        const profile = yield customer_1.Customer.findById(customer._id);
        if (profile) {
            const { otp, expiry } = (0, utility_1.GenerateOtp)();
            profile.otp = otp;
            profile.otp_expiry = expiry;
            yield profile.save();
            yield (0, utility_1.onRequestOtp)(otp, profile.phone);
            res.status(200).json({ message: 'OTP sent to your registered phone number' });
        }
    }
    res.status(400).json({ message: 'Error with OTP request' });
});
exports.requestOtp = requestOtp;
const getCustomerProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    if (customer) {
        const profile = yield customer_1.Customer.findById(customer._id);
        if (profile) {
            return res.status(200).json(profile);
        }
    }
    return res.status(400).json({ message: 'Error fetching profile' });
});
exports.getCustomerProfile = getCustomerProfile;
const editCustomerProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    const profileInputs = (0, class_transformer_1.plainToClass)(customer_dto_1.EditCustomerProfileInputs, req.body);
    const profileErrors = yield (0, class_validator_1.validate)(profileInputs, { validationError: { target: true } });
    if (profileErrors.length > 0) {
        return res.status(400).json(profileErrors);
    }
    const { firstName, lastName, address } = profileInputs;
    if (customer) {
        const profile = yield customer_1.Customer.findById(customer._id);
        if (profile) {
            profile.firstName = firstName;
            profile.lastName = lastName;
            profile.address = address;
            const result = yield profile.save();
            res.status(200).json(result);
        }
    }
});
exports.editCustomerProfile = editCustomerProfile;
// cart section
const addToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    if (customer) {
        const profile = yield customer_1.Customer.findById(customer._id).populate('cart.food');
        let cartItems = Array();
        const { _id, unit } = req.body;
        const food = yield food_1.Food.findById(_id);
        if (food) {
            if (profile != null) {
                //   check for cart Items
                cartItems = profile.cart;
                if (cartItems.length > 0) {
                    // check and update unit
                    let existingFoodItems = cartItems.filter((item) => item.food._id.toString() === _id);
                    if (existingFoodItems.length > 0) {
                        const index = cartItems.indexOf(existingFoodItems[0]);
                        if (unit > 0) {
                            cartItems[index] = { food, unit };
                        }
                        else {
                            cartItems.splice(index, 1);
                        }
                    }
                    else {
                        cartItems.push({ food, unit });
                    }
                }
            }
            else {
                // add new item to cart
                cartItems.push({ food, unit });
            }
            if (cartItems) {
                profile.cart = cartItems;
                const cartResult = yield profile.save();
                return res.status(200).json(cartResult.cart);
            }
        }
    }
});
exports.addToCart = addToCart;
const getCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    if (customer) {
        const profile = yield (yield customer_1.Customer.findById(customer._id)).populate('cart.food');
        if (profile) {
            return res.status(200).json(profile.cart);
        }
    }
    return res.status(400).json({ message: 'cart is empty' });
});
exports.getCart = getCart;
const deleteCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    if (customer) {
        const profile = yield (yield customer_1.Customer.findById(customer._id)).populate('cart.food');
        if (profile != null) {
            profile.cart = [];
            const cartResult = yield profile.save();
            return res.status(200).json(cartResult);
        }
    }
    return res.status(400).json({ message: 'cart is already empty' });
});
exports.deleteCart = deleteCart;
// Delivery Notification
const assignOrderForDelivery = (orderId, vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    // find the vendor
    const vendor = yield models_1.Vendor.findById(vendorId);
    if (vendor) {
        const areaCode = vendor.pinCode;
        const vendorLat = vendor.lat;
        const vendorLng = vendor.lng;
        // find the available delivery person
        const deliveryPerson = yield models_1.DeliveryUser.find({ pinCode: areaCode, verified: true, isAvailable: true });
        // check the nearest delivery person and assign the order
        if (deliveryPerson) {
            const currentOrder = yield order_1.Order.findById(orderId);
            if (currentOrder) {
                // update deliveryID
                currentOrder.deliveryId = deliveryPerson[0]._id;
                yield currentOrder.save();
                // Notify to vendor for received new order using firebase push notification
            }
        }
    }
});
// order section
const validateTransaction = (txnId) => __awaiter(void 0, void 0, void 0, function* () {
    const currentTransaction = yield transaction_1.Transaction.findById(txnId);
    if (currentTransaction) {
        if (currentTransaction.status.toLowerCase() !== "failed") {
            return { status: true, currentTransaction };
        }
    }
    return { status: false, currentTransaction };
});
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // grab current login customer
    const customer = req.user;
    const { txnId, amount, items } = req.body;
    if (customer) {
        const { status, currentTransaction } = yield validateTransaction(txnId);
        if (!status) {
            return res.status(400).json({ message: 'Error with create order' });
        }
        // create an order ID
        const orderId = `${Math.floor(Math.random() * 89999) + 1000}`;
        const profile = yield customer_1.Customer.findById(customer._id);
        // Grab order items from request
        const cart = req.body;
        let cartItems = Array();
        let netAmount = 0.0;
        let vendorId;
        // Calculate order amount
        const foods = yield food_1.Food.find().where('_id').in(items.map(item => item._id)).exec();
        foods.map(food => {
            items.map(({ _id, unit }) => {
                if (food._id == _id) {
                    vendorId = food.vendorId;
                    netAmount += food.price * unit;
                    cartItems.push({ food, unit: unit });
                }
                else {
                    console.log(`${food._id} / ${_id}`);
                }
            });
        });
        // Create order with description
        if (cartItems) {
            // create order
            const currentOrder = yield order_1.Order.create({
                orderID: orderId,
                vendorId: vendorId,
                items: cartItems,
                totalAmount: netAmount,
                paidAmount: amount,
                orderDate: new Date(),
                // paidThrough: 'COD',
                // paymentResponse: '',
                orderStatus: 'Waiting',
                remarks: '',
                deliveryId: '',
                // appliedOffers: false,
                // offerId: null,
                readyTime: 45,
            });
            profile.cart = [];
            profile.orders.push(currentOrder);
            currentTransaction.vendorId = vendorId,
                currentTransaction.orderId = orderId,
                currentTransaction.status = 'CONFIRMED';
            assignOrderForDelivery(currentOrder._id, vendorId);
            yield currentTransaction.save();
            const profileSaveResponse = yield profile.save();
            res.status(200).json(profileSaveResponse);
            // if (currentOrder) {
            //     profile.orders.push(currentOrder);
            //     await profile.save();
            //     return res.status(200).json(currentOrder);
            // }
        }
        else {
            return res.status(400).json({ message: 'Error with Create Order' });
        }
    }
});
exports.createOrder = createOrder;
const getOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    if (customer) {
        const profile = yield (yield customer_1.Customer.findById(customer._id)).populate('orders');
        if (profile) {
            return res.status(200).json(profile.orders);
        }
    }
});
exports.getOrder = getOrder;
const getOrderById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    if (orderId) {
        const order = yield customer_1.Customer.findById(orderId).populate('items.food');
        return res.status(200).json(order);
    }
});
exports.getOrderById = getOrderById;
const verifyOffer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const offerId = req.params.id;
    const customer = req.user;
    if (customer) {
        const appliedOffer = yield offer_1.Offer.findById(offerId);
        if (appliedOffer) {
            if (appliedOffer.promoType === "USER") {
            }
            else {
                if (appliedOffer.isActive) {
                    return res.status(200).json({ message: "Offer is valid", offer: appliedOffer });
                }
            }
        }
    }
    return res.status(400).json({ message: "Offer is not valid" });
});
exports.verifyOffer = verifyOffer;
const createPayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    const { amount, paymentMode, offerId } = req.body;
    let payableAmount = Number(amount);
    // 500 - 200 = 300
    if (offerId) {
        const appliedOffer = yield offer_1.Offer.findById(offerId);
        if (appliedOffer) {
            if (appliedOffer.isActive) {
                payableAmount = (payableAmount - appliedOffer.offerAmount);
            }
        }
    }
    // Perform payment gateway charge API call
    // Create record on transaction
    const transaction = yield transaction_1.Transaction.create({
        customer: customer._id,
        vendorId: '',
        orderId: '',
        orderValue: payableAmount,
        offerUsed: offerId || 'NA',
        status: 'OPEN',
        paymentMode: paymentMode,
        paymentResponse: 'Payment is cash on delivery'
    });
    // return transaction ID
    return res.status(200).json(transaction);
});
exports.createPayment = createPayment;
const makePayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, currency } = req.body;
    const payableAmount = parseInt(amount) + 100;
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: payableAmount,
        currency: currency
    });
    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});
exports.makePayment = makePayment;
//# sourceMappingURL=customerController.js.map