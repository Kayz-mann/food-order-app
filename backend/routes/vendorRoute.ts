import express, { Request, Response, NextFunction } from 'express';

import { addFood, getVendorProfile, updateVendorProfile, updateVendorService, vendorLogin } from '../controllers';
import { Authenticate } from '../middlewares/commonAuth';



const router = express.Router();

router.use(Authenticate);
router.post('/login', vendorLogin);
router.get('/profile',  getVendorProfile);
router.patch('/profile', updateVendorProfile);
router.patch('/service', updateVendorService);

router.post('/food', addFood);
router.get('/foods');

router.get('/', (req: Request, res: Response, next: NextFunction ) => {
    res.json({ message: "Hello vendor"});
})

export { router as vendorRoute };