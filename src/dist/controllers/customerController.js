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
exports.deleteCart = exports.getCart = exports.addToCart = exports.editCustomerProfile = exports.getCustomerProfile = exports.requestOtp = exports.customerVerify = exports.customerLogin = exports.customerSignUp = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const customer_dto_1 = require("../../src/dto/customer.dto");
const customer_1 = require("../../src/models/customer");
const utility_1 = require("../utility");
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
        lng: 0
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
});
exports.addToCart = addToCart;
const getCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.getCart = getCart;
const deleteCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.deleteCart = deleteCart;
// order section
// export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
//     const customer = req.user;
//     if (customer) {
//         const profile = await Customer.findById(customer._id);
//         const orderId = `${Math.floor(Math.random() * 89999 + 1000)}`;
//         // const cart = <{ OrderInputs }>req.body;
//         let cartItems = Array();
//         let netAmount = 0.0;
//         const foods = await (await Food.find().where('_id')).includes(cart.map(item => item._id)).exec();
//         foods.map(food => {
//             cart.map(({ _id, unit }) => {
//                 if (food._id == _id) {
//                     netAmount += food.price * unit;
//                     cartItems.push({ food, unit: unit })
//                 } else {
//                     console.log(`${food._id} / ${_id}`)
//                 }
//             })
//         })
//         if (cartItems) {
//             const currentOrder = await Order.create({
//                 orderID: orderId,
//                 items: cartItems,
//                 totalAmount: netAmount,
//                 orderDate: new Date(),
//                 paidThrough: 'COD',
//                 paymentResponse: 'Some json response stringify',
//                 orderStatus: 'waiting',
//             })
//         }
//     }
// }
//# sourceMappingURL=customerController.js.map