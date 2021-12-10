import express, { Request, Response, NextFunction } from 'express';
import { getVendorProfile, updateVendorProfile, updateVendorService, vendorLogin } from '../controllers';



const router = express.Router();

router.post('/login', vendorLogin);
router.get('/profile', getVendorProfile);
router.patch('/profile', updateVendorProfile);
router.patch('/service', updateVendorService);

router.get('/', (req: Request, res: Response, next: NextFunction ) => {
    res.json({ message: "Hello vendor"});
})

export { router as vendorRoute };