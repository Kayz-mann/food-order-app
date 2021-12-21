"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorRoute = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const controllers_1 = require("../controllers");
const commonAuth_1 = require("../middlewares/commonAuth");
const router = express_1.default.Router();
exports.vendorRoute = router;
const imageStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + '_' + file.originalname);
    }
});
const images = (0, multer_1.default)({ storage: imageStorage }).array('images', 10);
router.use(commonAuth_1.authenticate);
router.post('/login', controllers_1.vendorLogin);
router.get('/profile', controllers_1.getVendorProfile);
router.patch('/profile', controllers_1.updateVendorProfile);
router.patch('/service', controllers_1.updateVendorService);
router.patch('/coverimage', images, controllers_1.updateVendorCoverImage);
router.post('/food', images, controllers_1.addFood);
router.get('/foods', controllers_1.getFoods);
router.get('/', (req, res, next) => {
    res.json({ message: "Hello vendor" });
});
//# sourceMappingURL=vendorRoute.js.map