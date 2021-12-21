import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';

import { addFood, getFoods, getVendorProfile, updateVendorCoverImage, updateVendorProfile, updateVendorService, vendorLogin } from '../controllers';
import { authenticate } from '../middlewares/commonAuth';



const router = express.Router();

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString()+'_'+file.originalname)
    }
})

const images = multer({ storage: imageStorage}).array('images', 10)

router.use(authenticate);
router.post('/login', vendorLogin);
router.get('/profile',  getVendorProfile);
router.patch('/profile', updateVendorProfile);
router.patch('/service', updateVendorService);
router.patch('/coverimage', images, updateVendorCoverImage);

router.post('/food', images, addFood);
router.get('/foods', getFoods);

router.get('/', (req: Request, res: Response, next: NextFunction ) => {
    res.json({ message: "Hello vendor"});
})

export { router as vendorRoute };