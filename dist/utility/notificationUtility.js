"use strict";
// Email
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
exports.onRequestOtp = exports.GenerateOtp = void 0;
// Notifications
// OTP
const GenerateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + (30 * 60 * 1000));
    return { otp, expiry };
};
exports.GenerateOtp = GenerateOtp;
const onRequestOtp = (otp, toPhoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const accountSid = 'ACe2561267ca2dfbf063c408f2ec1b9519';
    const authToken = '714f8e4bd2f00f159439acabf0824581';
    const client = require('twilio')(accountSid, authToken);
    const response = yield client.messages.create({
        body: `Your OTP is ${otp}`,
        from: '+18324153957',
        to: `+234${toPhoneNumber}`,
    });
    return response;
});
exports.onRequestOtp = onRequestOtp;
// Payment Notification or emails
//# sourceMappingURL=notificationUtility.js.map