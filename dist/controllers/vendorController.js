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
exports.editOffer = exports.addOffer = exports.getOffers = exports.processOrder = exports.getOrderDetails = exports.getCurrentOrders = exports.getFoods = exports.addFood = exports.updateVendorService = exports.updateVendorCoverImage = exports.updateVendorProfile = exports.getVendorProfile = exports.vendorLogin = void 0;
const adminController_1 = require("./adminController");
const utility_1 = require("../utility");
const models_1 = require("../models");
const order_1 = require("../models/order");
const offer_1 = require("../models/offer");
const vendorLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existingVendor = yield (0, adminController_1.FindVendor)('', email);
    if (existingVendor !== null) {
        // validate and give access
        const validation = yield (0, utility_1.ValidatePassword)(password, existingVendor.password, existingVendor.salt);
        if (validation) {
            const signature = (0, utility_1.GenerateSignature)({
                _id: existingVendor.id,
                email: existingVendor.email,
                foodTypes: existingVendor.foodType,
                name: existingVendor.name
            });
            return res.json(signature);
        }
        else {
            return res.json({ "message": "Password is not valid" });
        }
    }
    ;
    return res.json({ "message": "Login credential not valid" });
});
exports.vendorLogin = vendorLogin;
const getVendorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const existingVendor = yield (0, adminController_1.FindVendor)(user._id);
        return res.json(existingVendor);
    }
    return res.json({ "message": "Vendor information not found" });
});
exports.getVendorProfile = getVendorProfile;
const updateVendorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { foodTypes, name, address, phone } = req.body;
    const user = req.user;
    if (user) {
        const existingVendor = yield (0, adminController_1.FindVendor)(user._id);
        if (existingVendor !== null) {
            existingVendor.name = name;
            existingVendor.address = address;
            existingVendor.phone = phone;
            existingVendor.foodType = foodTypes;
            const savedResult = yield existingVendor.save();
            return res.json(savedResult);
        }
        return res.json(existingVendor);
    }
    return res.json({ "message": "Vendor information not found" });
});
exports.updateVendorProfile = updateVendorProfile;
const updateVendorCoverImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const vendor = yield (0, adminController_1.FindVendor)(user._id);
        if (vendor !== null) {
            const files = req.files;
            const images = files.map((file) => file.filename);
            vendor.coverImages.push(...images);
            const result = yield vendor.save();
            return res.json(result);
        }
    }
    return res.json({ "message": "Something went wrong with add food" });
});
exports.updateVendorCoverImage = updateVendorCoverImage;
const updateVendorService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { lat, lng } = req.body;
    if (user) {
        const existingVendor = yield (0, adminController_1.FindVendor)(user._id);
        if (existingVendor !== null) {
            existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
            if (lat && lng) {
                existingVendor.lat = lat;
                existingVendor.lng = lng;
            }
            const savedResult = yield existingVendor.save();
            return res.json(savedResult);
        }
        return res.json(existingVendor);
    }
    return res.json({ "message": "Vendor information not found" });
});
exports.updateVendorService = updateVendorService;
const addFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const { name, description, category, foodType, readyTime, price } = req.body;
        const vendor = yield (0, adminController_1.FindVendor)(user._id);
        if (vendor !== null) {
            const files = req.files;
            const images = files.map((file) => file.filename);
            const createdFood = yield models_1.Food.create({
                vendorId: vendor._id,
                name: name,
                description: description,
                category: category,
                foodType: foodType,
                images: files,
                readyTime: readyTime,
                price: price,
                rating: 0
            });
            vendor.foods.push(createdFood);
            const result = yield vendor.save();
            return res.json(result);
        }
    }
    return res.json({ "message": "Something went wrong with add food" });
});
exports.addFood = addFood;
const getFoods = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const foods = yield models_1.Food.find({ vendorId: user._id });
        if (foods !== null) {
            return res.json(foods);
        }
    }
    return res.json({ "message": "Foods information not found" });
});
exports.getFoods = getFoods;
const getCurrentOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const orders = yield order_1.Order.find({ vendorId: user._id }).populate('items.food');
        if (orders != null) {
            return res.status(200).json(orders);
        }
    }
    return res.json({ "message": "order not found" });
});
exports.getCurrentOrders = getCurrentOrders;
const getOrderDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    if (orderId) {
        const order = yield order_1.Order.findById(orderId).populate('items.food');
        if (order != null) {
            return res.status(200).json(order);
        }
    }
    return res.json({ "message": "order not found" });
});
exports.getOrderDetails = getOrderDetails;
const processOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const { status, remarks, time } = req.body;
    if (orderId) {
        const order = yield (yield order_1.Order.findById(orderId)).populated('food');
        order.Status = status;
        order.remarks = remarks;
        if (time) {
            order.readyTime = time;
        }
        const orderResult = yield order.save();
        if (orderResult !== null) {
            return res.status(200).json(orderResult);
        }
    }
    return res.json({ "message": "Unable to process order" });
});
exports.processOrder = processOrder;
const getOffers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        let currentOffers = Array();
        const offers = yield offer_1.Offer.find().populate('vendors');
        if (offers) {
            offers.map(item => {
                if (item.vendors) {
                    item.vendors.map(vendor => {
                        if (vendor._id.toString() === user._id) {
                            currentOffers.push(item);
                        }
                    });
                    if (item.offerType === "GENERIC") {
                        currentOffers.push(item);
                    }
                }
            });
        }
        return res.json(currentOffers);
    }
    return res.json({ "message": "Offers not available" });
});
exports.getOffers = getOffers;
const addOffer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const { title, description, offerType, offerAmount, pinCode, promoCode, promoType, startValidity, endValidity, bank, bins, minValue, isActive } = req.body;
        const vendor = yield (0, adminController_1.FindVendor)(user._id);
        if (vendor) {
            const offer = yield offer_1.Offer.create({
                title,
                description,
                offerType,
                pinCode,
                promoCode,
                promoType,
                startValidity,
                endValidity,
                offerAmount,
                bank,
                bins,
                isActive,
                minValue,
                vendors: [vendor]
            });
            console.log(offer);
            return res.status(200).json(offer);
        }
    }
    return res.json({ "message": "Unable to Add Offer" });
});
exports.addOffer = addOffer;
const editOffer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const offerId = req.params._id;
    if (user) {
        const { title, description, offerType, offerAmount, pinCode, promoCode, promoType, startValidity, endValidity, bank, bins, minValue, isActive } = req.body;
        const currentOffer = yield offer_1.Offer.findById(offerId);
        if (currentOffer) {
            const vendor = yield (0, adminController_1.FindVendor)(user._id);
            if (vendor) {
                currentOffer.title = title,
                    currentOffer.description = description,
                    currentOffer.offerType = offerType,
                    currentOffer.offerAmount = offerAmount,
                    currentOffer.pinCode = pinCode,
                    currentOffer.promoCode = promoCode,
                    currentOffer.startValidity = startValidity,
                    currentOffer.endValidity = endValidity,
                    currentOffer.bank = bank,
                    currentOffer.bins = bins,
                    currentOffer.isActive = isActive,
                    currentOffer.minValue = minValue;
                const result = yield currentOffer.save();
                return res.json(result);
            }
        }
    }
});
exports.editOffer = editOffer;
//# sourceMappingURL=vendorController.js.map