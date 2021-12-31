"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.adminRoute = router;
router.post('/vendor', controllers_1.createVendor);
router.get('/vendor', controllers_1.getVendors);
router.post('/vendor/:id', controllers_1.getVendorById);
router.get('/transactions', controllers_1.getTransactions);
router.get('/transaction/:id', controllers_1.getTransactionById);
router.put('/delivery/verify', controllers_1.verifyDeliveryUser);
router.get('/delivery/users', controllers_1.getDeliveryUsers);
router.get('/', (req, res, next) => {
    res.json({ message: "Hello admin" });
});
//# sourceMappingURL=adminRoute.js.map