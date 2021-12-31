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
exports.getDeliveryUsers = exports.verifyDeliveryUser = exports.getTransactionById = exports.getTransactions = exports.getVendorById = exports.getVendors = exports.createVendor = exports.FindVendor = void 0;
const models_1 = require("../models");
const transaction_1 = require("../models/transaction");
const utility_1 = require("../utility");
const FindVendor = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email) {
        return yield models_1.Vendor.findOne({ email: email });
    }
    else {
        return yield models_1.Vendor.findById(id);
    }
    ;
});
exports.FindVendor = FindVendor;
const createVendor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, address, pinCode, email, password, ownerName, phone } = req.body;
    const existingVendor = yield (0, exports.FindVendor)('', email);
    if (existingVendor !== null) {
        return res.json({ "message": "A vendor already exists with this email" });
    }
    ;
    // generate salt
    const salt = yield (0, utility_1.GenerateSalt)();
    const userPassword = yield (0, utility_1.GeneratePassword)(password, salt);
    const createVendor = yield models_1.Vendor.create({
        name: name,
        address: address,
        pinCode: pinCode,
        email: email,
        password: userPassword,
        salt: salt,
        ownerName: ownerName,
        phone: phone,
        rating: 0,
        serviceAvailable: false,
        coverImages: [],
        foods: [],
        lat: 0,
        lng: 0
    });
    return res.json(createVendor);
});
exports.createVendor = createVendor;
const getVendors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const vendors = yield models_1.Vendor.find();
    if (vendors !== null) {
        return res.json(vendors);
    }
    return res.json({ "message": "vendors data not available" });
});
exports.getVendors = getVendors;
const getVendorById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const vendorId = req.params.id;
    const vendor = yield (0, exports.FindVendor)(vendorId);
    if (vendor !== null) {
        return res.json(vendor);
    }
    ;
    return res.json({ "message": "vendors data not available" });
});
exports.getVendorById = getVendorById;
const getTransactions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield transaction_1.Transaction.find();
    if (transactions) {
        return res.status(200).json(transactions);
    }
    return res.json({ "message": "Transaction not available" });
});
exports.getTransactions = getTransactions;
const getTransactionById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const transactions = yield transaction_1.Transaction.find();
    if (transactions) {
        return res.status(200).json(transactions);
    }
    return res.json({ "message": "Transaction not available" });
});
exports.getTransactionById = getTransactionById;
const verifyDeliveryUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, status } = req.body;
    if (_id) {
        const profile = yield models_1.DeliveryUser.findById(_id);
        if (profile) {
            profile.verified = status;
            const result = yield profile.save();
            return res.status(200).json(result);
        }
    }
    return res.status(400).json({ "message": "Unable to verify delivery user" });
});
exports.verifyDeliveryUser = verifyDeliveryUser;
const getDeliveryUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const deliveryUsers = yield models_1.DeliveryUser.find();
    if (deliveryUsers) {
        return res.status(200).json(deliveryUsers);
    }
    return res.status(400).json({ "message": "Unable to fetch delivery users" });
});
exports.getDeliveryUsers = getDeliveryUsers;
//# sourceMappingURL=adminController.js.map