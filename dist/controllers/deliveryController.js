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
exports.updateDeliveryUserStatus = exports.editDeliveryUserProfile = exports.getDeliveryUserProfile = exports.deliveryUserLogin = exports.deliveryUserSignUp = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const customer_dto_1 = require("../dto/customer.dto");
const utility_1 = require("../utility");
const models_1 = require("../models");
const deliveryUserSignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const deliveryUserInputs = (0, class_transformer_1.plainToClass)(customer_dto_1.CreateDeliveryUserInputs, req.body);
    const inputErrors = yield (0, class_validator_1.validate)(deliveryUserInputs, { validationError: { target: true } });
    if (inputErrors.length > 0) {
        return res.status(400).json(inputErrors);
    }
    const { email, phone, password, address, firstName, lastName, pincode } = deliveryUserInputs;
    const salt = yield (0, utility_1.GenerateSalt)();
    const userPassword = yield (0, utility_1.GeneratePassword)(password, salt);
    // const otp = 5698596;
    // const otp_expiry = new Date();
    const { otp, expiry } = (0, utility_1.GenerateOtp)();
    console.log(otp, expiry);
    const existingDeliveryUser = yield models_1.DeliveryUser.findOne({ email: email });
    if (existingDeliveryUser !== null) {
        return res.status(400).json({ message: 'A delivery user exists with this email' });
    }
    const result = yield models_1.DeliveryUser.create({
        email: email,
        password: userPassword,
        salt: salt,
        phone: phone,
        firstName: firstName,
        lastName: lastName,
        address: address,
        pincode: pincode,
        verified: false,
        lat: 0,
        lng: 0,
        isAvailable: false
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
exports.deliveryUserSignUp = deliveryUserSignUp;
const deliveryUserLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loginInputs = (0, class_transformer_1.plainToClass)(customer_dto_1.UserLoginInputs, req.body);
    const loginErrors = yield (0, class_validator_1.validate)(loginInputs, { validationError: { target: true } });
    if (loginErrors.length > 0) {
        return res.status(400).json(loginErrors);
    }
    ;
    const { email, password } = loginInputs;
    const deliveryUser = yield models_1.DeliveryUser.findOne({ email: email });
    if (deliveryUser) {
        const validation = yield (0, utility_1.ValidatePassword)(password, deliveryUser.password, deliveryUser.salt);
        if (validation) {
            // generate the signatutre
            const signature = (0, utility_1.GenerateSignature)({
                _id: deliveryUser._id,
                email: deliveryUser.email,
                verified: deliveryUser.verified
            });
            // send the result to client
            return res.status(201).json({ signature: signature, verified: deliveryUser.verified, email: deliveryUser.email });
        }
        ;
    }
    ;
    return res.status(400).json({ message: 'Login Error' });
});
exports.deliveryUserLogin = deliveryUserLogin;
const getDeliveryUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const deliveryUser = req.user;
    if (deliveryUser) {
        const profile = yield models_1.DeliveryUser.findById(deliveryUser._id);
        if (profile) {
            return res.status(200).json(profile);
        }
    }
    return res.status(400).json({ message: 'Error fetching profile' });
});
exports.getDeliveryUserProfile = getDeliveryUserProfile;
const editDeliveryUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const deliveryUser = req.user;
    const profileInputs = (0, class_transformer_1.plainToClass)(customer_dto_1.EditCustomerProfileInputs, req.body);
    const profileErrors = yield (0, class_validator_1.validate)(profileInputs, { validationError: { target: true } });
    if (profileErrors.length > 0) {
        return res.status(400).json(profileErrors);
    }
    const { firstName, lastName, address } = profileInputs;
    if (deliveryUser) {
        const profile = yield models_1.DeliveryUser.findById(deliveryUser._id);
        if (profile) {
            profile.firstName = firstName;
            profile.lastName = lastName;
            profile.address = address;
            const result = yield profile.save();
            res.status(200).json(result);
        }
    }
});
exports.editDeliveryUserProfile = editDeliveryUserProfile;
const updateDeliveryUserStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const deliveryUser = req.user;
    if (deliveryUser) {
        const { lat, lng } = req.body;
        const profile = yield models_1.DeliveryUser.findById(deliveryUser._id);
        if (profile) {
            if (lat & lng) {
                profile.lat;
                profile.lng;
            }
            profile.isAvailable = !profile.isAvailable;
            const result = yield profile.save();
            return res.status(200).json(result);
        }
    }
    return res.status(400).json({ message: 'User status not updated' });
});
exports.updateDeliveryUserStatus = updateDeliveryUserStatus;
//# sourceMappingURL=deliveryController.js.map